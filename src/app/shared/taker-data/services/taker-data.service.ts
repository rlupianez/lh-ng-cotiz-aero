import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './taker-data-form';
import { TakeDataFieldEnum } from './taker-data.interfaces';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TakerDataService extends BaseService implements OnDestroy {


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

  initPanelWithType(editable: boolean, fs: Array<TakeDataFieldEnum>) {
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

      children[TakeDataFieldEnum.cuit].hidden = true;
      children[TakeDataFieldEnum.documentNumber].hidden = false;
      children[TakeDataFieldEnum.name].hidden = false;
      children[TakeDataFieldEnum.surname].hidden = false;
      children[TakeDataFieldEnum.businessName].hidden = true;
      // 

      formGroup.get(TakeDataFieldEnum.documentNumber).setValue("");
      formGroup.get(TakeDataFieldEnum.name).setValue("");
      formGroup.get(TakeDataFieldEnum.surname).setValue("");
      /*       var conditionIVAList = children[TakeDataFieldEnum.ivaCondition]['control'].list;
            var final = conditionIVAList.find((c) => c.cod_iva == "F"); */

      this.formGroup.controls[TakeDataFieldEnum.ivaCondition].setValue("CONS. FINAL");

    };

    const cuitValueChangesPredicate = () => {
      children[TakeDataFieldEnum.cuit].hidden = false;
      children[TakeDataFieldEnum.documentNumber].hidden = true;
      children[TakeDataFieldEnum.name].hidden = true;
      children[TakeDataFieldEnum.surname].hidden = true;
      children[TakeDataFieldEnum.businessName].hidden = false;
      //  
      formGroup.get(TakeDataFieldEnum.cuit).setValue("");
      formGroup.get(TakeDataFieldEnum.businessName).setValue("");

      /*       var conditionIVAList = children[TakeDataFieldEnum.ivaCondition]['control'].list;
            var final = conditionIVAList.find((c: { cod_iva: string; }) => c.cod_iva == "-"); */
      formGroup.get(TakeDataFieldEnum.ivaCondition).setValue("");

    };

    const documenTypeDictionarySubscribe = [
      { "key": "DNI", 'method': dniValueChangesPredicate },
      { "key": "CUIT", 'method': cuitValueChangesPredicate },
    ];



    const documentType = formGroup.get(TakeDataFieldEnum.documentType);

    documentType.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(value => {
      if (value && value != "") {
        documenTypeDictionarySubscribe.find(element => element.key == value).method();
      }
    });

    const consFinalValueChangesPredicate = () => {

      children[TakeDataFieldEnum.cuit].hidden = true;
      children[TakeDataFieldEnum.documentNumber].hidden = false;
      children[TakeDataFieldEnum.name].hidden = false;
      children[TakeDataFieldEnum.surname].hidden = false;
      children[TakeDataFieldEnum.businessName].hidden = true;

      formGroup.get(TakeDataFieldEnum.documentNumber).setValue("");
      formGroup.get(TakeDataFieldEnum.name).setValue("");
      formGroup.get(TakeDataFieldEnum.surname).setValue("");
      var documentTypes = children[TakeDataFieldEnum.documentType]['control'].list;
      var documentType = documentTypes.find((c) => c.abrev == "DNI");
      formGroup.get(TakeDataFieldEnum.documentType).setValue(documentType.abrev);
    };

    const notConsFinalValueChangesPredicate = () => {

      children[TakeDataFieldEnum.cuit].hidden = false;
      children[TakeDataFieldEnum.documentNumber].hidden = true;
      children[TakeDataFieldEnum.name].hidden = true;
      children[TakeDataFieldEnum.surname].hidden = true;
      children[TakeDataFieldEnum.businessName].hidden = false;

      formGroup.get(TakeDataFieldEnum.cuit).setValue("");
      formGroup.get(TakeDataFieldEnum.businessName).setValue("");
      var documentTypes = children[TakeDataFieldEnum.documentType]['control'].list;
      var documentType = documentTypes.find((c) => c.abrev == "CUIT");
      formGroup.get(TakeDataFieldEnum.documentType).setValue(documentType.abrev);
    };

    const ivaConditionDictionarySubscribe = [
      { "key": "CONS. FINAL", 'method': consFinalValueChangesPredicate },
      { "key": "SIN IVA", 'method': notConsFinalValueChangesPredicate },
      { "key": "RESP.  INSCRIPTO", 'method': notConsFinalValueChangesPredicate },
      { "key": "RESP.INSC.(GRAN CON)", 'method': notConsFinalValueChangesPredicate },
      { "key": "RESP.NO INSCRIPTO", 'method': notConsFinalValueChangesPredicate },
      { "key": "EXENTO", 'method': notConsFinalValueChangesPredicate },
      { "key": "NO CATEGORIZADO", 'method': notConsFinalValueChangesPredicate },
      { "key": "NO RESPONSABLE", 'method': notConsFinalValueChangesPredicate },
      { "key": "MONOTRIBUTISTA", 'method': notConsFinalValueChangesPredicate },
      { "key": "SERVICIOS PUBLICOS", 'method': notConsFinalValueChangesPredicate },
      { "key": "SERVICIOS EXTERIOR", 'method': notConsFinalValueChangesPredicate },
    ];

    const ivaCondition = formGroup.get(TakeDataFieldEnum.ivaCondition);

    /*     ivaCondition.valueChanges.pipe(debounceTime(100), distinctUntilChanged()).subscribe(value => {
          if (value && value != "") {
            ivaConditionDictionarySubscribe.find(element => element.key == value).method();
          }
        }) */

  }
}




