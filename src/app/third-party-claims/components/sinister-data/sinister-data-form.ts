import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { SinisterFieldEnum } from './sinister-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
  [SinisterFieldEnum.plateType]: {
    label: 'Patente - vehículo asegurado en Holando Seguros',
    tooltip: 'Patente - vehículo asegurado en Holando Seguros',
    control: {
      type: 'text'
    },
    class: 'col-sm-6 col-md-6 col-lg-6',
    validators: [
      'required'
    ]
  },
  [SinisterFieldEnum.policy]: {
    label: 'Póliza',
    control: {
      type: 'number'
    },
    class: 'col-sm-6 col-md-6 col-lg-6',
    validators: [
      'required'
    ]
  },
  [SinisterFieldEnum.sinisterDate]: {
    label: 'Fecha del accidente',
    control: {
      type: 'datepicker',
      format: 'dd/mm/yyyy',
      config: {
        min: moment().add(-3,'years'),
        max: moment().add(0,'days')
      },
    },
    class: 'col-sm-6 col-md-6 col-lg-6',
    validators: [
      'required'
    ]
  },
  [SinisterFieldEnum.sinisterHour]: {
    label: 'Hora del accidente',
    control: {
      type: 'inputHourMinute',
    },
    class: 'col-sm-6 col-md-6 col-lg-6',
    validators: [
      'required'
    ]
  },



}

export const group = {
  title: 'DatosRiesgo',
  icon: 'assignment_ind',
  content: '',
  expanded: true,
  children: fields

}


/*
    Importante, son los ajustes de visibilidad. 
*/

export const formFields = {
  [SinisterFieldEnum.plateType]: { hidden: false, disabled: false },
  [SinisterFieldEnum.policy]: { hidden: false, disabled: false },
  [SinisterFieldEnum.sinisterDate]: { hidden: false, disabled: false },
  [SinisterFieldEnum.sinisterHour]: { hidden: false, disabled: false },
}

export const viewFields = {

}

