import { CheatingDetection } from '@muni-kypo-crp/training-model';
import { CheatingDetectionDTO } from '../../dto/cheating-detection/cheating-detection-dto';
import { CheatingDetectionStateEnum } from '@muni-kypo-crp/training-model';

export class CheatingDetectionMapper {
  static fromDTO(dto: CheatingDetectionDTO): CheatingDetection {
    return {
      trainingInstanceId: dto.training_instance_id,
      executedBy: dto.executed_by,
      executeTime: dto.execute_time,
      id: dto.id,
      proximityThreshold: dto.proximity_threshold,
      currentState: this.typeFromDTO(dto.current_state),
      results: dto.results,
      answerSimilarityState: this.typeFromDTO(dto.answer_similarity_state),
      locationSimilarityState: this.typeFromDTO(dto.location_similarity_state),
      timeProximityState: this.typeFromDTO(dto.time_proximity_state),
      minimalSolveTimeState: this.typeFromDTO(dto.minimal_solve_time_state),
      noCommandsState: this.typeFromDTO(dto.no_commands_state),
      forbiddenCommandsState: this.typeFromDTO(dto.forbidden_commands_state),
    };
  }

  static fromDTOs(dtos: CheatingDetectionDTO[]): CheatingDetection[] {
    return dtos.map((dto) => CheatingDetectionMapper.fromDTO(dto));
  }

  static toDTO(cheatingDetection: CheatingDetection): CheatingDetectionDTO {
    return {
      training_instance_id: cheatingDetection.trainingInstanceId,
      executed_by: cheatingDetection.executedBy,
      execute_time: cheatingDetection.executeTime,
      id: cheatingDetection.id,
      current_state: this.typeToDTO(cheatingDetection.currentState),
      results: cheatingDetection.results,
      proximity_threshold: cheatingDetection.proximityThreshold,
      answer_similarity_state: this.typeToDTO(cheatingDetection.answerSimilarityState),
      location_similarity_state: this.typeToDTO(cheatingDetection.locationSimilarityState),
      time_proximity_state: this.typeToDTO(cheatingDetection.timeProximityState),
      minimal_solve_time_state: this.typeToDTO(cheatingDetection.minimalSolveTimeState),
      no_commands_state: this.typeToDTO(cheatingDetection.noCommandsState),
      forbidden_commands_state: this.typeToDTO(cheatingDetection.forbiddenCommandsState),
    };
  }

  private static typeToDTO(type: CheatingDetectionStateEnum): CheatingDetectionDTO.CheatingDetectionStateEnum {
    switch (type) {
      case CheatingDetectionStateEnum.Running:
        return CheatingDetectionDTO.CheatingDetectionStateEnum.RUNNING;
      case CheatingDetectionStateEnum.Queued:
        return CheatingDetectionDTO.CheatingDetectionStateEnum.QUEUED;
      case CheatingDetectionStateEnum.Disabled:
        return CheatingDetectionDTO.CheatingDetectionStateEnum.DISABLED;
      case CheatingDetectionStateEnum.Finished:
        return CheatingDetectionDTO.CheatingDetectionStateEnum.FINISHED;
      default:
        console.error('Could not map CheatingDetectionStateEnum to any known DTO');
    }
  }

  private static typeFromDTO(type: CheatingDetectionDTO.CheatingDetectionStateEnum): CheatingDetectionStateEnum {
    switch (type) {
      case CheatingDetectionDTO.CheatingDetectionStateEnum.RUNNING:
        return CheatingDetectionStateEnum.Running;
      case CheatingDetectionDTO.CheatingDetectionStateEnum.QUEUED:
        return CheatingDetectionStateEnum.Queued;
      case CheatingDetectionDTO.CheatingDetectionStateEnum.DISABLED:
        return CheatingDetectionStateEnum.Disabled;
      case CheatingDetectionDTO.CheatingDetectionStateEnum.FINISHED:
        return CheatingDetectionStateEnum.Finished;
      default:
        console.error('Could not map CheatingDetectionStateEnum to any known type');
    }
  }
}
