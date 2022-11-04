import { DetectionEventDTO } from '../detection-event-dto';
import { DetectionEventParticipantDTO } from '../detection-event-participant-dto';

export interface AnswerSimilarityDetectionEventDTO extends DetectionEventDTO {
  answer: string;
  answer_owner: string;
  participants: DetectionEventParticipantDTO[];
}
