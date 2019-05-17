import { TestBed } from '@angular/core/testing';

import { BaivietService } from './baiviet.service';

describe('BaivietService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaivietService = TestBed.get(BaivietService);
    expect(service).toBeTruthy();
  });
});
