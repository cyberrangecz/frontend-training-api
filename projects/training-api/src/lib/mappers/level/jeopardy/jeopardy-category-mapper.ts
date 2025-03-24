import { JeopardyCategoryDTO } from '../../../dto/level/jeopardy/category/jeopardy-category-dto';
import { JeopardyCategory } from '@crczp/training-model';
import { JeopardySublevelMapper } from './jeopardy-sublevel-mapper';
import {
    JeopardyCategoryUpdateDTO,
    JeopardyCategoryUpdateDTOClass,
} from '../../../dto/level/jeopardy/category/jeopardy-category-update-dto';

export class JeopardyCategoryMapper {
    public static fromDto(dto: JeopardyCategoryDTO): JeopardyCategory {
        const category = new JeopardyCategory();
        category.id = dto.id;
        category.title = dto.title;
        category.color = this.intColorToHex(dto.color);
        category.sublevels = dto.sublevels.map(JeopardySublevelMapper.fromDto);
        return category;
    }

    public static toUpdateDto(category: JeopardyCategory): JeopardyCategoryUpdateDTO {
        const dto = new JeopardyCategoryUpdateDTOClass();
        dto.id = category.id;
        dto.title = category.title;
        dto.color = this.hexColorToInt(category.color);
        dto.sublevels = category.sublevels.map(JeopardySublevelMapper.toUpdateDto);
        return dto;
    }

    private static intColorToHex(rgba: number): string {
        return rgba.toString(16);
    }

    private static hexColorToInt(hex: string): number {
        return parseInt(hex, 16);
    }
}
