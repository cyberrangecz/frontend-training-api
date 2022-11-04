import { DetectionEventDTO } from '../detection-event-dto';
import { DetectionEventParticipantDTO } from '../detection-event-participant-dto';

export interface TimeProximityDetectionEventDTO extends DetectionEventDTO {
  threshold: number;
  participants: DetectionEventParticipantDTO[];
}
