import { NoCommandsDetectionEvent } from '@muni-kypo-crp/training-model';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';
import { NoCommandsDetectionEventDTO } from '../../dto/detection-event/no-commands/no-commands-detection-event-dto';

export class NoCommandsDetectionEventMapper {
  static fromDTO(dto: NoCommandsDetectionEventDTO): NoCommandsDetectionEvent {
    const result = new NoCommandsDetectionEvent();
    console.debug(dto + ' TBD');
    result.detectionEventType = AbstractDetectionEventTypeEnum.No_commands;
    return result;
  }
}
