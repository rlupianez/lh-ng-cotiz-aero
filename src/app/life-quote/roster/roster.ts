import { SettingForm } from '@shared/enums/setting'

export const fields = {
    cobertura: {
        title: 'Nomine',
        hidden: false,
        disabled: false,
        control: {
            type: 'roster-table',
            editable: true,
            selectable: true,
            action:{
                showBtnQuote: true,
                showBtnUploadRoster:true
            },
            items: {
                selected: {
                    label: 'Seleccionado',
                    hidden: false,
                    editable: false,
                    control: {
                        type: 'slide-toggle',
                        appearance: SettingForm.apparence,
                    },
                    class: 'col-sm-3 col-md-3 col-lg-3' 
                },
                Nombre: {
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
                Apellido: {
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
                }
            },
            validators: [],
            class: 'col-sm-12 col-md-12 col-lg-12', 
            columns: [ 'Nombre','Apellido', 'Tipo_Doc', 'Nro_Doc']
        }
    }
}

export const group = {
    title: 'Coberturas',
    icon: 'donut_large',
    class: 'container',
    children: fields
}

