import { Injectable } from '@angular/core';
import { IEventos } from '../layout/interfaces/IEventos';
import { Observable, of } from 'rxjs';
import { Febrero } from './mocks/Febrero';

@Injectable({
  providedIn: 'root'
})
export class GuardarEventoService {

  constructor() { }

  guardar(data:IEventos, mes: number): Observable<IEventos> {
    switch (mes) {
      case 1:
        Febrero.push(data);
        return of(data);
      default:
        return of(data);
    }
  } 
}
