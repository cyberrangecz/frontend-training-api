import { AbstractLevelDTO } from '../level/abstract-level-dto';
import { AbstractPhaseDTO } from '../phase/abstract-phase-dto';

export class TrainingDefinitionDTO {
  levels?: AbstractLevelDTO[];
  phases?: AbstractPhaseDTO[];
  description?: string;
  id?: number;
  outcomes?: string[];
  prerequisites?: string[];
  show_stepper_bar?: boolean;
  state?: TrainingDefinitionDTO.StateEnum;
  title?: string;
  estimated_duration: number;
  last_edited?: Date;
  variant_answers: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TrainingDefinitionDTO {
  export type StateEnum = 'RELEASED' | 'ARCHIVED' | 'UNRELEASED';
  export const StateEnum = {
    RELEASED: 'RELEASED' as StateEnum,
    ARCHIVED: 'ARCHIVED' as StateEnum,
    UNRELEASED: 'UNRELEASED' as StateEnum,
  };
}
