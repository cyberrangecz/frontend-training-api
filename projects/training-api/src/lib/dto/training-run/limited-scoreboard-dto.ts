import { ScoreboardEntryDTO } from './scoreboard-entry-dto';

export class LimitedScoreboardDTO {
    limited_scoreboard: ScoreboardEntryDTO[];

    team_count_before_relative: number;
    team_count_after_relative: number;
}
