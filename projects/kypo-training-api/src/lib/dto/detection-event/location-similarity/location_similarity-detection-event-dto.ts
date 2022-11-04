import { DetectionEventDTO } from '../detection-event-dto';
import { DetectionEventParticipantDTO } from '../detection-event-participant-dto';

export interface LocationSimilarityDetectionEventDTO extends DetectionEventDTO {
  ip_address: string;
  dns: string;
  is_address_deploy: boolean;
  participants: DetectionEventParticipantDTO[];
}
