import { TrainingInstanceLobbyApi } from './training-instance-lobby-api.service';
import { HttpClient } from '@angular/common/http';
import { TrainingApiContext } from '../../../other/training-api-context';
import { Observable } from 'rxjs';
import { Team, TrainingInstanceLobby } from '@crczp/training-model';
import { map } from 'rxjs/operators';
import { FilterParams } from '../../../http/params/filter-params';
import { SentinelFilter } from '@sentinel/common/filter';
import { TeamDTO } from '../../../dto/user/team/team-dto';
import { TeamMapper } from '../../../mappers/user/team-mapper';
import { TrainingInstanceLobbyMapper } from '../../../mappers/training-instance/training-instance-lobby-mapper';
import { Injectable } from '@angular/core';
import { TrainingInstanceLobbyDTO } from '../../../dto/training-instance/lobby/training-instance-lobby-dto';

@Injectable()
export class TrainingInstanceLobbyDefaultApi extends TrainingInstanceLobbyApi {
    private readonly trainingInstanceLobbyUriExtension = 'instance-lobby';
    private readonly trainingInstanceLobbyUri: string;

    constructor(
        private http: HttpClient,
        private context: TrainingApiContext,
    ) {
        super();
        this.trainingInstanceLobbyUri = this.context.config.trainingBasePath + this.trainingInstanceLobbyUriExtension;
    }

    getPlayersWaiting(accessToken: string, unassignedOnly?: boolean): Observable<number> {
        const params = FilterParams.create(
            unassignedOnly === undefined ? [] : [new SentinelFilter('unassignedOnly', String(unassignedOnly))],
        );
        return this.http.post<number>(`${this.trainingInstanceLobbyUri}/${accessToken}/count`, {}, { params });
    }

    createTeam(instanceId: number, name: string): Observable<Team> {
        const params = FilterParams.create([new SentinelFilter('name', name)]);
        return this.http
            .post<TeamDTO>(`${this.trainingInstanceLobbyUri}/${instanceId}/team`, {}, { params })
            .pipe(map(TeamMapper.fromDTO));
    }

    disbandTeam(teamId: number): Observable<void> {
        return this.http.delete<void>(`${this.trainingInstanceLobbyUri}/team/${teamId}`);
    }

    getInstanceLobby(instanceId: number): Observable<TrainingInstanceLobby> {
        return this.http
            .get<TrainingInstanceLobbyDTO>(`${this.trainingInstanceLobbyUri}/${instanceId}`)
            .pipe(map(TrainingInstanceLobbyMapper.fromDTO));
    }

    lockTeam(teamId: number): Observable<void> {
        return this.http.put<void>(`${this.trainingInstanceLobbyUri}/team/${teamId}/lock`, {});
    }

    renameTeam(teamId: number, newName: string): Observable<Team> {
        const params = FilterParams.create([new SentinelFilter('name', newName)]);
        return this.http
            .put<TeamDTO>(`${this.trainingInstanceLobbyUri}/team/${teamId}/rename`, {}, { params })
            .pipe(map(TeamMapper.fromDTO));
    }

    transferPlayersBetweenTeams(teamIdFrom: number, teamIdTo: number, playerIds: number[]): Observable<void> {
        const params = FilterParams.create([
            new SentinelFilter('from', String(teamIdFrom)),
            new SentinelFilter('to', String(teamIdTo)),
        ]);
        return this.http.put<void>(`${this.trainingInstanceLobbyUri}/team/between-teams`, playerIds, { params });
    }

    transferPlayersToQueue(instanceId: number, changes: { teamId: number; userId: number }[]): Observable<void> {
        return this.http.put<void>(
            `${this.trainingInstanceLobbyUri}/${instanceId}/team/to-queue`,
            TrainingInstanceLobbyMapper.mapChangesToDTO(changes),
        );
    }

    transferPlayersToTeams(instanceId: number, changes: { teamId: number; userId: number }[]): Observable<void> {
        return this.http.put<void>(
            `${this.trainingInstanceLobbyUri}/${instanceId}/team/to-teams`,
            TrainingInstanceLobbyMapper.mapChangesToDTO(changes),
        );
    }
}
