import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import {MatTableModule} from '@angular/material/table';
import { AgendaComponent } from './agenda/agenda.component';
import { NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgendaComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatTableModule,
    NgbTooltipModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
