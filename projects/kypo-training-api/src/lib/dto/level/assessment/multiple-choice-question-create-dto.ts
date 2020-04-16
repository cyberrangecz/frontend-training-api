import { AbstractQuestionCreateDTO, AbstractQuestionDTO } from './abstact-question-dto';
import { McqDTO } from './mcq-choice-dto';

export interface MultipleChoiceQuestionCreateDTO extends AbstractQuestionCreateDTO {
  choices: McqDTO[];
}

export class MultipleChoiceQuestionCreateDTOClass implements MultipleChoiceQuestionCreateDTO {
  answer_required: boolean;
  choices: McqDTO[];
  order: number;
  penalty: number;
  points: number;
  question_type: AbstractQuestionDTO.QuestionTypeEnum;
  text: string;
}
