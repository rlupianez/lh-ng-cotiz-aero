import * as moment from "moment";

interface iFields {
    vigencia: object;
}

export const fieldsEmitir = {
    vigencia_desde: {
        disabled: false,
        label: 'Fecha Inicio',
        control: {
            type: 'datepicker',
            config: {
                min: moment().add(1, 'days'),
                max: moment().add(15, 'days')
            }
        },
        validators: [
            'required'
        ],
        class: 'col-6 col-sm-6 col-md-6 col-lg-6'
    },
    hora_inicio: {
        label: 'Hora Inicio',
        disabled: true,
        value: "00:00 hs",
        control: {
            type: 'text',
            appearance: 'standard'
        },
        class: 'col-6 col-sm-6 col-md-6 col-lg-6',
        cellStyle: 'text-left'
    }
}


export const groupEmitir = {
    title: 'Datos del productor',
    icon: 'assignment_ind',
    content: '',
    expanded: true,
    children: fieldsEmitir
}

export const viewFields: iFields = {
    vigencia: {
        hidden: false,
        disabled: true
    }
}


