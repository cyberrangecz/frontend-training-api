import { DetectionEventDTO } from '../detection-event-dto';

export interface ForbiddenCommandsDetectionEventDTO extends DetectionEventDTO {
  forbidden_commands: string[];
}
