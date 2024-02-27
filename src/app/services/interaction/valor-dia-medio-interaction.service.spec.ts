import { TestBed } from '@angular/core/testing';

import { ValorDiaMedioInteractionService } from './valor-dia-medio-interaction.service';

describe('ValorDiaMedioInteractionService', () => {
  let service: ValorDiaMedioInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValorDiaMedioInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
