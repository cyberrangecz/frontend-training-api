import { TrainingRunApi } from './training-run-api.service';
import { TrainingRunDefaultApi } from './training-run-default-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainingApiContext } from '../../other/training-api-context';

/**
 * Interface describing additional endpoints for linear runs
 */
export abstract class LinearTrainingRunApi extends TrainingRunApi {}

/**
 * Implementation additional endpoints for linear runs
 */
@Injectable()
export class LinearTrainingRunDefaultApi extends TrainingRunDefaultApi implements LinearTrainingRunApi {
    constructor(http: HttpClient, context: TrainingApiContext) {
        super(http, context);
    }
}
