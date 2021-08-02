import { Validators } from '@angular/forms';
import * as moment from 'moment';




export const fields = {
    cod_mon: {
        label: 'Moneda',
        control: { 
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_MONEDAS',
            options: {
                value: 'descri',
                key: 'cod_mon'
            },
            pasteFieldOnSelect: 'cod_mon',
            hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        validators: [
            'required'
        ]
    },
    desc_moneda: {
        label: 'Moneda',
        control: { 
            type: 'input'
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        validators: [
            'required'
        ]
    },
    cod_forma_pago: {
        label: 'Medios de Pago',
        control: { 
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_MEDIOS_PAGO',
            options: {
                value: 'descri',
                key: 'codigo'
            },
            pasteFieldOnSelect: 'codigo',
            hasEmptyOption: true
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        validators: [
            'required'
        ]
    },
    desc_forma_pago: {
        label: 'Medios de Pago',
        control: { 
            type: 'input'
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        validators: [
            'required'
        ]
    },
    cod_plan: {
        label: 'Planes de pago',
        control: { 
            type: 'select',
            searchable: true,
            // appearance: 'standard',
            path: '/listas/LIST_PLANES_PAGO',
            filters: {
                // p_seccion: 3,
                p_seccion: 14
            },
            options: {
                value: 'descri',
                key: 'cod_plan'
            },
            pasteFieldOnSelect: 'cod_plan',
            hasEmptyOption: true
        },
        validators: [
            'required'
        ],
        class: 'col-sm-12 col-md-12 col-lg-4',
    },
    desc_plan_pagos: {
        label: 'Planes de pago',
        control: { 
            type: 'input'
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
        validators: [
            'required'
        ]
    },
    porc_comision: {
        label: '% de Comisión',
        control: {
            type: 'number',
            // appearance: 'standard',
            /*config: {
                min: '0',
                max: '100'
            }*/
        },
        validators: [
            'required',
            Validators.min(1),
            Validators.max(100)
        ],
        class: 'col-sm-12 col-md-12 col-lg-4',
    },
    /*porcentaje_rebaja: {
        label: '% de Rebaja / Recargo',
        control: {
            type: 'number',
            // appearance: 'standard',
        },
        class: 'col-sm-12 col-md-12 col-lg-4',
    }*/
}


export const formFields = {
    cod_mon: { hidden: false, disabled: false },
    desc_moneda: { hidden: true, disabled: true },
    cod_forma_pago: { hidden: false, disabled: false },
    desc_forma_pago: { hidden: true, disabled: true },
    cod_plan: { hidden: false, disabled: false },
    desc_plan_pagos: { hidden: true, disabled: true },
    porc_comision: { hidden: false, disabled: false }
}
/*porcentaje_rebaja: {
    label: '% de Rebaja / Recargo',
    control: {
        type: 'number',
        // appearance: 'standard',
    },
    class: 'col-sm-12 col-md-12 col-lg-4',
}*/

export const viewFields = {
    cod_mon: { hidden: true, disabled: true },
    desc_moneda: { hidden: false, disabled: true },
    cod_forma_pago: { hidden: true, disabled: true },
    desc_forma_pago: { hidden: false, disabled: true },
    cod_plan: { hidden: true, disabled: true },
    desc_plan_pagos: { hidden: false, disabled: true },
    porc_comision: { hidden: false, disabled: true }
}




export const group = {
    title: 'Datos del productor',
    icon: 'assignment_ind',
    content: '',
    expanded: true,
    children: fields
}

////////////////////////////////////////////////////////////////////

export const fieldsEmitir = {
    moneda: {
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
        class: 'col-sm-12 col-md-12 col-lg-4',
    },
    desc_moneda: {
        label: 'Moneda',
        disabled: true,
        control: {
            type: 'text',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    forma_pago: {
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
        class: 'col-sm-12 col-md-12 col-lg-4',
    },
    desc_forma_pago: {
        label: 'Medios de Pago',
        disabled: true,
        control: {
            type: 'text',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    planes_pago: {
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
        class: 'col-sm-12 col-md-12 col-lg-4',
    },
    desc_planes_pago: {
        label: 'Planes de pago',
        disabled: true,
        control: {
            type: 'text',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    cbu: {
        label: 'CBU',
        disabled: false,
        control: {
            type: 'number',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    titular_cbu: {
        label: 'Titular CBU',
        control: {
            type: 'input',
            // appearance: 'standard',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    banco: {
        label: 'Banco',
        control: {
            type: 'select',
            searchable: true,
            // appearance: 'standard',,
            path: '/listas/LIST_BANCOS',
            options: {
                value: 'abrev',
                key: 'abrev',
                description: 'nombre'
            },
            pasteFieldOnSelect: 'cod_banco',
            hasEmptyOption: true
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    },
    tipo_tarjeta: {
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
    },
    porcentaje_comision: {
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
        class: 'col-sm-12 col-md-12 col-lg-4',
    }
}

export const groupEmitir = {
    title: 'Datos del productor',
    icon: 'assignment_ind',
    content: '',
    expanded: true,
    children: fieldsEmitir
}