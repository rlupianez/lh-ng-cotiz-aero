import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './conditions-benefits-commercial-data-form';
import { ConditionsBenefitsCommercialDataFieldEnum } from './conditions-benefits-commercial-data.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConditionsBenefitsCommercialDataService extends BaseService implements OnDestroy {

 
  constructor(public formService: FormsFactoryService, public formManager: FormsManagerService ) {
     /**
       *  
       *  Importante llamar al super y pasar estos parametros
       */
      super(formService, formManager, 
        fields,
        group);

      // aca le pasas los formFields, por ahora no existe view fields.
      
  }

  ngOnDestroy(){

  }

  initializeForms(fields,editable){
    super.initializeForms(fields,editable);
    
  }

  initPanel(editable: boolean){
    let fields;
    if(editable){
      fields = formFields;
    }else{
      fields = formFields;
    }
    this.initializeForms(fields, editable);
  }

  initPanelWithType(editable: boolean, fs: Array<ConditionsBenefitsCommercialDataFieldEnum>) {
    let fields;
    fields = this.objectWithProperties(formFields, fs);
    this.initializeForms(fields, editable);
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

}




