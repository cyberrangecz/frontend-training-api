import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {FlagCheck} from 'kypo-training-model';
import {Hint} from 'kypo-training-model';
import {Question} from 'kypo-training-model';
import {AccessedTrainingRun} from 'kypo-training-model';
import {KypoPaginatedResource, KypoRequestedPagination} from 'kypo-common';
import {AccessTrainingRunInfo} from 'kypo-training-model';
import {TrainingRun} from 'kypo-training-model';
import {Level} from 'kypo-training-model';
import {TrainingRunDTO} from '../../dto/training-run/training-run-dto';
import {TrainingRunMapper} from '../../mappers/training-run/training-run-mapper';
import {TrainingRunRestResource} from '../../dto/training-run/training-run-rest-resource';
import {PaginationParams} from '../../http/params/pagination-params';
import {PaginationMapper} from '../../mappers/pagination-mapper';
import {AccessedTrainingRunMapper} from '../../mappers/training-run/accessed-training-run-mapper';
import {AccessTrainingRunDTO} from '../../dto/training-run/access-training-run-dto';
import {AccessTrainingRunMapper} from '../../mappers/training-run/access-training-run-mapper';
import {AbstractLevelDTO} from '../../dto/level/abstract-level-dto';
import {LevelMapper} from '../../mappers/level/level-mapper';
import {IsCorrectFlagDTO} from '../../dto/level/game/is-correct-flag-dto';
import {FlagMapper} from '../../mappers/training-run/flag-mapper';
import {HintMapper} from '../../mappers/level/game/hint-mapper';
import {HintDTO} from '../../dto/level/game/hint-dto';
import {QuestionMapper} from '../../mappers/level/assessment/question-mapper';
import {KypoTrainingApiContext} from '../../other/kypo-training-api-context';
import {TrainingRunApi} from './training-run-api.service';
/**
 * Default implementation of service abstracting http communication with training run endpoints.
 */
@Injectable()
export class TrainingRunDefaultApi extends TrainingRunApi {

  readonly trainingRunsUriExtension = 'training-runs';

  readonly trainingRunsEndpointUri: string;

  constructor(private http: HttpClient,
              private context: KypoTrainingApiContext) {
    super();
    this.trainingRunsEndpointUri = this.context.config.trainingBasePath + this.trainingRunsUriExtension;
  }

  /**
   * Sends http request to retrieve training run by id
   * @param id id of training run which should be retrieved
   */
  get(id: number): Observable<TrainingRun> {
    return this.http.get<TrainingRunDTO>(this.trainingRunsEndpointUri + id)
      .pipe(map(response => TrainingRunMapper.fromDTO(response)));
  }

  /**
   * Sends http request to retrieve training run already accessed by logged in user
   * @param pagination requested pagination
   */
  getAccessed(pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<AccessedTrainingRun>> {
    return this.http.get<TrainingRunRestResource>(`${this.trainingRunsEndpointUri}/accessible`,
      {params: PaginationParams.forJavaAPI(pagination)})
      .pipe(
        map(response => new KypoPaginatedResource<AccessedTrainingRun>(
          AccessedTrainingRunMapper.fromDTOs(response.content),
          PaginationMapper.fromJavaAPI(response.pagination)
        )));
  }

  /**
   * Sends http request to delete training run
   * @param trainingRunId id of a training run which should be deleted
   */
  delete(trainingRunId: number): Observable<any> {
    return this.http.delete(`${this.trainingRunsEndpointUri}/${trainingRunId}`);
  }

  /**
   * Sends http request to delete training runs in batch
   * @param trainingRunIds ids of training runs which should be deleted
   */
  deleteMultiple(trainingRunIds: number[]): Observable<any> {
    const params = new HttpParams().append('trainingRunIds', trainingRunIds.toString());
    return this.http.delete(this.trainingRunsEndpointUri, { params});
  }

  /**
   * Sends http request to access training run with access token.
   * @param token access token to access the training run
   */
  access(token: string): Observable<AccessTrainingRunInfo> {
    const params = new HttpParams().append('accessToken', token);
    return this.http.post<AccessTrainingRunDTO>(this.trainingRunsEndpointUri, {}, {params})
      .pipe(
        map(response => AccessTrainingRunMapper.fromDTO(response)),
      );
  }

  /**
   * Sends http request to resume in training run
   * @param trainingRunId id of a training run to resume
   */
  resume(trainingRunId: number): Observable<AccessTrainingRunInfo> {
    return this.http.get<AccessTrainingRunDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/resumption`)
      .pipe(
        map(response => AccessTrainingRunMapper.fromDTO(response)),
      );
  }

  /**
   * Sends http request to move to next level
   * @param trainingRunId id of a training run
   */
  nextLevel(trainingRunId: number): Observable<Level> {
    return this.http.get<AbstractLevelDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/next-levels`)
      .pipe(
        map(response => LevelMapper.fromDTO(response)),
      );
  }

  /**
   * Sends http request to submit the flag from game level and check its valid
   * @param trainingRunId id of training run in which the flag should be submitted
   * @param flag a flag submitted by user
   */
  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck> {
    const params = new HttpParams().append('flag', flag);
    return this.http.get<IsCorrectFlagDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/is-correct-flag`, {params})
      .pipe(map(response => FlagMapper.fromDTO(response)));
  }

  /**
   * Sends http request to display hint and deduct points for it
   * @param trainingRunId id of training run in which, hint should be revealed
   * @param hintId id of requested hint
   */
  takeHint(trainingRunId: number, hintId: number): Observable<Hint> {
    return this.http.get<HintDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/hints/${hintId}`)
      .pipe(map(response => HintMapper.fromDTO(response)));
  }

  /**
   * Sends http request to display solution to a level
   * @param trainingRunId id of the training run in which, solution should be revealed
   */
  takeSolution(trainingRunId: number): Observable<string> {
    return this.http.get(`${this.trainingRunsEndpointUri}/${trainingRunId}/solutions`, {responseType: 'text' });
  }

  /**
   * Sends http request to submit user answers for questions in assessment level
   * @param trainingRunId id of the training run in which, questions should be submitted
   * @param questions questions which answers should be submitted
   */
  submitAnswers(trainingRunId: number, questions: Question[]): Observable<any> {
    return this.http.put(`${this.trainingRunsEndpointUri}/${trainingRunId}/assessment-evaluations`,
       QuestionMapper.toAnswersDTOs(questions));
  }

  /**
   * Sends http request to finish active training run
   * @param trainingRunId id of a training run which should be finished
   */
  finish(trainingRunId: number): Observable<any> {
    return this.http.put(`${this.trainingRunsEndpointUri}/${trainingRunId}`, null);
  }

}

