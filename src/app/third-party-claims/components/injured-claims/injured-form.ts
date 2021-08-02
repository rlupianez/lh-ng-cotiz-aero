import { Validators } from '@angular/forms';
import { InjuredFieldEnum } from './injured.interfaces';

/*
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
  [InjuredFieldEnum.personType]: {
    label: '¿Es persona Física?',
    control: {
      type: 'inputRadio',
      list: [
        { title: 'Si', value: 'true' },
        { title: 'No', value: 'false' }
      ],
      hasEmptyOption: false
    },
    class: 'col-sm-6 col-md-6 col-lg-6',
    validators: [
      'required'
    ]
  },
  [InjuredFieldEnum.documentType]: {
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
    class: 'col-sm-6 col-md-6 col-lg-6',
    validators: [
      'required'
    ],
  },
  [InjuredFieldEnum.documentNumber]: {
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
      Validators.maxLength(8)
    ],
    class: 'col-sm-6 col-md-6 col-lg-6',
  },
  [InjuredFieldEnum.ownClaim]: {
    label: '¿Reclama en nombre propio?',
    control: {
      type: 'inputRadio',
      list: [
        { title: 'Si', value: 'true' },
        { title: 'No', value: 'false' }
      ]
    },
    class: 'col-sm-6 col-md-6 col-lg-6',
    validators: [
      'required'
    ]
  }
}

export const group = {
  title: '',
  icon: 'assignment_ind',
  content: '',
  expanded: true,
  children: fields

}

/*
    Importante, son los ajustes de visibilidad. 
*/

export const formFields = {
  [InjuredFieldEnum.personType]: { hidden: false, disabled: false },
/*   [InjuredFieldEnum.documentType]: { hidden: false, disabled: false },
  [InjuredFieldEnum.documentNumber]: { hidden: false, disabled: false }, */
  [InjuredFieldEnum.ownClaim]: { hidden: false, disabled: false },
}

export const viewFields = {

}

