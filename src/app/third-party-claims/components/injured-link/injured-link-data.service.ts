import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { InjuredLinkFieldEnum } from './injured-link-data.interfaces';

// fields
import { fields, group, formFields } from './injured-link-data-form';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InjuredLinkDataService extends BaseService implements OnDestroy {

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

  ngOnDestroy() { }

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
    //this.setObservables();
  }

   setObservables() {

    const formGroup = this.getFormControls();
    if (!formGroup) return;
    const children = this.formGroupConfig['children'];
    const otherLinkValueChangesEmptyPredicate = () => {

      children[InjuredLinkFieldEnum.otherLink].hidden = true;
      children[InjuredLinkFieldEnum.documentNumber].hidden = true;
      children[InjuredLinkFieldEnum.documentType].hidden = true;
      children[InjuredLinkFieldEnum.email].hidden = true;

      formGroup.get(InjuredLinkFieldEnum.otherLink).setValue("");
      //  formGroup.get(InjuredLinkFieldEnum.documentNumber).setValue("");;
      formGroup.get(InjuredLinkFieldEnum.documentType).setValue("");;
      formGroup.get(InjuredLinkFieldEnum.email).setValue("");

      var documentTypes = children[InjuredLinkFieldEnum.documentType]['control'].list;
      if (documentTypes) {
        var documentType = documentTypes.find((c) => c.abrev == "DNI");
        formGroup.get(InjuredLinkFieldEnum.documentType).setValue(documentType.abrev);
      }
    };

    const otherLinkValueChangesAllPredicate = () => {

      children[InjuredLinkFieldEnum.otherLink].hidden = true;
      children[InjuredLinkFieldEnum.documentNumber].hidden = false;
      children[InjuredLinkFieldEnum.documentType].hidden = false;
      children[InjuredLinkFieldEnum.email].hidden = false;

      formGroup.get(InjuredLinkFieldEnum.otherLink).setValue("");
      formGroup.get(InjuredLinkFieldEnum.documentNumber).setValue("");
      //  formGroup.get(InjuredLinkFieldEnum.documentType).setValue("");
      formGroup.get(InjuredLinkFieldEnum.email).setValue("");
      var documentTypes = children[InjuredLinkFieldEnum.documentType]['control'].list;
      if (documentTypes) {
        var documentType = documentTypes.find((c) => c.abrev == "DNI");
        formGroup.get(InjuredLinkFieldEnum.documentType).setValue(documentType.abrev);
      }


    };

    const otherLinkValueChangesOtherValuePredicate = () => {
      const children = this.formGroupConfig['children'];
      const formGroup = this.formGroup;
      children[InjuredLinkFieldEnum.otherLink].hidden = false;
      children[InjuredLinkFieldEnum.documentNumber].hidden = false;
      children[InjuredLinkFieldEnum.documentType].hidden = false;
      children[InjuredLinkFieldEnum.email].hidden = false;
    };

    const otherLinkValueChangesLawerValuePredicate = () => {
      const children = this.formGroupConfig['children'];
      const formGroup = this.formGroup;
      children[InjuredLinkFieldEnum.otherLink].hidden = false;
      children[InjuredLinkFieldEnum.documentNumber].hidden = false;
      children[InjuredLinkFieldEnum.documentType].hidden = false;
      children[InjuredLinkFieldEnum.email].hidden = false;

      formGroup.get(InjuredLinkFieldEnum.otherLink).setValue("");
      formGroup.get(InjuredLinkFieldEnum.documentNumber).setValue("");;
      formGroup.get(InjuredLinkFieldEnum.documentType).setValue("");
      formGroup.get(InjuredLinkFieldEnum.email).setValue("");
    };

    //isHidden

    const victimLinkDictionarySubscribe = [
      { "key": "", 'method': otherLinkValueChangesEmptyPredicate },
      { "key": "1", 'method': otherLinkValueChangesAllPredicate },
      { "key": "2", 'method': otherLinkValueChangesAllPredicate },
      { "key": "3", 'method': otherLinkValueChangesAllPredicate },
      { "key": "4", 'method': otherLinkValueChangesAllPredicate },
      { "key": "5", 'method': otherLinkValueChangesAllPredicate },
      { "key": "6", 'method': otherLinkValueChangesOtherValuePredicate }
    ];

    // subscribe le victimLink
    this.formGroup.controls[InjuredLinkFieldEnum.victimLink].valueChanges
      .pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
        victimLinkDictionarySubscribe.find(element => element.key == value).method();
      });
  }
}





