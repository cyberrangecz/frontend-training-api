import {Paginated} from './paginated';
import {UserRefDTO} from '../user/user-ref-dto';

export interface UserRestResource {
  /**
   * Retrieved Training Definitions from databases.
   */
  content?: Array<UserRefDTO>;
  /**
   * Paginated including: page number, number of elements in page, size, total elements and total pages.
   */
  pagination?: Paginated;
}
