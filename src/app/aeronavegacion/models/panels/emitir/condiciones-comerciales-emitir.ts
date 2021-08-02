import { Validators, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

import { validCBU } from '@core/validators/cbu.js'


function cbuValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if(!control.value){
        return { cbu: true }
    }
    if(control && control.value){
        if(!validCBU(control.value)){
            return { cbu: true };
        }else{
            return null
        }
    }
    return null;
}
////////////////////////////////////////////////////////////////////

export const fields = {
    cod_mon: {
        label: 'Moneda',
        disabled: true,
        editable: false,
        hidden: true,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_MONEDAS',
            options: {
                value: 'descri',
                key: 'cod_mon'
            },
            pasteFieldOnSelect: 'cod_mon',
            hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-12 col-lg-3',
    },
    desc_moneda: {
        label: 'Moneda',
        disabled: true,
        control: {
            type: 'text',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-3'
    },
    porc_comision: {
        label: '% de Comisión',
        disabled: true,
        editable: false,
        control: {
            type: 'number',
            // appearance: 'standard',
            /*config: {
                min: '0',
                max: '100'
            }*/
        },
        class: 'col-sm-12 col-md-12 col-lg-3',
    },
    cod_forma_pago: {
        label: 'Medios de Pago',
        hidden: true,
        disabled: true,
        editable: false,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_MEDIOS_PAGO',
            options: {
                value: 'rv_meaning',
                key: 'rv_low_value'
            },
            pasteFieldOnSelect: 'rv_meaning',
            hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-12 col-lg-3',
    },
    desc_forma_pago: {
        label: 'Medios de Pago',
        disabled: true,
        control: {
            type: 'text',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-3'
    },
    cod_plan: {
        label: 'Planes de pago',
        disabled: true,
        editable: false,
        hidden: true,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_PLANES_PAGO',
            filters: {
                p_seccion: '14'
            },
            options: {
                value: 'descri',
                key: 'cod_plan'
            },
            pasteFieldOnSelect: 'descri',
            hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-12 col-lg-3',
    },
    desc_plan_pagos: {
        label: 'Planes de pago',
        disabled: true,
        control: {
            type: 'text',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-3'
    },
    cbu: {
        label: 'CBU',
        disabled: false,
        control: {
            type: 'number',
            // appearance: 'standard',
            config: {
                maxlength: 22
            },
        },
        validators: [
            cbuValidator,
            Validators.minLength(22),
        ],
        class: 'col-6 col-sm-3 col-md-3 col-lg-3'
    },
    titular_cbu: {
        label: 'Titular CBU',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-3'
    },
    desc_tarjeta: {
        label: 'Tarjeta',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-3'
    },
    nro_tarjeta: {
        label: 'Número de Tarjeta',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-3'
    },

    // por ahora esta en credit card form
    /* asegurado_tarjeta: {
        label: 'Tarjetas de Crédito',
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_TARJETAS_ASEG',
            options: {
                value: 'codigo',
                key: 'codigo',
                description: 'descri'
            },
            pasteFieldOnSelect: 'codigo',
            hasEmptyOption: true
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    titular_tarjeta: {
        label: 'Titular',
        control: {
            type: 'input'
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    }, */
    /*tipo_tarjeta: {
        label: 'Tipo de Tarjeta de Crédito',
        disabled: false,
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_TARJETAS_CREDITO',
            options: {
                value: 'nombre',
                key: 'cod_tarje'
            },
            pasteFieldOnSelect: 'cod_tarje',
            hasEmptyOption: true
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    tarjeta_credito: {
        label: 'Nro de Tarjeta de Crédito',
        disabled: false,
        control: {
            type: 'number',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    titular_tarjeta: {
        label: 'Titular',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    vencimiento_tarjeta: {
        label: 'Fecha de Vencimiento',
        hidden: true,
        control: { 
          type: 'periodpicker',
          // appearance: 'standard',,
          config: {
            min: moment()
          },
        },
        class: 'col-sm-12 col-md-12 col-lg-4'
    },*/
}

export const group = {
    title: 'Datos del productor',
    icon: 'assignment_ind',
    content: '',
    expanded: true,
    children: fields
}


export const formFields = {
    cod_mon: { hidden: true, disabled: true },
    desc_moneda:{ hidden: false, disabled: true },
    cod_forma_pago: { hidden: true, disabled: true },
    desc_forma_pago:{ hidden: false, disabled: true },
    cod_plan:{ hidden: true, disabled: true },
    desc_plan_pagos:{ hidden: false, disabled: true },
    porc_comision: { hidden: false, disabled: true },
    cbu:{ hidden: false, disabled: false },
    titular_cbu:{ hidden: false, disabled: false },
    asegurado_tarjeta: { hidden: false, disabled: false },
    titular_tarjeta: { hidden: false, disabled: false },
    /*
    tipo_tarjeta: { hidden: false, disabled: false },
    tarjeta_credito: { hidden: false, disabled: false },
    titular_tarjeta:{ hidden: false, disabled: false },
    vencimiento_tarjeta: { hidden: false, disabled: false },
    */
   
}


export const viewFields = {
    cod_mon: { hidden: true, disabled: true },
    desc_moneda:{ hidden: false, disabled: true },
    cod_forma_pago: { hidden: true, disabled: true },
    desc_forma_pago:{ hidden: false, disabled: true },
    cod_plan:{ hidden: true, disabled: true },
    desc_plan_pagos:{ hidden: false, disabled: true },
    cbu:{ hidden: false, disabled: true },
    titular_cbu:{ hidden: false, disabled: true },
    porc_comision: { hidden: false, disabled: true },
    asegurado_tarjeta: { hidden: false, disabled: true },
    titular_tarjeta: { hidden: false, disabled: false },
    desc_tarjeta: { hidden: false, disabled: true },
    nro_tarjeta: { hidden: false, disabled: true },
    
}
