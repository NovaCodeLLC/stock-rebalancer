import { TestBed, inject } from '@angular/core/testing';

import { SharedServices } from './shared-services.service';

describe('SharedServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedServices]
    });
  });

  it('should be created', inject([SharedServices], (service: SharedServices) => {
    expect(service).toBeTruthy();
  }));
});
