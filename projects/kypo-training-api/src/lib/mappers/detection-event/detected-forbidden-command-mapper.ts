import { DetectedForbiddenCommandDTO } from '../../dto/detection-event/detected-forbidden-command-dto';
import { DetectedForbiddenCommand } from '@muni-kypo-crp/training-model';

export class DetectedForbiddenCommandMapper {
  static fromDTO(dto: DetectedForbiddenCommandDTO): DetectedForbiddenCommand {
    return {
      command: dto.command,
      type: dto.type,
      detectionEventId: dto.detection_event_id,
    };
  }

  static fromDTOs(dtos: DetectedForbiddenCommandDTO[]): DetectedForbiddenCommand[] {
    return dtos.map((dto) => DetectedForbiddenCommandMapper.fromDTO(dto));
  }
}
