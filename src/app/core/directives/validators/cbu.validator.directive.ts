import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, Input } from '@angular/core';
import { DatoCondicionesComerciales} from 'src/app/aeronavegacion/row/datos-tomador/models/dato-condiciones-comerciales'

 
@Directive({
  selector: '[cbuValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CbuValidatorDirective, multi: true }
  ]
})
export class CbuValidatorDirective implements Validator, OnInit {
  
  @Input() cbuValidator: DatoCondicionesComerciales;  
 
  ngOnInit() {
  }
 
  validate(control: FormControl) { 

    if (control.value !=  null && control.value.length != 22){
            this.cbuValidator.cbuValido = false;   

    }else{
        return null;
    }
    
    return this.cbuValidator
    
  }

isLengthOk = function(cbu) {
    return (cbu && cbu.length == 22);
}

isValidAccount = function(acc) {
    if (!acc || acc.length !== 14) {
        return false;
    }

    var sum = acc[0] * 3 + acc[1] * 9 + acc[2] * 7 + acc[3] * 1 + acc[4] * 3 + acc[5] * 9 + acc[6] * 7 + acc[7] * 1 + acc[8] * 3 + acc[9] * 9 + acc[10] * 7 + acc[11] * 1 + acc[12] * 3;
    var diff = (10 - (sum % 10)) % 10; // the result of this should be only 1 digit
    var checksum = acc[13];

    return diff == checksum;
}

isValidBankCode = function(code) {
    if (!code || code.length !== 8) {
        return false;
    }
    var bank = code.substr(0, 3);
    var checksumOne = code[3];
    var branch = code.substr(4, 3);
    var checksumTwo = code[7];

    var sum = bank[0] * 7 + bank[1] * 1 + bank[2] * 3 + checksumOne * 9 + branch[0] * 7 + branch[1] * 1 + branch[2] * 3;
    var diff = (10 - (sum % 10)) % 10; // the result of this should be only 1 digit

    return diff == checksumTwo;
}


}