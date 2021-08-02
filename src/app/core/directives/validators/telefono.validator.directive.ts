import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, Input } from '@angular/core';
import { DatoTomador} from 'src/app/aeronavegacion/row/datos-tomador/models/dato-tomador'

 
@Directive({
  selector: '[telefonoValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TelefonoValidatorDirective, multi: true }
  ]
})
export class TelefonoValidatorDirective implements Validator, OnInit {
  
  @Input() telefonoValidator: DatoTomador;  
 
  ngOnInit() {
  }
 
  validate(control: FormControl) { 
    
    if(control.value !=  null && control.value.toString().length < 8){
        this.telefonoValidator.telefonoValido = false;
    }else{
        return null
    }
   
    return this.telefonoValidator
    
  }
}