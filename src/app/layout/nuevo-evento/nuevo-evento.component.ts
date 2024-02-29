import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GuardarEventoService } from 'src/app/services/guardar-evento.service';

import { IEventos } from '../interfaces/IEventos';
import { IForm } from '../interfaces/IForm';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['./nuevo-evento.component.scss']
})
export class NuevoEventoComponent implements OnInit{
  @Input() date: Date | undefined;
  @Input() dataEvent: IEventos | undefined;
  @Output() reloadFn = new EventEmitter<boolean>()
  form: any;
  saveText = '';
  configForm: IForm[] = [
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
      type: 'time'
    },
    {
      bind: 'fechaFin',
      type: 'date',
      label: 'Fecha fin: ',
    },
    {
      bind: 'tiempoFin',
      type: 'time'
    }
  ]

  controls: any = {};

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private ges: GuardarEventoService

  ) {

  }

  ngOnInit(): void {
    this.construirForm();
    if(this.dataEvent) {
      this.form.disable();
    }
  }

  construirForm(): void {
    this.configForm.forEach(ctrl => {
      const validators: ValidatorFn[] = [];
      validators.push(Validators.required)
      this.controls[ctrl.bind] = this.fb.control( this.decoValues(ctrl, this.dataEvent), { validators });
    });
    this.form = this.fb.group(this.controls);
    this.observerForm(this.form);
  }

  decoValues(ctrl: IForm, data: IEventos | any): any {
    let value; 
    switch (ctrl.bind) {
      case 'feachaInicio':
        value = {
          year: data ? data.feachaInicio.getFullYear() : this.date?.getFullYear(),
          month: data ? data.feachaInicio.getMonth() + 1 : this.date ? this.date?.getMonth() + 1 : 0,
          day: data ? data.feachaInicio.getDate() : this.date?.getDate()
        };
        break;
        case 'tiempoInicio':
          value = { 
            hour: data ? data.feachaInicio.getHours() : 12, 
            minute: data ? data.feachaInicio.getMinutes() :0
          };
          break;
        case 'fechaFin':
          value = {
            year: data ? data.fechaFin.getFullYear() : this.date?.getFullYear(),
            month: data ? data.fechaFin.getMonth() + 1 : this.date ? this.date?.getMonth() + 1 : 0,
            day: data ? data.fechaFin.getDate() : this.date?.getDate()
          };
          break;
          case 'tiempoFin':
            value = { 
              hour: data ? data.fechaFin.getHours() : 12, 
              minute: data ? data.fechaFin.getMinutes() :0
            };
            break;
        default: 
            value = data ? data[ctrl.bind] : '';
    }
    return value
  }

  observerForm(form: FormGroup): void {
    form.disabled
    form?.valueChanges.subscribe(
      data => {
        
      }
    )
  }

  update(form: FormGroup, dataUpdate: IEventos): void {
    form.disable();
    this.saveText = 'Guardando ...'
    const targetValue = form.getRawValue();
    try {
      dataUpdate.nombre = targetValue.nombre;
      dataUpdate.email = targetValue.email;
      dataUpdate.teléfono = targetValue.teléfono;
      dataUpdate.feachaInicio = new Date(targetValue.feachaInicio.year, targetValue.feachaInicio.month -1,
        targetValue.feachaInicio.day, targetValue.tiempoInicio.hour, targetValue.tiempoInicio.minute),
      dataUpdate.fechaFin = new Date(targetValue.fechaFin.year, targetValue.fechaFin.month -1,
        targetValue.fechaFin.day, targetValue.tiempoFin.hour, targetValue.tiempoFin.minute),
      this.commonReload(dataUpdate);
    } catch (error) {
      this.saveText = 'Sin exito al guardar';
      console.info('Sin exito al guardar', error);
    }
  }


  guardar(form: FormGroup): void {
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
        this.commonReload(data);
      }, error => {
        this.saveText = 'Sin exito al guardar';
        console.info('Sin exito al guardar', error);
      }
    )
  }

  commonReload(data: IEventos): void {
    console.info('Datos guardados correctamente', data);
    this.saveText = 'Datos guardados correctamente'
    setTimeout(() => {
      this.saveText = '';
      this.activeModal.dismiss();
      this.reloadFn.emit(true);
    }, 6000);
  }
}
