import { Validators } from '@angular/forms';
import { SettingForm } from '@shared/enums/setting';
import { ConditionsBenefitsCommercialDataFieldEnum } from './conditions-benefits-commercial-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {

    [ConditionsBenefitsCommercialDataFieldEnum.moneyType]: {
        label: 'Moneda',
        control: {
            type: 'select',
            path: '/listas/LIST_MONEDAS',
            appearance: SettingForm.apparence,
            options: {
                value: 'descri',
                key: 'cod_mon'
            },
            pasteFieldOnSelect: 'cod_mon',
            hasEmptyOption: true
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',
    },
    [ConditionsBenefitsCommercialDataFieldEnum.paymentMean]: {
        label: 'Medio de pago',
        control: {
            type: 'select',
             path: '/listas/LIST_MEDIOS_PAGO',
             appearance: SettingForm.apparence,
            options: {
                value: 'desc_medio_pago',
                key: 'cod_medio_pago'
            },
            pasteFieldOnSelect: 'cod_medio_pago',
            hasEmptyOption: true
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',
    },
    [ConditionsBenefitsCommercialDataFieldEnum.paymentPlan]: {
        label: 'Planes de pago',
        control: {
            type: 'select',
            path: '/listas/LIST_PLANES_PAGO',
            appearance: SettingForm.apparence,
            filters: {
                p_seccion: '14'
            },
            options: {
                value: 'descri',
                key: 'cod_plan'
            },
            pasteFieldOnSelect: 'descri',
            hasEmptyOption: true
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',
    },
    [ConditionsBenefitsCommercialDataFieldEnum.commissionPercentage]: {
        label: '% de comisión',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-3 col-sm-3 col-md-3 col-lg-3',
        validators: [
            Validators.min(0),
            Validators.max(100)
        ]
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
    [ConditionsBenefitsCommercialDataFieldEnum.moneyType]: { hidden: false, disabled: false },
    [ConditionsBenefitsCommercialDataFieldEnum.paymentMean]: { hidden: false, disabled: false },
    [ConditionsBenefitsCommercialDataFieldEnum.paymentPlan]: { hidden: false, disabled: false },
    [ConditionsBenefitsCommercialDataFieldEnum.commissionPercentage]: { hidden: false, disabled: false },
}

export const viewFields = {

}

