import { QuestionDTO } from './question-dto';
import { PhaseRelationDTO } from './phase-relation-dto';

export class QuestionnairePhaseUpdateDTO {
  title: string;
  questions: QuestionDTO[];
  phase_relations: PhaseRelationDTO[];
}
