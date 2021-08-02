import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { fields, group} from './model/base';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { CoverageTableService } from './coverage-table.service';
import { TableBaseService } from '../insured/table-base.services';

@Injectable({
  providedIn: 'root'
})
export class CoverageService extends TableBaseService {

  constructor(
    public formService: FormsFactoryService,
    public formManager: FormsManagerService,
    private CoverageTableService: CoverageTableService) {
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

  parseCoverageData(items){
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
     this.CoverageTableService.setCoverage(this.parseCoverageData(items));
  }

  getRawData(){

    let data = this.formGroup.value;
    // solo los tildados
    return { cobertura: data.cobertura.filter( item => item['selected'] === true) };
  }

}
