import { TrainingTypeEnum } from '@crczp/training-model';
import { TrainingTypeDTO } from '../dto/training-type-dto';

export class TrainingTypeMapper {
    static typeFromDTO(typeDTO: TrainingTypeDTO.TypeEnum, fieldName: string, typeName: string): TrainingTypeEnum {
        switch (typeDTO) {
            case TrainingTypeDTO.TypeEnum.LINEAR:
                return TrainingTypeEnum.LINEAR;
            case TrainingTypeDTO.TypeEnum.COOP:
                return TrainingTypeEnum.COOP;
            default: {
                console.error(
                    `Attribute "${fieldName}" of ${typeName} with value ${typeDTO} does not match any of the training types`,
                );
                return undefined;
            }
        }
    }

    static typeToDTO(type: TrainingTypeEnum, fieldName: string, typeName: string): TrainingTypeDTO.TypeEnum {
        switch (type) {
            case TrainingTypeEnum.LINEAR:
                return TrainingTypeDTO.TypeEnum.LINEAR;
            case TrainingTypeEnum.COOP:
                return TrainingTypeDTO.TypeEnum.COOP;
            default: {
                console.error(
                    `Attribute "${fieldName}" of ${typeName} with value ${type} does not match any of the training types`,
                );
                return undefined;
            }
        }
    }
}
