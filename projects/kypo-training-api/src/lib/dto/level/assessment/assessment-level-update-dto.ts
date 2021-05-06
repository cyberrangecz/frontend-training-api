/**
 * Assessment Level to update.
 */
import { AbstractQuestionCreateDTO } from './abstact-question-dto';

export interface AssessmentLevelUpdateDTO {
  id?: number;
  title?: string;
  max_score?: number;
  estimated_duration: number;
  instructions?: string;
  questions?: AbstractQuestionCreateDTO[];
  type?: AssessmentLevelUpdateDTO.TypeEnum;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AssessmentLevelUpdateDTO {
  export type TypeEnum = 'TEST' | 'QUESTIONNAIRE';
  export const TypeEnum = {
    TEST: 'TEST' as TypeEnum,
    QUESTIONNAIRE: 'QUESTIONNAIRE' as TypeEnum,
  };
}

export class AssessmentLevelUpdateDTOClass implements AssessmentLevelUpdateDTO {
  id: number;
  instructions: string;
  max_score: number;
  questions: AbstractQuestionCreateDTO[];
  title: string;
  estimated_duration: number;
  type: AssessmentLevelUpdateDTO.TypeEnum;
}
