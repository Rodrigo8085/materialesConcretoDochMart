import { Injectable } from '@angular/core';
import { Febrero } from './mocks/Febrero';
import { IEventos } from '../layout/interfaces/IEventos';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerListasMensualesService {

  constructor() { }

  obtener(year: number, mes: number): Observable<IEventos[]> {
    switch (mes) {
      case 1:
        return of(Febrero.filter(f => f.feachaInicio.getFullYear() === year));
      default:
        return of([]);
    }
  } 
}
