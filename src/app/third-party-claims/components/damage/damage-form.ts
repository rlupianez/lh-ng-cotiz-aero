import { Validators } from '@angular/forms';
import { DamageEnum } from './damage.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
  [DamageEnum.links]: {
    label: 'Seleccione daños',
    control: {
      type: 'check-list',
      options: [

        { key: '1', value: 'Daños al vehículo' },
        { key: '2', value: 'Lesiones a personas' },
        { key: '3', value: 'Daños a una ubicación' },
        { key: '4', value: 'Daños a otros bienes' }
      ],
      list: [

        { key: '1', value: 'Daños al vehículo' },
        { key: '2', value: 'Lesiones a personas' },
        { key: '3', value: 'Daños a una ubicación' },
        { key: '4', value: 'Daños a otros bienes' }
      ],
      pasteFieldOnSelect: 'key',
      hasEmptyOption: false
    },
    class: 'col-sm-4 col-md-4 col-lg-4 list-damage',
    validators: [
      'required'
    ],
  }
}
//
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
  [DamageEnum.links]: { hidden: false, disabled: false }
}

export const viewFields = {

}

