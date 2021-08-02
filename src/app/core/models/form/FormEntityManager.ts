import { FormGroup } from '@angular/forms';
import { } from './controlOptions';

export type FormControlGroupName = {
    section: string;
    subsection?: string;
}

export class FormEntityManager {

    private form: FormGroup;
    private options: object;

    constructor(form: FormGroup, options: object){
        this.form = form;
        this.options = options;
    }


    /**
     * Oculta el form control
     */
    hideControl(){

    }

    /**
     * 
     * 
     */
    hideGroup(){

    }

    /**
     * 
     * 
     * 
     */
    disableControl(){

    }

    /**
     * Obtiene el form control mediante el nombre
     */
    getControl(groupName: FormControlGroupName ){
        let control = this.form.get(groupName.section);

        if(groupName.subsection){
            control = control.get(groupName.subsection);
        }

        return control;
    }

    
}