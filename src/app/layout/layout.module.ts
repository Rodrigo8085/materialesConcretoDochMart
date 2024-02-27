import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import {MatTableModule} from '@angular/material/table';
import { AgendaComponent } from './agenda/agenda.component';
import { NgbDatepickerModule, NgbModalModule, NgbTimepicker, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { NuevoEventoComponent } from './nuevo-evento/nuevo-evento.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'


@NgModule({
  declarations: [
    AgendaComponent,
    ListaEventosComponent,
    NuevoEventoComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatTableModule,
    NgbTooltipModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgbModalModule,
    MatInputModule,
    NgbTimepicker 
    
  ]
})
export class LayoutModule { }
