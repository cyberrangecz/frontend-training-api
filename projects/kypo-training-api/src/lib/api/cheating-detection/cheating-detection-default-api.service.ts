import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common';
import { CheatingDetection } from '@muni-kypo-crp/training-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KypoTrainingApiContext } from '../../other/kypo-training-api-context';
import { CheatingDetectionApi } from './cheating-detection-api.service';
import { PaginationParams } from '../../http/params/pagination-params';
import { PaginationMapper } from '../../mappers/pagination-mapper';
import { CheatingDetectionDTO } from '../../dto/cheating-detection/cheating-detection-dto';
import { CheatingDetectionMapper } from '../../mappers/cheating-detection/cheating-detection-mapper';
import { CheatingDetectionRestResource } from '../../dto/cheating-detection/cheating-detection-rest-resource';

/**
 * Default implementation of service abstracting http communication with training event endpoints.
 */
@Injectable()
export class CheatingDetectionDefaultApi extends CheatingDetectionApi {
  readonly cheatingDetectionsUriExtension = 'cheating-detections';

  readonly cheatingDetectionsEndpointUri: string;

  constructor(private http: HttpClient, private context: KypoTrainingApiContext) {
    super();
    this.cheatingDetectionsEndpointUri = this.context.config.trainingBasePath + this.cheatingDetectionsUriExtension;
  }

  /**
   * Sends http request to retrieve all cheating detections on specified page of a pagination
   * @param pagination requested pagination
   * @param trainingInstanceId the training instance id
   */
  getAll(
    pagination: OffsetPaginationEvent,
    trainingInstanceId: number
  ): Observable<PaginatedResource<CheatingDetection>> {
    const params = PaginationParams.forJavaAPI(pagination);
    return this.http
      .get<CheatingDetectionRestResource>(
        `${this.cheatingDetectionsEndpointUri}/${trainingInstanceId}/find-all-detections`,
        {
          params,
        }
      )
      .pipe(
        map(
          (response) =>
            new PaginatedResource<CheatingDetection>(
              CheatingDetectionMapper.fromDTOs(response.content),
              PaginationMapper.fromJavaAPI(response.pagination)
            )
        )
      );
  }

  /**
   * Sends http request to create and execute new cheating detection
   * @param cheatingDetection cheatingDetection
   */
  createAndExecute(cheatingDetection: CheatingDetection): Observable<any> {
    return this.http.post<CheatingDetectionDTO>(
      `${this.cheatingDetectionsEndpointUri}/create-detection`,
      CheatingDetectionMapper.toDTO(cheatingDetection)
    );
  }

  /**
   * Sends http request to rerun cheating detection
   * @param cheatingDetectionId id of cheating detection to run
   * @param trainingInstanceId id of training instance
   */
  rerun(cheatingDetectionId: number, trainingInstanceId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('trainingInstanceId', trainingInstanceId);
    return this.http.patch(`${this.cheatingDetectionsEndpointUri}/${cheatingDetectionId}/rerun`, {}, { params });
  }

  /**
   * Sends http request to delete cheating detection and its associated detection events
   * @param cheatingDetectionId id of cheating detection which cheats should be deleted
   * @param trainingInstanceId id of training instance
   */
  delete(cheatingDetectionId: number, trainingInstanceId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('trainingInstanceId', trainingInstanceId);
    return this.http.delete<any>(`${this.cheatingDetectionsEndpointUri}/${cheatingDetectionId}/delete`, { params });
  }

  /**
   * Sends http request to delete all cheating detections and its associated detection events
   * by training instance id
   * @param trainingInstanceId id of training instance
   */
  deleteAllByTrainingInstance(trainingInstanceId: number): Observable<any> {
    return this.http.delete<any>(`${this.cheatingDetectionsEndpointUri}/${trainingInstanceId}/deleteAll`, {});
  }
}
