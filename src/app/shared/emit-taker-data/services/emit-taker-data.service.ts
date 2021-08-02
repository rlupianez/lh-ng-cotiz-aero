import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './emit-taker-data-form';
import { EmitTakerDataFieldEnum } from './emit-taker-data.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmitTakerDataService extends BaseService implements OnDestroy {


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

  initPanelWithType(editable: boolean, fs: Array<EmitTakerDataFieldEnum>) {
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


  setObservables() {
    const formGroup = this.getFormControls();
    if (!formGroup) return;

    const region = formGroup.controls[EmitTakerDataFieldEnum.region];
    const postalCode = formGroup.controls[EmitTakerDataFieldEnum.postalCode];
    region.valueChanges.subscribe(value => {
      this.setCityFilters({ ...this.formGroupConfig['children'][EmitTakerDataFieldEnum.city] });
    })

/*     postalCode.valueChanges.subscribe(value => {
      this.setCityFilters({ ...this.formGroupConfig['children'][EmitTakerDataFieldEnum.city] });
    }) */
  }

  private getCityFilters() {
    let vehicle = this.formGroup;
    let region = vehicle.controls[EmitTakerDataFieldEnum.region];
    let postalCode = vehicle.controls[EmitTakerDataFieldEnum.postalCode];
    return {
      p_provincia: region.value || 0,
     // p_cod_postal: postalCode.value || null
    }
  }

  private setCityFilters(filtersConfigModelo) {
    let formControl = this.getFormControls();
    let city = formControl.get(EmitTakerDataFieldEnum.city);
    filtersConfigModelo['control']['filters'] = this.getCityFilters();
    filtersConfigModelo['disabled'] = false;
    this.formGroupConfig['children'][EmitTakerDataFieldEnum.city] = { ...filtersConfigModelo };
    filtersConfigModelo['disabled'] = false;
    city.enable();
  }
}




