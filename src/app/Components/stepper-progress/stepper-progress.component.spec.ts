import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperProgressComponent } from './stepper-progress.component';

describe('StepperProgressComponent', () => {
  let component: StepperProgressComponent;
  let fixture: ComponentFixture<StepperProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
