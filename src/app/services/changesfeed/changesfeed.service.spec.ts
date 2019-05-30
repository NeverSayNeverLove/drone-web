import { TestBed } from '@angular/core/testing';

import { ChangesfeedService } from './changesfeed.service';

describe('ChangesfeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangesfeedService = TestBed.get(ChangesfeedService);
    expect(service).toBeTruthy();
  });
});
