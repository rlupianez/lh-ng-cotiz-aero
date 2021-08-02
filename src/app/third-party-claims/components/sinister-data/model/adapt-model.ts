import { FormGroup } from '@angular/forms';
import { SinisterFieldEnum } from '../sinister-data.interfaces';

export class AdaptSinisterdata {
 
    output(group: FormGroup){
        const elements  = group.controls
        return {
            p_patente: elements[SinisterFieldEnum.plateType].value,
            p_poliza: elements[SinisterFieldEnum.policy].value,
            p_fecha_ocurrencia: elements[SinisterFieldEnum.sinisterDate].value.format("DD/MM/YYYY 00:00"),
            p_hora_ocurrencia: elements[SinisterFieldEnum.sinisterHour].value
        }
    }
}