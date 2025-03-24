import { JeopardySublevelDTO } from '../sublevel/jeopardy-sublevel-dto';

export interface JeopardyCategoryDTO {
    id: number;
    title: string;
    color: number;
    sublevels: JeopardySublevelDTO[];
}
