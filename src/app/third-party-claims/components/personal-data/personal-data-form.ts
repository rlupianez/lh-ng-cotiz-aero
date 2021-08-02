import { Validators } from '@angular/forms';
import { cuitValidator } from '@shared/services/validator.helper';
import * as moment from 'moment';
import { PersonalFieldEnum } from './personal-data.interfaces';

/**
* 
*  Aca definis todos los campos posibles del formulario
*/
export const fields = {
    [PersonalFieldEnum.surname]: {
        label: 'Apellido',
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-12 col-md-6 col-lg-3',
        validators: [
            'required'
        ]
    },
    [PersonalFieldEnum.name]: {
        label: 'Nombre',
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-12 col-md-6 col-lg-3',
        validators: [
            'required'
        ]
    },
    [PersonalFieldEnum.documentType]: {
        label: 'Tipo de Documento',
        control: {
            type: 'select',
            path: '/listas/LIST_TIPOS_DOC',
            options: {
                value: 'abrev',
                key: 'cod_docum'
            },
            pasteFieldOnSelect: 'abrev',
            hasEmptyOption: false,
        },
        class: 'col-12 col-sm-12  col-md-6 col-lg-3',
        validators: [
            'required'
        ]
    },
    [PersonalFieldEnum.documentNumber]: {
        label: 'Número de Documento',
        control: {
            type: 'number',
            config: {
                maxlength: 8
            }
        },
        class: 'col-12 col-sm-12  col-md-5 col-lg-3',
        validators: [
            Validators.minLength(8)
        ]
    },
    [PersonalFieldEnum.cuit]: {
        label: 'CUIT',
        control: {
            type: 'number',
            config: {
                maxlength: 11
            }
        },
        class: 'col-12 col-sm-12  col-md-6 col-lg-3',
        validators: [
            Validators.minLength(11),
        ]
    },
    [PersonalFieldEnum.phone]: {
        label: 'Teléfono',
        control: {
            type: 'number',
        },
        class: 'col-12 col-sm-12  col-md-6 col-lg-3',
    },
    [PersonalFieldEnum.email]: {
        label: 'Email',
        control: {
            type: 'input',
        },
        validators: [
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            'required'
        ],
        class: 'col-12 col-sm-12  col-md-6 col-lg-6',
    },
    [PersonalFieldEnum.celular]: {
        label: 'Celular',
        control: {
            type: 'number',
        },
        class: 'col-12 col-sm-12  col-md-6 col-lg-3',
        validators: [
            'required'
        ]
    },
    [PersonalFieldEnum.sex]: {
        label: 'Sexo',
        control: {
            type: 'select',
            path: '/listas/LIST_SEXOS',
            options: {
                value: 'descri',
                key: 'codigo'
            },
            pasteFieldOnSelect: 'descri',
            hasEmptyOption: true
        },
        class: 'col-12 col-sm-12  col-md-6 col-lg-3'
    },
    [PersonalFieldEnum.birthdate]: {
        label: 'Fecha de nacimiento',
        control: {
            type: 'datepicker',
            format: 'dd/mm/yyyy',
            config: {
                max: moment().subtract(18, 'years'),
                min: moment().subtract(99, 'years')
            },
        },

        class: 'col-12 col-sm-12 col-md-6 col-lg-3',
        validators: [
            'required'
        ]
    },
    [PersonalFieldEnum.country]: {
        label: 'Nacionalidad',
        control: {
            type: 'select',
            path: '/listas/LIST_NACIONALIDADES',
            options: {
                value: 'x_pais',
                key: 'cod_pais'
            },
            pasteFieldOnSelect: 'x_pais',
            hasEmptyOption: true
        },
        class: 'col-12 col-sm-12 col-md-6 col-lg-3'
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
    [PersonalFieldEnum.surname]: { hidden: false, disabled: false },
    [PersonalFieldEnum.name]: { hidden: false, disabled: false },
    [PersonalFieldEnum.documentType]: { hidden: false, disabled: false },
    [PersonalFieldEnum.documentNumber]: { hidden: true, disabled: false },
    [PersonalFieldEnum.cuit]: { hidden: true, disabled: false },
    [PersonalFieldEnum.celular]: { hidden: false, disabled: false },
    [PersonalFieldEnum.phone]: { hidden: false, disabled: false },
    [PersonalFieldEnum.email]: { hidden: false, disabled: false },
    [PersonalFieldEnum.sex]: { hidden: false, disabled: false },
    [PersonalFieldEnum.birthdate]: { hidden: false, disabled: false },
    [PersonalFieldEnum.country]: { hidden: false, disabled: false },
};


export const viewFields = {

}

