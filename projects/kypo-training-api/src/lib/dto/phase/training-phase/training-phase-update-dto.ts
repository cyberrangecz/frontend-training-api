import { DecisionMatrixRowDTO } from './decision-matrix-row-dto';

export class TrainingPhaseUpdateDTO {
  title: string;
  allowed_commands: number;
  allowed_wrong_answers: number;
  estimated_duration: number;
  decision_matrix: DecisionMatrixRowDTO[];
}
