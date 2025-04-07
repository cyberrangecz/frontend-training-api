import { UserRefDTO } from '../../user/user-ref-dto';
import { TeamDTO } from '../../user/team/team-dto';

export interface TrainingInstanceLobbyDTO {
    users_queue: UserRefDTO[];

    teams: TeamDTO[];
}
