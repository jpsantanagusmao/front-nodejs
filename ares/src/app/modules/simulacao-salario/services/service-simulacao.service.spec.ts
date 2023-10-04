import { TestBed } from '@angular/core/testing';

import { ServiceSimulacaoService } from './service-simulacao.service';

describe('ServiceSimulacaoService', () => {
  let service: ServiceSimulacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSimulacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
