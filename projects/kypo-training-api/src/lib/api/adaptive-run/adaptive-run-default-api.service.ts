import { Injectable } from '@angular/core';
import { AdaptiveRunApi } from './adaptive-run-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { KypoTrainingApiContext } from '../../other/kypo-training-api-context';
import { PaginatedResource, OffsetPaginationEvent, SentinelFilter, SentinelParamsMerger } from '@sentinel/common';
import { Observable } from 'rxjs';
import {
  AccessedTrainingRun,
  AccessTrainingRunInfo,
  PhaseAnswerCheck,
  Phase,
  QuestionAnswer,
  TrainingRun,
} from '@muni-kypo-crp/training-model';
import { PaginationParams } from '../../http/params/pagination-params';
import { FilterParams } from '../../http/params/filter-params';
import { TrainingRunRestResource } from '../../dto/training-run/training-run-rest-resource';
import { map } from 'rxjs/operators';
import { PaginationMapper } from '../../mappers/pagination-mapper';
import { TrainingRunDTO } from '../../dto/training-run/training-run-dto';
import { AccessTrainingRunDTO } from '../../dto/training-run/access-training-run-dto';
import { AdaptiveRunMapper } from '../../mappers/training-run/adaptive-run-mapper';
import { AccessedAdaptiveRunMapper } from '../../mappers/training-run/accessed-adaptive-run-mapper';
import { AccessAdaptiveRunMapper } from '../../mappers/training-run/access-adaptive-run-mapper';
import { AbstractPhaseDTO } from '../../dto/phase/abstract-phase-dto';
import { PhaseMapper } from '../../mappers/phase/phase-mapper';
import { IsCorrectAnswerDTO } from '../../dto/phase/training-phase/is-correct-answer-dto';
import { TaskAnswerMapper } from '../../mappers/training-run/task-answer-mapper';
import { QuestionAnswerMapper } from '../../mappers/phase/question-answer-mapper';

@Injectable()
export class AdaptiveRunDefaultApi extends AdaptiveRunApi {
  readonly trainingRunsUriExtension = 'training-runs';

  readonly trainingRunsEndpointUri: string;

  constructor(private http: HttpClient, private context: KypoTrainingApiContext) {
    super();
    this.trainingRunsEndpointUri = this.context.config.adaptiveBasePath + this.trainingRunsUriExtension;
  }

  getAll(
    pagination: OffsetPaginationEvent,
    filters: SentinelFilter[] = []
  ): Observable<PaginatedResource<TrainingRun>> {
    const params = SentinelParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http
      .get<TrainingRunRestResource>(this.trainingRunsEndpointUri, { params })
      .pipe(
        map(
          (response) =>
            new PaginatedResource<TrainingRun>(
              AdaptiveRunMapper.fromDTOs(response.content),
              PaginationMapper.fromJavaAPI(response.pagination)
            )
        )
      );
  }

  /**
   * Sends http request to retrieve training run by id
   * @param id id of training run which should be retrieved
   */
  get(id: number): Observable<TrainingRun> {
    return this.http
      .get<TrainingRunDTO>(`${this.trainingRunsEndpointUri}/${id}`)
      .pipe(map((response) => AdaptiveRunMapper.fromDTO(response)));
  }

  /**
   * Sends http request to retrieve training run already accessed by logged in user
   * @param pagination requested pagination
   */
  getAccessed(pagination: OffsetPaginationEvent): Observable<PaginatedResource<AccessedTrainingRun>> {
    return this.http
      .get<TrainingRunRestResource>(`${this.trainingRunsEndpointUri}/accessible`, {
        params: PaginationParams.forJavaAPI(pagination),
      })
      .pipe(
        map(
          (response) =>
            new PaginatedResource<AccessedTrainingRun>(
              AccessedAdaptiveRunMapper.fromDTOs(response.content),
              PaginationMapper.fromJavaAPI(response.pagination)
            )
        )
      );
  }

  /**
   * Sends http request to delete training run
   * @param trainingRunId id of a training run which should be deleted
   * @param force true if delete should be forced, false otherwise
   */
  delete(trainingRunId: number, force = false): Observable<any> {
    const params = new HttpParams().append('forceDelete', force.toString());
    return this.http.delete(`${this.trainingRunsEndpointUri}/${trainingRunId}`, { params });
  }

  /**
   * Sends http request to delete training runs in batch
   * @param trainingRunIds ids of training runs which should be deleted
   * @param force true if delete should be forced, false otherwise
   */
  deleteMultiple(trainingRunIds: number[], force = false): Observable<any> {
    const params = new HttpParams()
      .append('trainingRunIds', trainingRunIds.toString())
      .append('forceDelete', force.toString());
    return this.http.delete(this.trainingRunsEndpointUri, { params });
  }

  /**
   * Sends http request to access training run with access token.
   * @param token access token to access the training run
   */
  access(token: string): Observable<AccessTrainingRunInfo> {
    const params = new HttpParams().append('accessToken', token);
    return this.http
      .post<AccessTrainingRunDTO>(this.trainingRunsEndpointUri, {}, { params })
      .pipe(map((response) => AccessAdaptiveRunMapper.fromDTO(response)));
  }

  /**
   * Sends http request to resume in training run
   * @param trainingRunId id of a training run to resume
   */
  resume(trainingRunId: number): Observable<AccessTrainingRunInfo> {
    return this.http
      .get<AccessTrainingRunDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/resumption`)
      .pipe(map((response) => AccessAdaptiveRunMapper.fromDTO(response)));
  }

  nextPhase(trainingRunId: number): Observable<Phase> {
    return this.http
      .get<AbstractPhaseDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/next-phases`)
      .pipe(map((response) => PhaseMapper.fromDTO(response)));
  }

  isCorrectAnswer(trainingRunId: number, answer: string): Observable<PhaseAnswerCheck> {
    return this.http
      .post<IsCorrectAnswerDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/is-correct-answer`, { answer })
      .pipe(map((response) => TaskAnswerMapper.fromDTO(response)));
  }

  isCorrectPasskey(trainingRunId: number, passkey: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.trainingRunsEndpointUri}/${trainingRunId}/is-correct-passkey`, { passkey });
  }

  /**
   * Sends http request to display solution to a level
   * @param trainingRunId id of the training run in which, solution should be revealed
   */
  takeSolution(trainingRunId: number): Observable<string> {
    return this.http.get(`${this.trainingRunsEndpointUri}/${trainingRunId}/solutions`, { responseType: 'text' });
  }

  evaluateQuestionnaire(trainingRunId: number, questionAnswers: QuestionAnswer[]): Observable<any> {
    return this.http.put(`${this.trainingRunsEndpointUri}/${trainingRunId}/questionnaire-evaluation`, {
      answers: QuestionAnswerMapper.toDTOs(questionAnswers),
    });
  }

  /**
   * Sends http request to finish active training run
   * @param trainingRunId id of a training run which should be finished
   */
  finish(trainingRunId: number): Observable<any> {
    return this.http.put(`${this.trainingRunsEndpointUri}/${trainingRunId}`, null);
  }

  /**
   * Sends http request to archive training run
   * @param trainingRunId id of a training run which should be archived
   */
  archive(trainingRunId: number): Observable<any> {
    return this.http.patch(`${this.trainingRunsEndpointUri}/${trainingRunId}/archive`, null);
  }
}
