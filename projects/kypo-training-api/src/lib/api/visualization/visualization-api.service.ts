import { SentinelFilter, PaginatedResource, RequestedPagination } from '@sentinel/common';
import { Trainee, TrainingUser } from 'kypo-training-model';
import { VisualizationInfo } from 'kypo-training-model';
import { Observable } from 'rxjs';

/**
 * Service abstracting http communication with visualization related endpoints.
 */
export abstract class VisualizationApi {
  /**
   * Sends http request to retrieve visualization info for training instance
   * @param trainingInstanceId id of a training instance associated with retrieved visualization info
   */
  abstract getInfo(trainingInstanceId: number): Observable<VisualizationInfo>;

  /**
   * Sends http request to retrieve participants for training instance
   * @param trainingInstanceId id of a training instance associated with retrieved participants
   */
  abstract getParticipants(trainingInstanceId: number): Observable<Trainee[]>;

  /**
   * Sends http request to retrieve visualization info for training run
   * @param trainingRunId id of a training run associated with retrieved visualization info
   */
  abstract getTrainingRunInfo(trainingRunId: number): Observable<VisualizationInfo>;

  /**
   * Sends http request to retrieve users by their ids
   * @param usersIds ids of users to get
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  abstract getUsers(
    usersIds: number[],
    pagination: RequestedPagination,
    filters?: SentinelFilter[]
  ): Observable<PaginatedResource<TrainingUser>>;
}
