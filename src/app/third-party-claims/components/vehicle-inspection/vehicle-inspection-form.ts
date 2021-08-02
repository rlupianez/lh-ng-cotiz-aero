import { Validators } from '@angular/forms';
import { VehicleInspectionFieldEnum } from './vehicle-inspection.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
    [VehicleInspectionFieldEnum.transferInspection]: {
        label: '¿Desea coordinar una inspección?',
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
           
        ]
    },
    [VehicleInspectionFieldEnum.timeRange]: {
        label: 'Rango Horario',
        control: {
            type: 'text'
        },
        class: 'col-sm-6 col-md-6 col-lg-6',
    },

    [VehicleInspectionFieldEnum.inspectionDate]: {
        label: 'Fecha de inspección',
        control: {
            type: 'datepicker',
            format: 'dd/mm/yyyy',
            config: {
                max: '+1'
            },
        },
        class: 'col-sm-6 col-md-6 col-lg-6',
        validators: [
            
        ],
    },

    [VehicleInspectionFieldEnum.street]: {
        label: 'Calle',
        control: {
            type: 'text'
        },
        class: 'col-12 col-sm-12  col-md-6 col-lg-6',
        validators: [
           
        ]
    },
    [VehicleInspectionFieldEnum.number]: {
        label: 'Número',
        control: {
            type: 'text'
        },
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
        validators: [
            
        ]
    },
    [VehicleInspectionFieldEnum.floor]: {
        label: 'Piso',
        control: {
            type: 'text'
        },
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
        validators: [
          
        ]
    },
    [VehicleInspectionFieldEnum.deparment]: {
        label: 'Dpto',
        control: {
            type: 'text'
        },
        class: 'col-4 col-sm-4  col-md-6 col-lg-2',
        validators: [
           
        ]
    },
    [VehicleInspectionFieldEnum.region]: {
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
    [VehicleInspectionFieldEnum.city]: {
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
    [VehicleInspectionFieldEnum.postalCode]: {
        label: 'Código Postal',
        control: {
            type: 'number'
        },
        class: 'col-6 col-sm-6 col-md-3 col-lg-3'
    },
    [VehicleInspectionFieldEnum.phone]: {
        label: 'Número teléfono',
        control: {
            type: 'number'
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleInspectionFieldEnum.celular]: {
        label: 'Número Celular',
        control: {
            type: 'number'
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    }
}
//
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
    [VehicleInspectionFieldEnum.transferInspection]: { hidden: false, disabled: false },

    //hidden
    [VehicleInspectionFieldEnum.inspectionDate]: { hidden: true, disabled: false },
    [VehicleInspectionFieldEnum.timeRange]: { hidden: true, disabled: true },
    //hidden Address

    [VehicleInspectionFieldEnum.street]: { hidden: true, disabled: false },
    [VehicleInspectionFieldEnum.number]: { hidden: true, disabled: false },
    [VehicleInspectionFieldEnum.floor]: { hidden: true, disabled: false },
    [VehicleInspectionFieldEnum.deparment]: { hidden: true, disabled: false },
    [VehicleInspectionFieldEnum.region]: { hidden: true, disabled: false },
    [VehicleInspectionFieldEnum.city]: { hidden: true, disabled: false },
    [VehicleInspectionFieldEnum.postalCode]: { hidden: true, disabled: false },
    [VehicleInspectionFieldEnum.phone]: { hidden: true, disabled: false },
    [VehicleInspectionFieldEnum.celular]: { hidden: true, disabled: false },
}

export const viewFields = {

}

