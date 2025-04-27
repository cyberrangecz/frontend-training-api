import { TeamDTO } from '../user/team/team-dto';

export class ScoreboardEntryDTO {
    team: TeamDTO;
    score: number;
    position: number;
}
