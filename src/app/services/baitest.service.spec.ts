import { TestBed } from '@angular/core/testing';

import { BaitestService } from './baitest.service';

describe('BaitestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaitestService = TestBed.get(BaitestService);
    expect(service).toBeTruthy();
  });
});
