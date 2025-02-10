
import { Paginated } from '../rest/paginated';
import { DetectionEventDTO } from './detection-event-dto';

export interface DetectionEventRestResource {
  /**
   * Retrieved Detection events from databases.
   */
  content?: DetectionEventDTO[];
  /**
   * Paginated including: page number, number of elements in page, size, total elements and total pages.
   */
  pagination?: Paginated;
}
