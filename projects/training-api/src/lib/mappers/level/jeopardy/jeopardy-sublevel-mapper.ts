import { JeopardySublevelDTO } from '../../../dto/level/jeopardy/sublevel/jeopardy-sublevel-dto';
import { AbstractLevelTypeEnum, JeopardySublevel } from '@crczp/training-model';
import { TrainingLevelMapper } from '../training/training-level-mapper';
import { JeopardySublevelUpdateDTO } from '../../../dto/level/jeopardy/sublevel/jeopardy-sublevel-update-dto';

export class JeopardySublevelMapper {
    public static fromDto(dto: JeopardySublevelDTO): JeopardySublevel {
        const result = TrainingLevelMapper.fromDTO(dto) as JeopardySublevel;
        result.description = dto.description;
        result.type = AbstractLevelTypeEnum.JeopardySublevel;
        return result;
    }

    public static toUpdateDto(level: JeopardySublevel): JeopardySublevelUpdateDTO {
        const result = TrainingLevelMapper.toUpdateDTO(level) as JeopardySublevelUpdateDTO;
        result.description = level.description;
        return result;
    }
}
