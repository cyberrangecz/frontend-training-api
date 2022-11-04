import { LocationSimilarityDetectionEvent } from '@muni-kypo-crp/training-model';
import { LocationSimilarityDetectionEventDTO } from '../../dto/detection-event/location-similarity/location_similarity-detection-event-dto';
import { DetectionEventParticipantMapper } from './detection-event-participant-mapper';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';

export class LocationSimilarityDetectionEventMapper {
  static fromDTO(dto: LocationSimilarityDetectionEventDTO): LocationSimilarityDetectionEvent {
    const result = new LocationSimilarityDetectionEvent();
    result.ipAddress = dto.ip_address;
    result.dns = dto.dns;
    result.isAddressDeploy = dto.is_address_deploy;
    result.participants = DetectionEventParticipantMapper.fromDTOs(dto.participants);
    result.detectionEventType = AbstractDetectionEventTypeEnum.Location_similarity;
    return result;
  }
}
