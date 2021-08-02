import { Validators } from '@angular/forms';
import { SettingForm } from '@shared/enums/setting';
import { UniformCapitalDataFieldEnum } from './uniform-capital-data.interfaces'

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {

    [UniformCapitalDataFieldEnum.variableCapital]: {
        label: 'Capital Variable',
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
            loadCurrentProductor: true
        },
        class: 'col-sm-12 col-md-12 col-lg-5',
        validators: [
            'required'
        ]
    },

    [UniformCapitalDataFieldEnum.fixedCapital]: {
        label: 'Capital Fijo',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
        validators: [

        ]
    },

    [UniformCapitalDataFieldEnum.employeesCount]: {
        label: 'Cantidad de Empleados',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
        validators: []
    },
    [UniformCapitalDataFieldEnum.quote]:
    {
        label: 'Cotizar',
        control: {
            type: 'button',
            color: 'primary',
            buttonType: "flat"
        },
        class: 'col-12 col-sm-12 col-md-12 col-lg-12',
        validators: [
            'required'
        ]
    },
    [UniformCapitalDataFieldEnum.prime]:
    {
        label: 'Prima',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
    },
    [UniformCapitalDataFieldEnum.sumAssured]:
    {
        label: 'Suma asegurada',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
    },
    [UniformCapitalDataFieldEnum.prize]:
    {
        label: 'Premio',
        control: {
            type: 'number',
            appearance: SettingForm.apparence,
        },
        class: 'col-6 col-sm-3 col-md-3 col-lg-4',
    },
    [UniformCapitalDataFieldEnum.save]:
    {
        label: 'Guardar',
        control: {
            type: 'button',
            color: 'primary',
            buttonType: "flat"
        },
        class: 'col-6 col-sm-6 col-md-6 col-lg-6',
    }, [UniformCapitalDataFieldEnum.rosted]:
    {
        label: 'Nómina',
        control: {
            type: 'button',
            color: 'primary',
            buttonType: "flat"
        },
        class: 'col-6 col-sm-6 col-md-6 col-lg-6',
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
    [UniformCapitalDataFieldEnum.variableCapital]: { hidden: false, disabled: false },
    [UniformCapitalDataFieldEnum.fixedCapital]: { hidden: false, disabled: false },
    [UniformCapitalDataFieldEnum.employeesCount]: { hidden: false, disabled: false },
    [UniformCapitalDataFieldEnum.quote]: { hidden: false, disabled: false },
    [UniformCapitalDataFieldEnum.prime]: { hidden: false, disabled: true },
    [UniformCapitalDataFieldEnum.sumAssured]: { hidden: false, disabled: true },
    [UniformCapitalDataFieldEnum.prize]: { hidden: false, disabled: true },
    [UniformCapitalDataFieldEnum.save]: { hidden: false, disabled: false },
    [UniformCapitalDataFieldEnum.rosted]: { hidden: false, disabled: false },
}

export const viewFields = {

}

