import {TrainingDefinitionInfoDTO} from './training-definition-info-dto';
import {Paginated} from '../rest/paginated';

export interface TrainingDefinitionInfoRestResource {
  content?: Array<TrainingDefinitionInfoDTO>;
  pagination?: Paginated;
}
