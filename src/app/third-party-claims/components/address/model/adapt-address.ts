import { FormGroup } from '@angular/forms';
import { AddressFieldEnum } from '../address.interfaces';

export class AdaptAddress {
    output(address: FormGroup, regionTypes: any[], cityTypes: any[]){
        const formElements  = address.controls;
        const region = regionTypes.find((c) => c.cod_jur == formElements[AddressFieldEnum.region].value);
        const city = cityTypes.find((c) => c.desc_localidad == formElements[AddressFieldEnum.city].value);

        const streetAddressVehicle = formElements[AddressFieldEnum.street].value;
        const numberAddressVehicle = formElements[AddressFieldEnum.number].value;
        const floorAddressVehicle = formElements[AddressFieldEnum.floor].value;
        const deparmentAddressVehicle = formElements[AddressFieldEnum.deparment].value;
        return{
            domicilio_damn: ` ${streetAddressVehicle} ${numberAddressVehicle} ${floorAddressVehicle} ${deparmentAddressVehicle}`,
            provincia_damn: region.cod_jur,
            localidad_damn: city.cod_postal,
            codigo_postal_damn: formElements[AddressFieldEnum.postalCode].value,
            telefono_damn:formElements[AddressFieldEnum.phone].value,
            celular_damn: formElements[AddressFieldEnum.celular].value,
            email_damn: formElements[AddressFieldEnum.email].value,
        }
    }
    
}