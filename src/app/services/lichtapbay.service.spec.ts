import { TestBed } from '@angular/core/testing';

import { LichtapbayService } from './lichtapbay.service';

describe('LichtapbayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LichtapbayService = TestBed.get(LichtapbayService);
    expect(service).toBeTruthy();
  });
});
