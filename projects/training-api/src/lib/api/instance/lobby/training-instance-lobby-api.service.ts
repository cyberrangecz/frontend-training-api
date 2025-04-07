import { Observable } from 'rxjs';
import { Team, TrainingInstanceLobby } from '@crczp/training-model';

export abstract class TrainingInstanceLobbyApi {
    abstract getPlayersWaiting(accessToken: string, unassignedOnly?: boolean): Observable<number>;

    /**
     * Sends http request to retrieve TrainingInstanceLobby of a TrainingInstance
     * @param instanceId id of the Training instance
     */
    abstract getInstanceLobby(instanceId: number): Observable<TrainingInstanceLobby>;

    /**
     * Sends http request to retrieve create and retrieve a new Team
     * @param instanceId id of the parent Training instance
     * @param name name of the new team
     */
    abstract createTeam(instanceId: number, name: string): Observable<Team>;

    /**
     * Sends http request to lock team, allowing the team to join run
     * as soon as the instance starts
     * @param teamId name of the new team
     */
    abstract lockTeam(teamId: number): Observable<void>;

    /**
     * Sends http request to change team's name
     * @param teamId id of team to rename
     * @param newName the new name
     */
    abstract renameTeam(teamId: number, newName: string): Observable<Team>;

    /**
     * Sends http request to disband team, removing the members to queue
     * and deleting the team
     * @param teamId id of team to disband
     */
    abstract disbandTeam(teamId: number): Observable<void>;

    /**
     * Sends http request to move players between two teams
     * @param teamIdFrom team to move players from
     * @param teamIdTo team to move players to
     * @param playerIds specific players to move
     */
    abstract transferPlayersBetweenTeams(teamIdFrom: number, teamIdTo: number, playerIds: number[]): Observable<void>;

    /**
     * Sends http request to assign players to teams
     * @param instanceId training instance id
     * @param changes list of userId, teamId pairs, signifying to which team to assign each player
     */
    abstract transferPlayersToTeams(
        instanceId: number,
        changes: { teamId: number; userId: number }[],
    ): Observable<void>;

    /**
     * Sends http request to unassign players from teams and return them to queue
     * @param instanceId training instance id
     * @param changes list of userId, teamId pairs, signifying from which team to remove which player
     */
    abstract transferPlayersToQueue(
        instanceId: number,
        changes: { teamId: number; userId: number }[],
    ): Observable<void>;
}
