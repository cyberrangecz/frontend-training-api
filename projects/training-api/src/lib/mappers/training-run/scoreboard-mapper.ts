import { ScoreboardEntryDTO } from '../../dto/training-run/scoreboard-entry-dto';
import { LimitedScoreboard, ScoreboardEntry } from '@crczp/training-model';
import { TeamMapper } from '../user/team-mapper';
import { LimitedScoreboardDTO } from '../../dto/training-run/limited-scoreboard-dto';

export class ScoreboardMapper {
    public static fromDTO(dto: ScoreboardEntryDTO): ScoreboardEntry {
        const result = new ScoreboardEntry();
        result.team = TeamMapper.fromDTO(dto.team);
        result.score = dto.score;
        result.position = dto.position;
        return result;
    }

    public static limitedFromDTO(dto: LimitedScoreboardDTO): LimitedScoreboard {
        const result = new LimitedScoreboard();
        result.scoreboard = dto.limited_scoreboard.map((entry) => ScoreboardMapper.fromDTO(entry));
        result.countBeforeUserTeam = dto.team_count_before_relative;
        result.countAfterUserTeam = dto.team_count_after_relative;
        return result;
    }
}
