import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseHeaderContentDispositionReader, SentinelParamsMerger } from '@sentinel/common';
import { SentinelFilter } from '@sentinel/common/filter';
import { OffsetPaginationEvent, PaginatedResource } from '@sentinel/common/pagination';
import { TrainingInstance, TrainingRun } from '@crczp/training-model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TrainingInstanceAssignPoolDTO } from '../../dto/training-instance/training-instance-assign-pool-dto';
import { TrainingInstanceDTO } from '../../dto/training-instance/training-instance-dto';
import { TrainingInstanceRestResource } from '../../dto/training-instance/training-instance-rest-resource';
import { TrainingRunRestResource } from '../../dto/training-run/training-run-rest-resource';
import { JSONErrorConverter } from '../../http/json-error-converter';
import { FilterParams } from '../../http/params/filter-params';
import { PaginationParams } from '../../http/params/pagination-params';
import { FileSaver } from '../../http/response-headers/file-saver';
import { PaginationMapper } from '../../mappers/pagination-mapper';
import { TrainingInstanceMapper } from '../../mappers/training-instance/training-instance-mapper';
import { TrainingRunMapper } from '../../mappers/training-run/training-run-mapper';
import { TrainingApiContext } from '../../other/training-api-context';
import { TrainingInstanceApi } from './training-instance-api.service';

/**
 * Default implementation of service abstracting http communication with training instance endpoints.
 */
@Injectable()
export class TrainingInstanceDefaultApi extends TrainingInstanceApi {
    readonly exportsUriExtension = 'exports';
    readonly trainingInstancesUriExtension = 'training-instances';
    readonly trainingRunsUriExtension = 'training-runs';
    readonly sandboxInstancesUriExtension = 'sandbox-instances';

    readonly trainingInstancesEndpointUri: string;
    readonly trainingExportsEndpointUri: string;

    constructor(
        private http: HttpClient,
        private context: TrainingApiContext,
    ) {
        super();
        this.trainingInstancesEndpointUri = this.context.config.trainingBasePath + this.trainingInstancesUriExtension;
        this.trainingExportsEndpointUri = this.context.config.trainingBasePath + this.exportsUriExtension;
    }

    /**
     * Sends http request to retrieve all training instances on specified page of a pagination
     * @param pagination requested pagination
     * @param filters filters to be applied on resources
     */
    getAll(
        pagination: OffsetPaginationEvent,
        filters: SentinelFilter[] = [],
    ): Observable<PaginatedResource<TrainingInstance>> {
        const params = SentinelParamsMerger.merge([
            PaginationParams.forJavaAPI(pagination),
            FilterParams.create(filters),
        ]);
        return this.http
            .get<TrainingInstanceRestResource>(this.trainingInstancesEndpointUri, { params })
            .pipe(
                map(
                    (response) =>
                        new PaginatedResource<TrainingInstance>(
                            TrainingInstanceMapper.fromDTOs(response.content),
                            PaginationMapper.fromJavaAPI(response.pagination),
                        ),
                ),
            );
    }

    /**
     * Sends http request to retrieves training instance by id
     * @param id id of the training instance
     */
    get(id: number): Observable<TrainingInstance> {
        return this.http
            .get<TrainingInstanceDTO>(`${this.trainingInstancesEndpointUri}/${id}`)
            .pipe(map((response) => TrainingInstanceMapper.fromDTO(response)));
    }

    /**
     * Sends http request to retrieve training access token by pool id
     * @param poolId id of the pool
     * @returns access token or null if not found
     */
    getTrainingAccessTokenByPoolId(poolId: number): Observable<string | null> {
        return this.http
            .get(`${this.trainingInstancesEndpointUri}/access/${poolId}`, {
                responseType: 'text',
            })
            .pipe(map((response) => response || null));
    }

    /**
     * Sends http request to retrieve all training runs associated with training instance
     * @param trainingInstanceId id of a training instance associated with training runs
     * @param pagination requested pagination
     * @param isActive true if active training runs should be retrieved, false if archived training runs should be retrieved
     */
    getAssociatedTrainingRuns(
        trainingInstanceId: number,
        pagination: OffsetPaginationEvent,
    ): Observable<PaginatedResource<TrainingRun>> {
        const params = PaginationParams.forJavaAPI(pagination);
        return this.http
            .get<TrainingRunRestResource>(
                `${this.trainingInstancesEndpointUri}/${trainingInstanceId}/${this.trainingRunsUriExtension}`,
                { params },
            )
            .pipe(
                map(
                    (response) =>
                        new PaginatedResource(
                            TrainingRunMapper.fromDTOs(response.content),
                            PaginationMapper.fromJavaAPI(response.pagination),
                        ),
                ),
            );
    }

    /**
     * Sends http request to create new training instance
     * @param trainingInstance training instance which should be created
     */
    create(trainingInstance: TrainingInstance): Observable<TrainingInstance> {
        return this.http
            .post<TrainingInstanceDTO>(
                this.trainingInstancesEndpointUri,
                TrainingInstanceMapper.toCreateDTO(trainingInstance),
            )
            .pipe(map((response) => TrainingInstanceMapper.fromDTO(response)));
    }

    /**
     * Sends http request to update training instance
     * @param trainingInstance training instance which should be updated
     */
    update(trainingInstance: TrainingInstance): Observable<string> {
        return this.http
            .put(this.trainingInstancesEndpointUri, TrainingInstanceMapper.toUpdateDTO(trainingInstance), {
                responseType: 'text',
            })
            .pipe(catchError((err) => JSONErrorConverter.fromText(err)));
    }

    /**
     * Sends http request to delete training instance
     * @param trainingInstanceId id of training instance which should be deleted
     * @param force true if delete should be forced, false otherwise
     */
    delete(trainingInstanceId: number, force = false): Observable<any> {
        const params = new HttpParams().append('forceDelete', force.toString());
        return this.http.delete<any>(`${this.trainingInstancesEndpointUri}/${trainingInstanceId}`, { params });
    }

    /**
     * Sends http request to archive (download) training instance
     * @param id id of training instance which should be archived
     */
    archive(id: number): Observable<boolean> {
        const headers = new HttpHeaders();
        headers.set('Accept', ['application/octet-stream']);
        return this.http
            .get(`${this.trainingExportsEndpointUri}/${this.trainingInstancesUriExtension}/${id}`, {
                responseType: 'blob',
                observe: 'response',
                headers,
            })
            .pipe(
                catchError((err) => JSONErrorConverter.fromBlob(err)),
                map((resp) => {
                    FileSaver.fromBlob(
                        resp.body,
                        ResponseHeaderContentDispositionReader.getFilenameFromResponse(
                            resp,
                            'archived-training-instance.zip',
                        ),
                    );
                    return true;
                }),
            );
    }

    assignPool(trainingInstanceId: number, poolId: number): Observable<any> {
        return this.http.patch(
            `${this.trainingInstancesEndpointUri}/${trainingInstanceId}/assign-pool`,
            new TrainingInstanceAssignPoolDTO(poolId),
        );
    }

    unassignPool(trainingInstanceId: number): Observable<any> {
        return this.http.patch(`${this.trainingInstancesEndpointUri}/${trainingInstanceId}/unassign-pool`, {});
    }

    exportScore(trainingInstanceId: number): Observable<boolean> {
        const headers = new HttpHeaders();
        headers.set('Accept', ['text/plain']);
        return this.http
            .get(
                `${this.trainingExportsEndpointUri}/${this.trainingInstancesUriExtension}/${trainingInstanceId}/scores`,
                {
                    responseType: 'blob',
                    observe: 'response',
                    headers,
                },
            )
            .pipe(
                catchError((err) => JSONErrorConverter.fromBlob(err)),
                map((resp) => {
                    FileSaver.fromBlob(
                        resp.body,
                        ResponseHeaderContentDispositionReader.getFilenameFromResponse(
                            resp,
                            'training-instance-scores.csv',
                        ),
                    );
                    return true;
                }),
            );
    }
}
