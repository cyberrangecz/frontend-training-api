import { KypoPagination } from 'kypo-common';
import { Paginated } from '../dto/rest/paginated';

export class PaginationMapper {
  static fromJavaAPI(paginationDTO: Paginated): KypoPagination {
    return new KypoPagination(
      paginationDTO.number,
      paginationDTO.number_of_elements,
      paginationDTO.size,
      paginationDTO.total_elements,
      paginationDTO.total_pages
    );
  }
}
