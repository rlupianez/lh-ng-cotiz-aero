import { Validators } from '@angular/forms';
import { SettingForm } from '@shared/enums/setting';
import { AdjustmentDataFieldEnum } from './adjustment-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */

export const fields = {
    [AdjustmentDataFieldEnum.reb]: {
        label: 'Reb',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-2 col-sm-2 col-md-2 col-lg-2',
        validators: [

        ]
    },
    [AdjustmentDataFieldEnum.adjustment]: {
        label: 'Ajusta',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-2 col-sm-2 col-md-2 col-lg-2',
        validators: [

        ]
    },
    [AdjustmentDataFieldEnum.fracc]: {
        label: '%Fracc',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-2 col-sm-2 col-md-2 col-lg-2',
        validators: [
            Validators.min(0),
            Validators.max(100)
        ]
    },
    [AdjustmentDataFieldEnum.interes]: {
        label: '%Interés',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-2 col-sm-2 col-md-2 col-lg-2',
        validators: [
            Validators.min(0),
            Validators.max(100)
        ]
    },
    [AdjustmentDataFieldEnum.explExpenses]: {
        label: '%Gts Expl',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-2 col-sm-2 col-md-2 col-lg-2',
        validators: [
            Validators.min(0),
            Validators.max(100)
        ]
    },
    [AdjustmentDataFieldEnum.acquiredExpenses]: {
        label: '%Gts Adq',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-2 col-sm-2 col-md-2 col-lg-2',
        validators: [
            Validators.min(0),
            Validators.max(100)
        ]
    },
    [AdjustmentDataFieldEnum.recSecurity]: {
        label: '%Rec Seg',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-2 col-sm-2 col-md-2 col-lg-2',
        validators: [
            Validators.min(0),
            Validators.max(100)
        ]
    },
    [AdjustmentDataFieldEnum.coverageLimit]: {
        label: 'Límite de Cobertura',
        control: {
            type: 'select',
            path: '/listas/LIST_COND_IVA',
            appearance: SettingForm.apparence,
            options: {
                value: 'descri',
                key: 'cod_iva'
            },
            pasteFieldOnSelect: 'descri',
            hasEmptyOption: true,
        },
        class: 'col-4 col-sm-4 col-md-4 col-lg-4'
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
    [AdjustmentDataFieldEnum.reb]: { hidden: false, disabled: false },
    [AdjustmentDataFieldEnum.adjustment]: { hidden: false, disabled: false },
    [AdjustmentDataFieldEnum.fracc]: { hidden: false, disabled: false },
    [AdjustmentDataFieldEnum.interes]: { hidden: false, disabled: false },
    [AdjustmentDataFieldEnum.explExpenses]: { hidden: false, disabled: false },
    [AdjustmentDataFieldEnum.acquiredExpenses]: { hidden: false, disabled: false },
    [AdjustmentDataFieldEnum.recSecurity]: { hidden: false, disabled: false },
    [AdjustmentDataFieldEnum.coverageLimit]: { hidden: false, disabled: false },
}

export const viewFields = {

}

