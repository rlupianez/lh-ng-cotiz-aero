import { Validators } from '@angular/forms';
import { QuestionDataFieldEnum } from './question-data.interfaces';

/**
 * 
 *  Aca definis todos los campos posibles del formulario
 */
export const fields = {
    [QuestionDataFieldEnum.answerOne]: {
        label: 'Experiencia al utilizar nuestro formulario web',
        control: {
            type: 'starRating',
            color: 'primary',
            starCount: 5,
            rating: 0,
            config: {
                map: [
                    { star: 1, description: "malo" },
                    { star: 2, description: "neutro" },
                    { star: 3, description: "bueno" },
                    { star: 4, description: "muy bueno" },
                    { star: 5, description: "Excelente" }
                ]
            }
        },
        class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    },
    [QuestionDataFieldEnum.answerTwo]: {
        label: 'Atención brindada por el tramitador asignado',
        control: {
            type: 'starRating',
            color: 'primary',
            starCount: 5,
            rating: 0,
            config: {
                map: [
                    { star: 1, description: "malo" },
                    { star: 2, description: "neutro" },
                    { star: 3, description: "bueno" },
                    { star: 4, description: "muy bueno" },
                    { star: 5, description: "Excelente" }
                ]
            }
        },
        class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    },
    [QuestionDataFieldEnum.answerThree]: {
        label: 'Tiempos de respuesta ante consultas',
        control: {
            type: 'starRating',
            color: 'primary',
            starCount: 5,
            rating: 0,
            config: {
                map: [
                    { star: 1, description: "malo" },
                    { star: 2, description: "neutro" },
                    { star: 3, description: "bueno" },
                    { star: 4, description: "muy bueno" },
                    { star: 5, description: "Excelente" }
                ]
            }
        },
        class: 'col-12 col-sm-12 col-md-12 col-lg-12',
    },
    [QuestionDataFieldEnum.recommend]: {
        label: 'Muy brevemente responda: ¿Recomendaría a Holando Seguros a un familiar o conocido?',
        control: {
            type: 'inputRadio',
            list: [
                { title: 'Si', value: 'true' },
                { title: 'No', value: 'false' }
            ],
            hasEmptyOption: false
        },
        class: 'col-12 col-sm-12 col-md-12 col-lg-12',
        validators: [
            'required'
        ]
    },
    [QuestionDataFieldEnum.reason]: {
        label: 'Motivo',
        control: {
            type: 'textArea',
            cols: 10,
            rows: 3
        },
        class: 'col-12 col-sm-12 col-md-12 col-lg-12',
        validators: [
            'required'
        ]
    },
}


export const group = {
    title: '',
    icon: 'assignment_ind',
    content: '',
    expanded: false,
    children: fields
}


/*
    Importante, son los ajustes de visibilidad. 
*/

export const formFields = {
    [QuestionDataFieldEnum.answerOne]: { hidden: false, disabled: false },
    [QuestionDataFieldEnum.answerTwo]: { hidden: false, disabled: false },
    [QuestionDataFieldEnum.answerThree]: { hidden: false, disabled: false },
    [QuestionDataFieldEnum.recommend]: { hidden: false, disabled: false },
    [QuestionDataFieldEnum.reason]: { hidden: false, disabled: false },
}

export const viewFields = {


}

