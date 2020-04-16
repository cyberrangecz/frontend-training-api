import { GameLevel } from 'kypo-training-model';
import { AssessmentLevel } from 'kypo-training-model';
import { Level } from 'kypo-training-model';
import { InfoLevel } from 'kypo-training-model';
import { AbstractLevelTypeEnum } from 'kypo-training-model';
import { AbstractLevelDTO } from '../../dto/level/abstract-level-dto';
import { AssessmentLevelDTO } from '../../dto/level/assessment/assessment-level-dto';
import { BasicLevelInfoDTO } from '../../dto/level/basic-level-info-dto';
import { GameLevelDTO } from '../../dto/level/game/game-level-dto';
import { InfoLevelDTO } from '../../dto/level/info/info-level-dto';
import { AssessmentLevelMapper } from './assessment/assessment-level-mapper';
import { GameLevelMapper } from './game/game-level-mapper';
import { InfoLevelMapper } from './info/info-level-mapper';

/**
 * @dynamic
 */
export class LevelMapper {
  static fromDTO(dto: AbstractLevelDTO): Level {
    let level: Level;
    switch (dto.level_type) {
      case AbstractLevelDTO.LevelTypeEnum.GAME: {
        level = GameLevelMapper.fromDTO(dto as GameLevelDTO);
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
    }

    level.id = dto.id;
    level.title = dto.title;
    level.order = dto.order;
    level.estimatedDuration = dto.estimated_duration;
    level.maxScore = dto.max_score;
    return level;
  }

  static fromDTOs(dtos: AbstractLevelDTO[]): Level[] {
    return dtos.map((dto) => LevelMapper.fromDTO(dto)).sort((a, b) => a.order - b.order);
  }

  static fromBasicDTO(dto: BasicLevelInfoDTO): Level {
    let level: Level;
    switch (dto.level_type) {
      case BasicLevelInfoDTO.LevelTypeEnum.GAME: {
        level = new GameLevel();
        level.type = AbstractLevelTypeEnum.Game;
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
    }

    level.id = dto.id;
    level.title = dto.title;
    level.order = dto.order;
    return level;
  }

  static fromBasicDTOs(dtos: BasicLevelInfoDTO[]): Level[] {
    return dtos.map((dto) => this.fromBasicDTO(dto));
  }
}
