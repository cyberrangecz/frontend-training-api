import { AbstractLevelTypeEnum, JeopardyLevel } from '@crczp/training-model';
import { JeopardyLevelDTO } from '../../../dto/level/jeopardy/jeopardy-level-dto';
import { JeopardyCategoryMapper } from './jeopardy-category-mapper';
import {
    JeopardyLevelUpdateDTO,
    JeopardyLevelUpdateDTOClass,
} from '../../../dto/level/jeopardy/jeopardy-level-update-dto';

export class JeopardyLevelMapper {
    public static fromDto(dto: JeopardyLevelDTO): JeopardyLevel {
        const level = new JeopardyLevel();
        level.id = dto.id;
        level.type = AbstractLevelTypeEnum.Jeopardy;
        level.maxScore = dto.max_score;
        level.estimatedDuration = dto.estimated_duration;
        level.minimalPossibleSolveTime = dto.minimal_possibleSolve_time;
        level.title = dto.title;
        level.order = dto.order;
        level.categories = dto.categories.map(JeopardyCategoryMapper.fromDto);
        return level;
    }

    public static toUpdateDto(level: JeopardyLevel): JeopardyLevelUpdateDTO {
        const dto = new JeopardyLevelUpdateDTOClass();
        dto.id = level.id;
        dto.title = level.title;
        dto.categories = level.categories.map(JeopardyCategoryMapper.toUpdateDto);
        return dto;
    }
}
