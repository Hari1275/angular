import { TestBed } from '@angular/core/testing';

import { KetooService } from './ketoo.service';

describe('KetooService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KetooService = TestBed.get(KetooService);
    expect(service).toBeTruthy();
  });
});
