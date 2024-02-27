import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaCalendarioInteractionService {
  newDate = new Subject<Date>();
  newDateEmiter$ = this.newDate.asObservable();
  
  constructor() { }

  notifyNewDateCalendar(date: Date) {
    this.newDate.next(date);
  }
}
