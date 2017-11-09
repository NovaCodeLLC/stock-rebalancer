import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPortfolioComponent } from './initial-portfolio.component';

describe('InitialPortfolioComponent', () => {
  let component: InitialPortfolioComponent;
  let fixture: ComponentFixture<InitialPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
