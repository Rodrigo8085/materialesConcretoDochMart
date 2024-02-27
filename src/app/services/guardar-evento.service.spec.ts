import { TestBed } from '@angular/core/testing';

import { GuardarEventoService } from './guardar-evento.service';

describe('GuardarEventoService', () => {
  let service: GuardarEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
