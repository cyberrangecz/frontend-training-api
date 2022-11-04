import { AnswerSimilarityDetectionEvent } from '@muni-kypo-crp/training-model';
import { AnswerSimilarityDetectionEventDTO } from '../../dto/detection-event/answer-similarity/answer-similarity-detection-event-dto';
import { DetectionEventParticipantMapper } from './detection-event-participant-mapper';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';

export class AnswerSimilarityDetectionEventMapper {
  static fromDTO(dto: AnswerSimilarityDetectionEventDTO): AnswerSimilarityDetectionEvent {
    const result = new AnswerSimilarityDetectionEvent();
    result.answer = dto.answer;
    result.answerOwner = dto.answer_owner;
    result.participants = DetectionEventParticipantMapper.fromDTOs(dto.participants);
    result.detectionEventType = AbstractDetectionEventTypeEnum.Answer_similarity;
    return result;
  }
}
