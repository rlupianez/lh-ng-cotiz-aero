import { Validators } from '@angular/forms';
import { EnterYourDataFieldEnum } from './enter-your-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
  [EnterYourDataFieldEnum.documentType]: {
    label: 'Tipo de Documento',
    control: {
      type: 'select',
      path: '/listas/LIST_TIPOS_DOC',
      options: {
        value: 'abrev', // ver el mapeo
        key: 'cod_docum' // ver el mapeo
      },
      pasteFieldOnSelect: 'abrev',
      hasEmptyOption: false,
    },
    class: 'col-sm-12 col-md-12 col-lg-8',
    validators: [
      'required'
    ],
  },

  [EnterYourDataFieldEnum.documentNumber]: {
    label: 'Número de Documento',
    control: {
      type: 'number',
      config: {
        minLength: 8,
        maxlength: 8
      }
    },
    validators: [
      Validators.minLength(8),
      Validators.maxLength(8),
      'required'
    ],
    class: 'col-sm-12 col-md-12 col-lg-8',

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

  [EnterYourDataFieldEnum.documentType]: { hidden: false, disabled: false },
  [EnterYourDataFieldEnum.documentNumber]: { hidden: false, disabled: false },
}

export const viewFields = {

}

