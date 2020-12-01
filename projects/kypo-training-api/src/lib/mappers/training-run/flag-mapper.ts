import { FlagCheck } from '@kypo/training-model';
import { IsCorrectFlagDTO } from '../../dto/level/game/is-correct-flag-dto';

export class FlagMapper {
  static fromDTO(dto: IsCorrectFlagDTO): FlagCheck {
    const result = new FlagCheck();
    result.isCorrect = dto.correct;
    result.remainingAttempts = dto.remaining_attempts;
    result.solution = dto.solution;
    return result;
  }
}
