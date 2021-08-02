import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './sinister-claims-form';
import { LesionSinisterFieldEnum } from './sinister-claims.interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SinisterClaimsService extends BaseService implements OnDestroy {

  constructor(public formService: FormsFactoryService, public formManager: FormsManagerService) {
    /**
      *  
      *  Importante llamar al super y pasar estos parametros
      */
    super(formService, formManager,
      fields,
      group);

    // aca le pasas los formFields, por ahora no existe view fields.

  }

  ngOnDestroy() {

  }

  initializeForms(fields, editable) {
    super.initializeForms(fields, editable);
  }

  initPanel(editable: boolean) {
    let fields;
    if (editable) {
      fields = formFields;
    } else {
      fields = formFields;
    }
    this.initializeForms(fields, editable);

  }

  initPanelWithType(editable: boolean, fs: Array<LesionSinisterFieldEnum>) {
    let fields;
    fields = this.objectWithProperties(formFields, fs);
    this.initializeForms(fields, editable);
    this.setObservables();
  }


  objectWithProperties(obj, keys) {
    try {
      var target = {};
      var values = Object.entries(obj);
      for (var i = 0; i < keys.length; i++) {
        var index = values.findIndex(q => q[0] == keys[i]);
        if (index >= 0) {
          target[keys[i]] = obj[keys[i]];
        }
      }
      return target;
    } catch (err) {

    }
  }

  private getFormControls() {
    return this.formGroup;

  }

  setDefaults() {

  }

  setObservables() {
    const formGroup = this.getFormControls();
    const children = this.formGroupConfig['children'];

    if (!formGroup) return;

    const region = formGroup.controls[LesionSinisterFieldEnum.region];
    //const postalCode = formGroup.controls[LesionSinisterFieldEnum.postalCode];

    if (region) {
      region.valueChanges.subscribe(value => {
        this.setCityFilters({ ...this.formGroupConfig['children'][LesionSinisterFieldEnum.city] });
      })

      /*       postalCode.valueChanges.subscribe(value => {
              this.setCityFilters({ ...this.formGroupConfig['children'][LesionSinisterFieldEnum.city] });
            }) */
    }

    // criminalCase

    const hasCriminalCaseValueChangesLawerValuePredicate = () => {
      children[LesionSinisterFieldEnum.caseNumber].hidden = false;
      formGroup.get(LesionSinisterFieldEnum.caseNumber).setValue("");

      children[LesionSinisterFieldEnum.courtNumber].hidden = false;
      formGroup.get(LesionSinisterFieldEnum.courtNumber).setValue("");

      children[LesionSinisterFieldEnum.policeStation].hidden = false;
      formGroup.get(LesionSinisterFieldEnum.policeStation).setValue("");

    };

    const hasNotCriminalCaseValueChangesLawerValuePredicate = () => {
      children[LesionSinisterFieldEnum.caseNumber].hidden = true;
      children[LesionSinisterFieldEnum.courtNumber].hidden = true;
      children[LesionSinisterFieldEnum.policeStation].hidden = true;
    };

    const hasCriminalCaseDictionarySubscribe = [
      { "key": "true", 'method': hasCriminalCaseValueChangesLawerValuePredicate },
      { "key": "false", 'method': hasNotCriminalCaseValueChangesLawerValuePredicate },
    ];

    const criminalCase = formGroup.controls[LesionSinisterFieldEnum.criminalCase];
    if (criminalCase) {
      criminalCase.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
          if (value) {
            hasCriminalCaseDictionarySubscribe.find(element => element.key == value).method();
          }
        });
    }


    //hasInsurance
    const hasInsuranceValueChangesLawerValuePredicate = () => {
      children[LesionSinisterFieldEnum.affectedCoverage].hidden = false;
      formGroup.get(LesionSinisterFieldEnum.affectedCoverage).setValue("");

      children[LesionSinisterFieldEnum.thirdPartyCompany].hidden = false;
      formGroup.get(LesionSinisterFieldEnum.thirdPartyCompany).setValue("");

      children[LesionSinisterFieldEnum.policy].hidden = false;
      formGroup.get(LesionSinisterFieldEnum.policy).setValue("");

    };

    const hasNotInsuranceValueChangesLawerValuePredicate = () => {
      children[LesionSinisterFieldEnum.affectedCoverage].hidden = true;
      children[LesionSinisterFieldEnum.thirdPartyCompany].hidden = true;
      children[LesionSinisterFieldEnum.policy].hidden = true;
    };

    const hasInsuranceDictionarySubscribe = [
      { "key": "true", 'method': hasInsuranceValueChangesLawerValuePredicate },
      { "key": "false", 'method': hasNotInsuranceValueChangesLawerValuePredicate },
    ];


    const hasInsurance = formGroup.controls[LesionSinisterFieldEnum.hasInsurance];
    if (hasInsurance) {
      hasInsurance.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
          if (value) {
            hasInsuranceDictionarySubscribe.find(element => element.key == value).method();
          }
        });
    }

    // ambulance
    const hasAmbulanceValueChangesLawerValuePredicate = () => {
      children[LesionSinisterFieldEnum.healthcareCenter].hidden = false;
      formGroup.get(LesionSinisterFieldEnum.healthcareCenter).setValue("");
    };

    const hasNotAmbulanceValueChangesLawerValuePredicate = () => {
      children[LesionSinisterFieldEnum.healthcareCenter].hidden = true;
    };

    const ambulanceDictionarySubscribe = [
      { "key": "true", 'method': hasAmbulanceValueChangesLawerValuePredicate },
      { "key": "false", 'method': hasNotAmbulanceValueChangesLawerValuePredicate },
    ];

    const ambulance = formGroup.controls[LesionSinisterFieldEnum.ambulance]

    if (ambulance) {
      ambulance.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
          if (value) {
            ambulanceDictionarySubscribe.find(element => element.key == value).method();
          }
        });
    }

  }

  private getCityFilters() {
    let vehicle = this.formGroup;
    let region = vehicle.controls[LesionSinisterFieldEnum.region];
    let postalCode = vehicle.controls[LesionSinisterFieldEnum.postalCode];
    return {
      p_provincia: region.value || 0,
      // p_cod_postal: postalCode.value || null
    }
  }

  private setCityFilters(filtersConfigModelo) {
    let formControl = this.getFormControls();
    let city = formControl.get(LesionSinisterFieldEnum.city);
    filtersConfigModelo['control']['filters'] = this.getCityFilters();
    filtersConfigModelo['disabled'] = false;
    this.formGroupConfig['children'][LesionSinisterFieldEnum.city] = { ...filtersConfigModelo };
    filtersConfigModelo['disabled'] = false;
    city.enable();
  }
}




