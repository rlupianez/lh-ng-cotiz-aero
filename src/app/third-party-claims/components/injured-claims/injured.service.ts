import { Injectable, OnDestroy } from '@angular/core';
import { InjuredBaseService } from './injured-base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './injured-form';
import { InjuredLinkFieldEnum } from '../injured-link/injured-link-data.interfaces';
import { InjuredFieldEnum } from './injured.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InjuredService extends InjuredBaseService implements OnDestroy {


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
    this.setValuesDefault();
  }

  setValuesDefault() {
    // this.formGroup.controls[InjuredFieldEnum.documentType].setValue("DNI");
    this.formGroup.controls[InjuredFieldEnum.personType].setValue("true");
  }

}




