import { LevelAnswerCheck } from '@muni-kypo-crp/training-model';
import { IsCorrectAnswerDto } from '../../dto/level/game/is-correct-answer-dto';

export class LevelAnswerMapper {
  static fromDTO(dto: IsCorrectAnswerDto): LevelAnswerCheck {
    const result = new LevelAnswerCheck();
    result.isCorrect = dto.correct;
    result.remainingAttempts = dto.remaining_attempts;
    result.solution = dto.solution;
    return result;
  }
}
