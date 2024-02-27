import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


export interface IDiaUso {
  diaObejto: Date;
  diaSemana: string;
  diaNumeroMensual: number;
  eventos: []
}

export interface ISemanas {
  view: boolean;
  semana: number;
  data: IDiaUso[];
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  model: NgbDateStruct = {
    year: 2020,
    month: 1,
    day: 0
  };

  control!: FormControl;
  placement = 'bottom';
  dataSource: ISemanas[] = [];
  nombreDias: Readonly<string[]> = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  nombreMes: Readonly<string[]> = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
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
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.control = this.fb.control(this.model);
    this.subcribeBtn();
    this.setNewDate();
  }

  subcribeBtn() {
    this.control.valueChanges.subscribe((v: NgbDateStruct) => {
      this.setearCalendarioTreintaCincoDias(new Date(v.year, v.month - 1, 1));
    })
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
    this.crearSeparadoFilasTablas();
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

  obtenerMes(dia: Date): string {
    return this.nombreMes[dia.getMonth()];
  }

  obtenerYear(dia: Date): string {
    return dia.getFullYear().toString();
  }

  evaluarDiaFueraMes(diaObjetivo: Date): boolean {
    return this.diaMedio?.getMonth() !== diaObjetivo?.getMonth();
  }

  desplegarLista(evento: any): void {
    console.info(evento);
  }

  setNewDate(accion?: string): void {
    switch (accion) {
      case 'minus':
        this.setearCalendarioTreintaCincoDias(new Date(this.diaMedio.getFullYear(), this.diaMedio.getMonth() - 1));
        break;
      case 'add':
        this.setearCalendarioTreintaCincoDias(new Date(this.diaMedio.getFullYear(), this.diaMedio.getMonth() + 1));
        break;
      default:
        this.setearCalendarioTreintaCincoDias(new Date());
        break;
    }
  }

  eveluarTareasVacias(data: any[]): boolean {
    return data.length === 0;
  }
}
