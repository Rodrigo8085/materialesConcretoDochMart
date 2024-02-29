
import { Injectable } from '@angular/core';
import { AgendaCalendarioInteractionService } from 'src/app/services/interaction/agenda-calendario-interaction.service';
import { ValorDiaMedioInteractionService } from 'src/app/services/interaction/valor-dia-medio-interaction.service';

@Injectable({
  providedIn: 'root'
})
export class determinateMes {
    diaMedio: any;
    constructor(
        private acis: AgendaCalendarioInteractionService,
        private vdmis: ValorDiaMedioInteractionService
    ) { 
      this.vdmis.diaMedioEmiter$.subscribe({
        next: (value: Date) => {
          this.diaMedio = value;
        }
      })
    }
    setNewDate(accion?: string): void {
    switch (accion) {
      case 'minus':
        this.acis.notifyNewDateCalendar(new Date(this.diaMedio.getFullYear(), this.diaMedio.getMonth() - 1));
        break;
      case 'add':
        this.acis.notifyNewDateCalendar(new Date(this.diaMedio.getFullYear(), this.diaMedio.getMonth() + 1));
        break;
      default:
        this.acis.notifyNewDateCalendar(new Date());
        break;
    }
  }
}