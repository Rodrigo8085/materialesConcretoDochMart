import { Component, OnInit } from '@angular/core';
import { AgendaCalendarioInteractionService } from 'src/app/services/interaction/agenda-calendario-interaction.service';
import { ValorDiaMedioInteractionService } from 'src/app/services/interaction/valor-dia-medio-interaction.service';
import { ObtenerListasMensualesService } from 'src/app/services/obtener-listas-mensuales.service';
import { MatDialog } from '@angular/material/dialog';

import { IEventos } from '../interfaces/IEventos';
import { determinateMes } from '../shared/functions/determinateMes';
import { IDiaUso } from '../interfaces/IDiaUso';
import { ISemanas } from '../interfaces/ISemanas';
import { NuevoEventoComponent } from '../nuevo-evento/nuevo-evento.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  dataSource: ISemanas[] = [];
  nombreDias: Readonly<string[]> = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  diasMes: IDiaUso[] = [];
  diaMedio: Date = new Date();
  dataCalendario: ISemanas[] = [
    {
      view: true,
      semana: 0,
      data: []
    },
    {
      view: true,
      semana: 1,
      data: []
    },
    {
      view: true,
      semana: 2,
      data: []
    },
    {
      view: true,
      semana: 3,
      data: []
    },
    {
      view: true,
      semana: 4,
      data: []
    },
    {
      view: true,
      semana: 5,
      data: []
    }
  ];

  constructor(
    private olms: ObtenerListasMensualesService,
    private acis: AgendaCalendarioInteractionService,
    private vdmis: ValorDiaMedioInteractionService,
    private dm: determinateMes,
    public dialog: MatDialog,
    private modalService: NgbModal,


  ) {
    this.acis.newDateEmiter$.subscribe({
      next: (date: Date) => {
        this.setearCalendarioTreintaCincoDias(date);
      }
    });
  }

  ngOnInit(): void {
    this.dm.setNewDate();
  }

  setearCalendarioTreintaCincoDias(fechaObjetivo: Date): void {
    // Resetear Data
    this.diasMes = [];
    // Asiganr los primeros dias si se encuentra fuera el del corriente 
    const dayPrevius = new Date(fechaObjetivo.getFullYear(), fechaObjetivo.getMonth(), 1);
    if (this.nombreDias[dayPrevius.getDay()] !== 'Domingo') {
      const findDayIterate = this.nombreDias.findIndex(g => g === this.nombreDias[dayPrevius.getDay()]);
      this.asignarDiaArrray(this.diasMes, dayPrevius.getFullYear(), dayPrevius.getMonth(), findDayIterate, true)
    }
    // Asignar los dias del mes mas se completa la semana del siguiente
    this.asignarDiaArrray(this.diasMes, fechaObjetivo.getFullYear(), fechaObjetivo.getMonth(), 40, false, true);
    // if (this.diasMes.length > 35) {
    //   throw new Error("Error en la creacion mas elementos de los necesarios");
    // }
    this.diaMedio = this.diasMes[15].diaObejto;
    this.vdmis.notifyDiaMedio(this.diasMes[15].diaObejto);
    this.crearSeparadoFilasTablas();
    this.olms.obtener(this.diaMedio.getFullYear(), this.diaMedio.getMonth()).subscribe(
      (data: IEventos[]) => {
        data.forEach(e => {
          this.dataSource.forEach(d => {
            const trget = d.data.find(dia => dia.diaObejto.getDate() === e.feachaInicio.getDate() &&
              dia.diaObejto.getMonth() === e.feachaInicio.getMonth());
            trget?.eventos.push(e);
          });
        });
      }
    )
  }


  crearSeparadoFilasTablas() {
    const interaciones = ['0-7', '7-14', '14-21', '21-28', '28-36', '35-43']
    interaciones.forEach((iter, index) => {
      const finalIter = iter.split('-');
      this.diasMes.slice(parseInt(finalIter[0], 10), parseInt(finalIter[1], 10));
      this.dataCalendario[index].data = this.diasMes.slice(parseInt(finalIter[0], 10), parseInt(finalIter[1], 10));
    });
    this.dataCalendario.forEach(dc => {
      dc.view = !dc.data.every(u => this.evaluarDiaFueraMes(u.diaObejto));
    });
    const filterView = this.dataCalendario.filter(y => y.view)
    this.dataSource = filterView;
  }

  asignarDiaArrray(monthArray: IDiaUso[], year: number, month: number, daysIterate: number, minusDay?: boolean, addDays?: boolean) {
    const diasCorte = minusDay ? 0 : daysIterate;
    let diasInicioContador = minusDay ? (daysIterate - 1) * -1 : 1;
    let firtDay = new Date(year, month, diasInicioContador);
    for (let i = diasInicioContador; i <= diasCorte; i++) {
      const d = new Date(year, month, i);
      monthArray.push(this.diaParaUso(d));
      if (addDays && firtDay.getMonth() < d.getMonth() &&
        (this.nombreDias.lastIndexOf(monthArray[monthArray.length - 1].diaSemana) > 0 && this.nombreDias.lastIndexOf(monthArray[monthArray.length - 1].diaSemana) <= 6)) {
        diasInicioContador++;
      }
    }
  }

  diaParaUso(dia: Date): IDiaUso {
    return {
      diaObejto: dia,
      diaSemana: this.nombreDias[dia.getDay()],
      diaNumeroMensual: dia.getDate(),
      eventos: []
    }
  }

  evaluarDiaFueraMes(diaObjetivo: Date): boolean {
    return this.diaMedio?.getMonth() !== diaObjetivo?.getMonth();
  }

  eveluarTareasVacias(data: any[]): boolean {
    return data.length === 0;
  }


  createEvent(data?: any): void {
    const modalRef = this.modalService.open(
      NuevoEventoComponent,
      {
          size: 'lg',
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modal-xl-step-componentes'
      }
  );
  modalRef.componentInstance.date = data;
  modalRef.componentInstance.reloadFn.subscribe((value: boolean) => {
    if (value === true) {
      this.dm.setNewDate();
    }
  });
    // this.dialog.open(NuevoEventoComponent);

  }

}
