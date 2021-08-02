import { Validators, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

///////////////////////////////////////////////////////////////////////

export const fieldsEmitir = {
    condicion_iva: {
        label: 'Condición I.V.A',
        hidden: true,
        disabled: true,
        editable: false,
        control: {
            type: 'input'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    desc_iva: {
        label: 'Condición I.V.A',
        disabled: true,
        editable: false,
        control: {
            type: 'input'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    tipo_documento: {
        label: 'Tipo de Documento',
        hidden: true,
        disabled: true,
        control: {
            type: 'input'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    desc_tipo_documento: {
        label: 'Tipo de Documento',
        disabled: true,
        hidden: true,
        control: {
            type: 'input'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    cod_tipo_persona: {
        label: 'Tipo de Documento',
        hidden: true,
        disabled: true,
        control: {
            type: 'input'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    desc_tipo_persona: {
        label: 'Tipo de persona',
        disabled: true,
        hidden: true,
        control: {
            type: 'input'
        },
        /*validators: [
            'required'
        ],*/
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    nro_documento: {
        label: 'Número de Documento',
        disabled: true,
        control: {
            type: 'input'
        },
        validators: [
            Validators.minLength(8),
            Validators.maxLength(8)
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    cuit: {
        label: 'CUIT',
        disabled: true,
        control: {
            type: 'input'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
        validators: [
            Validators.minLength(11),
            Validators.maxLength(11)
        ]
    },
    nombre: {
        label: 'Nombre',
        disabled: true,
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        validators: [
            'required'
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
    },
    apellido: {
        label: 'Apellido',
        disabled: true,
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    razon_social: {
        label: 'Razón Social',
        disabled: true,
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    cod_actividad: {
        label: 'Actividad',
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_ACTIVIDADES',
            options: {
                value: 'descri',
                key: 'cod_activi'
            },
            pasteFieldOnSelect: 'cod_activi',
            hasEmptyOption: true
        },
        validators: [
            'required'
        ],
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    desc_actividad: {
        label: 'Actividad',
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    fec_nacimiento: {
        label: 'Fecha de Nacimiento',
        control: {
            type: 'datepicker',
            // appearance: 'standard',,
            format: 'dd/mm/yyyy',
            config: {
                max: moment().subtract(18,'years'),
                min: moment().subtract(99,'years')
            },
        },
        validators: [
            'required'
        ],
        class: 'col-sm-12 col-md-12 col-lg-4'
    },
    cod_sexo: {
        label: 'Sexo',
        disabled: false,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_SEXOS',
            options: {
                value: 'descri',
                key: 'codigo'
            },
            pasteFieldOnSelect: 'codigo',
            hasEmptyOption: true
        },
        validators: [
            'required'
        ],
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    desc_sexo: {
        label: 'Sexo',
        hidden: true,
        disabled: true,
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    cod_nacionalidad: {
        label: 'Nacionalidad',
        disabled: false,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_NACIONALIDADES',
            options: {
                value: 'x_pais',
                key: 'cod_pais'
            },
            pasteFieldOnSelect: 'x_pais',
            hasEmptyOption: true
        },
        validators: [
            'required'
        ],
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    desc_nacionalidad: {
        label: 'Nacionalidad',
        disabled: false,
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    domicilio_ase: {
        label: 'Calle',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        validators: [
            'required'
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    nro_puerta: {
        label: 'Puerta',
        control: {
            type: 'number',
            // appearance: 'standard',
        },
        validators: [
            'required'
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    nro_piso: {
        label: 'Piso',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    }, 
    depto: {
        label: 'Departamento',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    cod_provincia: {
        label: 'Provincia',
        disabled: false,
        required: true,
        control: {
            type: 'select',
            searchable: true,
            loadOptions: true,
            // appearance: 'standard',,
            path: '/listas/LIST_PROVINCIAS',
            options: {
                value: 'descri',
                key: 'cod_jur'
            },
            pasteFieldOnSelect: 'cod_jur',
            hasEmptyOption: true
        },
        validators: [
            'required'
        ],
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    desc_provincia: {
        label: 'Provincia',
        disabled: false,
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    cod_localidad: {
        label: 'Localidad',
        disabled: true,
        control: {
            type: 'typeahead',
            // appearance: 'standard',,
            path: '/listas/LIST_LOCALIDADES_CP',
            options: {
                value: 'desc_localidad',
                key: 'cod_postal',
                description: 'cod_postal'
            },
            pasteFieldOnSelect: 'desc_localidad',
            apiSearchFieldname: 'p_buscar'
        },
        validators: [
            'required'
        ],
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    desc_localidad: {
        label: 'Localidad',
        disabled: true,
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    cod_postal: {
        label: 'Código Postal',
        disabled: true,
        control: {
            type: 'text'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    telefono: {
        label: 'Teléfono',
        control: {
            type: 'number',
            config: {
                maxlength: 15
            },
        },
        validators: [
            Validators.minLength(8),
            'required'
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
        required: true
    },
    email: {
        label: 'Email',
        control: {
            type: 'input'
        },
        validators: [
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            'required'
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    poliza_electronica: {
        label: 'Póliza Electrónica',
        control: {
            type: 'slide',
            defaultValue: false
        },
        class: 'col-sm-12 col-md-12 col-lg-12'
    }
}



export const formFieldsEmitir  = {
    cod_iva: { hidden: true, disabled: true },
    desc_iva: { hidden:false, disabled: true },
    cod_tipo_doc: { hidden: true, disabled: true },
    desc_tipo_doc: { hidden: true, disabled: true },
    cod_tipo_persona:{ hidden:true, disabled: true },
    desc_tipo_persona: { hidden:true, disabled: true },
    nro_documento: { hidden:false, disabled: true },
    cuit:{ hidden: false, disabled: true },
    nombre: { hidden: false, disabled: true },
    apellido:{ hidden: false, disabled: true },
    razon_social:{ hidden: false, disabled: true },
    cod_actividad: { hidden: false, disabled: false },
    desc_actividad: { hidden:true, disabled: true },
    fec_nacimiento: { hidden:false, disabled: false },
    cod_sexo:{ hidden: false, disabled: false },
    desc_sexo: { hidden:true, disabled: true },
    cod_nacionalidad: { hidden:false, disabled: false },
    desc_nacionalidad:{ hidden:true, disabled: true },
    domicilio_ase: { hidden:false, disabled: false },
    nro_puerta: { hidden:false, disabled: false },
    nro_piso:{ hidden:false, disabled: false },
    depto: { hidden:false, disabled: false },
    cod_provincia: { hidden:false, disabled: false },
    desc_provincia: { hidden:true, disabled: true },
    cod_localidad: { hidden:false, disabled: true },
    desc_localidad:{ hidden:true, disabled: true },
    cod_postal:{ hidden:false, disabled: true },
    telefono:{ hidden:false, disabled: false },
    email: { hidden:false, disabled: false },
    poliza_electronica: { hidden:false, disabled: false }
}


export const viewFieldsEmitir = {
    cod_iva: { hidden: true, disabled: true },
    desc_iva: { hidden: false, disabled: true },
    cod_tipo_doc: { hidden: true, disabled: true  },
    desc_tipo_doc: { hidden:true, disabled: true },
    cod_tipo_persona:{ hidden:true, disabled: true },
    desc_tipo_persona: { hidden:true, disabled: true },
    nro_documento: { hidden:false, disabled: true },
    cuit:{ hidden: false, disabled: true },
    nombre: { hidden: false, disabled: true },
    apellido:{ hidden: false, disabled: true },
    razon_social:{ hidden: false, disabled: true },
    cod_actividad: { hidden:true, disabled: true },
    desc_actividad: { hidden:false, disabled: true },
    fec_nacimiento: { hidden:false, disabled: true },
    cod_sexo:{ hidden: true, disabled: true },
    desc_sexo: { hidden:false, disabled: true },
    cod_nacionalidad: { hidden:true, disabled: true },
    desc_nacionalidad:{ hidden:false, disabled: true },
    domicilio_ase: { hidden:false, disabled: true },
    nro_puerta: { hidden:false, disabled: true },
    nro_piso:{ hidden:false, disabled: true },
    depto: { hidden:false, disabled: true },
    cod_provincia: { hidden:true, disabled: true },
    desc_provincia: { hidden:false, disabled: true },
    cod_localidad: { hidden:true, disabled: true },
    desc_localidad:{ hidden:false, disabled: true },
    cod_postal:{ hidden:false, disabled: true },
    telefono:{ hidden:false, disabled: true },
    email: { hidden:false, disabled: true },
    poliza_electronica: { hidden:false, disabled: true }
}



export const groupEmitir = {
    title: 'Datos del Tomador',
    icon: 'assignment_ind',
    content: '',
    expanded: true,
    children: fieldsEmitir
}
