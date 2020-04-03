import {KypoFilter, KypoPaginatedResource, KypoRequestedPagination} from 'kypo-common';
import {Observable} from 'rxjs';
import {User} from 'kypo2-auth';

/**
 * Service abstracting http communication with user related endpoints.
 */
export abstract class UserApi {

  /**
   * Sends http request to retrieve organizers not associated with provided  training instance
   * @param trainingInstanceId id of a training instance not associated with retrieved organizers
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  abstract getOrganizersNotInTI(trainingInstanceId: number,
                                pagination: KypoRequestedPagination,
                                filters?: KypoFilter[]): Observable<KypoPaginatedResource<User>>;

  /**
   * Sends http request to retrieve designers not associated with provided training definition
   * @param trainingDefinitionId id of a training definition not associated with retrieved designers
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  abstract getDesignersNotInTD(trainingDefinitionId: number,
                               pagination: KypoRequestedPagination,
                               filters?: KypoFilter[]): Observable<KypoPaginatedResource<User>>;

  /**
   * Sends http request to retrieve authors of a training definition
   * @param trainingDefinitionId id of a training definition associated with retrieved authors
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  abstract getAuthors(trainingDefinitionId: number,
                      pagination: KypoRequestedPagination,
                      filters?: KypoFilter[]): Observable<KypoPaginatedResource<User>>;

  /**
   * Sends http request to retrieve organizers of a training instance
   * @param trainingInstanceId id of a training instance associated with retrieved organizers
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  abstract getOrganizers(trainingInstanceId: number,
                pagination: KypoRequestedPagination,
                filters?: KypoFilter[]): Observable<KypoPaginatedResource<User>>;


  /**
   * Sends http request to create and remove associations between training definition and designers
   * @param trainingDefinitionId id of training definition whose associations shall be altered
   * @param additions ids of designers which should become associated with training definition (become its authors)
   * @param removals  ids of designers which should stop being associated with training definition
   */
  abstract updateAuthors(trainingDefinitionId: number, additions: number[], removals: number[]): Observable<any>;

  /**
   * Sends http request to create and remove associations between training instance and organizers
   * @param trainingInstanceId id of training instance whose associations shall be altered
   * @param additions ids of organizers which should become associated with training instance
   * @param removals  ids of organizers which should stop being associated with training instance
   */
  abstract updateOrganizers(trainingInstanceId: number, additions: number[], removals: number[]): Observable<any>;
}
