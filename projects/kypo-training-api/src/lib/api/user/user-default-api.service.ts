import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {KypoRequestedPagination} from 'kypo-common';
import {KypoParamsMerger} from 'kypo-common';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoFilter} from 'kypo-common';
import {PaginationParams} from '../../http/params/pagination-params';
import {FilterParams} from '../../http/params/filter-params';
import {UserRestResource} from '../../dto/rest/user-rest-resource-dto';
import {UserMapper} from '../../mappers/user/user-mapper';
import {PaginationMapper} from '../../mappers/pagination-mapper';
import {KypoTrainingApiContext} from '../../other/kypo-training-api-context';
import {UserApi} from './user-api.service';
import {Designer, Organizer, TrainingUser} from 'kypo-training-model';

/**
 * Default implementation of service abstracting http communication with user related endpoints.
 */
@Injectable()
export class UserDefaultApi extends UserApi {
  readonly trainingDefinitionUriExtension = 'training-definitions';
  readonly trainingInstanceUrlExtension = 'training-instances';
  readonly trainingDefsEndpointUri: string;
  readonly trainingInstancesEndpointUri: string;

  constructor(private http: HttpClient,
              private context: KypoTrainingApiContext) {
    super();
    this.trainingDefsEndpointUri =  this.context.config.trainingBasePath + this.trainingDefinitionUriExtension;
    this.trainingInstancesEndpointUri = this.context.config.trainingBasePath + this.trainingInstanceUrlExtension;
  }

  /**
   * Sends http request to retrieve organizers not associated with provided  training instance
   * @param trainingInstanceId id of a training instance not associated with retrieved organizers
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  getOrganizersNotInTI(trainingInstanceId: number,
                       pagination: KypoRequestedPagination,
                       filters: KypoFilter[] = []): Observable<KypoPaginatedResource<Organizer>> {
    const params = KypoParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingInstancesEndpointUri}/${trainingInstanceId}/organizers-not-in-training-instance`,
      { params})
      .pipe(
        map(resp => this.paginatedUsersFromDTO(resp))
      );
  }

  /**
   * Sends http request to retrieve designers not associated with provided training definition
   * @param trainingDefinitionId id of a training definition not associated with retrieved designers
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  getDesignersNotInTD(trainingDefinitionId: number,
                      pagination: KypoRequestedPagination,
                      filters: KypoFilter[] = []): Observable<KypoPaginatedResource<Designer>> {
    const params = KypoParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingDefsEndpointUri}/${trainingDefinitionId}/designers-not-in-training-definition`,
      { params })
      .pipe(
        map(resp => this.paginatedUsersFromDTO(resp))
      );
  }

  /**
   * Sends http request to retrieve authors of a training definition
   * @param trainingDefinitionId id of a training definition associated with retrieved authors
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  getAuthors(trainingDefinitionId: number,
             pagination: KypoRequestedPagination,
             filters: KypoFilter[] = []): Observable<KypoPaginatedResource<Designer>> {
    const params = KypoParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingDefsEndpointUri}/${trainingDefinitionId}/authors`,
      { params})
      .pipe(
        map(resp => this.paginatedUsersFromDTO(resp))
      );
  }

  /**
   * Sends http request to retrieve organizers of a training instance
   * @param trainingInstanceId id of a training instance associated with retrieved organizers
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  getOrganizers(trainingInstanceId: number,
                pagination: KypoRequestedPagination,
                filters: KypoFilter[] = []): Observable<KypoPaginatedResource<Organizer>> {
    const params = KypoParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingInstancesEndpointUri}/${trainingInstanceId}/organizers`,
      { params })
      .pipe(
        map(resp => this.paginatedUsersFromDTO(resp))
      );
  }

  private paginatedUsersFromDTO(dto: UserRestResource): KypoPaginatedResource<TrainingUser> {
    return new KypoPaginatedResource<TrainingUser>(
      UserMapper.fromDTOs(dto.content),
      PaginationMapper.fromJavaAPI(dto.pagination)
    );
  }

  /**
   * Sends http request to create and remove associations between training definition and designers
   * @param trainingDefinitionId id of training definition whose associations shall be altered
   * @param additions ids of designers which should become associated with training definition (become its authors)
   * @param removals  ids of designers which should stop being associated with training definition
   */
  updateAuthors(trainingDefinitionId: number, additions: number[], removals: number[]): Observable<any> {
    return this.http.put(`${this.trainingDefsEndpointUri}/${trainingDefinitionId}/authors`, {}, {
      params: new HttpParams()
        .set('authorsAddition', additions.toString())
        .set('authorsRemoval', removals.toString())
    });
  }

  /**
   * Sends http request to create and remove associations between training instance and organizers
   * @param trainingInstanceId id of training instance whose associations shall be altered
   * @param additions ids of organizers which should become associated with training instance
   * @param removals  ids of organizers which should stop being associated with training instance
   */
  updateOrganizers(trainingInstanceId: number, additions: number[], removals: number[]): Observable<any> {
    return this.http.put(`${this.trainingInstancesEndpointUri}/${trainingInstanceId}/organizers`, {}, {
      params: new HttpParams()
        .set('organizersAddition', additions.toString())
        .set('organizersRemoval', removals.toString())
    });
  }
}
