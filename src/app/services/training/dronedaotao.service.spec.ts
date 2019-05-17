import { TestBed } from '@angular/core/testing';

import { DronedaotaoService } from './dronedaotao.service';

describe('DronedaotaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DronedaotaoService = TestBed.get(DronedaotaoService);
    expect(service).toBeTruthy();
  });
});
