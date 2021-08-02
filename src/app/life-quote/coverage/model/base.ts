import { SettingForm } from '@shared/enums/setting'

export const fields = {
    cobertura: {
        title: 'Asegurados',
        hidden: false,
        disabled: false,
        control: {
            type: 'coverage-life-table',
            editable: true,
            selectable: true,
            action:{
                showBtnSave: true,
                showBtnEmit: true
            },
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
                Asegurados: {
                    label: 'Asegurados',
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
                }, 
                Fecha_Nac:{
                    label: 'Fech. Nac.',
                    editable: true,
                    control: {
                      type: 'datepicker',
                      appearance: SettingForm.apparence,
                      format: 'dd/mm/yyyy',
                      config: {
                        max: '+1'
                      },
                    },
                    class: 'col-sm-3 col-md-3 col-lg-3',
                    validators: []
                  },
                  Edad:{
                    label: 'Edad',
                    editable: true,
                    control: {
                        type: 'number',
                        appearance: SettingForm.apparence,
                    },
                    class: 'col-sm-1 col-md-1 col-lg-1',
                    validators: [
                        'required'
                    ] 
                },
                Tasa:{
                    label: 'Tasa',
                    editable: true,
                    control: {
                        type: 'number',
                        appearance: SettingForm.apparence,
                    },
                    class: 'col-sm-1 col-md-1 col-lg-1',
                    validators: [
                        'required'
                    ] 
                },
                Muerte:{
                    label: 'Muerte',
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: SettingForm.apparence,
                    },
                    class: 'col-sm-1 col-md-1 col-lg-1',
                    validators: [
                        'required'
                    ] 
                },
                Invalidez:{
                    label: 'Invalidez',
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: SettingForm.apparence,
                    },
                    class: 'col-sm-1 col-md-1 col-lg-1',
                    validators: [
                        'required'
                    ] 
                },
                Prima:{
                    label: 'Prima',
                    editable: true,
                    control: {
                        type: 'number',
                        appearance: SettingForm.apparence,
                    },
                    class: 'col-sm-1 col-md-1 col-lg-1',
                    validators: [
                        'required'
                    ] 
                },
                
            },
            validators: [],
            class: 'col-sm-12 col-md-12 col-lg-12', 
            columns: [ 'Asegurados', 'Tipo_Doc', 'Nro_Doc', 'Fecha_Nac', 'Edad', 'Tasa', 'Muerte', 'Invalidez', 'Prima' ]
        }
    }
}

export const group = {
    title: 'Coberturas',
    icon: 'donut_large',
    class: 'container',
    children: fields
}

