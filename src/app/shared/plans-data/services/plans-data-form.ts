import { Validators } from '@angular/forms';
import { SettingForm } from '@shared/enums/setting';
import { PlansDataFieldEnum } from './plans-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {

    [PlansDataFieldEnum.category]: {
        label: 'Categoría',
        control: {
            type: 'select',
            path: '/listas/LIST_CATEGORIAS',
            appearance: SettingForm.apparence,
            options: {
                value: 'desc_categoria',
                key: 'cod_categoria'
            },
            pasteFieldOnSelect: 'cod_categoria',
            hasEmptyOption: true
        },
        class: 'col-4 col-sm-4 col-md-4 col-lg-4',
    },
    [PlansDataFieldEnum.risk]: {
        label: 'Riesgo',
        control: {
            type: 'select',
            path: '/listas/LIST_TIPO_CAP',
            appearance: SettingForm.apparence,
            filters: {
                p_cod_categoria: 0
            },
            options: {
                value: 'desc_tipo_capital',
                key: 'cod_tipo_capital'
            },
            pasteFieldOnSelect: 'cod_tipo_capital',
            hasEmptyOption: true
        },
        class: 'col-4 col-sm-4 col-md-4 col-lg-4',
    },
    [PlansDataFieldEnum.product]: {
        label: 'Producto',
        control: {
            type: 'select',
            path: '/listas/LIST_PRODUCTOS_VIDA',
            appearance: SettingForm.apparence,
            filters: {
                p_cod_categoria: 0,
                p_list_type: "F",
                p_cod_prod: 9083
            },
            options: {
                value: 'desc_producto',
                key: 'cod_producto'
            },
            pasteFieldOnSelect: 'cod_producto',
            hasEmptyOption: true
        },
        class: 'col-4 col-sm-4 col-md-4 col-lg-4',
    },

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
    [PlansDataFieldEnum.category]: { hidden: false, disabled: false },
    [PlansDataFieldEnum.risk]: { hidden: false, disabled: false },
    [PlansDataFieldEnum.product]: { hidden: false, disabled: false },
}

export const viewFields = {

}

