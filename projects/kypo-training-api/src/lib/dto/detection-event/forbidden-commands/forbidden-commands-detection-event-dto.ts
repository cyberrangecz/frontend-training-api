import { DetectionEventDTO } from '../detection-event-dto';
import { ForbiddenCommandDTO } from '../forbidden-command-dto';

export interface ForbiddenCommandsDetectionEventDTO extends DetectionEventDTO {
  forbidden_commands: ForbiddenCommandDTO[];
}
