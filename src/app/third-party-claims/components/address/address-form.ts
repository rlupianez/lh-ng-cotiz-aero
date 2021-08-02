import { Validators } from '@angular/forms';
import { AddressFieldEnum } from './address.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
    [AddressFieldEnum.street]: {
        label: 'Calle',
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-12  col-md-6 col-lg-6',
        validators: [
            'required'
        ]
    },
    [AddressFieldEnum.number]: {
        label: 'Número',
        control: {
            type: 'text'
        },
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
        validators: [
            'required'
        ]
    },
    [AddressFieldEnum.floor]: {
        label: 'Piso',
        control: {
            type: 'text'
        },
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
        validators: [
          
        ]
    },
    [AddressFieldEnum.deparment]: {
        label: 'Dpto',
        control: {
            type: 'text'
        },
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
        validators: [
           
        ]
    },
    [AddressFieldEnum.region]: {
        label: 'Provincia',
        control: {
            type: 'select',
            searchable: true,
            path: '/listas/LIST_PROVINCIAS',
            options: {
                value: 'descri',
                key: 'cod_jur'
            },
            apiSearchFieldname: 'p_busca',
            pasteFieldOnSelect: 'cod_jur',
            hasEmptyOption: true
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [AddressFieldEnum.city]: {
        label: 'Localidad',
        control: {
            type: 'select',
            searchable: true,
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
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [AddressFieldEnum.postalCode]: {
        label: 'Código Postal',
        control: {
            type: 'number'
        },
        class: 'col-6 col-sm-6 col-md-3 col-lg-3'
    },
    [AddressFieldEnum.phone]: {
        label: 'Número teléfono',
        control: {
            type: 'number'
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [AddressFieldEnum.celular]: {
        label: 'Número Celular',
        control: {
            type: 'number'
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [AddressFieldEnum.email]: {
        label: 'Email',
        control: {
            type: 'input'
        },
        validators: [
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ],
        class: 'col-12 col-sm-12 col-md-6 col-lg-6'
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
    [AddressFieldEnum.street]: { hidden: false, disabled: false },
    [AddressFieldEnum.number]: { hidden: false, disabled: false },
    [AddressFieldEnum.floor]: { hidden: false, disabled: false },
    [AddressFieldEnum.deparment]: { hidden: false, disabled: false },
    [AddressFieldEnum.region]: { hidden: false, disabled: false },
    [AddressFieldEnum.city]: { hidden: false, disabled: false },
    [AddressFieldEnum.postalCode]: { hidden: false, disabled: false },
    [AddressFieldEnum.phone]: { hidden: false, disabled: false },
    [AddressFieldEnum.celular]: { hidden: false, disabled: false },
    [AddressFieldEnum.email]: { hidden: false, disabled: false }
}

export const viewFields = {


}

