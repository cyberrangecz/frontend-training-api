import { async, TestBed } from '@angular/core/testing';
import { AdaptiveRunDefaultApi } from './adaptive-run-default-api.service';
import { KypoTrainingApiContext } from '../../other/kypo-training-api-context';
import { createContext, mockInfoPhase, mockInfoPhaseDTO } from '../../other/testing/testing-commons.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { asyncData } from '@sentinel/common';

describe('AdaptiveRunDefaultApi', () => {
  let service: AdaptiveRunDefaultApi;
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; delete: jasmine.Spy; put: jasmine.Spy; patch: jasmine.Spy };
  let context: KypoTrainingApiContext;

  beforeEach(async(() => {
    context = createContext();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdaptiveRunDefaultApi, { provide: KypoTrainingApiContext, useValue: context }],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'put', 'patch']);
    service = new AdaptiveRunDefaultApi(httpClientSpy as any, context);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete training run', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(asyncData(null));

    service.delete(5).subscribe(() => {
      done();
    }, done.fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('should delete multiple training runs', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(asyncData(null));

    service.deleteMultiple([1, 5]).subscribe(() => {
      done();
    }, done.fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('should get next phase', (done: DoneFn) => {
    const mockData = mockInfoPhaseDTO();

    httpClientSpy.get.and.returnValue(asyncData(mockData));

    service.nextPhase(1).subscribe((data) => {
      expect(data).toEqual(mockInfoPhase());
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should take solution for training run', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData('solution'));

    service.takeSolution(1).subscribe((data) => {
      expect(data).toEqual('solution');
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should evaluate questionnaire for training run', (done: DoneFn) => {
    httpClientSpy.put.and.returnValue(asyncData(null));

    service.evaluateQuestionnaire(1, []).subscribe(() => {
      done();
    }, done.fail);

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should finish training run', (done: DoneFn) => {
    httpClientSpy.put.and.returnValue(asyncData(true));

    service.finish(5).subscribe((data) => {
      expect(data).toEqual(true);
      done();
    }, done.fail);

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should archive training run', (done: DoneFn) => {
    httpClientSpy.patch.and.returnValue(asyncData(true));

    service.archive(5).subscribe((data) => {
      expect(data).toEqual(true);
      done();
    }, done.fail);

    expect(httpClientSpy.patch.calls.count()).toBe(1, 'one call');
  });
});
