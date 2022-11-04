import { ForbiddenCommandsDetectionEvent } from '@muni-kypo-crp/training-model';
import { ForbiddenCommandsDetectionEventDTO } from '../../dto/detection-event/forbidden-commands/forbidden-commands-detection-event-dto';
import { DetectionEventParticipantMapper } from './detection-event-participant-mapper';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';

export class ForbiddenCommandsDetectionEventMapper {
  static fromDTO(dto: ForbiddenCommandsDetectionEventDTO): ForbiddenCommandsDetectionEvent {
    const result = new ForbiddenCommandsDetectionEvent();
    result.forbiddenCommands = dto.forbidden_commands;
    result.participant = DetectionEventParticipantMapper.fromDTO(dto.participant);
    result.detectionEventType = AbstractDetectionEventTypeEnum.Forbidden_commands;
    return result;
  }
}
