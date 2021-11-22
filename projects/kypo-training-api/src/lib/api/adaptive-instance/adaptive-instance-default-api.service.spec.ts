import { async, TestBed } from '@angular/core/testing';
import { AdaptiveInstanceDefaultApi } from './adaptive-instance-default-api.service';
import { KypoTrainingApiContext } from '../../other/kypo-training-api-context';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  createContext,
  createPagination,
  mockPaginatedTI,
  mockPaginatedTIDTO,
  mockTI,
  mockTIDTO,
} from '../../other/testing/testing-commons.spec';
import { asyncData } from '@sentinel/common';

describe('AdaptiveInstanceDefaultApi', () => {
  let service: AdaptiveInstanceDefaultApi;
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; delete: jasmine.Spy; put: jasmine.Spy };
  let context: KypoTrainingApiContext;

  beforeEach(async(() => {
    context = createContext();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdaptiveInstanceDefaultApi, { provide: KypoTrainingApiContext, useValue: context }],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'put']);
    service = new AdaptiveInstanceDefaultApi(httpClientSpy as any, context);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map trainingInstanceDTO to TrainingInstance', (done: DoneFn) => {
    const mockData = mockTIDTO();

    httpClientSpy.get.and.returnValue(asyncData(mockData));

    service.get(5).subscribe((data) => {
      expect(data).toEqual(mockTI());
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should map paginated trainingInstanceDTO to TrainingInstance for all training instances', (done: DoneFn) => {
    const mockData = mockPaginatedTIDTO();
    const pagination = createPagination();
    httpClientSpy.get.and.returnValue(asyncData(mockData));

    service.getAll(pagination).subscribe((data) => {
      expect(data).toEqual(mockPaginatedTI());
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should create new training instance from trainingInstance', (done: DoneFn) => {
    const mockData = mockTI();

    httpClientSpy.post.and.returnValue(asyncData(mockTIDTO()));

    service.create(mockData).subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    }, done.fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should delete training instance', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(asyncData(null));

    service.delete(5).subscribe(() => {
      done();
    }, done.fail);

    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

  it('should archive training instance', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData(true));

    service.archive(5).subscribe((data) => {
      expect(data).toEqual(true);
      done();
    }, done.fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
