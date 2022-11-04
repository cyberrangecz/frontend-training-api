import { MinimalSolveTimeDetectionEvent } from '@muni-kypo-crp/training-model';
import { MinimalSolveTimeDetectionEventDTO } from '../../dto/detection-event/minimal-solve-time/minimal-solve-time-detection-event-dto';
import { DetectionEventParticipantMapper } from './detection-event-participant-mapper';
import { AbstractDetectionEventTypeEnum } from '@muni-kypo-crp/training-model';

export class MinimalSolveTimeDetectionEventMapper {
  static fromDTO(dto: MinimalSolveTimeDetectionEventDTO): MinimalSolveTimeDetectionEvent {
    const result = new MinimalSolveTimeDetectionEvent();
    result.minimalSolveTime = dto.minimal_solve_time;
    result.participants = DetectionEventParticipantMapper.fromDTOs(dto.participants);
    result.detectionEventType = AbstractDetectionEventTypeEnum.Minimal_solve_time;
    return result;
  }
}
