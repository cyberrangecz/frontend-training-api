import { ForbiddenCommandsDetectionEvent } from '@muni-kypo-crp/training-model';
import { ForbiddenCommandsDetectionEventDTO } from '../../dto/detection-event/forbidden-commands/forbidden-commands-detection-event-dto';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';

export class ForbiddenCommandsDetectionEventMapper {
  static fromDTO(dto: ForbiddenCommandsDetectionEventDTO): ForbiddenCommandsDetectionEvent {
    const result = new ForbiddenCommandsDetectionEvent();
    result.commandCount = dto.command_count;
    result.detectionEventType = AbstractDetectionEventTypeEnum.Forbidden_commands;
    return result;
  }
}
