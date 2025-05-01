import { TrainingRunApi } from './training-run-api.service';
import { Observable } from 'rxjs';
import { LimitedScoreboard, ScoreboardEntry, Team, TeamMessage } from '@crczp/training-model';
import { TeamDTO } from '../../dto/user/team/team-dto';
import { map } from 'rxjs/operators';
import { TeamMapper } from '../../mappers/user/team-mapper';
import { LimitedScoreboardDTO } from '../../dto/training-run/limited-scoreboard-dto';
import { ScoreboardMapper } from '../../mappers/training-run/scoreboard-mapper';
import { ScoreboardEntryDTO } from '../../dto/training-run/scoreboard-entry-dto';
import { TrainingRunDefaultApi } from './training-run-default-api.service';
import { Injectable } from '@angular/core';
import { TeamMessageDTO } from '../../dto/user/team/team-message-dto';
import { FilterParams } from '../../http/params/filter-params';
import { SentinelFilter } from '@sentinel/common/filter';
import { TeamMessageMapper } from '../../mappers/user/team-message-mapper';
import { HttpClient } from '@angular/common/http';
import { TrainingApiContext } from '../../other/training-api-context';

/**
 * Interface describing additional endpoints for coop runs
 */
export abstract class CoopTrainingRunApi extends TrainingRunApi {
    /**
     * Sends http request to retrieve scoreboard of a training instance
     * with only places relevant to the team of user included
     * @param trainingRunId id of a training instance
     */
    abstract getLocalizedScoreboard(trainingRunId: number): Observable<LimitedScoreboard>;

    /**
     * Sends http request to retrieve messages of a team chat
     * @param teamId id of the team
     * @param lastFetch date of the last message fetched in UTC-0 epoch milliseconds
     */
    abstract getTeamMessages(teamId: number, lastFetch: Date): Observable<TeamMessage[]>;

    /**
     * Sends http request to post a message to a team chat
     * @param teamId id of the team
     * @param senderId this id is not sent to the API, just mapped to the result
     * @param message message to be posted
     */
    abstract postTeamMessage(teamId: number, senderId: number, message: string): Observable<TeamMessage>;

    /**
     * Sends http request to retrieve scoreboard of a training instance
     * @param instanceId id of a training instance
     */
    abstract getFullScoreboard(instanceId: number): Observable<ScoreboardEntry[]>;

    /**
     * Sends http request to retrieve team of a training run
     * @param trainingRunId id of a training run
     */
    abstract getTeam(trainingRunId: number): Observable<Team>;
}

/**
 * Implementation additional endpoints for coop runs
 */
@Injectable()
export class CoopTrainingRunDefaultApi extends TrainingRunDefaultApi implements CoopTrainingRunApi {
    constructor(http: HttpClient, context: TrainingApiContext) {
        super(http, context);
    }

    /**
     * Sends http request to retrieve team of a training run
     * @param trainingRunId id of a training run
     */
    getTeam(trainingRunId: number): Observable<Team> {
        return this.http
            .get<TeamDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/team`)
            .pipe(map((response) => TeamMapper.fromDTO(response)));
    }

    /**
     * Sends http request to retrieve scoreboard of a training instance
     * @param trainingRunId id of a training instance
     */
    getLocalizedScoreboard(trainingRunId: number): Observable<LimitedScoreboard> {
        return this.http
            .get<LimitedScoreboardDTO>(`${this.trainingRunsEndpointUri}/${trainingRunId}/scoreboard`)
            .pipe(map((scoreboardDto) => ScoreboardMapper.limitedFromDTO(scoreboardDto)));
    }

    /**
     * Sends http request to retrieve scoreboard of a training instance
     * @param trainingInstanceId id of a training instance
     */
    getFullScoreboard(trainingInstanceId: number): Observable<ScoreboardEntry[]> {
        return this.http
            .get<ScoreboardEntryDTO[]>(`${this.trainingRunsEndpointUri}/${trainingInstanceId}/scoreboard-full`)
            .pipe(map((response) => response.map(ScoreboardMapper.fromDTO)));
    }

    getTeamMessages(teamId: number, lastFetch: Date): Observable<TeamMessage[]> {
        return this.http
            .get<{ [key: number]: TeamMessageDTO[] }>(`${this.trainingRunsEndpointUri}/team/${teamId}/message`, {
                params: FilterParams.create([
                    new SentinelFilter('lastFetch', String(Math.floor(lastFetch.getTime() / 1000))),
                ]),
            })
            .pipe(
                map((dto) =>
                    Object.keys(dto)
                        .map((key) =>
                            dto[Number(key)].map((message) => TeamMessageMapper.fromDTO(message, Number(key))),
                        )
                        .reduce((reduced, next) => reduced.concat(next), []),
                ),
            );
    }

    postTeamMessage(teamId: number, senderId: number, message: string): Observable<TeamMessage> {
        return this.http
            .post<TeamMessageDTO>(`${this.trainingRunsEndpointUri}/team/${teamId}/message`, message)
            .pipe(map((dto) => TeamMessageMapper.fromDTO(dto, senderId)));
    }
}
