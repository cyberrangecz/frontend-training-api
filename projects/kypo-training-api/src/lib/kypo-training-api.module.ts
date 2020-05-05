import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { TrainingDefinitionApi } from './api/definition/training-definition-api.service';
import { TrainingDefinitionDefaultApi } from './api/definition/training-definition-default-api.service';
import { TrainingEventApi } from './api/event/training-event-api.service';
import { TrainingEventDefaultApi } from './api/event/training-event-default-api.service';
import { TrainingInstanceApi } from './api/instance/training-instance-api.service';
import { TrainingInstanceDefaultApi } from './api/instance/training-instance-default-api.service';
import { TrainingRunApi } from './api/run/training-run-api.service';
import { TrainingRunDefaultApi } from './api/run/training-run-default-api.service';
import { UserApi } from './api/user/user-api.service';
import { UserDefaultApi } from './api/user/user-default-api.service';
import { VisualizationApi } from './api/visualization/visualization-api.service';
import { VisualizationDefaultApi } from './api/visualization/visualization-default-api.service';
import { KypoTrainingApiConfig } from './other/kypo-training-api-config';
import { KypoTrainingApiContext } from './other/kypo-training-api-context';

@NgModule({
  imports: [CommonModule],
  providers: [
    KypoTrainingApiContext,
    { provide: TrainingDefinitionApi, useClass: TrainingDefinitionDefaultApi },
    { provide: TrainingInstanceApi, useClass: TrainingInstanceDefaultApi },
    { provide: TrainingRunApi, useClass: TrainingRunDefaultApi },
    { provide: UserApi, useClass: UserDefaultApi },
    { provide: TrainingEventApi, useClass: TrainingEventDefaultApi },
    { provide: VisualizationApi, useClass: VisualizationDefaultApi },
  ],
})
export class KypoTrainingApiModule {
  constructor(@Optional() @SkipSelf() parentModule: KypoTrainingApiModule) {
    if (parentModule) {
      throw new Error('KypoTrainingApiModule is already loaded. Import it only once in single module hierarchy.');
    }
  }

  static forRoot(config: KypoTrainingApiConfig): ModuleWithProviders<KypoTrainingApiModule> {
    return {
      ngModule: KypoTrainingApiModule,
      providers: [{ provide: KypoTrainingApiConfig, useValue: config }],
    };
  }
}
