import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

import { PlansDataFieldEnum } from '../services/plans-data.interfaces'

// fields
import { fields, group, formFields } from './plans-data-form';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlansDataService extends BaseService implements OnDestroy {


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

  private getFormControls() {
    return this.formGroup;
  }

  product: string;


  setObservables() {
    const formGroup = this.getFormControls();
    if (!formGroup) return;

    const category = formGroup.get(PlansDataFieldEnum.category);
    const risk = formGroup.get(PlansDataFieldEnum.risk);
    const product = formGroup.get(PlansDataFieldEnum.product);

    category.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(value => {
      if (value && value != "") {
        this.setRiskFilters({ ...this.formGroupConfig['children'][PlansDataFieldEnum.risk] });
        this.setProductFilters({ ...this.formGroupConfig['children'][PlansDataFieldEnum.product] });
      }
    })

    risk.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(value => {
      if (value && value != "") {
        this.setProductFilters({ ...this.formGroupConfig['children'][PlansDataFieldEnum.product] });
      }
    })

    product.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(value => {
      if (value && value != "") {
        var productList = this.formGroupConfig['children'][PlansDataFieldEnum.product]["control"]["list"];
        this.product = productList.find((item: { cod_producto: any; }) => item.cod_producto == value).desc_producto;
      } else {
        this.product = "";
      }
    })
  }

  private getRiskFilters() {
    let formGroup = this.getFormControls();
    let category = formGroup.get(PlansDataFieldEnum.category);
    return {
      p_cod_categoria: (category.value || 0)
    }
  }

  private setRiskFilters(filters) {
    let formGroup = this.getFormControls();
    let risk = formGroup.get(PlansDataFieldEnum.risk);
    filters['control']['filters'] = this.getRiskFilters();
    filters['disabled'] = false;
    this.formGroupConfig['children'][PlansDataFieldEnum.risk] = { ...filters };
    filters['disabled'] = false;
    risk.enable();
  }

  private getProductFilters() {
    let formGroup = this.getFormControls();
    let category = formGroup.get(PlansDataFieldEnum.category);
    let risk = formGroup.get(PlansDataFieldEnum.risk);
    return {
      p_cod_categoria: category.value || 0,
      p_cod_tipo_cap: risk.value || 0,
      p_list_type: "F",
      p_cod_prod: 9083,
    }
  }

  private setProductFilters(filters) {
    let formControl = this.getFormControls();
    let product = formControl.get(PlansDataFieldEnum.product);
    filters['control']['filters'] = this.getProductFilters();
    filters['disabled'] = false;
    this.formGroupConfig['children'][PlansDataFieldEnum.product] = { ...filters };
    filters['disabled'] = false;
    product.enable();
  }

}




