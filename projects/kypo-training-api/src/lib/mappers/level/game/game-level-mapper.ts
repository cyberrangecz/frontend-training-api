import { AbstractLevelTypeEnum } from '@muni-kypo-crp/training-model';
import { GameLevel } from '@muni-kypo-crp/training-model';
import { GameLevelDTO } from '../../../dto/level/game/game-level-dto';
import { GameLevelUpdateDTO, GameLevelUpdateDTOClass } from '../../../dto/level/game/game-level-update-dto';
import { HintMapper } from './hint-mapper';

export class GameLevelMapper {
  static fromDTO(dto: GameLevelDTO): GameLevel {
    const result = new GameLevel();
    result.hints = HintMapper.fromDTOs(dto.hints);
    result.type = AbstractLevelTypeEnum.Game;
    result.answer = dto.answer;
    result.content = dto.content;
    result.solution = dto.solution;
    result.incorrectAnswerLimit = dto.incorrect_answer_limit;
    result.solutionPenalized = dto.solution_penalized;
    return result;
  }

  static toUpdateDTO(gameLevel: GameLevel): GameLevelUpdateDTO {
    const result = new GameLevelUpdateDTOClass();
    result.id = gameLevel.id;
    result.title = gameLevel.title;
    result.max_score = gameLevel.maxScore;
    result.content = gameLevel.content;
    result.estimated_duration = gameLevel.estimatedDuration;
    result.answer = gameLevel.answer;
    result.incorrect_answer_limit = gameLevel.incorrectAnswerLimit;
    result.solution = gameLevel.solution;
    result.solution_penalized = gameLevel.solutionPenalized;
    result.hints = HintMapper.toDTOs(gameLevel.hints);
    return result;
  }
}
