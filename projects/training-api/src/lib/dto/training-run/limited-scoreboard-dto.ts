import { ScoreboardEntryDTO } from './scoreboard-entry-dto';

export class LimitedScoreboardDTO {
    scoreboard: ScoreboardEntryDTO[];

    teamCountBeforeRelative: number;
    teamCountAfterRelative: number;
}
