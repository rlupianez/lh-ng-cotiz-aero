import { AddressFieldEnum } from '@app/third-party-claims/components/address/address.interfaces';
import { AdaptAddress } from '@app/third-party-claims/components/address/model/adapt-address';
import { AdaptInjuredClaims } from '@app/third-party-claims/components/injured-claims/model/adapt-model';
import { InjuredLinkFieldEnum } from '@app/third-party-claims/components/injured-link/injured-link-data.interfaces';
import { PersonalFieldEnum } from '@app/third-party-claims/components/personal-data/personal-data.interfaces';
import { AdaptSinisterdata } from '@app/third-party-claims/components/sinister-data/model/adapt-model';
import { ThirdPartyClaimsService } from '@app/third-party-claims/services/third-party-claims.service';
import { AdaptDanmified } from './adapt-danmified';
import { AdaptVehicleClaims } from '../../components/vehicle-claims/model/adapt-vehicle-claims';
import { VehicleFieldEnum } from '@app/third-party-claims/components/vehicle-claims/vehicle-claim.interfaces';
import { AdaptSinisterType } from '@app/third-party-claims/components/sinister/model/adapt-model';
import { LesionSinisterFieldEnum } from '@app/third-party-claims/components/sinister/sinister-claims.interfaces';


export class ThirdPartyClaimsRequestBuilder {
    tpcService: ThirdPartyClaimsService
    asisisterData: AdaptSinisterdata;
    documentTypes: any[];
    victimLinks: any[];
    sexTypes: any[];
    countryTypes: any[];
    regionTypes: any[];
    cityTypes: any[];
    vehicleTypes: any[];
    useVehicleTypes: any[];
    riskTypeTypes: any[];
    insurances: any[];
    thirdPartyCompanies: any[];

    constructor(thirdPartyClaimsService: ThirdPartyClaimsService) {
        // no lo pasemos por constructor, resolvamos en el metodo builder
        this.tpcService = thirdPartyClaimsService;
        this.documentTypes = this.tpcService.personalClaimService.formGroupConfig['children'][PersonalFieldEnum.documentType]['control'].list;
        this.victimLinks = this.tpcService.injuredLinkService.formGroupConfig['children'][InjuredLinkFieldEnum.victimLink]['control'].list;
        this.sexTypes = this.tpcService.personalInjuredVehicleService.formGroupConfig['children'][PersonalFieldEnum.sex]['control'].list;
        this.countryTypes = this.tpcService.personalInjuredVehicleService.formGroupConfig['children'][PersonalFieldEnum.country]['control'].list;
        this.regionTypes = this.tpcService.addressVehicleService.formGroupConfig['children'][AddressFieldEnum.region]['control'].list;
        this.cityTypes = this.tpcService.addressVehicleService.formGroupConfig['children'][AddressFieldEnum.city]['control'].list;
        this.vehicleTypes = this.tpcService.vehicleClaimsService.formGroupConfig['children'][VehicleFieldEnum.vehicleType]['control'].list;
        this.useVehicleTypes = this.tpcService.vehicleClaimsService.formGroupConfig['children'][VehicleFieldEnum.use]['control'].list;
        this.riskTypeTypes = this.tpcService.vehicleClaimsService.formGroupConfig['children'][VehicleFieldEnum.riskType]['control'].list;
        this.insurances = this.tpcService.vehicleClaimsService.formGroupConfig['children'][VehicleFieldEnum.insurance]['control'].list;
        this.thirdPartyCompanies = this.tpcService.sinisterDamageToOtherPropertyService.formGroupConfig['children'][LesionSinisterFieldEnum.thirdPartyCompany]['control'].list;
    }

    //vehicle
    builder() {
        const sinisterRequest = new AdaptSinisterdata().output(this.tpcService.sinisterService.formGroup)

        const injuredClaimsRequest = new AdaptInjuredClaims().output(
            this.tpcService.injuredService.formGroup,
            this.tpcService.personalClaimService.formGroup,
            this.tpcService.injuredLinkService.formGroup,
            this.documentTypes,
            this.victimLinks)
        const adaptDanmified = new AdaptDanmified().output(
            this.tpcService.personalInjuredVehicleService.formGroup,
            this.documentTypes,
            this.sexTypes,
            this.countryTypes);

        const adaptAddress = new AdaptAddress().output(this.tpcService.addressVehicleService.formGroup, this.regionTypes, this.cityTypes);

        const adaptVehicleClaims = new AdaptVehicleClaims().output(
            this.tpcService.vehicleClaimsService.formGroup,
            this.vehicleTypes,
            this.useVehicleTypes,
            this.riskTypeTypes,
            this.insurances)

        return {
            ...sinisterRequest,
            ...injuredClaimsRequest,
            p_list_veh_damn: [
                {
                    ...adaptDanmified,
                    ...adaptAddress,
                    ...adaptVehicleClaims
                }
            ]
        }
    }


//danos a una propiedad
    builderDamageToOtherProperty() {
        const sinisterRequest = new AdaptSinisterdata().output(this.tpcService.sinisterService.formGroup)

        const injuredClaimsRequest = new AdaptInjuredClaims().output(
            this.tpcService.injuredService.formGroup,
            this.tpcService.personalClaimService.formGroup,  //datos personales del reclamante
            this.tpcService.injuredLinkService?.formGroup, //no lo tengo
            this.documentTypes,
            this.victimLinks)

        const adaptDanmified = new AdaptDanmified().output(
            this.tpcService.personalInjuredDamageToOtherProperty.formGroup,
            this.documentTypes,
            this.sexTypes,
            this.countryTypes);

        const adaptAddress = new AdaptAddress().output(this.tpcService.addressDamageToOtherProperty.formGroup, this.regionTypes, this.cityTypes);


        const sinisterType = new AdaptSinisterType().output(this.tpcService.sinisterDamageToOtherPropertyService.formGroup, this.regionTypes, this.cityTypes, this.thirdPartyCompanies);

        return {
            ...sinisterRequest,
            ...injuredClaimsRequest,
            p_list_bie_damn: [
                {
                    ...adaptDanmified,
                    ...adaptAddress,
                    ...sinisterType
                }
            ]
        }
    }


    //danos a una ubicacion
    builderDamageToLocation() {
        const sinisterRequest = new AdaptSinisterdata().output(this.tpcService.sinisterService.formGroup)

        const injuredClaimsRequest = new AdaptInjuredClaims().output(
            this.tpcService.injuredService.formGroup, 
            this.tpcService.personalClaimService.formGroup,  
            this.tpcService.injuredLinkService.formGroup,
            this.documentTypes,
            this.victimLinks)

        const adaptDanmified = new AdaptDanmified().output(
            this.tpcService.personalInjuredDamageToLocation.formGroup,
            this.documentTypes,
            this.sexTypes,
            this.countryTypes);

        const adaptAddress = new AdaptAddress().output(this.tpcService.addressDamageToLocationService.formGroup, this.regionTypes, this.cityTypes);

        const sinisterType = new AdaptSinisterType().output(this.tpcService.sinisterDamageToOtherPropertyService.formGroup, this.regionTypes, this.cityTypes, this.thirdPartyCompanies);

        return {
            ...sinisterRequest,
            ...injuredClaimsRequest,
            p_list_ubi_damn: [
                {
                    ...adaptDanmified,
                    ...adaptAddress,
                    ...sinisterType,
                   // list_archivos: new AdaptFiles().output()
                }
            ]
        }
    }

    // danos a una persona
    builderLesionToPeople() {
        const sinisterRequest = new AdaptSinisterdata().output(this.tpcService.sinisterService.formGroup)

        const injuredClaimsRequest = new AdaptInjuredClaims().output(
            this.tpcService.injuredService.formGroup,
            this.tpcService.personalClaimService.formGroup,  //datos personales del reclamante
            this.tpcService.injuredLinkService.formGroup, 
            this.documentTypes,
            this.victimLinks)

        const adaptDanmified = new AdaptDanmified().output(
            this.tpcService.personalInjuredLesionToPeople.formGroup,
            this.documentTypes,
            this.sexTypes,
            this.countryTypes);

        const adaptAddress = new AdaptAddress().output(this.tpcService.addressLesionToPeopleService.formGroup, this.regionTypes, this.cityTypes);

        const sinisterType = new AdaptSinisterType().output(this.tpcService.lesionSinisterService.formGroup, this.regionTypes, this.cityTypes, this.thirdPartyCompanies);

        return {
            ...sinisterRequest,
            ...injuredClaimsRequest,
            p_list_per_damn: [
                {
                    ...adaptDanmified,
                    ...adaptAddress,
                    ...sinisterType
                }
            ]
        }
    }
}