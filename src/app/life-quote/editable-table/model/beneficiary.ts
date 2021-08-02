import { SettingForm } from '@shared/enums/setting'

export const fields = {
    cobertura: {
        title: 'Beneficiario',
        hidden: false,
        disabled: false,
        control: {
            type: 'editable-table',
            editable: true,
            selectable: false,
            items: {
                Tipo_Doc:{
                    label: 'Tipo Doc.',
                    editable: true,
                    control: {
                        type: 'select',
                        appearance: SettingForm.apparence,
                        path: '/listas/LIST_TIPOS_DOC',
                        options: {
                            value: 'abrev',
                            key: 'cod_docum'
                        },
                        pasteFieldOnSelect: 'abrev',
                        hasEmptyOption: false,
                    },
                    class: 'col-2 col-sm-2 col-md-2 col-lg-2'
                },
                Nro_Doc: {
                    label: 'Nro. Doc.',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: SettingForm.apparence,
                    },
                    validators: [],
                    class: 'col-sm-3 col-md-3 col-lg-3'
                },
                Last_Name: {
                    label: 'Apellido',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: SettingForm.apparence,
                    },
                    validators: [],
                    class: 'col-sm-3 col-md-3 col-lg-3'
                },
                First_Name: {
                    label: 'Nombre',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: SettingForm.apparence,
                    },
                    validators: [],
                    class: 'col-sm-3 col-md-3 col-lg-3'
                },
            },
            
            validators: [],
            class: 'col-sm-12 col-md-12 col-lg-12', 
            columns: [ 'Tipo_Doc', 'Nro_Doc', 'Last_Name', 'First_Name' ]
        }
    }
}

export const group = {
    title: 'Coberturas',
    icon: 'donut_large',
    class: 'container',
    children: fields
}

