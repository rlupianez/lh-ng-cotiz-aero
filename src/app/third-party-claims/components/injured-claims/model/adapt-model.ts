import { FormGroup } from '@angular/forms'
import { InjuredLinkFieldEnum } from '../../injured-link/injured-link-data.interfaces';
import { PersonalFieldEnum } from '../../personal-data/personal-data.interfaces';
import { InjuredFieldEnum } from '../injured.interfaces'

export class AdaptInjuredClaims {

    output(injured: FormGroup,  persona: FormGroup,injuredLink : FormGroup, documentTypes: any, victimLinks: any[]){
        const elementsInjured  = injured.controls;
        const elementsPersonal  = persona.controls;
        const injuredLinkControls = injuredLink?.controls;
        const documentType = documentTypes.find((c) => c.abrev == elementsPersonal[PersonalFieldEnum.documentType].value);
        const link = victimLinks.find((c) => c.key == injuredLinkControls[InjuredLinkFieldEnum.victimLink]?.value);
        return{
            p_tipo_persona: elementsInjured[InjuredFieldEnum.personType].value ? 1 : 2,
            p_reclama_propio: elementsInjured[InjuredFieldEnum.ownClaim].value ? 'S' : 'N',
            p_apellido_recla: elementsPersonal[PersonalFieldEnum.surname].value ,
            p_nombre_recla: elementsPersonal[PersonalFieldEnum.name].value,
            p_tipo_documento_recla: documentType.cod_docum,
            p_nro_documento_recla: elementsPersonal[PersonalFieldEnum.documentNumber].value,
            p_nro_cuil_recla:  elementsPersonal[PersonalFieldEnum.cuit].value,
            p_telefono_recla: elementsPersonal[PersonalFieldEnum.phone].value,
            p_celular_recla:  elementsPersonal[PersonalFieldEnum.celular].value,
            p_email_recla:  elementsPersonal[PersonalFieldEnum.email].value,
            p_vinculo_damnificado: link?.value
        }
    }        
}