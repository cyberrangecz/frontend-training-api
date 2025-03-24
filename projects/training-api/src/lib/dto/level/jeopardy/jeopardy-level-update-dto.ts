import { AbstractLevelDTO } from '../abstract-level-dto';
import { JeopardyCategoryUpdateDTO } from './category/jeopardy-category-update-dto';

export interface JeopardyLevelUpdateDTO {
    id: number;
    order?: number;
    snapshot_hook?: any;
    title?: string;
    level_type?: AbstractLevelDTO.LevelTypeEnum;
    categories?: JeopardyCategoryUpdateDTO[];
}

export class JeopardyLevelUpdateDTOClass implements JeopardyLevelUpdateDTO {
    id: number;
    order: number;
    snapshot_hook: any;
    title: string;
    level_type: AbstractLevelDTO.LevelTypeEnum;
    categories: JeopardyCategoryUpdateDTO[];
}
