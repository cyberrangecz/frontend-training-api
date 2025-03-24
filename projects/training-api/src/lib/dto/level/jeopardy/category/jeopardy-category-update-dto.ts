import { JeopardySublevelUpdateDTO } from '../sublevel/jeopardy-sublevel-update-dto';

export interface JeopardyCategoryUpdateDTO {
    id: number;
    title?: string;
    color?: number;
    sublevels?: JeopardySublevelUpdateDTO[];
}

export class JeopardyCategoryUpdateDTOClass implements JeopardyCategoryUpdateDTO {
    id: number;
    title: string;
    color: number;
    sublevels: JeopardySublevelUpdateDTO[];
}
