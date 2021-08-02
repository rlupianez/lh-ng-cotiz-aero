import { FormGroup } from '@angular/forms';
import { VehicleFieldEnum } from '../vehicle-claim.interfaces';

export class AdaptVehicleClaims {
 
    output(form: FormGroup, vehicleTypes: any[], useVehicleTypes: any[], riskTypeTypes: any[], insurances: any[]){


const elementVehicle = form.controls;
        const vehicleTypeVehicle = vehicleTypes.find((c) => c.cod_tipo == elementVehicle[VehicleFieldEnum.vehicleType].value);
        const useVehicle = useVehicleTypes.find((c) => c.value == elementVehicle[VehicleFieldEnum.use].value);
        const riskTypeVehicle = riskTypeTypes.find((c) => c.abrev == elementVehicle[VehicleFieldEnum.riskType].value);
        console.log(insurances)
        console.log(elementVehicle[VehicleFieldEnum.insurance].value)

       return {
        es_propietario: (elementVehicle[VehicleFieldEnum.vehicleOwner].value) ? "S" : "N",
        nombre_conductor: elementVehicle[VehicleFieldEnum.driverName].value,
        tipo_vehiculo: vehicleTypeVehicle.cod_tipo,
        cod_marca: vehicleTypeVehicle[VehicleFieldEnum.brand].value,
        cod_modelo: vehicleTypeVehicle[VehicleFieldEnum.brandModel].value,
        anio: vehicleTypeVehicle[VehicleFieldEnum.year].value,
        cod_uso: useVehicle.cod_uso,
        valor_inicial: "NO ESTA",
        patente: vehicleTypeVehicle[VehicleFieldEnum.plateType].value,
        motor: vehicleTypeVehicle[VehicleFieldEnum.motor].value,
        chasis: vehicleTypeVehicle[VehicleFieldEnum.chassis].value,
        cod_cia_riesgo: "3",
        cobertura_riesgo: riskTypeVehicle.abrev,
       }
    }
}