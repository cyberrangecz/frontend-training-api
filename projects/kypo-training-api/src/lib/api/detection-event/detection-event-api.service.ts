import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common';
import { AbstractDetectionEvent } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';

export abstract class DetectionEventApi {
  /**
   * Sends http request to retrieve all detection events from cheating detection
   * on specified page of a pagination
   * @param cheatingDetectionId id of the training instance
   * @param pagination requested pagination
   */
  abstract getAll(
    pagination: OffsetPaginationEvent,
    cheatingDetectionId: number
  ): Observable<PaginatedResource<AbstractDetectionEvent>>;

  /**
   * Sends http request to specific detection event by his id
   * @param trainingInstanceId training instance id
   * @param id id of the training instance
   */
  abstract get(trainingInstanceId: number, id: number): Observable<AbstractDetectionEvent>;

  /**
   * Sends http request to delete all detection events by training instance id
   * @param trainingInstanceId id of training instance
   */
  abstract deleteAllByTrainingInstanceId(trainingInstanceId: number): Observable<any>;

  /**
   * Sends http request to delete all detection events by cheating detection id
   * @param cheatingDetectionId id of cheating detection
   */
  abstract deleteAllByCheatingDetectionId(cheatingDetectionId: number): Observable<any>;
}
