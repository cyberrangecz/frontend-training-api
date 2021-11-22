import { TestBed } from '@angular/core/testing';
import { AdaptiveDefinitionApiService } from './adaptive-definition-api.service';
import { KypoTrainingApiContext } from '../../other/kypo-training-api-context';
import {
  createContext,
  mockInfoPhase,
  mockInfoPhaseDTO,
  mockTask,
  mockTaskDTO,
  mockTD,
  mockTdDTO,
} from '../../other/testing/testing-commons.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdaptiveDefinitionDefaultApiService } from './adaptive-definition-default-api.service';
import { asyncData } from '@sentinel/common';

describe('AdaptiveDefinitionDefaultApiService', () => {
  let service: AdaptiveDefinitionApiService;
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; delete: jasmine.Spy; put: jasmine.Spy };
  let context: KypoTrainingApiContext;

  beforeEach(() => {
    context = createContext();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdaptiveDefinitionDefaultApiService, { provide: KypoTrainingApiContext, useValue: context }],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'put']);
    service = new AdaptiveDefinitionDefaultApiService(httpClientSpy as any, context);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map trainingDefinitionDTO to TrainingDefinition adaptive training definition', (done: DoneFn) => {
    const mockData = mockTdDTO();

    httpClientSpy.get.and.returnValue(asyncData(mockData));

    service.get(1).subscribe((data) => {
      expect(data).toEqual(mockTD());
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should raise error when mapping trainingDefinitionDTO to TrainingDefinition adaptive training definition', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData(null));

    service.get(1).subscribe(
      () => {
        done.fail;
      },
      () => done()
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should create adaptive training definition', (done: DoneFn) => {
    const mockData = mockTdDTO();

    httpClientSpy.post.and.returnValue(asyncData(mockData));

    service.create(mockTD()).subscribe((data) => {
      expect(data).toEqual(mockTD());
      done();
    }, done.fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should delete adaptive training definition', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(asyncData(null));

    service.delete(1).subscribe(() => {
      done();
    }, done.fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('should update adaptive training definition', (done: DoneFn) => {
    const mockData = mockTD();

    httpClientSpy.put.and.returnValue(asyncData(mockData.id));

    service.update(mockTD()).subscribe((data) => {
      expect(data).toEqual(mockData.id);
      done();
    }, done.fail);

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should map InfoPhase to InfoPhaseDTO for adaptive training definition', (done: DoneFn) => {
    const mockData = mockInfoPhaseDTO();

    httpClientSpy.post.and.returnValue(asyncData(mockData));

    service.createInfoPhase(1).subscribe((data) => {
      expect(data).toEqual(mockInfoPhase());
      done();
    }, done.fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should get InfoPhaseDTO to InfoPhase for adaptive training definition', (done: DoneFn) => {
    const mockData = mockInfoPhaseDTO();

    httpClientSpy.get.and.returnValue(asyncData(mockData));

    service.getPhase(1, 1).subscribe((data) => {
      expect(data).toEqual(mockInfoPhase());
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should delete phase for adaptive training definition', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(asyncData(null));

    service.delete(1).subscribe(() => {
      done();
    }, done.fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('should raise error when mapping InfoPhase to InfoPhaseDTO for adaptive training definition', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(asyncData(null));

    service.createInfoPhase(1).subscribe(
      () => {
        done.fail;
      },
      () => done()
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should map Task to TaskDTO for adaptive training definition', (done: DoneFn) => {
    const mockData = mockTaskDTO();

    httpClientSpy.post.and.returnValue(asyncData(mockData));

    service.createTask(1, 1).subscribe((data) => {
      expect(data).toEqual(mockTask());
      done();
    }, done.fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should clone Task for adaptive training definition', (done: DoneFn) => {
    const mockData = mockTaskDTO();

    httpClientSpy.post.and.returnValue(asyncData(mockData));

    service.cloneTask(1, 1, mockTask()).subscribe((data) => {
      expect(data).toEqual(mockTask());
      done();
    }, done.fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should delete Task for adaptive training definition', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(asyncData(null));

    service.deleteTask(1, 1, 1).subscribe(() => {
      done();
    }, done.fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('should retrieve Task for adaptive training definition', (done: DoneFn) => {
    const mockData = mockTaskDTO();

    httpClientSpy.get.and.returnValue(asyncData(mockData));

    service.getTask(1, 1, 1).subscribe((data) => {
      expect(data).toEqual(mockTask());
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should raise error while getting Task for adaptive training definition', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData(null));

    service.getTask(1, 1, 1).subscribe(
      () => {
        done.fail;
      },
      () => done()
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
