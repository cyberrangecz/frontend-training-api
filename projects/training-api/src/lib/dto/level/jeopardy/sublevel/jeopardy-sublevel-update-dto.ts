import { TrainingLevelUpdateDto, TrainingLevelUpdateDTOClass } from '../../training/training-level-update-dto';

export interface JeopardySublevelUpdateDTO extends TrainingLevelUpdateDto {
    description?: string;
}

export class JeopardySublevelUpdateDTOClass extends TrainingLevelUpdateDTOClass implements JeopardySublevelUpdateDTO {
    description: string;
}
