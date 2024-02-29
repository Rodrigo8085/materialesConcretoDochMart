import { Injectable } from '@angular/core';
import { IEventos } from '../layout/interfaces/IEventos';
import { Observable, of } from 'rxjs';
import { Febrero } from './mocks/Febrero';
import { Enero } from './mocks/Enero';
import { Marzo } from './mocks/Marzo';
import { Abril } from './mocks/Abril';
import { Mayo } from './mocks/Mayo';
import { Junio } from './mocks/Junio';
import { Julio } from './mocks/Julio';
import { Agosto } from './mocks/Agosto';
import { Septiembre } from './mocks/Septiembre';
import { Octubre } from './mocks/Octubre';
import { Noviembre } from './mocks/Noviembre';
import { Diciembre } from './mocks/Diciembre';

@Injectable({
  providedIn: 'root'
})
export class GuardarEventoService {

  constructor() { }

  guardar(data: IEventos, mes: number): Observable<IEventos> {
    switch (mes) {
      case 0:
        Enero.push(data);
        return of(data);
      case 1:
        Febrero.push(data);
        return of(data);
      case 2:
        Marzo.push(data);
        return of(data);
      case 3:
        Abril.push(data);
        return of(data);
      case 4:
        Mayo.push(data);
        return of(data);
      case 5:
        Junio.push(data);
        return of(data);
      case 6:
        Julio.push(data);
        return of(data);
      case 7:
        Agosto.push(data);
        return of(data);
      case 8:
        Septiembre.push(data);
        return of(data);
      case 9:
        Octubre.push(data);
        return of(data);
      case 10:
        Noviembre.push(data);
        return of(data);
      case 11:
        Diciembre.push(data);
        return of(data);
      default:
        return of(data);
    }
  }
}
