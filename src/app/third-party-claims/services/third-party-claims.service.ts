import { Injectable } from '@angular/core';
import { SinisterDataService } from '../components/sinister-data/sinister-data.service';
import { InjuredService } from '../components/injured-claims/injured.service';
import { InjuredLinkDataService } from '../components/injured-link/injured-link-data.service';
import { DamageService } from '../components/damage/damage.service';
import { PersonalDataService } from '../components/personal-data/personal-data.service';
import { ClonerService } from '@shared/services/clone.service';
import { PersonalClaimsField, InjuredFormField } from '../components/personal-data/personal-data.interfaces';
import { AddressService } from '../components/address/address.service';
import { VehicleClaimsService } from '../components/vehicle-claims/vehicle-claim.service';
import { VehicleSinesterService } from '../components/vehicle-sinester/vehicle-sinester.service';
import { VehicleInspectionService } from '../components/vehicle-inspection/vehicle-inspection.service';
import { SinisterClaimsService } from '../components/sinister/sinister-claims.service';
import { InjuriesToPeopleFormField, DamageLocationFormField, DamageOtherPropertyFormField } from '../components/sinister/sinister-claims.interfaces';
@Injectable({
  providedIn: 'root'
})
export class ThirdPartyClaimsService {
  personalClaimDataService:any;
  personalInjuredDataVehicle:any;
  addressDataVehicleService: any;
  personalClaimDataLesionToPeople: any;
  personalInjuredDataLesionToPeople: any;
  addressDataLesionToPeopleService: any;
  personalClaimDataDamageToLocation: any;
  personalInjuredDataDamageToLocation: any;
  addressDataDamageToLocationService: any;
  lesionSinisterDataService: any;
  SinisterDataDamageToLocationService: any;
  personalClaimDataDamageToOtherProperty: any;
  personalInjuredDataDamageToOtherProperty: any;
  addressDataDamageToOtherProperty: any;
  sinisterDataDamageToOtherPropertyService: any;

  constructor(
    private sinisterDataService: SinisterDataService,
    private injuredDataService: InjuredService,
    private injuredLinkDataService: InjuredLinkDataService,
    private damageDataService: DamageService,
    private personalDataService: PersonalDataService, 
    private clonerService: ClonerService,
    private addressService: AddressService,
    private vehicleDataClaimsService: VehicleClaimsService,
    private vehicleSinesterDataService: VehicleSinesterService,
    private vehicleInspectionDataService: VehicleInspectionService,
    private SinisterClaimsDataService: SinisterClaimsService
  ) {
    this.personalClaimDataService = this.clonerService.deepClone(this.personalDataService);

    this.personalInjuredDataVehicle = this.clonerService.deepClone(this.personalDataService);
    this.personalInjuredDataLesionToPeople = this.clonerService.deepClone(this.personalDataService);
    this.personalInjuredDataDamageToLocation = this.clonerService.deepClone(this.personalDataService);
    this.personalInjuredDataDamageToOtherProperty = this.clonerService.deepClone(this.personalDataService);

    this.addressDataVehicleService = this.clonerService.deepClone(this.addressService);
    this.addressDataLesionToPeopleService = this.clonerService.deepClone(this.addressService);
    this.addressDataDamageToLocationService = this.clonerService.deepClone(this.addressService);
    this.addressDataDamageToOtherProperty = this.clonerService.deepClone(this.addressService);

    this.lesionSinisterDataService = this.clonerService.deepClone(this.SinisterClaimsDataService);
    this.SinisterDataDamageToLocationService = this.clonerService.deepClone(this.SinisterClaimsDataService);
    this.sinisterDataDamageToOtherPropertyService = this.clonerService.deepClone(this.SinisterClaimsDataService);

    //reclamante comun a todos
    this.personalClaimDataService.initPanelWithType(true, PersonalClaimsField);

    this.personalInjuredDataVehicle.initPanelWithType(true, InjuredFormField);
    this.personalInjuredDataLesionToPeople.initPanel(true, InjuredFormField);
    this.personalInjuredDataDamageToOtherProperty.initPanel(true, InjuredFormField);
    this.personalInjuredDataDamageToLocation.initPanel(true, InjuredFormField);

    this.addressDataVehicleService.initPanel(true);
    this.addressDataLesionToPeopleService.initPanel(true);
    this.addressDataDamageToLocationService.initPanel(true);
    this.addressDataDamageToOtherProperty.initPanel(true);

    this.sinisterDataService.initPanel(true);
    this.injuredDataService.initPanel(true);
    this.injuredLinkDataService.initPanel(true);
    this.damageDataService.initPanel(true);
    

    this.vehicleDataClaimsService.initPanel(true);
    this.vehicleSinesterDataService.initPanel(true);
    this.vehicleInspectionDataService.initPanel(true);
    this.lesionSinisterDataService.initPanelWithType(true, InjuriesToPeopleFormField);
    this.SinisterDataDamageToLocationService.initPanelWithType(true, DamageLocationFormField);
    this.sinisterDataDamageToOtherPropertyService.initPanelWithType(true, DamageOtherPropertyFormField);
  }

  get sinisterDamageToOtherPropertyService(){
    return this.sinisterDataDamageToOtherPropertyService;
  }
  get addressDamageToOtherProperty() {
    return this.addressDataDamageToOtherProperty;
  }
  get personalInjuredDamageToOtherProperty() {
    return this.personalInjuredDataDamageToOtherProperty;
  }
  get personalClaimDamageToOtherProperty() {
    return this.personalClaimDataDamageToOtherProperty;
  }
  get sinisterDamageToLocationService() {
    return this.SinisterDataDamageToLocationService;
  }

  get addressDamageToLocationService() {
    return this.addressDataDamageToLocationService
  }

  get personalInjuredDamageToLocation() {
    return this.personalInjuredDataDamageToLocation;
  }

  get personalClaimDamageToLocation() {
    return this.personalClaimDataDamageToLocation
  }

  get lesionSinisterService(){
    return this.lesionSinisterDataService;
  }
  get personalClaimLesionToPeople(){
    return this.personalClaimDataLesionToPeople;
  }

  get personalInjuredLesionToPeople(){
    return this.personalInjuredDataLesionToPeople;
  }

  get addressLesionToPeopleService(){
    return this.addressDataLesionToPeopleService;
  }

  get sinisterService () {
      return this.sinisterDataService;
  }

  get injuredService () {
      return this.injuredDataService;
  }

  get injuredLinkService() {
      return this.injuredLinkDataService;
  }

  get damageService() {
      return this.damageDataService;
  }

  get personalClaimService() {
    return this.personalClaimDataService;
  }

  get personalInjuredVehicleService() {
    return this.personalInjuredDataVehicle;
  }

  get addressVehicleService() {
    return this.addressDataVehicleService;
  }

  get vehicleClaimsService() {
    return this.vehicleDataClaimsService;
  }

  get vehicleSinesterService(){
     return this.vehicleSinesterDataService;
  }

  get vehicleInspectionService() {
    return this.vehicleInspectionDataService;
  }

}
