import {
    AbstractLevelTypeEnum,
    AccessLevel,
    AssessmentLevel,
    InfoLevel,
    JeopardyLevel,
    Level,
    TrainingLevel,
} from '@crczp/training-model';
import { AbstractLevelDTO } from '../../dto/level/abstract-level-dto';
import { AssessmentLevelDTO } from '../../dto/level/assessment/assessment-level-dto';
import { BasicLevelInfoDTO } from '../../dto/level/basic-level-info-dto';
import { TrainingLevelDto } from '../../dto/level/training/training-level-dto';
import { InfoLevelDTO } from '../../dto/level/info/info-level-dto';
import { AssessmentLevelMapper } from './assessment/assessment-level-mapper';
import { TrainingLevelMapper } from './training/training-level-mapper';
import { InfoLevelMapper } from './info/info-level-mapper';
import { AccessLevelMapper } from './access/access-level-mapper';
import { AccessLevelDTO } from '../../dto/level/access/access-level-dto';
import { JeopardyLevelMapper } from './jeopardy/jeopardy-level-mapper';
import { JeopardyLevelDTO } from '../../dto/level/jeopardy/jeopardy-level-dto';
import { throwError } from 'rxjs';

/**
 * @dynamic
 */
export class LevelMapper {
    static fromDTO(dto: AbstractLevelDTO): Level {
        let level: Level;
        switch (dto.level_type) {
            case AbstractLevelDTO.LevelTypeEnum.TRAINING: {
                level = TrainingLevelMapper.fromDTO(dto as TrainingLevelDto);
                break;
            }
            case AbstractLevelDTO.LevelTypeEnum.INFO: {
                level = InfoLevelMapper.fromDTO(dto as InfoLevelDTO);
                break;
            }
            case AbstractLevelDTO.LevelTypeEnum.ASSESSMENT: {
                level = AssessmentLevelMapper.fromDTO(dto as AssessmentLevelDTO);
                break;
            }
            case AbstractLevelDTO.LevelTypeEnum.ACCESS: {
                level = AccessLevelMapper.fromDTO(dto as AccessLevelDTO);
                break;
            }
            case AbstractLevelDTO.LevelTypeEnum.JEOPARDY: {
                level = JeopardyLevelMapper.fromDto(dto as JeopardyLevelDTO);
                break;
            }
            default: {
                throw throwError('Invalid level type: ' + dto.level_type);
            }
        }

        level.id = dto.id;
        level.title = dto.title;
        level.order = dto.order;
        level.estimatedDuration = dto.estimated_duration;
        level.minimalPossibleSolveTime = dto.minimal_possible_solve_time;
        level.maxScore = dto.max_score;
        return level;
    }

    static fromDTOs(dtos: AbstractLevelDTO[]): Level[] {
        return dtos.map((dto) => LevelMapper.fromDTO(dto)).sort((a, b) => a.order - b.order);
    }

    static fromBasicDTO(dto: BasicLevelInfoDTO): Level {
        let level: Level;
        switch (dto.level_type) {
            case BasicLevelInfoDTO.LevelTypeEnum.TRAINING: {
                level = new TrainingLevel();
                level.type = AbstractLevelTypeEnum.Training;
                break;
            }
            case BasicLevelInfoDTO.LevelTypeEnum.INFO: {
                level = new InfoLevel();
                level.type = AbstractLevelTypeEnum.Info;
                break;
            }
            case BasicLevelInfoDTO.LevelTypeEnum.ASSESSMENT: {
                level = new AssessmentLevel();
                level.type = AbstractLevelTypeEnum.Assessment;
                break;
            }
            case BasicLevelInfoDTO.LevelTypeEnum.ACCESS: {
                level = new AccessLevel();
                level.type = AbstractLevelTypeEnum.Access;
                break;
            }
            case BasicLevelInfoDTO.LevelTypeEnum.JEOPARDY: {
                level = new JeopardyLevel();
                level.type = AbstractLevelTypeEnum.Jeopardy;
                break;
            }
        }

        level.id = dto.id;
        level.title = dto.title;
        level.order = dto.order;
        return level;
    }

    static fromBasicDTOs(dtos: BasicLevelInfoDTO[]): Level[] {
        return dtos.map((dto) => this.fromBasicDTO(dto));
    }

    static toUpdateDTOs(levels: Level[]): AbstractLevelDTO[] {
        return levels.map((level) => this.toUpdateDTO(level));
    }

    static toUpdateDTO(level: Level): AbstractLevelDTO {
        let levelDTO: AbstractLevelDTO;
        switch (level.type) {
            case AbstractLevelTypeEnum.Training: {
                levelDTO = TrainingLevelMapper.toUpdateDTO(level as TrainingLevel);
                break;
            }
            case AbstractLevelTypeEnum.Access: {
                levelDTO = AccessLevelMapper.toUpdateDTO(level as AccessLevel);
                break;
            }
            case AbstractLevelTypeEnum.Info: {
                levelDTO = InfoLevelMapper.toUpdateDTO(level as InfoLevel);
                break;
            }
            case AbstractLevelTypeEnum.Assessment: {
                levelDTO = AssessmentLevelMapper.toUpdateDTO(level as AssessmentLevel);
                break;
            }
            case AbstractLevelTypeEnum.Jeopardy: {
                levelDTO = TrainingLevelMapper.toUpdateDTO(level as TrainingLevel);
            }
        }
        return levelDTO;
    }
}
