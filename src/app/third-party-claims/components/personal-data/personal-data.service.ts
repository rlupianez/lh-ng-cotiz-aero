import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './personal-data-form';
import { PersonalFieldEnum } from './personal-data.interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonalDataService extends BaseService implements OnDestroy {


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

  private getFormControls() {
    return this.formGroup;
  }

  ngOnDestroy() {

  }

  initializeForms(fields, editable) {
    super.initializeForms(fields, editable);
    this.setObservables();
    this.setValuesDefault();
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

  initPanelWithType(editable: boolean, fs: Array<PersonalFieldEnum>) {
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

  setObservables() {
    const formGroup = this.getFormControls();
    const children = this.formGroupConfig['children'];
    if (!formGroup) return;

    const dniValueChangesPredicate = () => {
      children[PersonalFieldEnum.cuit].hidden = true;
      children[PersonalFieldEnum.documentNumber].hidden = false;
      formGroup.get(PersonalFieldEnum.documentNumber).setValue("");
    };

    const cuitValueChangesPredicate = () => {
      children[PersonalFieldEnum.cuit].hidden = false;
      children[PersonalFieldEnum.documentNumber].hidden = true;
      formGroup.get(PersonalFieldEnum.cuit).setValue("");
    };

    const documenTypeDictionarySubscribe = [
      { "key": "DNI", 'method': dniValueChangesPredicate },
      { "key": "CUIT", 'method': cuitValueChangesPredicate },
    ];

    const documentType = formGroup.get(PersonalFieldEnum.documentType);

    documentType.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(value => {
      if (value && value != "") {
        documenTypeDictionarySubscribe.find(element => element.key == value).method();
      }
    })

  }

  setValuesDefault() {
    this.formGroup.controls[PersonalFieldEnum.documentType].setValue("DNI");
  }

}




