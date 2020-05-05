import { KypoFilter, KypoPaginatedResource, KypoRequestedPagination } from 'kypo-common';
import {
  AccessedTrainingRun,
  AccessTrainingRunInfo,
  FlagCheck,
  Hint,
  Level,
  Question,
  TrainingRun,
} from 'kypo-training-model';
import { Observable } from 'rxjs/internal/Observable';

export abstract class TrainingRunApi {
  /**
   * Sends http request to retrieve all training runs on specified page of a pagination
   * @param pagination requested pagination
   * @param filters filters to be applied on resources
   */
  abstract getAll(
    pagination: KypoRequestedPagination,
    filters?: KypoFilter[]
  ): Observable<KypoPaginatedResource<TrainingRun>>;

  /**
   * Sends http request to retrieve training run by id
   * @param id id of training run which should be retrieved
   */
  abstract get(id: number): Observable<TrainingRun>;

  /**
   * Sends http request to retrieve training run already accessed by logged in user
   * @param pagination requested pagination
   */
  abstract getAccessed(pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<AccessedTrainingRun>>;

  /**
   * Sends http request to delete training run
   * @param trainingRunId id of a training run which should be deleted
   * @param force true if delete should be forced, false otherwise
   */
  abstract delete(trainingRunId: number, force?: boolean): Observable<any>;

  /**
   * Sends http request to delete training runs in batch
   * @param trainingRunIds ids of training runs which should be deleted
   * @param force true if delete should be forced, false otherwise
   */
  abstract deleteMultiple(trainingRunIds: number[], force?: boolean): Observable<any>;

  /**
   * Sends http request to access training run with access token.
   * @param token access token to access the training run
   */
  abstract access(token: string): Observable<AccessTrainingRunInfo>;

  /**
   * Sends http request to resume in training run
   * @param trainingRunId id of a training run to resume
   */
  abstract resume(trainingRunId: number): Observable<AccessTrainingRunInfo>;

  /**
   * Sends http request to move to next level
   * @param trainingRunId id of a training run
   */
  abstract nextLevel(trainingRunId: number): Observable<Level>;

  /**
   * Sends http request to submit the flag from game level and check its valid
   * @param trainingRunId id of training run in which the flag should be submitted
   * @param flag a flag submitted by user
   */
  abstract isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck>;

  /**
   * Sends http request to display hint and deduct points for it
   * @param trainingRunId id of training run in which, hint should be revealed
   * @param hintId id of requested hint
   */
  abstract takeHint(trainingRunId: number, hintId: number): Observable<Hint>;

  /**
   * Sends http request to display solution to a level
   * @param trainingRunId id of the training run in which, solution should be revealed
   */
  abstract takeSolution(trainingRunId: number): Observable<string>;
  /**
   * Sends http request to submit user answers for questions in assessment level
   * @param trainingRunId id of the training run in which, questions should be submitted
   * @param questions questions which answers should be submitted
   */
  abstract submitAnswers(trainingRunId: number, questions: Question[]): Observable<any>;

  /**
   * Sends http request to finish active training run
   * @param trainingRunId id of a training run which should be finished
   */
  abstract finish(trainingRunId: number): Observable<any>;

  /**
   * Sends http request to archive training run
   * @param trainingRunId id of a training run which should be archived
   */
  abstract archive(trainingRunId: number): Observable<any>;
}
