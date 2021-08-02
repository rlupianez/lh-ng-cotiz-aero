import { Validators } from '@angular/forms';
import { InjuredLinkFieldEnum } from './injured-link-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {

  [InjuredLinkFieldEnum.victimLink]: {
    label: 'Vínculo con el damnificado',
    control: {
      type: 'select',
      searchable: false,
      options: [
        { key: '1', value: 'Madre' },
        { key: '2', value: 'Padre' },
        { key: '3', value: 'Abogado Apoderado' },
        { key: '4', value: 'Abogado Patrocinante' },
        { key: '5', value: 'Tutor/Curador' },
        { key: '6', value: 'Otros' }
      ],
      list: [
        { key: '1', value: 'Madre' },
        { key: '2', value: 'Padre' },
        { key: '3', value: 'Abogado Apoderado' },
        { key: '4', value: 'Abogado Patrocinante' },
        { key: '5', value: 'Tutor/Curador' },
        { key: '6', value: 'Otros' }
      ],
      pasteFieldOnSelect: 'key',
      hasEmptyOption: false
    },
    class: 'col-sm-6 col-md-6 col-lg-6',
    validators: [
      'required'
    ],
  },
  [InjuredLinkFieldEnum.otherLink]: {
    label: 'Otro vínculo',
    control: {
      type: 'text'
    },
    class: 'col-sm-12 col-md-12 col-lg-8'
  },
  [InjuredLinkFieldEnum.documentType]: {
    label: 'Tipo de Documento',
    control: {
      type: 'select',
      searchable: true,
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

  [InjuredLinkFieldEnum.documentNumber]: {
    label: 'Número de Documento',
    control: {
      type: 'number',
      config: {
        minLength: 8,
        maxlength: 8
      }
    },
    validators: [


    ],
    class: 'col-sm-6 col-md-6 col-lg-6',
  },
  [InjuredLinkFieldEnum.email]: {
    label: 'Email',
    control: {
      type: 'input'
    },
    validators: [
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ],
    class: 'col-12 col-sm-12 col-md-6 col-lg-6'
  },
  [InjuredLinkFieldEnum.school]: {
    label: 'Colegio',
    control: {
      type: 'text',
      config: {

      }
    },
    validators: [

    ],
    class: 'col-sm-6 col-md-6 col-lg-6',
  },
  [InjuredLinkFieldEnum.numberFolio]: {
    label: 'N. de Folio',
    control: {
      type: 'number',
      config: {

      }
    },
    validators: [

    ],
    class: 'col-sm-6 col-md-6 col-lg-6',
  },
  [InjuredLinkFieldEnum.volumenNumber]: {
    label: 'N. de Tomo',
    control: {
      type: 'number',
      config: {
        minLength: 8,
        maxlength: 8
      }
    },
    validators: [

    ],
    class: 'col-sm-6 col-md-6 col-lg-6',
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
  [InjuredLinkFieldEnum.victimLink]: { hidden: false, disabled: false },
  [InjuredLinkFieldEnum.otherLink]: { hidden: true, disabled: false },
/*   [InjuredLinkFieldEnum.documentType]: { hidden: true, disabled: false },
  [InjuredLinkFieldEnum.documentNumber]: { hidden: true, disabled: false },
  [InjuredLinkFieldEnum.school]: { hidden: true, disabled: false },
  [InjuredLinkFieldEnum.numberFolio]: { hidden: true, disabled: false },
  [InjuredLinkFieldEnum.volumenNumber]: { hidden: true, disabled: false },
  [InjuredLinkFieldEnum.email]: { hidden: true, disabled: false }, */
}

export const viewFields = {

}

