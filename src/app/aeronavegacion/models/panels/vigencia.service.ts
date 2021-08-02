import { Injectable, OnInit, OnDestroy } from '@angular/core';

import * as vigencia from './vigencia';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { fieldsEmitir, groupEmitir } from './vigencia';

import { CotizadorSectionService } from '@core/services/components/cotizador-section.services';
import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { ApiService } from '@core/services/http/api.service';

export type SectionStatusType = 'Cotizar' | 'Emitir' | 'View';

@Injectable({
  providedIn: 'root'
})
export class VigenciaService extends CotizadorPanelService implements OnDestroy {

  formGroup: FormGroup;
  formFieldsConfig: object = { ...fieldsEmitir };
  formGroupConfig: object = { ...groupEmitir };
  constructor(
    public formService: FormsFactoryService,
    public formManager: FormsManagerService,
    private apiService: ApiService) {

      /**
       *  
       *  Importante llamar al super y pasar estos parametros
       */
      super(formService, formManager, vigencia.fieldsEmitir, vigencia.groupEmitir);
      this.formGroup = this.formService.createForm(this.formFieldsConfig);
  }

  ngOnDestroy(){
    console.log('datos productor on destroy');
  }


  initPanel(editable: boolean){

    let fields;
    if(editable){
      fields = vigencia.fieldsEmitir;
    }else{
      fields = vigencia.viewFields;
    }

    this.initializeForms(fields, editable);

  }
  
}
