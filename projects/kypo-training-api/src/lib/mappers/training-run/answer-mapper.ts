import { IsCorrectAnswerDTO } from '../../dto/phase/training-phase/is-correct-answer-dto';
import { PhaseAnswerCheck } from '@muni-kypo-crp/training-model';

export class AnswerMapper {
  static fromDTO(dto: IsCorrectAnswerDTO): PhaseAnswerCheck {
    const result = new PhaseAnswerCheck();
    result.isCorrect = dto.correct;
    result.remainingAttempts = dto.remaining_attempts;
    result.solution = dto.solution;
    return result;
  }
}
