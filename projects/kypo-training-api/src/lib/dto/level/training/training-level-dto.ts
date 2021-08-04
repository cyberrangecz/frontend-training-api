import { AbstractLevelDTO } from '../abstract-level-dto';
import { HintDTO } from './hint-dto';

export interface TrainingLevelDto extends AbstractLevelDTO {
  content: string;
  answer: string;
  answer_variable_name: string;
  hints: HintDTO[];
  incorrect_answer_limit: number;
  level_type: AbstractLevelDTO.LevelTypeEnum;
  solution: string;
  solution_penalized: boolean;
}
