import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { RosterTableService } from './roster-table.service';
import { TableBaseService } from '../insured/table-base.services';

@Injectable({
  providedIn: 'root'
})
export class RosterService extends TableBaseService {

  constructor(
    public formService: FormsFactoryService,
    public formManager: FormsManagerService,
    private rosterTableService: RosterTableService) {
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

  parseRosterData(items){
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
     this.rosterTableService.setRoster(this.parseRosterData(items));
  }

  getRawData(){

    let data = this.formGroup.value;
    // solo los tildados
    return { roster: data.roster.filter( item => item['selected'] === true) };
  }

}
