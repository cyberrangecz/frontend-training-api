import { DetectionEventDTO } from '../detection-event-dto';
import { DetectionEventParticipantDTO } from '../detection-event-participant-dto';

export interface NoCommandsDetectionEventDTO extends DetectionEventDTO {
  participants: DetectionEventParticipantDTO[];
}
