import { TestBed } from '@angular/core/testing';

import { FiltercalendarService } from './filtercalendar.service';

describe('FiltercalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltercalendarService = TestBed.get(FiltercalendarService);
    expect(service).toBeTruthy();
  });
});
