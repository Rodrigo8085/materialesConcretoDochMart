import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValorDiaMedioInteractionService {

  diaMedio = new Subject<Date>();
  diaMedioEmiter$ = this.diaMedio.asObservable();
  constructor() { }
  notifyDiaMedio(date: Date) {
    this.diaMedio.next(date);
  }

}
