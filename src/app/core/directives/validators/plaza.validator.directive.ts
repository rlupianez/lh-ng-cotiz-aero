import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, Input } from '@angular/core';
import { Cobertura} from 'src/app/aeronavegacion/row/cobertura-seleccionada/models/cobertura'

 
@Directive({
  selector: '[plazaValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PlazaValidatorDirective, multi: true }
  ]
})
export class PlazaValidatorDirective implements Validator, OnInit {
  
  @Input() plazaValidator: Cobertura;  
 
  ngOnInit() {
  }
 
  validate(control: FormControl) { 
    
    if(control.value > this.plazaValidator.maxPlazas){
       this.plazaValidator.plazaValida = false;
    }else{
        return null;
    }

    return this.plazaValidator;
    
  }
}