import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RebalancePortfolioComponent } from './rebalance-portfolio.component';

describe('RebalancePortfolioComponent', () => {
  let component: RebalancePortfolioComponent;
  let fixture: ComponentFixture<RebalancePortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebalancePortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebalancePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
