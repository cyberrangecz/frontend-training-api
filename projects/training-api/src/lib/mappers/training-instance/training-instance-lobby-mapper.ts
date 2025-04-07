import { TrainingInstanceLobby } from '@crczp/training-model';
import { TeamMapper } from '../user/team-mapper';
import { UserMapper } from '../user/user-mapper';
import { LobbyChangesDTO } from '../../dto/training-instance/lobby/lobby-changes-dto';
import { TrainingInstanceLobbyDTO } from '../../dto/training-instance/lobby/training-instance-lobby-dto';

/**
 * @dynamic
 */
export class TrainingInstanceLobbyMapper {
    static fromDTO(dto: TrainingInstanceLobbyDTO): TrainingInstanceLobby {
        const result = new TrainingInstanceLobby();
        result.teams = dto.teams.map(TeamMapper.fromDTO);
        result.usersQueue = UserMapper.fromDTOs(dto.users_queue);
        return result;
    }

    static mapChangesToDTO(changes: { userId: number; teamId: number }[]): LobbyChangesDTO[] {
        return changes.map((change) => ({ user_id: change.userId, team_id: change.teamId }));
    }
}
