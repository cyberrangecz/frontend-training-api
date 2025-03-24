import { JeopardyCategoryDTO } from './category/jeopardy-category-dto';

export interface JeopardyLevelDTO {
    id: number;
    title: string;
    max_score: number;
    estimated_duration: number;
    minimal_possibleSolve_time: number;
    order: number;

    categories: JeopardyCategoryDTO[];
}
