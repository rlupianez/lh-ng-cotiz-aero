import { FormGroup } from '@angular/forms';
import { AdaptAddress } from '@app/third-party-claims/components/address/model/adapt-address';
import { PersonalFieldEnum } from '@app/third-party-claims/components/personal-data/personal-data.interfaces';

export class AdaptDanmified {

    output(personaDamn: FormGroup, documentsTypes: any[], sexList: any[], countries: any[]){
       
        const formElements  = personaDamn.controls;
        const documentType = documentsTypes.find((c) => c.abrev == formElements[PersonalFieldEnum.documentType].value);
        const sex = sexList.find((c) => c.descri == formElements[PersonalFieldEnum.sex].value);
        const country = countries.find((c) => c.x_pais == formElements[PersonalFieldEnum.country].value);

        return {
            apellido_damn: formElements[PersonalFieldEnum.surname].value,
            nombre_damn: formElements[PersonalFieldEnum.name].value,
            tipo_documento_damn: documentType.cod_docum,
            nro_documento_damn: formElements[PersonalFieldEnum.documentNumber].value,
            nro_cuil_damn: formElements[PersonalFieldEnum.cuit].value,
            sexo_damn: sex.codigo,
            fecha_nacimiento_damn: formElements[PersonalFieldEnum.birthdate].value.format("DD/MM/YYYY 00:00"),
            nacionalidad_damn: country.cod_pais,
        }
    }
}