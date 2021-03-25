import { InfoPhaseDTO } from '../../dto/phase/info-phase/info-phase-dto';
import { AbstractPhaseTypeEnum, InfoPhase } from '@muni-kypo-crp/training-model';
import { InfoPhaseUpdateDTO } from '../../dto/phase/info-phase/info-phase-update-dto';

export class InfoPhaseMapper {
  static fromDTO(dto: InfoPhaseDTO): InfoPhase {
    const result = new InfoPhase();
    result.type = AbstractPhaseTypeEnum.Info;
    result.content = dto.content;
    return result;
  }

  static toUpdateDTO(level: InfoPhase): InfoPhaseUpdateDTO {
    const result = new InfoPhaseUpdateDTO();
    result.title = level.title;
    result.content = level.content;
    return result;
  }
}
