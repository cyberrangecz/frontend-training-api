import { Injectable } from '@angular/core';
import { KypoTrainingApiConfig } from './kypo-training-api-config';

@Injectable()
export class KypoTrainingApiContext {
  private readonly _config: KypoTrainingApiConfig;

  get config(): KypoTrainingApiConfig {
    return this._config;
  }

  constructor(config: KypoTrainingApiConfig) {
    this._config = config;
  }
}
