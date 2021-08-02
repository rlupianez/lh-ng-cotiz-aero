import { Injectable, OnInit, OnDestroy } from '@angular/core';

import * as datosProductor from './datos-productor';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

import { CotizadorSectionService } from '@core/services/components/cotizador-section.services';
import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { ApiService } from '@core/services/http/api.service';

export type SectionStatusType = 'Cotizar' | 'Emitir' | 'View';

@Injectable({
  providedIn: 'root'
})
export class DatosProductorService extends CotizadorPanelService implements OnDestroy {


  private _uri_list_productores: string = '/listas/LIST_PAS';

  constructor(
    public formService: FormsFactoryService,
    public formManager: FormsManagerService,
    private apiService: ApiService) {

      /**
       *  
       *  Importante llamar al super y pasar estos parametros
       */
      super(formService, formManager, datosProductor.fields, datosProductor.group);
    
  }

  ngOnDestroy(){
    console.log('datos productor on destroy');
  }


  initPanel(editable: boolean){

    let fields;
    if(editable){
      fields = datosProductor.formFields;
    }else{
      fields = datosProductor.viewFields;
    }

    this.initializeForms(fields, editable);

  }

  setValue(data){
   // console.log('data',data);
    let { cod_prod, cod_productor } = data;

    super.setValue({ desc_productor: `${cod_prod} - ${cod_productor}` });
  }

  getDatoProductor(cod_prod : number) {
    return this.apiService.post(this._uri_list_productores, {
      p_filtro: cod_prod,
      p_nropag: 0,
      p_regxpag: 30
    });
  }
}
