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

export interface BasicLevelInfoDTO {
  id?: number;
  level_type?: BasicLevelInfoDTO.LevelTypeEnum;
  order?: number;
  title?: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BasicLevelInfoDTO {
  export type LevelTypeEnum = 'ASSESSMENT_LEVEL' | 'INFO_LEVEL' | 'GAME_LEVEL';
  export const LevelTypeEnum = {
    ASSESSMENT: 'ASSESSMENT_LEVEL' as LevelTypeEnum,
    INFO: 'INFO_LEVEL' as LevelTypeEnum,
    GAME: 'GAME_LEVEL' as LevelTypeEnum,
  };
}
