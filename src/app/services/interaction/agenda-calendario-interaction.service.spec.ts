import { TestBed } from '@angular/core/testing';

import { AgendaCalendarioInteractionService } from './agenda-calendario-interaction.service';

describe('AgendaCalendarioInteractionService', () => {
  let service: AgendaCalendarioInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaCalendarioInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
