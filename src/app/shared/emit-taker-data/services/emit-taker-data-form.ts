import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { EmitTakerDataFieldEnum } from './emit-taker-data.interfaces';
import { SettingForm } from '../../enums/setting';
/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {

    [EmitTakerDataFieldEnum.ivaCondition]: {
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

    [EmitTakerDataFieldEnum.cuit]: {
        label: 'CUIT',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        validators: [
            'required'
        ],
        class: 'col-3 col-sm-3 col-md-3 col-lg-3'
    },

    [EmitTakerDataFieldEnum.businessName]: {
        label: 'Razón Social',
        disabled: true,
        control: {
            type: 'input',
            appearance: SettingForm.apparence,
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3'
    },

    [EmitTakerDataFieldEnum.activity]: {
        label: 'Actividad',
        control: {
            type: 'select',
            searchable: true,
            path: '/listas/LIST_ACTIVIDADES',
            appearance: SettingForm.apparence,
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
        class: 'col-3 col-sm-3 col-md-3 col-lg-3'
    },

    [EmitTakerDataFieldEnum.birthdate]: {
        label: 'Fecha de Nacimiento',
        control: {
            type: 'datepicker',
            appearance: SettingForm.apparence,
            format: 'dd/mm/yyyy',
            config: {
                max: moment().subtract(18, 'years'),
                min: moment().subtract(99, 'years')
            },
        },
        validators: [
            'required'
        ],
        class: 'col-3 col-sm-3 col-md-3 col-lg-3'
    },

    [EmitTakerDataFieldEnum.address]: {
        label: 'Calle',
        control: {
            type: 'input',
            appearance: SettingForm.apparence,
        },
        validators: [
            'required'
        ],
        class: 'col-3 col-sm-3 col-md-3 col-lg-3'
    },

    [EmitTakerDataFieldEnum.number]: {
        label: 'Puerta',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        validators: [
            'required'
        ],
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
    },

    [EmitTakerDataFieldEnum.floor]: {
        label: 'Piso',
        control: {
            type: 'input',
            appearance: SettingForm.apparence,
        },
        validators: [
            'required'
        ],
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
    },

    [EmitTakerDataFieldEnum.depto]: {
        label: 'Departamento',
        control: {
            type: 'input',
            appearance: SettingForm.apparence,
        },
        validators: [
            'required'
        ],
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
    },

    [EmitTakerDataFieldEnum.region]: {
        label: 'Provincia',
        disabled: false,
        required: true,
        control: {
            type: 'select',
            searchable: true,
            appearance: SettingForm.apparence,
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
        class: 'col-3 col-sm-3 col-md-3 col-lg-3'
    },

    [EmitTakerDataFieldEnum.city]: {
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
        class: 'col-3 col-sm-3 col-md-3 col-lg-3'
    },

    [EmitTakerDataFieldEnum.postalCode]: {
        label: 'Código Postal',
        control: {
            type: 'text',
            appearance: SettingForm.apparence,
        },
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
    },

    [EmitTakerDataFieldEnum.phone]: {
        label: 'Teléfono',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
            config: {
                maxlength: 15
            },
        },
        validators: [
            Validators.minLength(8),
            'required'
        ],
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',

    },
    [EmitTakerDataFieldEnum.email]: {
        label: 'Email',
        control: {
            type: 'input',
            appearance: SettingForm.apparence,
        },
        validators: [
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            'required'
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    [EmitTakerDataFieldEnum.electronicPolicy]: {
        label: 'Póliza Electrónica',
        control: {
            type: 'slide',
            defaultValue: false.valueOf,
            appearance: SettingForm.apparence,
        },
        class: 'col-12 col-sm-12  col-md-12 col-lg-12',
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
    [EmitTakerDataFieldEnum.ivaCondition]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.cuit]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.businessName]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.activity]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.birthdate]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.address]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.number]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.floor]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.depto]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.region]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.city]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.postalCode]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.phone]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.email]: { hidden: false, disabled: false },
    [EmitTakerDataFieldEnum.electronicPolicy]: { hidden: false, disabled: false },
}

export const viewFields = {

}

