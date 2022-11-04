import { DetectionEventDTO } from '../detection-event-dto';
import { DetectionEventParticipantDTO } from '../detection-event-participant-dto';

export interface ForbiddenCommandsDetectionEventDTO extends DetectionEventDTO {
  forbidden_commands: string[];
  participant: DetectionEventParticipantDTO;
}
