import { TestBed } from '@angular/core/testing';

import { AresDataService } from './ares-data.service';

describe('AresDataService', () => {
  let service: AresDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AresDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
