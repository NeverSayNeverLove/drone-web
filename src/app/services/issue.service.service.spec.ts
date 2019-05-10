import { TestBed } from '@angular/core/testing';

import { Issue.ServiceService } from './issue.service.service';

describe('Issue.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Issue.ServiceService = TestBed.get(Issue.ServiceService);
    expect(service).toBeTruthy();
  });
});
