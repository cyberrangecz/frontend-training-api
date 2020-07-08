import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SentinelFilter, PaginatedResource, SentinelParamsMerger, RequestedPagination } from '@sentinel/common';
import { FlagCheck, TrainingRun } from 'kypo-training-model';
import { Hint } from 'kypo-training-model';
import { Question } from 'kypo-training-model';
import { AccessedTrainingRun } from 'kypo-training-model';
import { AccessTrainingRunInfo } from 'kypo-training-model';
import { Level } from 'kypo-training-model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AbstractLevelDTO } from '../../dto/level/abstract-level-dto';
import { HintDTO } from '../../dto/level/game/hint-dto';
import { IsCorrectFlagDTO } from '../../dto/level/game/is-correct-flag-dto';
import { AccessTrainingRunDTO } from '../../dto/training-run/access-training-run-dto';
import { TrainingRunDTO } from '../../dto/training-run/training-run-dto';
import { TrainingRunRestResource } from '../../dto/training-run/training-run-rest-resource';
import { FilterParams } from '../../http/params/filter-params';
import { PaginationParams } from '../../http/params/pagination-params';
import { QuestionMapper } from '../../mappers/level/assessment/question-mapper';
import { HintMapper } from '../../mappers/level/game/hint-mapper';
import { LevelMapper } from '../../mappers/level/level-mapper';
import { PaginationMapper } from '../../mappers/pagination-mapper';
import { AccessTrainingRunMapper } from '../../mappers/training-run/access-training-run-mapper';
import { AccessedTrainingRunMapper } from '../../mappers/training-run/accessed-training-run-mapper';
import { FlagMapper } from '../../mappers/training-run/flag-mapper';
import { TrainingRunMapper } from '../../mappers/training-run/training-run-mapper';
import { KypoTrainingApiContext } from '../../other/kypo-training-api-context';
import { TrainingRunApi } from './training-run-api.service';
/**
 * Default implementation of service abstracting http communication with training run endpoints.
 */
@Injectable()
export class TrainingRunDefaultApi extends TrainingRunApi {
  readonly trainingRunsUriExtension = 'training-runs';

  readonly trainingRunsEndpointUri: string;

  constructor(private http: HttpClient, private context: KypoTrainingApiContext) {
    super();
    this.trainingRunsEndpointUri = this.context.config.trainingBasePath + this.trainingRunsUriExtension;
  }

  /**
   * Sends http request to retrieve all training runs on specified page of a pagination
   * @param pagination requested pagination
   * @param filters filters to be applied on resources
   */
  getAll(pagination: RequestedPagination, filters: SentinelFilter[] = []): Observable<PaginatedResource<TrainingRun>> {
    const params = SentinelParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http
      .get<TrainingRunRestResource>(this.trainingRunsEndpointUri, { params })
      .pipe(
        map(
          (response) =>
            new PaginatedResource<TrainingRun>(
              TrainingRunMapper.fromDTOs(response.content),
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
      .pipe(map((response) => TrainingRunMapper.fromDTO(response)));
  }

  /**
   * Sends http request to retrieve training run already accessed by logged in user
   * @param pagination requested pagination
   */
  getAccessed(pagination: RequestedPagination): Observable<PaginatedResource<AccessedTrainingRun>> {
    return this.http
      .get<TrainingRunRestResource>(`${this.trainingRunsEndpointUri}/accessible`, {
        params: PaginationParams.forJavaAPI(pagination),
      })
      .pipe(
        map(
          (response) =>
            new PaginatedResource<AccessedTrainingRun>(
              AccessedTrainingRunMapper.fromDTOs(response.content),
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
      .pipe(map((response) => AccessTrainingRunMapper.fromDTO(response)));
  }

  /**
   * Sends http request to resume in training run
   * @param trainingRunId id of a training run to resume
   */
  resume(trainingRunId: number): Observable<AccessTrainingRunInfo> {
    return this.http
      .get<AccessTrainingRunDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/resumption`)
      .pipe(map((response) => AccessTrainingRunMapper.fromDTO(response)));
  }

  /**
   * Sends http request to move to next level
   * @param trainingRunId id of a training run
   */
  nextLevel(trainingRunId: number): Observable<Level> {
    return this.http
      .get<AbstractLevelDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/next-levels`)
      .pipe(map((response) => LevelMapper.fromDTO(response)));
  }

  /**
   * Sends http request to submit the flag from game level and check its valid
   * @param trainingRunId id of training run in which the flag should be submitted
   * @param flag a flag submitted by user
   */
  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck> {
    return this.http
      .post<IsCorrectFlagDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/is-correct-flag`, { flag })
      .pipe(map((response) => FlagMapper.fromDTO(response)));
  }

  /**
   * Sends http request to display hint and deduct points for it
   * @param trainingRunId id of training run in which, hint should be revealed
   * @param hintId id of requested hint
   */
  takeHint(trainingRunId: number, hintId: number): Observable<Hint> {
    return this.http
      .get<HintDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/hints/${hintId}`)
      .pipe(map((response) => HintMapper.fromDTO(response)));
  }

  /**
   * Sends http request to display solution to a level
   * @param trainingRunId id of the training run in which, solution should be revealed
   */
  takeSolution(trainingRunId: number): Observable<string> {
    return this.http.get(`${this.trainingRunsEndpointUri}/${trainingRunId}/solutions`, { responseType: 'text' });
  }

  /**
   * Sends http request to submit user answers for questions in assessment level
   * @param trainingRunId id of the training run in which, questions should be submitted
   * @param questions questions which answers should be submitted
   */
  submitAnswers(trainingRunId: number, questions: Question[]): Observable<any> {
    return this.http.put(
      `${this.trainingRunsEndpointUri}/${trainingRunId}/assessment-evaluations`,
      QuestionMapper.toAnswersDTOs(questions)
    );
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
