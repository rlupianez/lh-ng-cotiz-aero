import { FormGroup } from '@angular/forms';
import { LesionSinisterFieldEnum } from '../sinister-claims.interfaces';


export class AdaptSinisterType {
    output(group: FormGroup, regionTypes: any[], cityTypes: any[], thirdPartyCompanies: any[]) {
        const formElements = group.controls
        const region = regionTypes.find((c) => c.cod_jur == formElements[LesionSinisterFieldEnum.region].value);
        const city = cityTypes.find((c) => c.desc_localidad == formElements[LesionSinisterFieldEnum.city].value);
        const thirdPartyCompany  = thirdPartyCompanies.find((c) => c.desc_cia_tercero == formElements[LesionSinisterFieldEnum.thirdPartyCompany].value);

        const streetAddressVehicle = formElements[LesionSinisterFieldEnum.address]?.value;
        const numberAddressVehicle = formElements[LesionSinisterFieldEnum.number]?.value;

        return {
            tipo_siniestro: formElements[LesionSinisterFieldEnum.sinisterType].value,
            posee_seguro: (formElements[LesionSinisterFieldEnum.hasInsurance].value) ? "S" : "N",
            cob_afectada: formElements[LesionSinisterFieldEnum.affectedCoverage].value,
            cod_cia_riesgo : thirdPartyCompany.cod_cia_tercero,
            poliza : formElements[LesionSinisterFieldEnum.policy].value,
            ambulancia: (formElements[LesionSinisterFieldEnum.ambulance]?.value) ? "S" : "N",
            centro_asistencial: formElements[LesionSinisterFieldEnum.healthcareCenter]?.value,
            causa_penal: formElements[LesionSinisterFieldEnum.criminalCase]?.value,
            nro_causa : formElements[LesionSinisterFieldEnum.caseNumber]?.value,
            nro_juzgado : formElements[LesionSinisterFieldEnum.courtNumber]?.value,
            comisaria : formElements[LesionSinisterFieldEnum.policeStation]?.value,
            detalle_danios: formElements[LesionSinisterFieldEnum.sinisterDescription].value,
            domicilio_ubi: ` ${streetAddressVehicle} ${numberAddressVehicle} `,
            provincia_ubi: region?.cod_jur,
            localidad_ubi: city?.cod_postal,
            codigo_postal_ubi: formElements[LesionSinisterFieldEnum.postalCode]?.value,
            es_titular: formElements[LesionSinisterFieldEnum.propertyOwner]?.value,
            es_inquilino: formElements[LesionSinisterFieldEnum.realTenant]?.value,
            domicilio_bien: ` ${streetAddressVehicle} ${numberAddressVehicle} `,
            provincia_bien: region?.cod_jur,
            localidad_bien: city?.cod_postal,
            codigo_postal_bien: formElements[LesionSinisterFieldEnum.postalCode]?.value,
            nombre_bien: formElements[LesionSinisterFieldEnum.assets]?.value,
        }
    }
}

