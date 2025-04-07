import { UserRefDTO } from '../user-ref-dto';

export class TeamDTO {
    id: number;
    name: string;
    locked: boolean;
    members: UserRefDTO[];
}
