import { SettingForm } from '@shared/enums/setting'

export const fields = {
    cobertura: {
        title: 'Asegurados',
        hidden: false,
        disabled: false,
        control: {
            type: 'insured-table',
            editable: true,
            selectable: true,
            actions:{
                AddElement: true,
                showBtnNomine: false,
                showBtnCotizar: true
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
                }, 
                Sexo:{
                    label: 'Sexo',
                    hidden: false,
                    editable: true,
                    control: {
                        type: 'text',
                        appearance: 'outline'
                    },
                    validators: [],
                    class: 'col-sm-1 col-md-1 col-lg-1 pepe'
                },
                Saldo_Deudor:{
                    label: 'Saldo Deudor',
                    editable: true,
                    control: {
                        type: 'number',
                        appearance: 'outline'
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
            columns: [ 'Apellido', 'Nombre', 'Nro_Doc', 'Sexo', 'Saldo_Deudor',
                    'Tasa', 'Muerte', 'Invalidez', 'Prima' ]
        }
    }
}

export const group = {
    title: 'Asegurados',
    icon: 'donut_large',
    class: 'container',
    children: fields
}

