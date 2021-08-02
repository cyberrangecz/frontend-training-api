/**
 * REST API documentation
 * Developed By CSIRT team
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Training Definition to update.
 */
export class TrainingDefinitionUpdateDTO {
  description?: string;
  id?: number;
  outcomes?: string[];
  prerequisites?: string[];
  show_stepper_bar?: boolean;
  state?: TrainingDefinitionUpdateDTO.StateEnum;
  title?: string;
  variant_sandboxes?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TrainingDefinitionUpdateDTO {
  export type StateEnum = 'PRIVATED' | 'RELEASED' | 'ARCHIVED' | 'UNRELEASED';
  export const StateEnum = {
    PRIVATED: 'PRIVATED' as StateEnum,
    RELEASED: 'RELEASED' as StateEnum,
    ARCHIVED: 'ARCHIVED' as StateEnum,
    UNRELEASED: 'UNRELEASED' as StateEnum,
  };
}
