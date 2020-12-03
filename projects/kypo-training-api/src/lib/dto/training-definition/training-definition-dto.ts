import { AbstractLevelDTO } from '../level/abstract-level-dto';

export class TrainingDefinitionDTO {
  levels?: AbstractLevelDTO[];
  description?: string;
  id?: number;
  outcomes?: string[];
  prerequisities?: string[];
  show_stepper_bar?: boolean;
  state?: TrainingDefinitionDTO.StateEnum;
  title?: string;
  estimated_duration: number;
  last_edited?: Date;
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
