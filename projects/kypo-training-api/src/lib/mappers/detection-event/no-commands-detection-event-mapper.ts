import { NoCommandsDetectionEvent } from '@muni-kypo-crp/training-model';
import { NoCommandsDetectionEventDTO } from '../../dto/detection-event/no-commands/no-commands-detection-event-dto';
import { DetectionEventParticipantMapper } from './detection-event-participant-mapper';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';

export class NoCommandsDetectionEventMapper {
  static fromDTO(dto: NoCommandsDetectionEventDTO): NoCommandsDetectionEvent {
    const result = new NoCommandsDetectionEvent();
    result.participants = DetectionEventParticipantMapper.fromDTOs(dto.participants);
    result.detectionEventType = AbstractDetectionEventTypeEnum.No_commands;
    return result;
  }
}
