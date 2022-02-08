import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { AdaptiveDefinitionApiService } from './adaptive-definition-api.service';
import {
  InfoPhase,
  Phase,
  QuestionnairePhase,
  Task,
  TrainingDefinition,
  TrainingDefinitionInfo,
  TrainingDefinitionStateEnum,
  TrainingPhase,
} from '@muni-kypo-crp/training-model';
import { InfoPhaseDTO } from '../../dto/phase/info-phase/info-phase-dto';
import { PhaseMapper } from '../../mappers/phase/phase-mapper';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TrainingPhaseDTO } from '../../dto/phase/training-phase/training-phase-dto';
import { QuestionnairePhaseDTO } from '../../dto/phase/questionnaire-phase/questionnaire-phase-dto';
import { TrainingPhaseMapper } from '../../mappers/phase/training-phase-mapper';
import { QuestionnairePhaseMapper } from '../../mappers/phase/questionnaire-phase-mapper';
import { InfoPhaseMapper } from '../../mappers/phase/info-phase-mapper';
import { TaskDTO } from '../../dto/phase/training-phase/task-dto';
import { TaskMapper } from '../../mappers/phase/task-mapper';
import {
  PaginatedResource,
  OffsetPaginationEvent,
  ResponseHeaderContentDispositionReader,
  SentinelFilter,
  SentinelParamsMerger,
} from '@sentinel/common';
import { KypoTrainingApiContext } from '../../other/kypo-training-api-context';
import { TrainingDefinitionMapper } from '../../mappers/training-definition/training-definition-mapper';
import { TrainingDefinitionDTO } from '../../dto/training-definition/training-definition-dto';
import { JSONErrorConverter } from '../../http/json-error-converter';
import { FileSaver } from '../../http/response-headers/file-saver';
import { PaginationParams } from '../../http/params/pagination-params';
import { FilterParams } from '../../http/params/filter-params';
import { TrainingDefinitionRestResource } from '../../dto/training-definition/training-definition-rest-resource';
import { PaginationMapper } from '../../mappers/pagination-mapper';
import { TrainingDefinitionInfoRestResource } from '../../dto/training-definition/training-definition-info-rest-resource';
import { TrainingDefinitionInfoMapper } from '../../mappers/training-definition/training-definition-info-mapper';

@Injectable()
export class AdaptiveDefinitionDefaultApiService extends AdaptiveDefinitionApiService {
  readonly trainingDefinitionUriExtension = 'training-definitions';
  readonly phasesUriExtension = 'phases';
  readonly tasksUriExtension = 'tasks';
  readonly exportsUriExtension = 'exports';
  readonly importsUriExtension = 'imports';

  readonly adaptiveDefinitionsUri: string;
  readonly trainingExportEndpointUri: string;
  readonly trainingImportEndpointUri: string;

  constructor(private http: HttpClient, private context: KypoTrainingApiContext) {
    super();
    this.adaptiveDefinitionsUri = this.context.config.adaptiveBasePath + this.trainingDefinitionUriExtension;
    this.trainingExportEndpointUri = this.context.config.adaptiveBasePath + this.exportsUriExtension;
    this.trainingImportEndpointUri = this.context.config.adaptiveBasePath + this.importsUriExtension;
  }

  changeState(trainingDefinitionId: number, newState: TrainingDefinitionStateEnum): Observable<any> {
    return this.http.put(
      `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/states/${TrainingDefinitionMapper.stateToDTO(newState)}`,
      {}
    );
  }

  clone(id: number, title: string): Observable<number> {
    let params = new HttpParams();
    params = params.append('title', title);
    return this.http.post<number>(
      `${this.adaptiveDefinitionsUri}/${id}`,
      {},
      {
        params,
        headers: this.createDefaultHeaders(),
      }
    );
  }

  create(trainingDefinition: TrainingDefinition): Observable<TrainingDefinition> {
    return this.http
      .post<TrainingDefinitionDTO>(
        this.adaptiveDefinitionsUri,
        TrainingDefinitionMapper.toCreateDTO(trainingDefinition),
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => TrainingDefinitionMapper.fromDTO(resp, false)));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.adaptiveDefinitionsUri}/${id}`, { headers: this.createDefaultHeaders() });
  }

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

  get(id: number, withPhases = false): Observable<TrainingDefinition> {
    return this.http
      .get<TrainingDefinitionDTO>(`${this.adaptiveDefinitionsUri}/${id}`)
      .pipe(map((response) => TrainingDefinitionMapper.fromDTO(response, false, withPhases)));
  }

  getAll(
    pagination: OffsetPaginationEvent,
    filters?: SentinelFilter[]
  ): Observable<PaginatedResource<TrainingDefinition>> {
    const params = SentinelParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http
      .get<TrainingDefinitionRestResource>(this.adaptiveDefinitionsUri, { params })
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

  getAllForOrganizer(
    pagination: OffsetPaginationEvent,
    filters?: SentinelFilter[]
  ): Observable<PaginatedResource<TrainingDefinitionInfo>> {
    const params = SentinelParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http
      .get<TrainingDefinitionInfoRestResource>(`${this.adaptiveDefinitionsUri}/for-organizers`, { params })
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

  update(trainingDefinition: TrainingDefinition): Observable<number> {
    return this.http.put<number>(
      this.adaptiveDefinitionsUri,
      TrainingDefinitionMapper.toUpdateDTO(trainingDefinition),
      { headers: this.createDefaultHeaders() }
    );
  }

  upload(file: File): Observable<TrainingDefinition> {
    const fileReader = new FileReader();
    const fileRead$ = fromEvent(fileReader, 'load').pipe(
      mergeMap(() => {
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

  createInfoPhase(trainingDefinitionId: number): Observable<InfoPhase> {
    return this.http
      .post<InfoPhaseDTO>(
        `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}`,
        { phase_type: 'INFO' },
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => PhaseMapper.fromDTO(resp) as InfoPhase));
  }

  createTrainingPhase(trainingDefinitionId: number): Observable<TrainingPhase> {
    return this.http
      .post<TrainingPhaseDTO>(
        `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}`,
        { phase_type: 'TRAINING' },
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => PhaseMapper.fromDTO(resp) as TrainingPhase));
  }

  createAdaptiveQuestionnairePhase(trainingDefinitionId: number): Observable<QuestionnairePhase> {
    return this.http
      .post<QuestionnairePhaseDTO>(
        `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}`,
        { phase_type: 'QUESTIONNAIRE', questionnaire_type: 'ADAPTIVE' },
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => PhaseMapper.fromDTO(resp) as QuestionnairePhase));
  }

  createGeneralQuestionnairePhase(trainingDefinitionId: number): Observable<QuestionnairePhase> {
    return this.http
      .post<QuestionnairePhaseDTO>(
        `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}`,
        { phase_type: 'QUESTIONNAIRE', questionnaire_type: 'GENERAL' },
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => PhaseMapper.fromDTO(resp) as QuestionnairePhase));
  }

  getPhase(trainingDefinitionId: number, phaseId: number): Observable<Phase> {
    return this.http
      .get<InfoPhaseDTO | TrainingPhaseDTO | QuestionnairePhaseDTO>(
        `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${phaseId}`
      )
      .pipe(map((response) => PhaseMapper.fromDTO(response)));
  }

  deletePhase(trainingDefinitionId: number, phaseId: number): Observable<any> {
    return this.http.delete(
      `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${phaseId}`,
      { headers: this.createDefaultHeaders() }
    );
  }

  updatePhases(trainingDefinitionId: number, phases: Phase[]): Observable<any> {
    return this.http.put(
      `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}`,
      PhaseMapper.toUpdateDTOs(phases),
      { headers: this.createDefaultHeaders() }
    );
  }

  updateTrainingPhase(trainingDefinitionId: number, trainingPhase: TrainingPhase): Observable<any> {
    return this.http.put(
      `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${trainingPhase.id}/training`,
      TrainingPhaseMapper.toUpdateDTO(trainingPhase),
      { headers: this.createDefaultHeaders() }
    );
  }

  updateQuestionnairePhase(
    trainingDefinitionId: number,
    questionnairePhase: QuestionnairePhase
  ): Observable<QuestionnairePhase> {
    return this.http
      .put<QuestionnairePhaseDTO>(
        `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${questionnairePhase.id}/questionnaire`,
        QuestionnairePhaseMapper.mapQuestionnaireToUpdateDTO(questionnairePhase),
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((response) => PhaseMapper.fromDTO(response) as QuestionnairePhase));
  }

  updateInfoPhase(trainingDefinitionId: number, infoPhase: InfoPhase): Observable<any> {
    return this.http.put(
      `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${infoPhase.id}/info`,
      InfoPhaseMapper.toUpdateDTO(infoPhase),
      { headers: this.createDefaultHeaders() }
    );
  }

  movePhaseTo(trainingDefinitionId: number, phaseId: number, newPosition: number): Observable<any> {
    return this.http.put<void>(
      `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${phaseId}/move-to/${newPosition}`,
      {},
      { headers: this.createDefaultHeaders() }
    );
  }

  moveTaskTo(trainingDefinitionId: number, phaseId: number, taskId: number, newPosition: number): Observable<any> {
    return this.http.put<void>(
      // eslint-disable-next-line max-len
      `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${phaseId}/${this.tasksUriExtension}/${taskId}/move-to/${newPosition}`,
      {},
      { headers: this.createDefaultHeaders() }
    );
  }

  createTask(trainingDefinitionId: number, trainingPhaseId: number): Observable<Task> {
    return this.http
      .post<TaskDTO>(
        // eslint-disable-next-line max-len
        `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${trainingPhaseId}/${this.tasksUriExtension}`,
        {},
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => TaskMapper.fromDTO(resp) as Task));
  }

  cloneTask(trainingDefinitionId: number, trainingPhaseId: number, clonedTask: Task): Observable<Task> {
    return this.http
      .post<TaskDTO>(
        // eslint-disable-next-line max-len
        `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${trainingPhaseId}/${this.tasksUriExtension}/${clonedTask.id}`,
        TaskMapper.toCopyDTO(clonedTask),
        { headers: this.createDefaultHeaders() }
      )
      .pipe(map((resp) => TaskMapper.fromDTO(resp) as Task));
  }

  deleteTask(trainingDefinitionId: number, trainingPhaseId: number, taskId: number): Observable<any> {
    return this.http.delete(
      // eslint-disable-next-line max-len
      `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${trainingPhaseId}/${this.tasksUriExtension}/${taskId}`,
      { headers: this.createDefaultHeaders() }
    );
  }

  getTask(trainingDefinitionId: number, trainingPhaseId: number, taskId: number): Observable<Phase> {
    return this.http
      .get<TaskDTO>(
        // eslint-disable-next-line max-len
        `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${trainingPhaseId}/${this.tasksUriExtension}/${taskId}`
      )
      .pipe(map((response) => TaskMapper.fromDTO(response)));
  }

  updateTask(trainingDefinitionId: number, trainingPhaseId: number, task: Task): Observable<any> {
    return this.http.put(
      `${this.adaptiveDefinitionsUri}/${trainingDefinitionId}/${this.phasesUriExtension}/${trainingPhaseId}/tasks/${task.id}`,
      TaskMapper.toUpdateDTO(task),
      { headers: this.createDefaultHeaders() }
    );
  }

  private createDefaultHeaders(): HttpHeaders {
    const httpHeaderAccepts: string[] = ['*/*', 'application/json'];
    const headers = new HttpHeaders().set('Accept', httpHeaderAccepts);
    return headers;
  }
}
