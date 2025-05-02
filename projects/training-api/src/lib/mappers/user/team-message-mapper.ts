import { TeamMessage, TrainingUser } from '@crczp/training-model';
import { TeamMessageDTO } from '../../dto/user/team/team-message-dto';

export class TeamMessageMapper {
    static fromDTO(dto: TeamMessageDTO, userId: TrainingUser['id']): TeamMessage {
        const result = new TeamMessage();
        result.id = dto.id;
        result.userId = userId;
        result.time = new Date(dto.time);
        result.message = dto.message;
        return result;
    }
}
