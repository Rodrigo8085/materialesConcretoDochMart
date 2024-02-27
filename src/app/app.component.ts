import { Component, OnInit } from '@angular/core';
import { obtenerMes } from "./layout/shared/functions/obtenerMes";
import { obtenerYear } from './layout/shared/functions/obtenerYear';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { determinateMes } from './layout/shared/functions/determinateMes';
import { ValorDiaMedioInteractionService } from './services/interaction/valor-dia-medio-interaction.service';
import { AgendaCalendarioInteractionService } from './services/interaction/agenda-calendario-interaction.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  obtenerMes = obtenerMes;
  obtenerYear = obtenerYear;
  diaMedio: any;
  placement = 'bottom';

  model: NgbDateStruct = {
    year: 2020,
    month: 1,
    day: 0
  };

  control!: FormControl;
  constructor(
    private fb: FormBuilder,
    public dm: determinateMes,
    private vdmis: ValorDiaMedioInteractionService,
    private acis: AgendaCalendarioInteractionService,
    public router: Router
  ) { 
    this.vdmis.diaMedioEmiter$.subscribe({
      next: (data: Date) => {
        setTimeout(() => {
          this.diaMedio = data;
        }, 100);
      }
    });
  }

  ngOnInit(): void {
    this.control = this.fb.control(this.model);
    this.subcribeBtn();
  }
  subcribeBtn() {
    this.control.valueChanges.subscribe((v: NgbDateStruct) => {
      this.router.navigate(['/']);
      this.acis.notifyNewDateCalendar(new Date(v.year, v.month - 1, 1));
    })
  }
  navegarLista() {
    this.dm.setNewDate();
    this.router.navigate(['/lista']);
  }
}
