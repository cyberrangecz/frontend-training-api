import { TimeProximityDetectionEvent } from '@muni-kypo-crp/training-model';
import { TimeProximityDetectionEventDTO } from '../../dto/detection-event/time-proximity/time_proximity-detection-event-dto';
import { DetectionEventParticipantMapper } from './detection-event-participant-mapper';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';

export class TimeProximityDetectionEventMapper {
  static fromDTO(dto: TimeProximityDetectionEventDTO): TimeProximityDetectionEvent {
    const result = new TimeProximityDetectionEvent();
    result.threshold = dto.threshold;
    result.participants = DetectionEventParticipantMapper.fromDTOs(dto.participants);
    result.detectionEventType = AbstractDetectionEventTypeEnum.Time_proximity;
    return result;
  }
}
