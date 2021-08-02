import { FormGroup } from '@angular/forms';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';
import { tipoRiesgoGroupEmitir } from './riesgos';



interface iFields {
    cod_productor: object;
    desc_productor: object;
}

type fieldsType = 'cod_productor' | 'desc_productor';

export const fields: iFields = {
    cod_productor: {
        label: 'Productor',
        control: {
            type: 'productor-control',
            // appearance: 'standard',
            path: '/listas/LIST_PAS',
            options: {
                value: 'nombre',
                key: 'codpas',
                description: 'codpas'
            },
            pasteFieldOnSelect: 'nombre',
            defaultValue: '',
            loadCurrentProductor: true
        },
        class: 'col-sm-12 col-md-12 col-lg-5',
        validators: [
            'required'
        ]
    },
    desc_productor: {
        label: 'Productor',
        hidden: false,
        disabled: true,
        control: {
            type: 'input',
        },
        class: 'col-sm-12 col-md-12 col-lg-5'
    }
}


export const group = {
        title: 'Datos del productor',
        icon: 'assignment_ind',
        content: '',
        expanded: true,
        children: fields
}


export const formFields: iFields = {
    cod_productor: {
        hidden: false,
        disabled: false
    },
    desc_productor: {
        hidden: true,
        disabled: true
    }
}

export const viewFields: iFields = {
    cod_productor: {
        hidden: true,
        disabled: true
    },
    desc_productor: {
        hidden: false,
        disabled: true
    }
}

//////////////////////////////////////////////////
////
////        EMITIR
////
//////////////////////////////////////////////////


export const fieldsEmitir = {
    productor: {
        disabled: true,
        label: 'Productor',
        control: {
            type: 'input',
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4'
    }
}


export const groupEmitir = {
    title: 'Datos del productor',
    icon: 'assignment_ind',
    content: '',
    expanded: true,
    children: fieldsEmitir
}


