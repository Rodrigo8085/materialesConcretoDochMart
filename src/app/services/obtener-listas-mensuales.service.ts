import { Injectable } from '@angular/core';
import { Febrero } from './mocks/Febrero';
import { IEventos } from '../layout/interfaces/IEventos';
import { Observable, of } from 'rxjs';
import { Enero } from './mocks/Enero';
import { Marzo } from './mocks/Marzo';
import { Abril } from './mocks/Abril';
import { Mayo } from './mocks/Mayo';
import { Junio } from './mocks/Junio';
import { Julio } from './mocks/Julio';
import { Septiembre } from './mocks/Septiembre';
import { Octubre } from './mocks/Octubre';
import { Noviembre } from './mocks/Noviembre';
import { Diciembre } from './mocks/Diciembre';
import { Agosto } from './mocks/Agosto';

@Injectable({
  providedIn: 'root'
})
export class ObtenerListasMensualesService {

  constructor() { }

  obtener(year: number, mes: number): Observable<IEventos[]> {
    switch (mes) {
      case 0:
        return of(Enero.filter(f => f.feachaInicio.getFullYear() === year));
      case 1:
        return of(Febrero.filter(f => f.feachaInicio.getFullYear() === year));
      case 2:
        return of(Marzo.filter(f => f.feachaInicio.getFullYear() === year));
      case 3:
        return of(Abril.filter(f => f.feachaInicio.getFullYear() === year));
      case 4:
        return of(Mayo.filter(f => f.feachaInicio.getFullYear() === year));
      case 5:
        return of(Junio.filter(f => f.feachaInicio.getFullYear() === year));
      case 6:
        return of(Julio.filter(f => f.feachaInicio.getFullYear() === year));
      case 7:
        return of(Agosto.filter(f => f.feachaInicio.getFullYear() === year));
      case 8:
        return of(Septiembre.filter(f => f.feachaInicio.getFullYear() === year));
      case 9:
        return of(Octubre.filter(f => f.feachaInicio.getFullYear() === year));
      case 10:
        return of(Noviembre.filter(f => f.feachaInicio.getFullYear() === year));
      case 11:
        return of(Diciembre.filter(f => f.feachaInicio.getFullYear() === year));
      default:
        return of([]);
    }
  }
}
