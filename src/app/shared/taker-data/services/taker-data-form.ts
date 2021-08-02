import { Validators } from '@angular/forms';
import { SettingForm } from '@shared/enums/setting';
import { TakeDataFieldEnum } from './taker-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {

    [TakeDataFieldEnum.documentType]: {
        label: 'Tipo de Documento',
        control: {
            type: 'select',
            path: '/listas/LIST_TIPOS_DOC',
            appearance: SettingForm.apparence,
            options: {
                value: 'abrev', // ver el mapeo
                key: 'cod_docum' // ver el mapeo
            },
            pasteFieldOnSelect: 'abrev',
            hasEmptyOption: false,
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',
        validators: [
            'required'
        ],
    },
    [TakeDataFieldEnum.ivaCondition]: {
        label: 'Condición I.V.A',
        control: {
            type: 'select',
            path: '/listas/LIST_COND_IVA',
            appearance: SettingForm.apparence,
            options: {
                value: 'descri',
                key: 'cod_iva'
            },
            pasteFieldOnSelect: 'descri',
            hasEmptyOption: true,
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3'
    },

    [TakeDataFieldEnum.documentNumber]: {
        label: 'Número de Documento',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
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
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',

    },
    [TakeDataFieldEnum.cuit]: {
        label: 'CUIT',
        control: {
            type: 'number',
            inputType: 'number',
            searchWithNoItemSelected: true,
            appearance: SettingForm.apparence,
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
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',
        validators: [
            Validators.minLength(11),
            'required',

        ]
    },
    [TakeDataFieldEnum.name]: {
        label: 'Nombre',
        control: {
            type: 'text',
            appearance: SettingForm.apparence,
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',
        validators: [

        ]
    },
    [TakeDataFieldEnum.surname]: {
        label: 'Apellido',
        control: {
            type: 'text',
            appearance: SettingForm.apparence,
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',
        validators: [

        ]
    },
    [TakeDataFieldEnum.businessName]: {
        label: 'Razón Social',
        control: {
            type: 'text',
            appearance: SettingForm.apparence,
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',
        validators: [

        ]
    },
    [TakeDataFieldEnum.region]: {
        label: 'Provincia',
        control: {
            type: 'select',
            searchable: true,
            path: '/listas/LIST_PROVINCIAS',
            appearance: SettingForm.apparence,
            options: {
                value: 'descri',
                key: 'cod_jur'
            },
            apiSearchFieldname: 'p_busca',
            pasteFieldOnSelect: 'cod_jur',
            hasEmptyOption: true
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3'
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
    [TakeDataFieldEnum.documentType]: { hidden: false, disabled: false },
    [TakeDataFieldEnum.ivaCondition]: { hidden: false, disabled: false },
    [TakeDataFieldEnum.cuit]: { hidden: true, disabled: false },
    [TakeDataFieldEnum.documentNumber]: { hidden: true, disabled: false },
    [TakeDataFieldEnum.name]: { hidden: true, disabled: false },
    [TakeDataFieldEnum.surname]: { hidden: true, disabled: false },
    [TakeDataFieldEnum.businessName]: { hidden: true, disabled: false },
    [TakeDataFieldEnum.region]: { hidden: false, disabled: false },
}

export const viewFields = {

}

