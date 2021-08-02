
import { FormGroup } from '@angular/forms'
import { DamageEnum } from '../damage.interfaces';


export class AdaptSinister {

    output(damage: FormGroup){
        var linksDamage = damage[DamageEnum.links].value;
        return{
      //      p_tipo_persona: elementsInjured[InjuredFieldEnum.personType].value ? 1 : 2,

        }
    }
        
}





   //step 2: tipos de siniestros seleccionados 
  // var damageControls = this.thirdPartyClaimsService.damageService.formGroup.controls;
   var linksDamage = damageControls[DamageEnum.links].value;