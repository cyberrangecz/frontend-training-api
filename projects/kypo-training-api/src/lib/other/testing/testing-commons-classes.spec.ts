import { TrainingInstanceDTO } from '../../dto/training-instance/training-instance-dto';
import { TrainingDefinitionDTO } from '../../dto/training-definition/training-definition-dto';
import { TaskDTO } from '../../dto/phase/training-phase/task-dto';
import { AbstractPhaseDTO } from '../../dto/phase/abstract-phase-dto';
import { InfoPhaseDTO } from '../../dto/phase/info-phase/info-phase-dto';
import { Trainee } from '@muni-kypo-crp/training-model/lib/user-ref/trainee';
import { TrainingRunDTO } from '../../dto/training-run/training-run-dto';
import { UserRefDTO } from '../../dto/user/user-ref-dto';
import { AccessedTrainingRunDTO } from '../../dto/training-run/accessed-training-run-dto';

export class TrainingInstanceDTOTesting implements TrainingInstanceDTO {
  access_token: string;
  end_time: Date;
  id: number;
  last_edited_by: string;
  pool_id: number;
  start_time: Date;
  title: string;
  training_definition: TrainingDefinitionDTO;
}

export class TaskDTOTesting implements TaskDTO {
  answer: string;
  content: string;
  id: number;
  incorrect_answer_limit: number;
  modify_sandbox: boolean;
  order: number;
  phase_type: AbstractPhaseDTO.PhaseTypeEnum;
  solution: string;
  title: string;
}

export class InfoPhaseDTOTesting implements InfoPhaseDTO {
  content: string;
  id: number;
  order: number;
  phase_type: AbstractPhaseDTO.PhaseTypeEnum;
  title: string;
}

export class TraineeTesting implements Trainee {
  id: number;
  login: string;
  mail: string;
  name: string;
  picture: string;
}

export class TrainingRunDTOTesting implements TrainingRunDTO {
  definition_id: number;
  instance_id: number;
  participant_ref: UserRefDTO;
  id: number;
  end_time: Date;
  start_time: Date;
  event_log_reference: string;
  sandbox_instance_ref_id: number;
  state: TrainingRunDTO.StateEnum;
}

export class UserRefDTOTesting implements UserRefDTO {
  family_name: string;
  given_name: string;
  mail: string;
  picture: string;
  sub: string;
  user_ref_id: number;
}

export class AccessedTrainingRunDTOTesting implements AccessedTrainingRunDTO {
  id: number;
  title: string;
}
