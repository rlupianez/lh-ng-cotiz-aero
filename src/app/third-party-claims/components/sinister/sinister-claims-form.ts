import { Validators } from '@angular/forms';
import { LesionSinisterFieldEnum } from './sinister-claims.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
  [LesionSinisterFieldEnum.sinisterType]: {
    label: 'Tipo de siniestro',
    control: {
      type: 'select',
      searchable: false,
      path: '/listas/LIST_RAMOS',
      options: {
        value: 'nombre', // ver el mapeo
        key: 'cod_sec' // ver el mapeo
      },
      pasteFieldOnSelect: 'nombre',
      hasEmptyOption: false,
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3',
    validators: [
      'required'
    ],
  },
  [LesionSinisterFieldEnum.affectedCoverage]: {
    label: 'Cobertura afectada',
    control: {
      type: 'select',
      searchable: false,
      path: '/listas/LIST_CIAS_TERCEROS_SIN',
      options: {
        value: 'desc_cia_tercero', 
        key: 'cod_cia_tercero'
      },
      pasteFieldOnSelect: 'descri',
      hasEmptyOption: false,
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3',
    validators: [
      'required'
    ],
  },
  [LesionSinisterFieldEnum.thirdPartyCompany]: {
    label: 'Compañía del tercero',
    control: {
      type: 'select',
      searchable: false,
      path: '/listas/LIST_CIAS_TERCEROS_SIN',
      options: {
        value: 'desc_cia_tercero', 
        key: 'cod_cia_tercero'
      },
      pasteFieldOnSelect: 'descri',
      hasEmptyOption: false,
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3',
    validators: [
      'required'
    ],
  },
  [LesionSinisterFieldEnum.policy]: {
    label: 'Póliza',
    control: {
      type: 'input'
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3',
    validators: [
      'required'
    ]
  },
  [LesionSinisterFieldEnum.healthcareCenter]: {
    label: 'Centro asistencial',
    control: {
      type: 'input'
    },
    class: 'col-12 col-sm-12 col-md-6 col-lg-6',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.address]: {
    label: 'Domicilio',
    control: {
      type: 'input'
    },
    class: 'col-12 col-sm-12 col-md-6 col-lg-6',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.number]: {
    label: 'Número',
    control: {
      type: 'number'
    },
    class: 'col-6 col-sm-6 col-md-3 col-lg-3',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.region]: {
    label: 'Provincia',
    control: {
      type: 'select',
      searchable: true,
      path: '/listas/LIST_PROVINCIAS',
      options: {
        value: 'descri',
        key: 'cod_jur'
      },
      pasteFieldOnSelect: 'cod_jur',
      hasEmptyOption: true
    },
    class: 'col-12 col-sm-12 col-md-4 col-lg-4'
  },

  [LesionSinisterFieldEnum.city]: {
    label: 'Localidad',
    control: {
        type: 'select',
        path: '/listas/LIST_LOCALIDADES',
        options: {
            value: 'desc_localidad',
            key: 'cod_postal'
        },
        filters: {
            "p_provincia": 0,
            "p_limite": 100,
            "p_nropag": 0,
            "p_regxpag": 100
        },
        apiSearchFieldname: 'p_provincia',
        pasteFieldOnSelect: 'desc_localidad',
        hasEmptyOption: true
    },
    class: 'col-12 col-sm-12 col-md-4 col-lg-4'
},

  [LesionSinisterFieldEnum.postalCode]: {
    label: 'Código Postal',
    control: {
      type: 'input',
    },
    class: 'col-6 col-sm-6 col-md-3 col-lg-3'
  },

  [LesionSinisterFieldEnum.assets]: {
    label: 'Bien',
    control: {
      type: 'text'
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.sinisterDescription]: {
    label: 'Detalle del Siniestro y Descripción de Lesiones',
    control: {
      type: 'textArea',
      cols: 10,
      rows: 3
    },
    class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    validators: [
      'required'
    ]
  },
  [LesionSinisterFieldEnum.hasInsurance]: {
    label: '¿Posee seguro?',
    control: {
      type: 'inputRadio',
      list: [
        { title: 'Si', value: 'true' },
        { title: 'No', value: 'false' }
      ]
    },
    class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    validators: [
      'required'
    ]
  },
  [LesionSinisterFieldEnum.ambulance]: {
    label: '¿Participación ambulancia?',
    control: {
      type: 'inputRadio',
      list: [
        { title: 'Si', value: 'true' },
        { title: 'No', value: 'false' }
      ]
    },
    class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.criminalCase]: {
    label: 'Causa penal',
    control: {
      type: 'inputRadio',
      list: [
        { title: 'SI', value: 'true' },
        { title: 'No', value: 'false' }
      ]
    },
    class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.caseNumber]: {
    label: 'Nro de causa',
    control: {
      type: 'number'
    },
    class: 'col-6 col-sm-6 col-md-3 col-lg-3',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.courtNumber]: {
    label: 'Nro de juzgado',
    control: {
      type: 'number'
    },
    class: 'col-6 col-sm-6 col-md-3 col-lg-3',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.policeStation]: {
    label: 'Comisaria',
    control: {
      type: 'text'
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.propertyOwner]: {
    label: '¿El damnificado es el titular del inmueble?',
    control: {
      type: 'inputRadio',
      list: [
        { title: 'Si', value: 'true' },
        { title: 'No', value: 'false' }
      ]
    },
    class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    validators: [
      'required'
    ]
  },

  [LesionSinisterFieldEnum.realTenant]: {
    label: '¿El damnificado es inquilino?',
    control: {
      type: 'inputRadio',
      list: [
        { title: 'Si', value: 'true' },
        { title: 'No', value: 'false' }
      ]
    },
    class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    validators: [
      'required'
    ]
  },
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
  [LesionSinisterFieldEnum.sinisterType]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.hasInsurance]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.affectedCoverage]: { hidden: true, disabled: false },
  [LesionSinisterFieldEnum.thirdPartyCompany]: { hidden: true, disabled: false },
  [LesionSinisterFieldEnum.policy]: { hidden: true, disabled: false },
  [LesionSinisterFieldEnum.healthcareCenter]: { hidden: true, disabled: false },
  [LesionSinisterFieldEnum.address]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.number]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.region]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.city]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.postalCode]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.assets]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.sinisterDescription]: { hidden: false, disabled: false },

  [LesionSinisterFieldEnum.ambulance]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.healthcareCenter]: { hidden: true, disabled: false },
  
  [LesionSinisterFieldEnum.criminalCase]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.caseNumber]: { hidden: true, disabled: false },
  [LesionSinisterFieldEnum.courtNumber]: { hidden: true, disabled: false },
  [LesionSinisterFieldEnum.policeStation]: { hidden: true, disabled: false },
  [LesionSinisterFieldEnum.propertyOwner]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.realTenant]: { hidden: false, disabled: false },
  [LesionSinisterFieldEnum.assetTitular]: { hidden: false, disabled: false },
}


export const viewFields = {
}

