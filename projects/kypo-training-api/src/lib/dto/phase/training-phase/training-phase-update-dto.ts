import { DecisionMatrixRowDTO } from './decision-matrix-row-dto';
import { AbstractPhaseDTO } from '../abstract-phase-dto';
import { TaskUpdateDTO } from './task-update-dto';

export class TrainingPhaseUpdateDTO {
  id: number;
  phase_type: AbstractPhaseDTO.PhaseTypeEnum = 'TRAINING';
  order: number;
  title: string;
  allowed_commands: number;
  allowed_wrong_answers: number;
  estimated_duration: number;
  decision_matrix: DecisionMatrixRowDTO[];
  tasks: TaskUpdateDTO[];
}
