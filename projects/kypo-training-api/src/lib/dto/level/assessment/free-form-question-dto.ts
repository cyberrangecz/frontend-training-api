import { AbstractQuestionCreateDTO, AbstractQuestionDTO } from './abstact-question-dto';
import { QuestionChoice } from '@muni-kypo-crp/training-model/lib/questions/question-choice';
import { QuestionChoiceDTO } from './question-choice-dto';

export interface FreeFormQuestionCreateDTO extends AbstractQuestionCreateDTO {
  choices: QuestionChoice[];
}

export class FreeFormQuestionDTOClass implements FreeFormQuestionCreateDTO {
  text: string;
  question_type: AbstractQuestionDTO.QuestionTypeEnum;
  answer_required: boolean;
  order: number;
  penalty?: number;
  points?: number;
  choices: QuestionChoiceDTO[];
}
