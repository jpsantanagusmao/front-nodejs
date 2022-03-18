import { TestBed } from '@angular/core/testing';

import { DapService } from './dap.service';

describe('DapService', () => {
  let service: DapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
