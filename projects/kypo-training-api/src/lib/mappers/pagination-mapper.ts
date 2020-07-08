import { SentinelPagination } from '@sentinel/common';
import { Paginated } from '../dto/rest/paginated';

export class PaginationMapper {
  static fromJavaAPI(paginationDTO: Paginated): SentinelPagination {
    return new SentinelPagination(
      paginationDTO.number,
      paginationDTO.number_of_elements,
      paginationDTO.size,
      paginationDTO.total_elements,
      paginationDTO.total_pages
    );
  }
}
