import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GuardarEventoService } from 'src/app/services/guardar-evento.service';
import { IEventos } from '../interfaces/IEventos';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['./nuevo-evento.component.scss']
})
export class NuevoEventoComponent implements OnInit{
  @Input() date: Date | undefined;
  @Output() reloadFn = new EventEmitter<boolean>()
  form: any;
  saveText = '';
  configForm = [
    {
      bind: 'nombre',
      type: 'input',
      label: 'Nombre',
      placeholder: 'Introdusca el nombre',
      typeInput: 'text'
    },
    {
      bind: 'email',
      type: 'input',
      label: 'Correo',
      placeholder: 'Introdusca el Correo',
      typeInput: 'email'
    },
    {
      bind: 'teléfono',
      type: 'input',
      label: 'Telefono',
      placeholder: 'Introdusca el telefono',
      typeInput: 'phone'
    },
    {
      bind: 'feachaInicio',
      type: 'date',
      label: 'Fecha inicio: ',
    },
    {
      bind: 'tiempoInicio',
      type: 'time',
      // label: 'Nombre',
      // placeholder: 'Introdusca el nombre'
    },
    {
      bind: 'fechaFin',
      type: 'date',
      label: 'Fecha fin: ',
    },
    {
      bind: 'tiempoFin',
      type: 'time',
      // label: 'Nombre',
      // placeholder: 'Introdusca el nombre'
    }
  ]

  controls: any = {};

  constructor(
    // @Inject(MAT_DIALOG_DATA)
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private ges: GuardarEventoService

  ) {

  }

  ngOnInit(): void {
    this.construirForm();
      
  }

  construirForm(): void {
    this.configForm.forEach(ctrl => {
      const validators: ValidatorFn[] = [];
      validators.push(Validators.required)
      let value; 
      switch (ctrl.bind) {
        case 'feachaInicio':
          value = {
            "year": this.date?.getFullYear(),
            "month": this.date ? this.date?.getMonth() + 1 : 0,
            "day": this.date?.getDate()
          }
          break;
          case 'tiempoInicio':
            value = { 
              hour: 12, 
              minute: 0 }
            break;
          case 'fechaFin':
            value = {
              "year": this.date?.getFullYear(),
              "month": this.date ? this.date?.getMonth() + 1 : 0,
              "day": this.date?.getDate()
            }
            break;
            case 'tiempoFin':
              value = { 
                hour: 13, 
                minute: 0 }
              break;
          default: 
              value = '';
      }
      this.controls[ctrl.bind] = this.fb.control(value, { validators });
    });
    this.form = this.fb.group(this.controls);
    this.observerForm(this.form);
  }

  observerForm(form: FormGroup): void {
    form?.valueChanges.subscribe(
      data => {
        
      }
    )
  }


  guardar(form: FormGroup) {
    form.disable();
    this.saveText = 'Guardando ...'
    const targetValue = form.getRawValue();
    const dataSave: IEventos = {
      feachaInicio: new Date(targetValue.feachaInicio.year, targetValue.feachaInicio.month -1,
        targetValue.feachaInicio.day, targetValue.tiempoInicio.hour, targetValue.tiempoInicio.minute),
      fechaFin: new Date(targetValue.fechaFin.year, targetValue.fechaFin.month -1,
        targetValue.fechaFin.day, targetValue.tiempoFin.hour, targetValue.tiempoFin.minute),
      nombre: targetValue.nombre,
      email: targetValue.email,
      teléfono: targetValue.teléfono,
    }
    this.ges.guardar(dataSave, dataSave.feachaInicio.getMonth()).subscribe(
      data => {
        console.info('Datos guardados correctamente', data);
        this.saveText = 'Datos guardados correctamente'
        setTimeout(() => {
          this.saveText = '';
          this.activeModal.dismiss();
          this.reloadFn.emit(true);
        }, 6000);
      }, error => {
        this.saveText = 'Sin exito al guardar';
        console.info('Sin exito al guardar', error);
      }
    )
  }
}
