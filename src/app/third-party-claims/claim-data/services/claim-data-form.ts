import { Validators } from '@angular/forms';
import { ClaimDataFieldEnum } from './claim-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {

  [ClaimDataFieldEnum.claimNumber]: {
    label: 'Número de Tramite',
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
  ,
  [ClaimDataFieldEnum.query]: {
    label: 'Consulta por: ',
    control: {
      type: 'button-toggle',
      searchable: false,
      options: [
        { key: 'Aviso', value: 'Aviso' },
        { key: 'Siniestro', value: 'Siniestro' }
      ],
      list: [
        { key: 'Aviso', value: 'Aviso' },
        { key: 'Siniestro', value: 'Siniestro' }
      ],
      pasteFieldOnSelect: 'key',
      hasEmptyOption: false
    },
    class: 'col-sm-12 col-md-12 col-lg-8',
    validators: [
      'required'
    ]
  },


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
  [ClaimDataFieldEnum.query]: { hidden: false, disabled: false },
  [ClaimDataFieldEnum.claimNumber]: { hidden: false, disabled: false },

}

export const viewFields = {

}

