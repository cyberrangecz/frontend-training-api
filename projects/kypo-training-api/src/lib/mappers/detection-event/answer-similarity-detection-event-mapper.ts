import { AnswerSimilarityDetectionEvent } from '@muni-kypo-crp/training-model';
import { AnswerSimilarityDetectionEventDTO } from '../../dto/detection-event/answer-similarity/answer-similarity-detection-event-dto';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';

export class AnswerSimilarityDetectionEventMapper {
  static fromDTO(dto: AnswerSimilarityDetectionEventDTO): AnswerSimilarityDetectionEvent {
    const result = new AnswerSimilarityDetectionEvent();
    result.answer = dto.answer;
    result.answerOwner = dto.answer_owner;
    result.detectionEventType = AbstractDetectionEventTypeEnum.Answer_similarity;
    return result;
  }
}
