import { PaginatedResource, RequestedPagination, SentinelFilter } from '@sentinel/common';
import {
  AssessmentLevel,
  GameLevel,
  InfoLevel,
  Level,
  TrainingDefinition,
  TrainingDefinitionInfo,
  TrainingDefinitionStateEnum,
} from '@kypo/training-model';
import { Observable } from 'rxjs';

export abstract class TrainingDefinitionApi {
  /**
   * Sends http request to retrieve all training definitions on specified page of a pagination
   * @param pagination requested pagination
   * @param filters filters to be applied on result
   */
  abstract getAll(
    pagination: RequestedPagination,
    filters?: SentinelFilter[]
  ): Observable<PaginatedResource<TrainingDefinition>>;

  /**
   * Sends http request to retrieve all training instances on specified page of a pagination for organizer (different access rights)
   * @param pagination requested pagination
   * @param filters filters to be applied on result
   */
  abstract getAllForOrganizer(
    pagination: RequestedPagination,
    filters?: SentinelFilter[]
  ): Observable<PaginatedResource<TrainingDefinitionInfo>>;

  /**
   * Sends http request to retrieve training definition by its id
   * @param id id of training definition
   * @param withLevels true if training definition should be mapped with levels, false otherwise
   */
  abstract get(id: number, withLevels?): Observable<TrainingDefinition>;

  /**
   * Sends http request to change state of a training definition
   * @param trainingDefinitionId id of a training definition which state should be changed
   * @param newState new state to be set
   */
  abstract changeState(trainingDefinitionId: number, newState: TrainingDefinitionStateEnum): Observable<any>;

  /**
   * Sends http request to retrieve level by id
   * @param levelId id of level which should be retrieved
   */
  abstract getLevel(levelId: number): Observable<Level>;

  /**
   * Sends request to download training definition json file.
   * @param id id of training definition which should be downloaded
   */
  abstract download(id: number): Observable<boolean>;

  /**
   * Sends http request to upload training definition json file,
   * Converts training definition file to a JSON object and sends it to provided url.
   * @param file json file to be uploaded
   */
  abstract upload(file: File): Observable<TrainingDefinition>;

  /**
   * Sends http request to delete training definition
   * @param id id of training definition which should be deleted
   */
  abstract delete(id: number): Observable<any>;

  /**
   * Sends http request to clone training definition
   * @param id id of training definition which should be cloned.
   * @param title title of new cloned training definition
   */
  abstract clone(id: number, title: string): Observable<number>;

  /**
   * Sends http request to update training definition
   * @param trainingDefinition training definition to update
   */
  abstract update(trainingDefinition: TrainingDefinition): Observable<number>;

  /**
   * Sends http request to create new training definition
   * @param trainingDefinition training definition which should be created
   */
  abstract create(trainingDefinition: TrainingDefinition): Observable<TrainingDefinition>;

  /**
   * Sends http request to create new assessment level associated with training definition
   * @param trainingDefinitionId id of training definition which should be associated with the new level
   */
  abstract createAssessmentLevel(trainingDefinitionId: number): Observable<AssessmentLevel>;

  /**
   * Sends http request to create new game level associated with training definition
   * @param trainingDefinitionId id of training definition which should be associated with the new level
   */
  abstract createGameLevel(trainingDefinitionId: number): Observable<GameLevel>;

  /**
   * Sends http request to create new info level associated with training definition
   * @param trainingDefId id of training definition which should be associated with the new level
   */
  abstract createInfoLevel(trainingDefId: number): Observable<InfoLevel>;

  /**
   * Sends http request to delete level
   * @param trainingDefinitionId id of training definition associated with the level which should be deleted
   * @param levelId id of level which should be deleted
   */
  abstract deleteLevel(trainingDefinitionId: number, levelId: number): Observable<Level[]>;

  /**
   * Sends http request to update game level
   * @param trainingDefinitionId id of training definition associated with the level
   * @param gameLevel game level which should be updated
   */
  abstract updateGameLevel(trainingDefinitionId: number, gameLevel: GameLevel);
  /**
   * Sends http request to update info level
   * @param trainingDefinitionId id of training definition associated with the level
   * @param infoLevel info level which should be updated
   */
  abstract updateInfoLevel(trainingDefinitionId: number, infoLevel: InfoLevel);
  /**
   * Sends http request to update assessment level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param assessmentLevel assessment level which should be updated
   */
  abstract updateAssessmentLevel(trainingDefId: number, assessmentLevel: AssessmentLevel);

  /**
   * Sends http request to move level to new position (change order)
   * @param trainingDefinitionId id of training definition associated with the level
   * @param levelId id of a level which should be moved
   * @param toPosition index of new position of a level
   */
  abstract moveLevelTo(trainingDefinitionId: number, levelId: number, toPosition: number): Observable<Level[]>;

  /**
   * Sends http request to swap level with another level
   * @param trainingDefinitionId id of training definition associated with the level
   * @param levelIdFrom id of a first level which should be swaped
   * @param levelIdTo id of a second level which should be swaped
   */
  abstract swapLevelWith(trainingDefinitionId: number, levelIdFrom: number, levelIdTo: number): Observable<Level[]>;

  /**
   * Sends http request to retrieve all training definitions with given sandbox definition id
   * @param sandboxDefId id of sandbox definition
   * @param pagination requested pagination
   * @param filters filters to be applied on result
   */
  abstract geTrainingDefinition(
    sandboxDefId: number,
    pagination: RequestedPagination,
    filters?: SentinelFilter[]
  ): Observable<PaginatedResource<TrainingDefinition>>;
}
