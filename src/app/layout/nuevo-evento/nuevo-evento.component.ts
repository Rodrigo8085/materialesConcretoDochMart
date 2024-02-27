import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['./nuevo-evento.component.scss']
})
export class NuevoEventoComponent implements OnInit{

  // form: FormGroup = this.fb.group({});
  // feachaInicio: Date;
  // fechaFin: Date;
  // nombre: string;
  // email: string;
  // teléfono: string;
  configForm = [
    {
      bind: 'nombre'
    },
    {
      bind: 'email'
    },
    {
      bind: 'teléfono'
    },
    {
      bind: 'feachaInicio'
    },
    {
      bind: 'fechaFin'
    },
  ]

  controls: any = {};

  constructor(
    // @Inject(MAT_DIALOG_DATA)
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.construirForm();
      
  }

  construirForm(): void {
    // this.configForm.forEach(ctrl => {
    //   this.controls[ctrl.bind] = this.fb.control('');
    // });
    // this.form = this.fb.group(this.controls);

  }

}
