import { HttpParams } from '@angular/common/http';
import { OffsetPaginationEvent } from '@sentinel/common/pagination';

/**
 * Class transforming requested pagination object to http params into microservice supported format
 */
export class PaginationParams {
    /**
     * Transforms requested pagination object to http params in trainings microservice format (JAVA API)
     * @param pagination requested pagination
     */
    static forJavaAPI(pagination: OffsetPaginationEvent): HttpParams {
        if (pagination) {
            if (pagination.sort) {
                const sort = pagination.sort + ',' + (pagination.sortDir ? pagination.sortDir : 'asc');
                return new HttpParams()
                    .set('page', pagination.page.toString())
                    .set('size', pagination.size.toString())
                    .set('sort', sort);
            } else {
                return new HttpParams().set('page', pagination.page.toString()).set('size', pagination.size.toString());
            }
        }
        return new HttpParams().set('page', '0').set('size', '10');
    }
}
