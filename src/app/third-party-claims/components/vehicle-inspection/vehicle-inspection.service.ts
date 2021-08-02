import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './vehicle-inspection-form';
import { VehicleInspectionFieldEnum } from './vehicle-inspection.interfaces';

@Injectable({
  providedIn: 'root'
})
export class VehicleInspectionService extends BaseService implements OnDestroy {


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
  }

  initPanel(editable: boolean) {
    let fields;
    if (editable) {
      fields = formFields;
    } else {
      fields = formFields;
    }
    this.initializeForms(fields, editable);
    this.setObservables();
    this.setModelObservables();
  }

  setObservables() {
    const formGroup = this.getFormControls();
    if (!formGroup) return;

    const region = formGroup.controls[VehicleInspectionFieldEnum.region];
    const postalCode = formGroup.controls[VehicleInspectionFieldEnum.postalCode];
    region.valueChanges.subscribe(value => {
      this.setCityFilters({ ...this.formGroupConfig['children'][VehicleInspectionFieldEnum.city] });
    })

/*     postalCode.valueChanges.subscribe(value => {
      this.setCityFilters({ ...this.formGroupConfig['children'][VehicleInspectionFieldEnum.city] });
    }) */
  }

  private getCityFilters() {
    let vehicle = this.formGroup;
    let region = vehicle.controls[VehicleInspectionFieldEnum.region];
    let postalCode = vehicle.controls[VehicleInspectionFieldEnum.postalCode];
    return {
      p_provincia: region.value || 0,
  //    p_cod_postal : postalCode.value || null
    }
  }

  private setCityFilters(filtersConfigModelo) {
    let formControl = this.getFormControls();
    let city = formControl.get(VehicleInspectionFieldEnum.city);
    filtersConfigModelo['control']['filters'] = this.getCityFilters();
    filtersConfigModelo['disabled'] = false;
    this.formGroupConfig['children'][VehicleInspectionFieldEnum.city] = { ...filtersConfigModelo };
    filtersConfigModelo['disabled'] = false;
    city.enable();
  }

  setModelObservables() {
    const control = this.formGroup.controls[VehicleInspectionFieldEnum.transferInspection];

    const controls = [
      VehicleInspectionFieldEnum.inspectionDate,
      VehicleInspectionFieldEnum.timeRange,
      VehicleInspectionFieldEnum.street,
      VehicleInspectionFieldEnum.number,
      VehicleInspectionFieldEnum.floor,
      VehicleInspectionFieldEnum.deparment,
      VehicleInspectionFieldEnum.region,
      VehicleInspectionFieldEnum.city,
      VehicleInspectionFieldEnum.postalCode,
      VehicleInspectionFieldEnum.phone,
      VehicleInspectionFieldEnum.celular
    ];  

    control.valueChanges.subscribe(value => {
      const children = this.formGroupConfig['children'];
      this.formGroup.controls[VehicleInspectionFieldEnum.timeRange].setValue("09:00 a 17:00 HS");
      var hidden = (value !== "true") ? true : false;
      controls.forEach(q => { children[q].hidden = hidden; });
      if (hidden) {
        controls.forEach(q => { this.formGroup.controls[q].setValue("");; });
      }
    });
  }
}




