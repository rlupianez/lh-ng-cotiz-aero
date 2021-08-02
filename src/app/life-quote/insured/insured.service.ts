import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { InsuredTableService } from './insured-table.service';
import { TableBaseService } from './table-base.services';

@Injectable({
  providedIn: 'root'
})
export class InsuredService extends TableBaseService {

  _product: any;
  constructor(
    public formService: FormsFactoryService,
    public formManager: FormsManagerService,
    private insuredTableService: InsuredTableService) {
      super(formService, formManager, 'Cotizar');
  }
  

  initializeForms(config){
    super.initializeForms(config);
    if(this.formGroupConfig){
      this.formGroupConfig['children']['cobertura']['control']['editable'] = this.editable;
    }
  }

  initGroup(){
  }

  parseCoberturaData(items){
    let data = [];

    for( let cob of items){
      let item = {
        selected: true,
        required: true,
        ...cob
      }

      data.push(item);
    }

    return data;
  }

  setTableData(items){
     this.insuredTableService.setInsured(this.parseCoberturaData(items));
  }

  getRawData(){

    let data = this.formGroup.value;
    // solo los tildados
    return { cobertura: data.cobertura.filter( item => item['selected'] === true) };
  }

  setProduct(product: any){
    this.insuredTableService.setProduct(product);
  }

}
