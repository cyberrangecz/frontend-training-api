import { Team } from '@crczp/training-model';
import { TeamDTO } from '../../dto/user/team/team-dto';
import { UserMapper } from './user-mapper';

export class TeamMapper {
    static fromDTO(dto: TeamDTO): Team {
        const result = new Team();
        result.id = dto.id;
        result.name = dto.name;
        result.members = UserMapper.fromDTOs(dto.members);
        result.locked = dto.locked;
        return result;
    }
}
