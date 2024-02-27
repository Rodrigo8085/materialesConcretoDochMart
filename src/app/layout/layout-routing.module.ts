import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';

const routes: Routes = [
  {
    path: '', 
    component: AgendaComponent
  },
  {
    path: 'lista',
    component: ListaEventosComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
