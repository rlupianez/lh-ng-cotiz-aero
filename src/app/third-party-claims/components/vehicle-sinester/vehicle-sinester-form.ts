import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { VehicleSinesterFieldEnum } from './vehicle-sinester.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
    [VehicleSinesterFieldEnum.date]: {
        label: 'Fecha del accidente',
        control: {
          type: 'datepicker',
          format: 'dd/mm/yyyy',
          config: {
            min: moment().add(-3,'years'),
            max: moment().add(0,'days')
          },
        },
        class: 'col-12 col-sm-12 col-md-4 col-lg-4',
        validators: [
          'required'
        ]
    },
    [VehicleSinesterFieldEnum.hour]: {
        label: 'Hora',
        control: {
            type: 'inputHourMinute'
        },
        class: 'col-6 col-sm-6 col-md-4 col-lg-4',
        validators: [
            'required'
        ]
    },
    [VehicleSinesterFieldEnum.plateType]: {
        label: 'Patente',
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-12 col-md-4 col-lg-4',
        validators: [
            'required'
        ]
    },
    [VehicleSinesterFieldEnum.address]: {
        label: 'Dirección del accidentado',
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-12 col-md-4 col-lg-4',
        validators: [
            'required'
        ]
    },
    [VehicleSinesterFieldEnum.country]: {
        label: 'País',
        control: {
            type: 'select',
            path: '/listas/LIST_NACIONALIDADES',
            options: {
                value: 'x_pais',
                key: 'cod_pais'
            },
            pasteFieldOnSelect: 'cod_pais',
            hasEmptyOption: true
        },
        class: 'col-12 col-sm-12 col-md-4 col-lg-4'
    },
    [VehicleSinesterFieldEnum.region]: {
        label: 'Provincia',
        control: {
            type: 'select',
            path: '/listas/LIST_PROVINCIAS',
            options: {
                value: 'descri',
                key: 'cod_jur'
            },
            pasteFieldOnSelect: 'cod_jur',
            hasEmptyOption: true
        },
        class: 'col-12 col-sm-12 col-md-4 col-lg-4',
    },

    [VehicleSinesterFieldEnum.city]: {
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
        class: 'col-12 col-sm-12 col-md-4 col-lg-4'
    },
    [VehicleSinesterFieldEnum.postalCode]: {
        label: 'Código Postal',
        control: {
            type: 'text',
            config: {
                maxlength: 7
            }
        },
        validators: [

        ],
        class: 'col-6 col-sm-6 col-md-4 col-lg-4',
    },
    [VehicleSinesterFieldEnum.occurrenceForm]: {
        label: 'Forma de ocurrencia',
        control: {
            type: 'textArea',
            config: {

            },
            cols: 10,
            rows: 3
        },
        validators: [
            'required'
        ],
        class: 'col-12 col-sm-12 col-md-12 col-lg-12'
    },
    [VehicleSinesterFieldEnum.damageDetail]: {
        label: 'Detalle de daño',
        control: {
            type: 'textArea',
            config: {

            },
            cols: 10,
            rows: 3
        },
        validators: [
            'required'
        ],
        class: 'col-12 col-sm-12 col-md-12 col-lg-12'
    },
    [VehicleSinesterFieldEnum.repairVehicle]: {
        label: '¿El vehículo ha sido reparado?',
        control: {
            type: 'inputRadio',
            list: [
                { title: 'SI', value: 'true' },
                { title: 'No', value: 'false' }
            ],
            hasEmptyOption: false
        },
        class: 'col-12 col-sm-12 col-md-12 col-lg-12',
        validators: [
            'required'
        ]
    }
    ,
    [VehicleSinesterFieldEnum.hasInsurance]: {
        label: '¿Posee seguro?',
        control: {
            type: 'inputRadio',
            list: [
                { title: 'Si', value: 'true' },
                { title: 'No', value: 'false' }
            ],
            hasEmptyOption: false
        },
        class: 'col-12 col-sm-12 col-md-12 col-lg-12',
        validators: [
            'required'
        ]
    },
    [VehicleSinesterFieldEnum.affectedCoverage]: {
        label: 'Cobertura afectada',
        control: {
            type: 'select',
            path: '/listas/LIST_COBERTURAS',
            options: {
                value: 'descri', 
                key: 'cod_cobert' 
            },
            pasteFieldOnSelect: 'descri',
            hasEmptyOption: false,
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required'
        ],
    },
    [VehicleSinesterFieldEnum.thirdPartyCompany]: {
        label: 'Asegurado en',
        control: {
            type: 'select',
            path: '/listas/LIST_COBERTURAS',
            options: {
                value: 'descri', 
                key: 'cod_cobert' 
            },
            pasteFieldOnSelect: 'descri',
            hasEmptyOption: false,
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required'
        ],
    },
    [VehicleSinesterFieldEnum.policy]: {
        label: 'póliza',
        control: {
            type: 'number'
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3',
        validators: [
            'required'
        ]
    },
}

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
    [VehicleSinesterFieldEnum.date]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.hour]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.plateType]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.address]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.country]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.region]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.city]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.postalCode]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.occurrenceForm]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.damageDetail]: { hidden: false, disabled: false },
    [VehicleSinesterFieldEnum.repairVehicle]: { hidden: false, disabled: false },
}

export const viewFields = {


}

