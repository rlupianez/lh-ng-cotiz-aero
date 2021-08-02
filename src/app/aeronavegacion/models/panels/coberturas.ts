export const fields = {
    cobertura: {
        title: 'Coberturas',
        hidden: false,
        disabled: false,
        control: {
            type: 'coberturas-table',
            editable: true,
            selectable: true,
            items: {
                selected: {
                    label: 'Seleccionado',
                    hidden: true,
                    control: {
                        type: 'slide-toggle',
                        appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4' 
                },
                required: {
                    label: 'Obligatorio',
                    hidden: true,
                    control: {
                        type: 'slide-toggle',
                        appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4' 
                },
                cod_cobertura: {
                    label: 'Cód. Cobertura',
                    hidden: true,
                    control: {
                        type: 'text',
                        appearance: 'standard'
                    },
                    validators: [
                        'required'
                    ],
                    class: 'col-sm-12 col-md-3 col-lg-4'
                },
                desc_cobertura: {
                    label: 'Cobertura',
                    control: {
                        type: 'text',
                        appearance: 'standard'
                    },
                    validators: [
                        'required'
                    ],
                    class: 'col-sm-12 col-md-3 col-lg-4',
                    cellStyle: 'text-left'
                },
                imp_suma_asegurada: {
                    label: 'Suma Asegurada',
                    editable: true,
                    hideLabel: true,
                    control: {
                        type: 'text',
                        // appearance: 'standard'
                        currency : true
                    },
                    validators: [
                        'required'
                    ],
                    class: 'col-sm-12 col-md-3 col-lg-4'
                    // class: 'col-sm-12 col-md-3 col-lg-4',
                },
                porc_tasa: {
                    label: 'Tasa',
                    editable: true,
                    hideLabel: true,
                    hidden: true,
                    control: {
                        type: 'number',
                        // appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4',
                    validators: [
                        'required'
                    ]
                },
                imp_prima: {
                    label: 'Prima',
                    editable: false,
                    hidden: true,
                    control: {
                        type: 'number',
                        appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4',
                    cellStyle: 'text-right'
                    /* validators: [
                        'required'
                    ], */
                    // class: 'col-sm-12 col-md-3 col-lg-3'
                },
                imp_premio: {
                    label: 'Premio',
                    editable: false,
                    hidden: true,
                    control: {
                        type: 'number',
                        appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4',
                    cellStyle: 'text-right'
                    /* validators: [
                        'required'
                    ], */
                    // class: 'col-sm-12 col-md-3 col-lg-3'
                }
            },
            validators: [
                'required'
            ],
            class: 'col-sm-12 col-md-12 col-lg-12',
            // columns: [/*'cod_cobert',*/'descri','suma_asegurada', 'tasa', 'prima']
            columns: [ 'cod_cobertura','desc_cobertura', 'imp_suma_asegurada', 'porc_tasa', 'imp_prima','imp_premio'],
            // footer: [ 'suma_asegurada', 'tasa', 'prima']
        }
    }
}

export const group = {
    title: 'Coberturas',
    icon: 'donut_large',
    class: 'container',
    children: fields
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

export const fieldsEmitir = {
    cobertura: {
        title: 'Coberturas',
        hidden: false,
        disabled: true,
        control: {
            type: 'coberturas-table',
            editable: false,
            selectable: true,
            items: {
                selected: {
                    label: 'Seleccionado',
                    hidden: true,
                    control: {
                        type: 'slide-toggle',
                        appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4' 
                },
                required: {
                    label: 'Obligatorio',
                    hidden: true,
                    control: {
                        type: 'slide-toggle',
                        appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4' 
                },
                cod_cobertura: {
                    label: 'Cód. Cobertura',
                    hidden: true,
                    control: {
                        type: 'text',
                        appearance: 'standard'
                    },
                    validators: [
                        'required'
                    ],
                    class: 'col-sm-12 col-md-3 col-lg-4'
                },
                desc_cobertura: {
                    label: 'Cobertura',
                    control: {
                        type: 'text',
                        appearance: 'standard'
                    },
                    validators: [
                        'required'
                    ],
                    class: 'col-sm-12 col-md-3 col-lg-4',
                    cellStyle: 'text-left'
                },
                cant_plazas: {
                    label: 'Cant. Tripulantes/Pasajeros',
                    editable: false,
                    hidden:true,
                    control: {
                        type: 'text',                        
                    },
                    validators: [
                        'required'
                    ],
                    class: 'col-sm-12 col-md-3 col-lg-4',
                    cellStyle: 'text-left'
                },
                imp_suma_asegurada: {
                    label: 'Suma Asegurada',
                    editable: true,
                    hideLabel: true,
                    control: {
                        type: 'text',
                        currency : true,
                        moneda: '$'
                        // appearance: 'standard'
                    },
                    validators: [
                        'required'
                    ],
                    class: 'col-sm-12 col-md-3 col-lg-4'
                    // class: 'col-sm-12 col-md-3 col-lg-4',
                },
                porc_tasa: {
                    label: 'Tasa',
                    editable: true,
                    hideLabel: true,
                    hidden:true,
                    control: {
                        type: 'number',
                        // appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4',
                    validators: [
                        'required'
                    ]
                },
                imp_prima: {
                    label: 'Prima',
                    editable: false,
                    hidden:true,
                    control: {
                        type: 'number',
                        appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4',
                    cellStyle: 'text-right'
                    /* validators: [
                        'required'
                    ], */
                    // class: 'col-sm-12 col-md-3 col-lg-3'
                },
                imp_premio: {
                    label: 'Premio',
                    editable: false,
                    hidden: true,
                    control: {
                        type: 'number',
                        appearance: 'standard'
                    },
                    class: 'col-sm-12 col-md-3 col-lg-4',
                    cellStyle: 'text-right'
                    /* validators: [
                        'required'
                    ], */
                    // class: 'col-sm-12 col-md-3 col-lg-3'
                }
            },
            validators: [
                'required'
            ],
            class: 'col-sm-12 col-md-12 col-lg-12',
            // columns: [/*'cod_cobert',*/'descri','suma_asegurada', 'tasa', 'prima']
            columns: [ 'cod_cobertura','desc_cobertura', 'cant_plazas','imp_suma_asegurada', 'porc_tasa', 'imp_prima','imp_premio'],
            // footer: [ 'suma_asegurada', 'tasa', 'prima']
        }
    }
}

export const groupEmitir = {
    title: 'Coberturas',
    icon: 'donut_large',
    class: 'container',
    children: fieldsEmitir
}