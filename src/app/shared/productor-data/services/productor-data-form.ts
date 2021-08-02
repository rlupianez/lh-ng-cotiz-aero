import { Validators } from '@angular/forms';
import { ProductorDataFieldEnum } from './productor-data.interfaces'
import { SettingForm } from '../../enums/setting';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {

    [ProductorDataFieldEnum.productor]: {
        label: 'Productor',
        control: {
            type: 'productor-control',
            path: '/listas/LIST_PAS',
            appearance: SettingForm.apparence,
            options: {
                value: 'nombre',
                key: 'codpas',
                description: 'codpas'
            },
            pasteFieldOnSelect: 'nombre',
            defaultValue: '',
            loadCurrentProductor: false
        },
        class: 'col-6 col-sm-6 col-md-6 col-lg-6',
        validators: [
            'required'
        ]
    }
}

export const group = {
    title: '',
    icon: 'assignment_ind',
    content: '',
    expanded: true,
    children: fields
}


/*
    Importante, son los ajustes de visibilidad. 
*/

export const formFields = {
    [ProductorDataFieldEnum.productor]: { hidden: false, disabled: false },

}

export const viewFields = {

}

