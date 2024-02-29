import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgendaCalendarioInteractionService } from 'src/app/services/interaction/agenda-calendario-interaction.service';
import { ObtenerListasMensualesService } from 'src/app/services/obtener-listas-mensuales.service';

import { IEventos } from '../interfaces/IEventos';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoEventoComponent } from '../nuevo-evento/nuevo-evento.component';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss']
})
export class ListaEventosComponent implements OnInit, OnDestroy {
  dataSource: any[] = [];
  displayColumns: string[] = [
    'hora0',
    'hora1',
    'hora2',
    'hora3',
    'hora4',
    'hora5',
    'hora6',
    'hora7',
    'hora8',
    'hora9',
    'hora10',
    'hora11',
    'hora12',
  ];

  nombreHorarios: Readonly<string[]> = [
    'Fecha',
    '7:00 a.m.',
    '8:00 a.m.',
    '9:00 a.m.',
    '10:00 a.m.',
    '11:00 a.m.',
    '12:00 p.m.',
    '1:00 p.m.',
    '2:00 p.m.',
    '3:00 p.m.',
    '4:00 p.m.',
    '5:00 p.m.',
    '6:00 p.m.'
  ];

  numeroHorarios24 = [
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18
  ]

  diaTarget: Date = new Date();
  dataEventosHoy: IEventos[] = [];
  dataEventosManana: IEventos[] = [];
  dataEventosPasado: IEventos[] = [];

  diaTragetSubscription: Subscription;

  constructor(
    private acis: AgendaCalendarioInteractionService,
    private olms: ObtenerListasMensualesService,
    private router: Router,
    private modalService: NgbModal,

  ) {
    this.diaTragetSubscription = this.acis.newDateEmiter$.subscribe({
      next: (data: Date) => {
        this.diaTarget = data;
        this.getEventos();
      },
    });
  }



  ngOnInit(): void {
    this.displayColumns = [
      'Horarios',
      'Hoy',
      'Manana',
      'Pasado'
    ];
    this.getEventos();
  }

  ngOnDestroy(): void {
    this.diaTragetSubscription.unsubscribe();
  }


  getEventos(): void {
    this.olms.obtener(this.diaTarget.getFullYear(), this.diaTarget.getMonth()).subscribe({
      next: (dataEventos: IEventos[]) => {
        this.dataEventosHoy = dataEventos.filter(f => f.feachaInicio.getDate() === this.diaTarget.getDate());
        this.dataEventosManana = dataEventos.filter(f => f.feachaInicio.getDate() === (this.diaTarget.getDate() + 1));
        this.dataEventosPasado = dataEventos.filter(f => f.feachaInicio.getDate() === (this.diaTarget.getDate() + 2));
        this.setValuesHorariosEvento();
      }
    });
  }

  setValuesHorariosEvento() {
    const horarios = this.nombreHorarios.filter(f => f !== 'Fecha');
    const newDataSource: any[] = []
    horarios.forEach((h, index) => {
      const dateHConfig = new Date(this.diaTarget.getFullYear(), this.diaTarget.getMonth(),
        this.diaTarget.getDate(), this.numeroHorarios24[index], 0)
      newDataSource.push({
        Horarios: h,
        Hoy: this.dataEventosHoy.find(f => f.feachaInicio.getHours() === dateHConfig.getHours() &&
          f.fechaFin.getHours() >= dateHConfig.getHours() + 1),
        Manana: this.dataEventosManana.find(f => f.feachaInicio.getHours() === dateHConfig.getHours() &&
          f.fechaFin.getHours() >= dateHConfig.getHours() + 1),
        Pasado: this.dataEventosPasado.find(f => f.feachaInicio.getHours() === dateHConfig.getHours() &&
          f.fechaFin.getHours() >= dateHConfig.getHours() + 1)
      });
    });
    this.dataSource = newDataSource;
  }

  createEvent(date?: Date, dataEvent?: IEventos): void {
    const modalRef = this.modalService.open(
      NuevoEventoComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modal-xl-step-componentes'
      }
    );
    modalRef.componentInstance.date = date;
    modalRef.componentInstance.dataEvent = dataEvent;

  }

}
