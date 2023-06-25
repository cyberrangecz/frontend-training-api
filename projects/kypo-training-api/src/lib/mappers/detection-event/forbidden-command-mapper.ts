import { ForbiddenCommandDTO } from '../../dto/detection-event/forbidden-command-dto';
import { ForbiddenCommand } from '@muni-kypo-crp/training-model';

export class ForbiddenCommandMapper {
  static fromDTO(dto: ForbiddenCommandDTO): ForbiddenCommand {
    return {
      command: dto.command,
      type: dto.type,
    };
  }

  static toDTO(forbiddenCommand: ForbiddenCommand): ForbiddenCommandDTO {
    return {
      command: forbiddenCommand.command,
      type: forbiddenCommand.type,
    };
  }

  static fromDTOs(dtos: ForbiddenCommandDTO[]): ForbiddenCommand[] {
    return dtos.map((dto) => ForbiddenCommandMapper.fromDTO(dto));
  }
}
