import { TestBed } from '@angular/core/testing';

import { FilterproductService } from './filterproduct.service';

describe('FilterproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterproductService = TestBed.get(FilterproductService);
    expect(service).toBeTruthy();
  });
});
