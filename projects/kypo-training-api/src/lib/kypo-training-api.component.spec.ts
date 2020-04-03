import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KypoTrainingApiComponent } from './kypo-training-api.component';

describe('KypoTrainingApiComponent', () => {
  let component: KypoTrainingApiComponent;
  let fixture: ComponentFixture<KypoTrainingApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KypoTrainingApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KypoTrainingApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
