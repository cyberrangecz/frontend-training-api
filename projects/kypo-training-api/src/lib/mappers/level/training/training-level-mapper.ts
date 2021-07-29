import { AbstractLevelTypeEnum } from '@muni-kypo-crp/training-model';
import { TrainingLevel } from '@muni-kypo-crp/training-model';
import { TrainingLevelDto } from '../../../dto/level/training/training-level-dto';
import {
  TrainingLevelUpdateDto,
  TrainingLevelUpdateDTOClass,
} from '../../../dto/level/training/training-level-update-dto';
import { HintMapper } from './hint-mapper';

export class TrainingLevelMapper {
  static fromDTO(dto: TrainingLevelDto): TrainingLevel {
    const result = new TrainingLevel();
    result.hints = HintMapper.fromDTOs(dto.hints);
    result.type = AbstractLevelTypeEnum.Training;
    result.answer = dto.answer;
    result.content = dto.content;
    result.solution = dto.solution;
    result.incorrectAnswerLimit = dto.incorrect_answer_limit;
    result.solutionPenalized = dto.solution_penalized;
    return result;
  }

  static toUpdateDTO(trainingLevel: TrainingLevel): TrainingLevelUpdateDto {
    const result = new TrainingLevelUpdateDTOClass();
    result.id = trainingLevel.id;
    result.title = trainingLevel.title;
    result.max_score = trainingLevel.maxScore;
    result.content = trainingLevel.content;
    result.estimated_duration = trainingLevel.estimatedDuration;
    result.answer = trainingLevel.answer;
    result.incorrect_answer_limit = trainingLevel.incorrectAnswerLimit;
    result.solution = trainingLevel.solution;
    result.solution_penalized = trainingLevel.solutionPenalized;
    result.hints = HintMapper.toDTOs(trainingLevel.hints);
    return result;
  }
}
