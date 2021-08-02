import { SettingForm } from '@shared/enums/setting'

export const fields = {
    cobertura: {
        title: 'frequencia de Pagos',
        hidden: false,
        disabled: false,
        control: {
            type: 'editable-table',
            editable: true,
            selectable: false,
            items: {
                Frequency: {
                    label: 'Frecuencia',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: SettingForm.apparence,
                    },
                    validators: [],
                    class: 'col-sm-3 col-md-3 col-lg-3'
                },
                Prima: {
                    label: 'Número',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: SettingForm.apparence,
                    },
                    validators: [],
                    class: 'col-sm-3 col-md-3 col-lg-3'
                },
                Premio: {
                    label: 'Premio',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'number',
                        appearance: SettingForm.apparence,
                    },
                    validators: [],
                    class: 'col-sm-3 col-md-3 col-lg-3'
                },
            },
            
            validators: [],
            class: 'col-sm-12 col-md-12 col-lg-12', 
            columns: [ 'Frequency', 'Prima', 'Premio' ]
        }
    }
}

export const group = {
    title: 'Frecuencia de pagos',
    icon: 'donut_large',
    class: 'container',
    children: fields
}

