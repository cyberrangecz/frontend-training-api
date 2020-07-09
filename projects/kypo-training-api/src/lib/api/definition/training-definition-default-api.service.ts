import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ResponseHeaderContentDispositionReader,
  SentinelFilter,
  SentinelParamsMerger,
  RequestedPagination,
  PaginatedResource,
} from '@sentinel/common';
import { GameLevel } from 'kypo-training-model';
import { InfoLevel } from 'kypo-training-model';
import { TrainingDefinitionStateEnum } from 'kypo-training-model';
import { AssessmentLevel } from 'kypo-training-model';
import { TrainingDefinitionInfo } from 'kypo-training-model';
import { Level } from 'kypo-training-model';
import { TrainingDefinition } from 'kypo-training-model';
import { fromEvent, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AssessmentLevelDTO } from '../../dto/level/assessment/assessment-level-dto';
import { BasicLevelInfoDTO } from '../../dto/level/basic-level-info-dto';
import { GameLevelDTO } from '../../dto/level/game/game-level-dto';
import { InfoLevelDTO } from '../../dto/level/info/info-level-dto';
import { TrainingDefinitionDTO } from '../../dto/training-definition/training-definition-dto';
import { TrainingDefinitionInfoRestResource } from '../../dto/training-definition/training-definition-info-rest-resource';
import { TrainingDefinitionRestResource } from '../../dto/training-definition/training-definition-rest-resource';
import { JSONErrorConverter } from '../../http/json-error-converter';
import { FilterParams } from '../../http/params/filter-params';
import { PaginationParams } from '../../http/params/pagination-params';
import { FileSaver } from '../../http/response-headers/file-saver';
import { AssessmentLevelMapper } from '../../mappers/level/assessment/assessment-level-mapper';
import { GameLevelMapper } from '../../mappers/level/game/game-level-mapper';
import { InfoLevelMapper } from '../../mappers/level/info/info-level-mapper';
import { LevelMapper } from '../../mappers/level/level-mapper';
import { PaginationMapper } from '../../mappers/pagination-mapper';
import { TrainingDefinitionInfoMapper } from '../../mappers/training-definition/training-definition-info-mapper';
import { TrainingDefinitionMapper } from '../../mappers/training-definition/training-definition-mapper';
import { KypoTrainingApiContext } from '../../other/kypo-training-api-context';
import { TrainingDefinitionApi } from './training-definition-api.service';

/**
 * Service abstracting http communication with training definition endpoints.
 */
@Injectable()
export class TrainingDefinitionDefaultApi extends TrainingDefinitionApi {
  readonly trainingDefinitionUriExtension = 'training-definitions';
  readonly exportsUriExtension = 'exports';
  readonly importsUriExtension = 'imports';
  readonly levelsUriExtension = 'levels';
  readonly sandboxDefUriExtension = 'sandbox-definitions';

  readonly trainingDefsEndpointUri: string;
  readonly trainingExportEndpointUri: string;
  readonly trainingImportEndpointUri: string;

  constructor(private http: HttpClient, private context: KypoTrainingApiContext) {
    super();
    this.trainingDefsEndpointUri = this.context.config.trainingBasePath + this.trainingDefinitionUriExtension;
    this.trainingExportEndpointUri = this.context.config.trainingBasePath + this.exportsUriExtension;
    this.trainingImportEndpointUri = this.context.config.trainingBasePath + this.importsUriExtension;
  }

  /**
   * Sends http request to retrieve all training definitions on specified page of a pagination
   * @param pagination requested pagination
   * @param filters filters to be applied on result
   */
  getAll(
    pagination: RequestedPagination,
    filters: SentinelFilter[] = []
  ): Observable<PaginatedResource<TrainingDefinition>> {
    const params = SentinelParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http
      .get<TrainingDefinitionRestResource>(this.trainingDefsEndpointUri, { params })
      .pipe(
        map(
          (response) =>
            new PaginatedResource(
              TrainingDefinitionMapper.fromDTOs(response.content, false),
              PaginationMapper.fromJavaAPI(response.pagination)
            )
        )
      );
  }

  /**
   * Sends http request to retrieve all training instances on specified page of a pagination for organizer (different access rights)
   * @param pagination requested pagination
   * @param filters filters to be applied on result
   */
  getAllForOrganizer(
    pagination: RequestedPagination,
    filters: SentinelFilter[] = []
  ): Observable<PaginatedResource<TrainingDefinitionInfo>> {
    const params = SentinelParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http
      .get<TrainingDefinitionInfoRestResource>(`${this.trainingDefsEndpointUri}/for-organizers`, { params })
      .pipe(
        map(
          (response) =>
            new PaginatedResource(
              TrainingDefinitionInfoMapper.fromDTOs(response.content),
              PaginationMapper.fromJavaAPI(response.pagination)
            )
        )
      );
  }

  /**
   * Sends http request to retrieve training definition by its id
   * @param id id of training definition
   * @param withLevels true if training definition should be mapped with levels, false otherwise
   */
  get(id: number, withLevels = false): Observable<TrainingDefinition> {
    return this.http
      .get<TrainingDefinitionDTO>(`${this.trainingDefsEndpointUri}/${id}`)
      .pipe(map((response) => TrainingDefinitionMapper.fromDTO(response, withLevels)));
  }

  /**
   * Sends http request to change state of a training definition
   * @param trainingDefinitionId id of a training definition which state should be changed
   * @param newState new state to be set
   */
  changeState(trainingDefinitionId: number, newState: TrainingDefinitionStateEnum): Observable<any> {
    return this.http.put(
      `${this.trainingDefsEndpointUri}/${trainingDefinitionId}/states/${TrainingDefinitionMapper.stateToDTO(newState)}`,
      {}
    );
  }

  /**
   * Sends http request to retrieve level by id
   * @param levelId id of level which should be retrieved
   */
  getLevel(levelId: number): Observable<Level> {
    return this.http
      .get<GameLevelDTO | InfoLevelDTO | AssessmentLevelDTO>(
        `${this.trainingDefsEndpointUri}/${this.levelsUriExtension}/${levelId}`
      )
      .pipe(map((response) => LevelMapper.fromDTO(response)));
  }

  /**
   * Sends request to download training definition json file.
   * @param id id of training definition which should be downloaded
   */
  download(id: number): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.set('Accept', ['application/octet-stream']);

    return this.http
      .get(`${this.trainingExportEndpointUri}/${this.trainingDefinitionUriExtension}/${id}`, {
        responseType: 'blob',
        observe: 'response',
        headers,
      })
      .pipe(
        catchError((err) => JSONErrorConverter.fromBlob(err)),
        map((resp) => {
          FileSaver.fromBlob(
            resp.body,
            ResponseHeaderContentDispositionReader.getFilenameFromResponse(resp, 'training-definition.json')
          );
          return true;
        })
      );
  }

  /**
   * Sends http request to upload training definition json file,
   * Converts training definition file to a JSON object and sends it to provided url.
   * @param file json file to be uploaded
   */
  upload(file: File): Observable<TrainingDefinition> {
    const fileReader = new FileReader();
    const fileRead$ = fromEvent(fileReader, 'load').pipe(
      mergeMap((_) => {
        const jsonBody = JSON.parse(fileReader.result as string);
        return this.http.post<TrainingDefinitionDTO>(
          `${this.trainingImportEndpointUri}/${this.trainingDefinitionUriExtension}`,
          jsonBody
        );
      })
    );
    fileReader.readAsText(file);
    return fileRead$.pipe(map((resp) => TrainingDefinitionMapper.fromDTO(resp, false)));
  }

  /**
   * Sends http request to delete training definition
   * @param id id of training definition which should be deleted
   */
  delete(id: number) {
    return this.http.delete(`${this.trainingDefsEndpointUri}/${id}`, { headers: this.createDefaultHeaders() });
  }

  /**
   * Sends http request to clone training definition
   * @param id id of training definition which should be cloned.
   * @param title title of new cloned training definition
   */
  clone(id: number, title: string): Observable<number> {
    let params = new HttpParams();
    params = params.append('title', title);
    return this.http.post<number>(
      `${this.trainingDefsEndpointUri}/${id}`,
      {},
      {
        params,
        headers: this.createDefaultHeaders(),
      }
    );
  }

  /**
   * Sends http request to update training definition
   * @param trainingDefinition training definition to update
   */
  update(trainingDefinition: TrainingDefinition): Observable<number> {
    return this.http.put<number>(
      this.trainingDefsEndpointUri,
      TrainingDefinitionMapper.toUpdateDTO(trainingDefinition),
      { headers: this.createDefaultHeaders() }
    );
  }

  /**
   * Sends http request to create new training definition
   * @param trainingDefinition training definition which should be created
   */
  create(trainingDefinition: TrainingDefinition): Observable<TrainingDefinition> {
    return this.http
      .post<TrainingDefinitionDTO>(
        this.trainingDefsEndpointUri,
        TrainingDefinitionMapper.toCreateDTO(trainingDefinition),
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => TrainingDefinitionMapper.fromDTO(resp, false)));
  }

  /**
   * Sends http request to create new assessment level associated with training definition
   * @param trainingDefinitionId id of training definition which should be associated with the new level
   */
  createAssessmentLevel(trainingDefinitionId: number): Observable<AssessmentLevel> {
    return this.http
      .post<BasicLevelInfoDTO>(
        `${this.trainingDefsEndpointUri}/${trainingDefinitionId}/${this.levelsUriExtension}/ASSESSMENT`,
        {},
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => LevelMapper.fromBasicDTO(resp) as AssessmentLevel));
  }

  /**
   * Sends http request to create new game level associated with training definition
   * @param trainingDefinitionId id of training definition which should be associated with the new level
   */
  createGameLevel(trainingDefinitionId: number): Observable<GameLevel> {
    return this.http
      .post<BasicLevelInfoDTO>(
        `${this.trainingDefsEndpointUri}/${trainingDefinitionId}/${this.levelsUriExtension}/GAME`,
        {},
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => LevelMapper.fromBasicDTO(resp) as GameLevel));
  }

  /**
   * Sends http request to create new info level associated with training definition
   * @param trainingDefId id of training definition which should be associated with the new level
   */
  createInfoLevel(trainingDefId: number): Observable<InfoLevel> {
    return this.http
      .post<BasicLevelInfoDTO>(
        `${this.trainingDefsEndpointUri}/${trainingDefId}/${this.levelsUriExtension}/INFO`,
        {},
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => LevelMapper.fromBasicDTO(resp) as InfoLevel));
  }

  /**
   * Sends http request to delete level
   * @param trainingDefinitionId id of training definition associated with the level which should be deleted
   * @param levelId id of level which should be deleted
   */
  deleteLevel(trainingDefinitionId: number, levelId: number): Observable<Level[]> {
    return this.http
      .delete<BasicLevelInfoDTO[]>(
        `${this.trainingDefsEndpointUri}/${trainingDefinitionId}/${this.levelsUriExtension}/${levelId}`,
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => LevelMapper.fromBasicDTOs(resp)));
  }

  /**
   * Sends http request to update game level
   * @param trainingDefinitionId id of training definition associated with the level
   * @param gameLevel game level which should be updated
   */
  updateGameLevel(trainingDefinitionId: number, gameLevel: GameLevel) {
    return this.http.put(
      `${this.trainingDefsEndpointUri}/${trainingDefinitionId}/game-levels`,
      GameLevelMapper.toUpdateDTO(gameLevel),
      { headers: this.createDefaultHeaders() }
    );
  }

  /**
   * Sends http request to update info level
   * @param trainingDefinitionId id of training definition associated with the level
   * @param infoLevel info level which should be updated
   */
  updateInfoLevel(trainingDefinitionId: number, infoLevel: InfoLevel) {
    return this.http.put(
      `${this.trainingDefsEndpointUri}/${trainingDefinitionId}/info-levels`,
      InfoLevelMapper.toUpdateDTO(infoLevel),
      { headers: this.createDefaultHeaders() }
    );
  }

  /**
   * Sends http request to update assessment level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param assessmentLevel assessment level which should be updated
   */
  updateAssessmentLevel(trainingDefId: number, assessmentLevel: AssessmentLevel) {
    return this.http.put(
      `${this.trainingDefsEndpointUri}/${trainingDefId}/assessment-levels`,
      AssessmentLevelMapper.toUpdateDTO(assessmentLevel),
      { headers: this.createDefaultHeaders() }
    );
  }

  /**
   * Sends http request to move level to new position (change order)
   * @param trainingDefinitionId id of training definition associated with the level
   * @param levelId id of a level which should be moved
   * @param toPosition index of new position of a level
   */
  moveLevelTo(trainingDefinitionId: number, levelId: number, toPosition: number): Observable<Level[]> {
    return this.http
      .put<BasicLevelInfoDTO[]>(
        `${this.trainingDefsEndpointUri}/${trainingDefinitionId}/${this.levelsUriExtension}/${levelId}/move-to/${toPosition}`,
        {},
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => LevelMapper.fromBasicDTOs(resp)));
  }

  /**
   * Sends http request to swap level with another level
   * @param trainingDefinitionId id of training definition associated with the level
   * @param levelIdFrom id of a first level which should be swaped
   * @param levelIdTo id of a second level which should be swaped
   */
  swapLevelWith(trainingDefinitionId: number, levelIdFrom: number, levelIdTo: number): Observable<Level[]> {
    return this.http
      .put<BasicLevelInfoDTO[]>(
        `${this.trainingDefsEndpointUri}/${trainingDefinitionId}/${this.levelsUriExtension}/${levelIdFrom}/swap-with/${levelIdTo}`,
        {},
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => LevelMapper.fromBasicDTOs(resp)));
  }

  /**
   * Sends http request to retrieve all training definitions with given sandbox definition id
   * @param sandboxDefId id of sandbox definition
   * @param pagination requested pagination
   * @param filters filters to be applied on result
   */
  geTrainingDefinition(
    sandboxDefId: number,
    pagination: RequestedPagination,
    filters: SentinelFilter[] = []
  ): Observable<PaginatedResource<TrainingDefinition>> {
    const params = SentinelParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http
      .get<TrainingDefinitionRestResource>(
        `${this.trainingDefsEndpointUri}/${this.sandboxDefUriExtension}/${sandboxDefId}`,
        { params }
      )
      .pipe(
        map(
          (response) =>
            new PaginatedResource(
              TrainingDefinitionMapper.fromDTOs(response.content, false),
              PaginationMapper.fromJavaAPI(response.pagination)
            )
        )
      );
  }

  private createDefaultHeaders() {
    const httpHeaderAccepts: string[] = ['*/*', 'application/json'];
    const headers = new HttpHeaders();
    headers.set('Accept', httpHeaderAccepts);
    return headers;
  }
}
