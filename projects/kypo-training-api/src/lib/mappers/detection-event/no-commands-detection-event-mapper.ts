import { NoCommandsDetectionEvent } from '@muni-kypo-crp/training-model';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';
import { NoCommandsDetectionEventDTO } from '../../dto/detection-event/no-commands/no-commands-detection-event-dto';

export class NoCommandsDetectionEventMapper {
  static fromDTO(dto: NoCommandsDetectionEventDTO): NoCommandsDetectionEvent {
    console.log(dto);
    const result = new NoCommandsDetectionEvent();
    result.detectionEventType = AbstractDetectionEventTypeEnum.No_commands;
    return result;
  }
}
