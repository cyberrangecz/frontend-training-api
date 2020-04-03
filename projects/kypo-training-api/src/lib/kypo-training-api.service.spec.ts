import { TestBed } from '@angular/core/testing';

import { KypoTrainingApiService } from './kypo-training-api.service';

describe('KypoTrainingApiService', () => {
  let service: KypoTrainingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KypoTrainingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
