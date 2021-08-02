export const fields = {
    cobertura: {
        title: 'Asegurados',
        hidden: false,
        disabled: false,
        control: {
            type: 'insured-table',
            editable: true,
            selectable: true,
            items: {
                selected: {
                    label: 'Seleccionado',
                    hidden: false,
                    editable: false,
                    control: {
                        type: 'slide-toggle',
                        appearance: 'standard'
                    },
                    class: 'col-sm-3 col-md-3 col-lg-3' 
                },
                Apellido: {
                    label: 'Apellido',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: 'outline'
                    },
                    validators: [],
                    class: 'col-sm-3 col-md-3 col-lg-3'
                },
                Nombre: {
                    label: 'Nombre',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: 'outline'
                    },
                    validators: [],
                    class: 'col-sm-3 col-md-3 col-lg-3'
                },
                Tipo_Doc:{
                    label: 'Tipo Doc.',
                    editable: true,
                    control: {
                        type: 'select',
                        appearance: 'outline',
                        path: '/listas/LIST_TIPOS_DOC',
                        options: {
                            value: 'abrev',
                            key: 'cod_docum'
                        },
                        pasteFieldOnSelect: 'abrev',
                        hasEmptyOption: false,
                    },
                    class: 'col-1 col-sm-1 col-md-1 col-lg-1',
                    cellStyle: ' col-1 col-sm-1 col-md-1 col-lg-1 '
                },
                Nro_Doc: {
                    label: 'Nro. Doc.',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: 'outline'
                    },
                    validators: [],
                    class: 'col-sm-1 col-md-1 col-lg-1 pepe'
                }
            },
            validators: [],
            class: 'col-sm-12 col-md-12 col-lg-12', 
            columns: [ 'Apellido', 'Nombre', 'Tipo_Doc', 'Nro_Doc' ]
        }
    }
}

export const group = {
    title: 'Asegurados',
    icon: 'donut_large',
    class: 'container',
    children: fields
}

