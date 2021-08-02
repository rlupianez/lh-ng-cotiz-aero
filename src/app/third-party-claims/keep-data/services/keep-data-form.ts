
import { KeepFieldEnum } from './keep-data.interfaces';

/**
* 
*  Aca definis todos los campos posibles del formulario
*/
export const fields = {
    [KeepFieldEnum.keepData]: {
        label: '¿Mantener datos?',
        control: {
          type: 'inputCheckbox',
        },
        class: 'col-sm-12 col-md-12 col-lg-12',
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
    [KeepFieldEnum.keepData]: { hidden: false, disabled: false },

};


export const viewFields = {

}

