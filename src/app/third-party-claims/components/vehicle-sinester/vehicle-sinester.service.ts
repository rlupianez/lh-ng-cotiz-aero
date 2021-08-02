import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './vehicle-sinester-form';
import { VehicleSinesterFieldEnum } from './vehicle-sinester.interfaces';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleSinesterService extends BaseService implements OnDestroy {


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
    const region = formGroup.get(VehicleSinesterFieldEnum.region);
    const country = formGroup.get(VehicleSinesterFieldEnum.country);


    country.valueChanges.pipe( debounceTime(500), distinctUntilChanged()) .subscribe(value => {
      if (value && value != "") {      
        this.setRegionFilters({ ...this.formGroupConfig['children'][VehicleSinesterFieldEnum.region] });
        this.setCityFilters({ ...this.formGroupConfig['children'][VehicleSinesterFieldEnum.city] });
      }
    })


    region.valueChanges.pipe( debounceTime(500), distinctUntilChanged()).subscribe(value => {
      if (value && value != "") {
        this.setCityFilters({ ...this.formGroupConfig['children'][VehicleSinesterFieldEnum.city] });
      }
    })
  }

  private getRegionFilters() {

    let formGroup = this.getFormControls();
    let country = formGroup.get(VehicleSinesterFieldEnum.country);

    return {
      p_pais: (country.value == 13) ? 26 : 0
    }
  }

  private setRegionFilters(filtersConfigModelo) {
    let formGroup = this.getFormControls();
    let region = formGroup.get(VehicleSinesterFieldEnum.region);
    filtersConfigModelo['control']['filters'] = this.getRegionFilters();
    filtersConfigModelo['disabled'] = false;
    this.formGroupConfig['children'][VehicleSinesterFieldEnum.region] = { ...filtersConfigModelo };
    filtersConfigModelo['disabled'] = false;
    region.enable();
  }

  private getCityFilters() {
    let formGroup = this.getFormControls();
    let region = formGroup.get(VehicleSinesterFieldEnum.region);
    return {
      p_provincia: region.value || 0
    }
  }

  private setCityFilters(filtersConfigModelo) {
    let formControl = this.getFormControls();
    let city = formControl.get(VehicleSinesterFieldEnum.city);
    filtersConfigModelo['control']['filters'] = this.getCityFilters();
    filtersConfigModelo['disabled'] = false;
    this.formGroupConfig['children'][VehicleSinesterFieldEnum.city] = { ...filtersConfigModelo };
    filtersConfigModelo['disabled'] = false;
    city.enable();
  }


}




