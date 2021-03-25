import { IsCorrectAnswerDTO } from '../../dto/phase/training-phase/is-correct-answer-dto';
import { AnswerCheck } from '@muni-kypo-crp/training-model';

export class AnswerMapper {
  static fromDTO(dto: IsCorrectAnswerDTO): AnswerCheck {
    const result = new AnswerCheck();
    result.isCorrect = dto.correct;
    result.remainingAttempts = dto.remaining_attempts;
    result.solution = dto.solution;
    return result;
  }
}
