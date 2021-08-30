import { AbstractLevelDTO } from '../abstract-level-dto';
import { HintDTO } from './hint-dto';

export interface TrainingLevelUpdateDto {
  id: number;
  max_score?: number;
  content?: string;
  estimated_duration?: number;
  answer?: string;
  answer_variable_name?: string;
  hints?: HintDTO[];
  incorrect_answer_limit?: number;
  level_type: AbstractLevelDTO.LevelTypeEnum;
  solution?: string;
  solution_penalized?: boolean;
  order: number;
}

export class TrainingLevelUpdateDTOClass implements TrainingLevelUpdateDto {
  content: string;
  estimated_duration: number;
  answer: string;
  answer_variable_name: string;
  hints: HintDTO[];
  id: number;
  incorrect_answer_limit: number;
  level_type: AbstractLevelDTO.LevelTypeEnum = 'TRAINING_LEVEL';
  max_score: number;
  solution: string;
  solution_penalized: boolean;
  title: string;
  order: number;
}
