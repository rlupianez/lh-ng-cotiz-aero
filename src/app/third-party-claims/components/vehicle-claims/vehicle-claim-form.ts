import { Validators } from '@angular/forms';
import { VehicleFieldEnum } from './vehicle-claim.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
    [VehicleFieldEnum.vehicleOwner]: {
        label: '¿El propietario es el conductor?',
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
    [VehicleFieldEnum.driverName]: {
        label: 'Nombre del conductor',
        control: {
            type: 'text',
            config: {

            }
        },
        validators: [

        ],
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleFieldEnum.vehicleType]: {
        label: 'Tipo',
        control: {
            type: 'select',
            // path: '/listas/LIST_PROVINCIAS',
            options: {
                value: 'desc_tipo',
                key: 'cod_tipo'
            },
            list: [
                { key: "AUTO", value: 'Auto' },
                { key: "MOTO", value: 'Moto' }
            ]
            ,
            pasteFieldOnSelect: 'cod_tipo',
            hasEmptyOption: true
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleFieldEnum.brand]: {
        label: 'Marca',
        control: {
            type: 'select',
            path: '/listas/LIST_MARCAS_AU',
            options: {
                key: 'cod_marca',
                value: 'desc_marca'
            },
            pasteFieldOnSelect: 'cod_marca',
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleFieldEnum.brandModel]: {
        label: 'Modelo de marca',
        control: {
            type: 'select',
            path: '/listas/LIST_MARCAS_AU',
            options: {
                key: 'cod_modelo',
                value: 'desc_modelo'
            },
            pasteFieldOnSelect: 'cod_modelo',
            hasEmptyOption: true
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleFieldEnum.year]: {
        label: 'Año de fabricación',
        control: {
            type: 'select',
            path: '/listas/LIST_MARCAS_AU',
            options: {
                key: 'cod_modelo',
                value: 'anio'
            },
            pasteFieldOnSelect: 'cod_modelo',
            hasEmptyOption: true
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleFieldEnum.use]: {
        label: 'Usos',
        control: {
            type: 'select',
            path: '/listas/LIST_USOS_AU',
            options: {
                value: 'desc_uso',
                key: 'cod_uso'
            },
            pasteFieldOnSelect: 'cod_uso',
            hasEmptyOption: true,
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleFieldEnum.plateType]: {
        label: 'Patente',
        control: {
            type: 'text',
            config: {
                maxlength: 7
            }
        },
        validators: [
            Validators.minLength(7)
        ],
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleFieldEnum.motor]: {
        label: 'Motor',
        control: {
            type: 'text',
            config: {
                maxlength: 7
            }
        },
        validators: [
            Validators.minLength(7)
        ],
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleFieldEnum.chassis]: {
        label: 'Chasis',
        control: {
            type: 'text',
            config: {
                maxlength: 7
            }
        },
        validators: [
            Validators.minLength(7)
        ],
        class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    },
    [VehicleFieldEnum.insurance]: {
        label: 'Asegurado en',
        control: {
            type: 'select',
            class: 'col-sm-8',
            path: '/listas/LIST_CIAS_TERCEROS_SIN',
            options: {
                key: 'cod_cia_tercero',
                value: 'desc_cia_tercero' 
            },
            pasteFieldOnSelect: 'cod_cia_tercero',
            defaultValue: '',
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3',
        required: true
    },
    [VehicleFieldEnum.riskType]: {
        label: 'Tipo Riesgo',
        control: {
            type: 'select',
            class: 'col-sm-8',
            path: '/listas/LIST_TIPO_SINIESTROS',
            filters: {
                p_danios: [
                    { cod_danio: 1 },
                    { cod_danio: 2 },
                    { cod_danio: 3 },
                    { cod_danio: 4 }
                ]
            },
            options: {
                key: 'cod_danio',
                value: 'desc_tipo_siniestro',
            },
            pasteFieldOnSelect: 'cod_danio',
        },
        class: 'col-12 col-sm-12 col-md-3 col-lg-3',
        required: true
    },
    [VehicleFieldEnum.region]: {
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
        class: 'col-12 col-sm-12 col-md-3 col-lg-4'
    },

    [VehicleFieldEnum.contactData]: {
        label: 'Dirección y teléfono de contacto',
        control: {
            type: 'text',
        },
        validators: [
            'required'
        ],
        class: 'col-12 col-sm-12 col-md-12 col-lg-8',
    }
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
    [VehicleFieldEnum.vehicleOwner]: { hidden: false, disabled: false },
    [VehicleFieldEnum.driverName]: { hidden: false, disabled: false },
    [VehicleFieldEnum.vehicleType]: { hidden: false, disabled: false },
    [VehicleFieldEnum.brand]: { hidden: false, disabled: false },
    [VehicleFieldEnum.brandModel]: { hidden: false, disabled: false },
    [VehicleFieldEnum.year]: { hidden: false, disabled: false },
    [VehicleFieldEnum.use]: { hidden: false, disabled: false },
    [VehicleFieldEnum.plateType]: { hidden: false, disabled: false },
    [VehicleFieldEnum.motor]: { hidden: false, disabled: false },
    [VehicleFieldEnum.chassis]: { hidden: false, disabled: false },
    [VehicleFieldEnum.insurance]: { hidden: false, disabled: false },
    [VehicleFieldEnum.riskType]: { hidden: false, disabled: false },
    [VehicleFieldEnum.region]: { hidden: false, disabled: false },
    [VehicleFieldEnum.contactData]: { hidden: false, disabled: false }
}

export const viewFields = {

}

