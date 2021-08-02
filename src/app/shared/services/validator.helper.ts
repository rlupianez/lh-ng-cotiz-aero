import { AbstractControl, FormGroup } from '@angular/forms';
import { validCuit } from '@core/validators/cuit.js';

export  function cuitValidator(control: AbstractControl): { [key: string]: boolean } | null {
        if(!control.value){
            return { cuit: true }
        }
        if(control && control.value && control.value.toString().length === 11){
            if(!validCuit(control.value)){
                return { cuit: true };
            }else{
                return null
            }
        }
        return null;
    }
