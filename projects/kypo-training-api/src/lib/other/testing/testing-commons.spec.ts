import { KypoTrainingApiContext } from '../kypo-training-api-context';
import { KypoTrainingApiConfig } from '../kypo-training-api-config';
import {
  AbstractPhaseTypeEnum,
  AccessedTrainingRun,
  AccessTrainingRunInfo,
  InfoPhase,
  Task,
  TrainingDefinition,
  TrainingDefinitionStateEnum,
  TrainingInstance,
  TrainingRun,
  TrainingRunStateEnum,
} from '@muni-kypo-crp/training-model';
import { TrainingInstanceDTO } from '../../dto/training-instance/training-instance-dto';
import { TrainingDefinitionDTO } from '../../dto/training-definition/training-definition-dto';
import { TaskDTO } from '../../dto/phase/training-phase/task-dto';
import { InfoPhaseDTO } from '../../dto/phase/info-phase/info-phase-dto';
import { PaginatedResource, RequestedPagination, SentinelPagination } from '@sentinel/common';
import { TrainingInstanceRestResource } from '../../dto/training-instance/training-instance-rest-resource';
import { TrainingRunDTO } from '../../dto/training-run/training-run-dto';
import {
  AccessedTrainingRunDTOTesting,
  InfoPhaseDTOTesting,
  TaskDTOTesting,
  TraineeTesting,
  TrainingInstanceDTOTesting,
  TrainingRunDTOTesting,
  UserRefDTOTesting,
} from './testing-commons-classes.spec';
import { AccessedTrainingRunDTO } from '../../dto/training-run/accessed-training-run-dto';
import { UserRefDTO } from '../../dto/user/user-ref-dto';
import { TrainingUser } from '@muni-kypo-crp/training-model/lib/user-ref/training-user';

export const trainingURL = `https://172.19.0.22/kypo-rest-training/api/v1/`;
export const adaptiveTrainingURL = `https://172.19.0.22/kypo-adaptive-training/api/v1/`;

export function createContext(): KypoTrainingApiContext {
  const config = new KypoTrainingApiConfig(trainingURL, adaptiveTrainingURL);
  return new KypoTrainingApiContext(config);
}

export function mockTdDTO(): TrainingDefinitionDTO {
  const tdDTO = new TrainingDefinitionDTO();
  tdDTO.last_edited = new Date(500000000000);
  tdDTO.id = 1;
  tdDTO.title = 'title';
  tdDTO.estimated_duration = 40;
  tdDTO.description = 'Text';
  tdDTO.state = TrainingDefinitionDTO.StateEnum.ARCHIVED;
  tdDTO.last_edited_by = 'John';
  tdDTO.show_stepper_bar = false;
  return tdDTO;
}

export function mockTD(): TrainingDefinition {
  const td = new TrainingDefinition();
  td.lastEditTime = new Date(500000000000);
  td.id = 1;
  td.title = 'title';
  td.estimatedDuration = 40;
  td.description = 'Text';
  td.state = TrainingDefinitionStateEnum.Archived;
  td.lastEditBy = 'John';
  td.showStepperBar = false;
  return td;
}

export function mockTask(): Task {
  const data = new Task();
  data.id = 1;
  data.title = 'Title';
  data.order = 2;
  data.answer = 'Answer';
  data.content = 'Content';
  data.solution = 'solution';
  data.incorrectAnswerLimit = 5;
  data.type = AbstractPhaseTypeEnum.Task;
  data.modifySandbox = false;
  return data;
}

export function mockTaskDTO(): TaskDTO {
  const dto = new TaskDTOTesting();
  dto.id = 1;
  dto.title = 'Title';
  dto.order = 2;
  dto.answer = 'Answer';
  dto.content = 'Content';
  dto.solution = 'solution';
  dto.phase_type = 'TASK';
  dto.incorrect_answer_limit = 5;
  dto.modify_sandbox = false;
  return dto;
}

export function mockInfoPhase(): InfoPhase {
  const data = new InfoPhase();
  data.title = 'title';
  data.id = 1;
  data.order = 4;
  data.type = AbstractPhaseTypeEnum.Info;
  data.content = 'Content text';
  return data;
}

export function mockInfoPhaseDTO(): InfoPhaseDTO {
  const dto = new InfoPhaseDTOTesting();
  dto.order = 4;
  dto.id = 1;
  dto.phase_type = 'INFO';
  dto.title = 'title';
  dto.content = 'Content text';
  return dto;
}

export function mockTI(): TrainingInstance {
  const data = new TrainingInstance();
  data.id = 5;
  data.title = 'Title';
  data.poolId = 1;
  data.trainingDefinition = mockTD();
  data.startTime = new Date(50000);
  data.endTime = new Date(500000000);
  data.accessToken = '4654-6516';
  data.lastEditBy = 'John Doe';
  return data;
}

export function mockTIDTO(): TrainingInstanceDTO {
  const dto = new TrainingInstanceDTOTesting();
  dto.id = 5;
  dto.title = 'Title';
  dto.pool_id = 1;
  dto.training_definition = mockTdDTO();
  dto.start_time = new Date(50000);
  dto.end_time = new Date(500000000);
  dto.access_token = '4654-6516';
  dto.last_edited_by = 'John Doe';
  return dto;
}

export function mockTrainee(): TrainingUser {
  const data = new TraineeTesting();
  data.id = 1;
  data.login = 'login';
  data.name = '';
  data.mail = 'email';
  data.picture = '==dgadfdoiufgdfg86rh4rj86ty4j89+ty4w86ew86t48ey45r864rs86y4sr89u4r89+9wt4+e4gt6e8ra4gy84';
  return data;
}

export function mockUserRefDTO(): UserRefDTO {
  const data = new UserRefDTOTesting();
  data.user_ref_id = 1;
  data.mail = 'email';
  data.picture = '==dgadfdoiufgdfg86rh4rj86ty4j89+ty4w86ew86t48ey45r864rs86y4sr89u4r89+9wt4+e4gt6e8ra4gy84';
  data.given_name = '';
  data.family_name = '';
  data.sub = '';
  return data;
}

export function mockTR(): TrainingRun {
  const data = new TrainingRun();
  data.id = 1;
  data.endTime = new Date(654564);
  data.startTime = new Date(365456);
  data.state = TrainingRunStateEnum.RUNNING;
  data.trainingInstanceId = 5;
  data.eventLogReference = 'reference';
  data.sandboxInstanceId = 1;
  data.trainingDefinitionId = 1;
  data.player = mockTrainee();
  return data;
}

export function mockAccessTrainingRunInfo(): AccessTrainingRunInfo {
  const data = new AccessTrainingRunInfo();
  data.trainingRunId = 1;
  data.sandboxInstanceId = 2;
  data.currentLevel = mockInfoPhase();
  data.levels = [mockInfoPhase()];
  data.isStepperDisplayed = true;
  data.isPreview = false;
  data.startTime = new Date(654564);
  return data;
}

export function mockAccessedTrainingRun(): AccessedTrainingRun {
  const data = new AccessedTrainingRun();
  data.totalLevels = 2;
  data.currentLevel = 1;
  data.completedLevels = '0';
  data.trainingRunId = 1;
  // data.action: TraineeAccessTrainingRunActionEnum;
  data.trainingInstanceTitle = 'TI title';
  data.trainingInstanceFormattedDuration = '00:45:55:1656';
  data.trainingInstanceStartTime = new Date(654564);
  data.trainingInstanceEndTime = new Date(654564);
  // data.type: TrainingRunTypeEnum;
  return data;
}

export function mockAccessedTrainingRunDTO(): AccessedTrainingRunDTOTesting {
  const data = new AccessedTrainingRunDTOTesting();
  data.id = 2;
  data.title = 'test';
  return data;
}

export function mockTRDTO(): TrainingRunDTO {
  const data = new TrainingRunDTOTesting();
  data.id = 1;
  data.end_time = new Date(654564);
  data.start_time = new Date(365456);
  data.state = 'RUNNING';
  data.instance_id = 5;
  data.event_log_reference = 'reference';
  data.sandbox_instance_ref_id = 1;
  data.definition_id = 1;
  data.participant_ref = mockUserRefDTO();
  return data;
}

export function mockPaginatedTI(): PaginatedResource<TrainingInstance> {
  return new PaginatedResource<TrainingInstance>([mockTI()], new SentinelPagination(1, 1, 5, 1, 1));
}

export function mockPaginatedTIDTO(): TrainingInstanceRestResource {
  return {
    content: [mockTIDTO()],
    pagination: { total_pages: 1, size: 5, number: 1, number_of_elements: 1, total_elements: 1 },
  };
}

export function mockPaginatedTR(): PaginatedResource<TrainingRun> {
  return new PaginatedResource<TrainingRun>([mockTR()], new SentinelPagination(1, 1, 5, 1, 1));
}

export function mockPaginatedAccessedTrainingRun(): PaginatedResource<AccessedTrainingRun> {
  return new PaginatedResource<AccessedTrainingRun>([mockAccessedTrainingRun()], new SentinelPagination(1, 1, 5, 1, 1));
}

export function mockPaginatedAccessedTrainingRunDTO(): PaginatedResource<AccessedTrainingRunDTO> {
  return new PaginatedResource<AccessedTrainingRunDTO>(
    [mockAccessedTrainingRunDTO()],
    new SentinelPagination(1, 1, 5, 1, 1)
  );
}

export function createPagination(): RequestedPagination {
  return new RequestedPagination(1, 5, '', '');
}
