import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KypoTrainingApiContext } from '../../other/kypo-training-api-context';
import { PaginationParams } from '../../http/params/pagination-params';
import { PaginationMapper } from '../../mappers/pagination-mapper';
import { DetectionEventApi } from './detection-event-api.service';
import { DetectionEventMapper } from '../../mappers/detection-event/detection-event-mapper';
import { DetectionEventDTO } from '../../dto/detection-event/detection-event-dto';
import { AbstractDetectionEvent } from '@muni-kypo-crp/training-model';
import { DetectionEventRestResource } from '../../dto/detection-event/detection-event-rest-resource';

@Injectable()
export class DetectionEventDefaultApi extends DetectionEventApi {
  readonly detectionEventsUriExtension = 'cheating-detection';

  readonly detectionEventsEndpointUri: string;

  constructor(private http: HttpClient, private context: KypoTrainingApiContext) {
    super();
    this.detectionEventsEndpointUri = this.context.config.trainingBasePath + this.detectionEventsUriExtension;
  }

  /**
   * Sends http request to retrieve all detection events from cheating detection
   * on specified page of a pagination
   * @param cheatingDetectionId id of the training instance
   * @param pagination requested pagination
   */
  getAll(
    pagination: OffsetPaginationEvent,
    cheatingDetectionId: number
  ): Observable<PaginatedResource<AbstractDetectionEvent>> {
    const params = PaginationParams.forJavaAPI(pagination);
    return this.http
      .get<DetectionEventRestResource>(`${this.detectionEventsEndpointUri}/${cheatingDetectionId}/find-all-events`, {
        params,
      })
      .pipe(
        map(
          (response) =>
            new PaginatedResource(
              DetectionEventMapper.fromDTOs(response.content),
              PaginationMapper.fromJavaAPI(response.pagination)
            )
        )
      );
  }

  /**
   * Sends http request to retrieve cheating detection by training instance id
   * @param trainingInstanceId training instance id
   * @param id id of the detection event
   */
  get(trainingInstanceId: number, id: number): Observable<AbstractDetectionEvent> {
    const params = new HttpParams().append('id', id.toString());
    return this.http
      .get<DetectionEventDTO>(`${this.detectionEventsEndpointUri}/${trainingInstanceId}`, { params })
      .pipe(map((response) => DetectionEventMapper.fromDTO(response)));
  }

  /**
   * Sends http request to delete all detection events by cheating detection id
   * @param cheatingDetectionId id of cheating detection
   * @param force true if delete should be forced, false otherwise
   */
  deleteAllByCheatingDetectionId(cheatingDetectionId: number): Observable<any> {
    return this.http.delete<any>(`${this.detectionEventsEndpointUri}/${cheatingDetectionId}/delete`, {});
  }

  /**
   * Sends http request to delete all detection events by training instance id
   * @param trainingInstanceId id of training instance
   */
  deleteAllByTrainingInstanceId(trainingInstanceId: number): Observable<any> {
    return this.http.delete<any>(`${this.detectionEventsEndpointUri}/${trainingInstanceId}/instance`, {});
  }
}
