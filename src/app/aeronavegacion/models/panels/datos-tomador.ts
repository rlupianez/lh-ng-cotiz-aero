import { Validators, AbstractControl, ControlContainer } from '@angular/forms';
import * as moment from 'moment';
//var cbu = require('arg.js').cbu;
import { validCuit } from '@core/validators/cuit.js';



/*********** CUSTOMS VALIDATORS ************/


function cuitValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if(!control.value){
        return { cuit: true }
    }
    if(control && control.value && control.value.toString().length === 11){
        if(!validCuit(control.value)){
            return { cuit: true };
        }else{
            return null
        }
    }
    return null;
}



/*=========================================*/

export type tFieldname =   'cod_iva' | 
                    'desc_iva' |
                    'cod_tipo_doc' |
                    'desc_tipo_doc' |
                    'nro_documento' |
                    'cuit' |
                    'cod_tipo_persona' |
                    'desc_tipo_persona' |
                    'condicion_iibb' |
                    'nombre' |
                    'apellido' |
                    'razon_social' |
                    'cod_provincia' |
                    'desc_provincia';

export type tFields = { 
    [K in tFieldname]: object | string
}; 




export interface iFields   {
    cod_iva: object | string;
    desc_iva: object | string;
    cod_tipo_doc: object | string;
    desc_tipo_doc: object | string;
    nro_documento: object | string;
    cuit: object | string;
    cod_tipo_persona: object | string;
    desc_tipo_persona: object | string;
    condicion_iibb: object | string;
    nombre: object | string;
    apellido: object | string;
    razon_social: object | string;
    cod_provincia: object | string;
    desc_provincia: object | string;
}


export const fields: iFields = {
    cod_iva: {
        label: 'Condición I.V.A.zzz',
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_COND_IVA',
            options: {
                value: 'descri',
                key: 'cod_iva'
            },
            pasteFieldOnSelect: 'cod_iva',
            hasEmptyOption: true,
            dataType: 'object'
        },
        required: true,
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    desc_iva: {
        label: 'Condición I.V.A',
        disabled: true,
        control: {
            type: 'text'
        },
        required: true,
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    cod_tipo_doc: {
        label: 'Tipo de Documento',
        hidden: false,
        
        disabled: false,
        control: { 
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_TIPOS_DOC',
            options: {
                value: 'abrev',
                key: 'cod_docum'
            },
            pasteFieldOnSelect: 'abrev',
            hasEmptyOption: true,
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    desc_tipo_doc: {
        label: 'Tipo de Documento',
        hidden: true,
        disabled: true,
        control: { 
            type: 'text'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    nro_documento: {
        label: 'Número de Documentox1',
        // hidden: true,
        disabled: true,
        control: {
            type: 'typeahead',
            inputType: 'number',
            // appearance: 'standard',
            searchWithNoItemSelected: true,
            path: '/listas/LIST_ASEGURADOS',
            options: {
                key: 'nro_documento',
                value: 'ape_nom_rsoc',
                description: 'nro_documento'
            },
            config: {
                maxlength: 8
            },
            pasteFieldOnSelect: 'nro_documento',
            apiSearchFieldname: 'p_filtro',
            defaultValue: '',
        },
        required: true,
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
        validators: [
            Validators.minLength(8),
            Validators.maxLength(8),
            'required'
        ]
    },
    cuit: {
        label: 'CUIT',
        disabled: true,
        hidden: true,
        control: {
            type: 'typeahead',
            inputType: 'number',
            // appearance: 'standard',
            searchWithNoItemSelected: true,
            path: '/listas/LIST_ASEGURADOS',
            options: {
                key: 'cuit',
                value: 'ape_nom_rsoc',
                description: 'cuit'
            },
            pasteFieldOnSelect: 'cuit',
            apiSearchFieldname: 'p_filtro',
            defaultValue: '',
            config: {
                maxlength: 11
            }
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
        validators: [
            Validators.minLength(11),
            cuitValidator,
            'required',

        ]
    },
    cod_tipo_persona: {
        label: 'Tipo de persona',
        disabled: true,
        hidden: true,
        control: { 
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_TIPOS_PERSONAS',
            options: {
                value: 'descri',
                key: 'codigo'
            },
            pasteFieldOnSelect: 'descri',
            hasEmptyOption: true
        },
        /*validators: [
            'required'
        ],*/
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },
    desc_tipo_persona: {
        label: 'Tipo de Persona',
        control: {
            type: 'input',
            // appearance: 'standard'
        },
        /*validators: [
            'required'
        ],*/
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
    },
    condicion_iibb: {
        label: 'Condicion IIBB',
        disabled: true,
        hidden: true,
        control: { 
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_INGRESOS_BRUTOS',
            options: {
                value: 'desc_iibb',
                key: 'cod_iibb'
            },
            pasteFieldOnSelect: 'desc_iibb'
        },
        class: 'col-12 col-sm-4 col-md-4 col-lg-4'
    },
    nombre: {
        label: 'Nombre',
        control: {
            type: 'input',
            // appearance: 'standard'
        },
        validators: [
            'required'
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
    },
    apellido: {
        label: 'Apellido',
        control: {
            type: 'input',
            // appearance: 'standard'
        },
        validators: [
            'required'
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    razon_social: {
        label: 'Razón Social',
        control: {
            type: 'input',
            // appearance: 'standard'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    cod_provincia: {
        label: 'Provincia',
        control: { 
            type: 'select',
            searchable: true,
            // appearance: 'standard',
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
        control: { 
            type: 'text'
        },
        class: 'col-12 col-sm-3 col-md-3 col-lg-4'
    },

}


export const formFields: iFields  = {
    cod_iva: { hidden: false },
    desc_iva: { hidden: true, disabled: true },
    cod_tipo_doc: { hidden: true, disabled: true },
    desc_tipo_doc: { hidden: true, disabled: true },
    nro_documento: { hidden: true, disabled: true },
    cuit: { hidden: true, disabled: true },
    condicion_iibb:  { hidden: true, disabled: true },
    cod_tipo_persona: { hidden: true, disabled: true },
    desc_tipo_persona: { hidden: true, disabled: true },
    nombre: { hidden: true, disabled: true },
    apellido: { hidden: true, disabled: true },
    razon_social: { hidden: true, disabled: true },
    cod_provincia: { hidden: true, disabled: true },
    desc_provincia: { hidden: true, disabled: true },
}

export const viewFields: iFields  = {
    cod_iva: { hidden: true, disabled: true  },
    desc_iva: { hidden: false, disabled: true },
    cod_tipo_doc: { hidden: true, disabled: false },
    desc_tipo_doc: { hidden: true, disabled: true },
    nro_documento: { hidden: false, disabled: true },
    cuit: { hidden: false, disabled: true },
    condicion_iibb:  { hidden: true, disabled: true },
    cod_tipo_persona: { hidden: true, disabled: true },
    desc_tipo_persona: { hidden: true, disabled: true },
    nombre: { hidden: false, disabled: true },
    apellido: { hidden: false, disabled: true },
    razon_social: { hidden: false, disabled: true },
    cod_provincia: { hidden: true, disabled: true },
    desc_provincia: { hidden: false, disabled: true },
}


/*export const formFields: tFieldname[] = ['cod_iva','cod_tipo_doc','desc_tipo_doc','nro_documento','cuit','cod_tipo_persona','nombre','apellido','razon_social', 'cod_provincia'];

export const viewFields: tFieldname[] = ['desc_iva','desc_tipo_doc','nro_documento','cuit','nombre','apellido','razon_social'];
*/
export const group = {
    title: 'Datos del productor',
    icon: 'assignment_ind',
    content: '',
    expanded: true,
    children: fields
}

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
            format: 'dd/mm/yyyy'
        },
        class: 'col-sm-12 col-md-12 col-lg-4'
    },
    sexo: {
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
            pasteFieldOnSelect: 'cod_pais',
            hasEmptyOption: true
        },
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
    calle: {
        label: 'Calle',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    numero: {
        label: 'Número',
        control: {
            type: 'number',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    piso: {
        label: 'Piso',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    }, 
    departamento: {
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
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_LOCALIDADES',
            options: {
                value: 'desc_localidad',
                key: 'cod_postal'
            },
            pasteFieldOnSelect: 'cod_postal',
            hasEmptyOption: true
        },
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
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
        validators: [
            Validators.minLength(4)
        ]
    },
    cod_area: {
        label: 'Cód. Area',
        control: {
            type: 'number',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
        required: true
    },
    telefono: {
        label: 'Teléfono',
        control: {
            type: 'number',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
        required: true
    },
    email: {
        label: 'Email',
        control: {
            type: 'input',
            // appearance: 'standard',
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



export const viewFieldsEmitir = {
    cod_iva: { hidden: false, disabled: false },
    desc_iva: { hidden:true, disabled: true },
    cod_tipo_doc: { hidden: false, disabled: false },
    desc_tipo_doc: { hidden:true, disabled: true },
    cod_tipo_persona:{ hidden:false, disabled: false },
    desc_tipo_persona: { hidden:true, disabled: true },
    nro_documento: { hidden:false, disabled: false },
    cuit:{ hidden:true, disabled: true },
    nombre: { hidden:true, disabled: true },
    apellido:{ hidden:true, disabled: true },
    razon_social:{ hidden:true, disabled: true },
    cod_actividad: { hidden:false, disabled: false },
    desc_actividad: { hidden:true, disabled: true },
    fec_nacimiento: { hidden:false, disabled: false },
    sexo:{ hidden: false, disabled: false },
    desc_sexo: { hidden:true, disabled: true },
    cod_nacionalidad: { hidden:false, disabled: false },
    desc_nacionalidad:{ hidden:true, disabled: true },
    calle: { hidden:false, disabled: false },
    numero: { hidden:false, disabled: false },
    piso:{ hidden:false, disabled: false },
    departamento: { hidden:false, disabled: false },
    cod_provincia: { hidden:false, disabled: false },
    desc_provincia: { hidden:true, disabled: true },
    cod_localidad: { hidden:false, disabled: false },
    desc_localidad:{ hidden:true, disabled: true },
    cod_postal:{ hidden:false, disabled: false },
    cod_area: { hidden:false, disabled: false },
    telefono:{ hidden:false, disabled: false },
    email: { hidden:false, disabled: false },
    poliza_electronica: { hidden:false, disabled: false }
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
    sexo:{ hidden: false, disabled: false },
    desc_sexo: { hidden:true, disabled: true },
    cod_nacionalidad: { hidden:false, disabled: false },
    desc_nacionalidad:{ hidden:true, disabled: true },
    calle: { hidden:false, disabled: false },
    numero: { hidden:false, disabled: false },
    piso:{ hidden:false, disabled: false },
    departamento: { hidden:false, disabled: false },
    cod_provincia: { hidden:false, disabled: false },
    desc_provincia: { hidden:true, disabled: true },
    cod_localidad: { hidden:false, disabled: true },
    desc_localidad:{ hidden:true, disabled: true },
    cod_postal:{ hidden:false, disabled: false },
    cod_area: { hidden:false, disabled: false },
    telefono:{ hidden:false, disabled: false },
    email: { hidden:false, disabled: false },
    poliza_electronica: { hidden:false, disabled: false }
}


export const groupEmitir = {
    title: 'Datos del Tomador',
    icon: 'assignment_ind',
    content: '',
    expanded: true,
    children: fieldsEmitir
}
