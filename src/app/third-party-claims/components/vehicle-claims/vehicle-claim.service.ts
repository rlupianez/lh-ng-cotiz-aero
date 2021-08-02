import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './vehicle-claim-form';
import { VehicleFieldEnum } from './vehicle-claim.interfaces';
import { PlansDataFieldEnum } from '@shared/plans-data/services/plans-data.interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleClaimsService extends BaseService implements OnDestroy {


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

  private getFormControls() {
    return this.formGroup;
  }

  initializeForms(fields, editable) {

    super.initializeForms(fields, editable);
    this.setObservables();
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

  setObservables() {
    const formGroup = this.getFormControls();
    if (!formGroup) return;

    const vehicleType = formGroup.get(VehicleFieldEnum.vehicleType);
    const brand = formGroup.get(VehicleFieldEnum.brand);
    const brandModel = formGroup.get(VehicleFieldEnum.brandModel);

    vehicleType.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      if (value && value != "") {
        this.setBrandFilters({ ...this.formGroupConfig['children'][VehicleFieldEnum.brand] });
        this.setBrandModelFilters({ ...this.formGroupConfig['children'][VehicleFieldEnum.brandModel] });
        this.setYearFilters({ ...this.formGroupConfig['children'][VehicleFieldEnum.year] });
      }
    })


    brand.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      if (value && value != "") {
        this.setBrandModelFilters({ ...this.formGroupConfig['children'][VehicleFieldEnum.brandModel] });
        this.setYearFilters({ ...this.formGroupConfig['children'][VehicleFieldEnum.year] });
      }
    })

    brandModel.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      if (value && value != "") {
        this.setYearFilters({ ...this.formGroupConfig['children'][VehicleFieldEnum.year] });
      }
    })
  }

  getBrandFilters() {

    let formGroup = this.getFormControls();
    let vehicleType = formGroup.get(VehicleFieldEnum.vehicleType);

    return {
      p_tipo_veh: (vehicleType.value.toUpperCase() || null)
    }
  }

  setBrandFilters(filters) {
    let formGroup = this.getFormControls();
    let brand = formGroup.get(VehicleFieldEnum.brand);
    filters['control']['filters'] = this.getBrandFilters();
    filters['disabled'] = false;
    this.formGroupConfig['children'][VehicleFieldEnum.brand] = { ...filters };
    filters['disabled'] = false;
    brand.enable();
  }

  getBrandModelFilters() {

    let formGroup = this.getFormControls();
    let vehicleType = formGroup.get(VehicleFieldEnum.vehicleType);
    let brand = formGroup.get(VehicleFieldEnum.brand);

    return {
      p_tipo_veh: vehicleType.value.toUpperCase() || 0,
      p_marca: (brand.value || 0)
    }
  }

  setBrandModelFilters(filters) {
    let formGroup = this.getFormControls();
    let brandModel = formGroup.get(VehicleFieldEnum.brandModel);
    filters['control']['filters'] = this.getBrandModelFilters();
    filters['disabled'] = false;
    this.formGroupConfig['children'][VehicleFieldEnum.brandModel] = { ...filters };
    filters['disabled'] = false;
    brandModel.enable();
  }

  getYearFilters() {
    let formGroup = this.getFormControls();
    let vehicleType = formGroup.get(VehicleFieldEnum.vehicleType);
    let brand = formGroup.get(VehicleFieldEnum.brand);
    let brandModel = formGroup.get(VehicleFieldEnum.brandModel);
    return {
      p_tipo_veh: vehicleType.value.toUpperCase() || 0,
      p_marca: brand.value || 0,
      p_modelo: brandModel.value || 0
    }
  }

  setYearFilters(filters) {
    let formControl = this.getFormControls();
    let year = formControl.get(VehicleFieldEnum.year);
    filters['control']['filters'] = this.getYearFilters();
    filters['disabled'] = false;
    this.formGroupConfig['children'][VehicleFieldEnum.year] = { ...filters };
    filters['disabled'] = false;
    year.enable();
  }

}




