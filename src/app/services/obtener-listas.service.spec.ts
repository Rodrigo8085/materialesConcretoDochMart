import { TestBed } from '@angular/core/testing';

import { ObtenerListasMensualesService } from './obtener-listas-mensuales.service';

describe('ObtenerListasService', () => {
  let service: ObtenerListasMensualesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerListasMensualesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
