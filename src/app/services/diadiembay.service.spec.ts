import { TestBed } from '@angular/core/testing';

import { DiadiembayService } from './diadiembay.service';

describe('DiadiembayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiadiembayService = TestBed.get(DiadiembayService);
    expect(service).toBeTruthy();
  });
});
