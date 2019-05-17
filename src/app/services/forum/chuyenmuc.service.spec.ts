import { TestBed } from '@angular/core/testing';

import { ChuyenmucService } from './chuyenmuc.service';

describe('ChuyenmucService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChuyenmucService = TestBed.get(ChuyenmucService);
    expect(service).toBeTruthy();
  });
});
