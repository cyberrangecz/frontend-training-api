import { DetectionEventDTO } from '../detection-event-dto';
import { DetectionEventParticipantDTO } from '../detection-event-participant-dto';

export interface MinimalSolveTimeDetectionEventDTO extends DetectionEventDTO {
  minimal_solve_time: number;
  participants: DetectionEventParticipantDTO[];
}
