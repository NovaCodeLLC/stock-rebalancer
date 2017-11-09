import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPortfolioComponent } from './final-portfolio.component';

describe('FinalPortfolioComponent', () => {
  let component: FinalPortfolioComponent;
  let fixture: ComponentFixture<FinalPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
