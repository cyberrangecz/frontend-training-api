import { TrainingDefinitionStateEnum } from '@muni-kypo-crp/training-model';
import { TrainingDefinition } from '@muni-kypo-crp/training-model';
import { TrainingDefinitionCreateDTO } from '../../dto/training-definition/training-definition-create-dto';
import { TrainingDefinitionDTO } from '../../dto/training-definition/training-definition-dto';
import { TrainingDefinitionUpdateDTO } from '../../dto/training-definition/training-definition-update-dto';
import { LevelMapper } from '../level/level-mapper';
import { PhaseMapper } from '../phase/phase-mapper';

/**
 * @dynamic
 */
export class TrainingDefinitionMapper {
  static fromDTO(dto: TrainingDefinitionDTO, withLevels: boolean, withPhases?: boolean): TrainingDefinition {
    const result = new TrainingDefinition();
    result.id = dto.id;
    result.title = dto.title;
    result.description = dto.description;
    result.prerequisites = dto.prerequisites ? dto.prerequisites : [];
    result.outcomes = dto.outcomes ? dto.outcomes : [];
    result.state = this.stateFromDTO(dto.state);
    result.lastEditTime = dto.last_edited;
    result.estimatedDuration = dto.estimated_duration;
    result.showStepperBar = dto.show_stepper_bar;
    if (withLevels) {
      result.levels = LevelMapper.fromDTOs(dto.levels);
    } else if (withPhases) {
      result.levels = PhaseMapper.fromDTOs(dto.phases);
    }
    result.variantSandboxes = dto.variant_sandboxes;

    return result;
  }

  static fromDTOs(dtos: TrainingDefinitionDTO[], withLevels: boolean): TrainingDefinition[] {
    return dtos.map((dto) => TrainingDefinitionMapper.fromDTO(dto, withLevels));
  }

  static stateFromDTO(stateDTO: TrainingDefinitionDTO.StateEnum): TrainingDefinitionStateEnum {
    switch (stateDTO) {
      case TrainingDefinitionDTO.StateEnum.ARCHIVED:
        return TrainingDefinitionStateEnum.Archived;
      case TrainingDefinitionDTO.StateEnum.RELEASED:
        return TrainingDefinitionStateEnum.Released;
      case TrainingDefinitionDTO.StateEnum.UNRELEASED:
        return TrainingDefinitionStateEnum.Unreleased;
      default: {
        console.error(
          `Attribute "state" of TrainingDefinitionDTO with value: ${stateDTO} does not match any of the TrainingDefinition states`
        );
        return undefined;
      }
    }
  }

  static stateToDTO(state: TrainingDefinitionStateEnum): TrainingDefinitionDTO.StateEnum {
    switch (state) {
      case TrainingDefinitionStateEnum.Unreleased:
        return TrainingDefinitionDTO.StateEnum.UNRELEASED;
      case TrainingDefinitionStateEnum.Released:
        return TrainingDefinitionDTO.StateEnum.RELEASED;
      case TrainingDefinitionStateEnum.Archived:
        return TrainingDefinitionDTO.StateEnum.ARCHIVED;
      default: {
        console.error(
          `Attribute "state" of TrainingDefinition with value ${state} does not match any of the TrainingDefinitionDTO states`
        );
        return undefined;
      }
    }
  }

  static toUpdateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionUpdateDTO {
    const result = new TrainingDefinitionUpdateDTO();
    result.id = trainingDefinition.id;
    result.description = trainingDefinition.description;
    result.show_stepper_bar = trainingDefinition.showStepperBar;
    result.prerequisites = trainingDefinition.prerequisites.filter((prerequisite) => prerequisite.length > 1);
    result.outcomes = trainingDefinition.outcomes.filter((outcome) => outcome.length > 1);
    result.state = TrainingDefinitionMapper.stateToDTO(trainingDefinition.state);
    result.title = trainingDefinition.title;
    result.variant_sandboxes = trainingDefinition.variantSandboxes;
    return result;
  }

  static toCreateDTO(trainingDefinition: TrainingDefinition): TrainingDefinitionCreateDTO {
    const result = new TrainingDefinitionCreateDTO();
    result.prerequisites = trainingDefinition.prerequisites.filter((prerequisite) => prerequisite.length > 1);
    result.outcomes = trainingDefinition.outcomes.filter((outcome) => outcome.length > 1);
    result.description = trainingDefinition.description;
    result.state = TrainingDefinitionDTO.StateEnum.UNRELEASED;
    result.title = trainingDefinition.title;
    result.show_stepper_bar = trainingDefinition.showStepperBar;
    result.variant_sandboxes = trainingDefinition.variantSandboxes;
    return result;
  }
}
