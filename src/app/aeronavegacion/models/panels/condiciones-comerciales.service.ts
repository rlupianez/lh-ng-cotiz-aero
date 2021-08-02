import { Injectable } from '@angular/core';
import { fields, group, formFields, viewFields } from './condiciones-comerciales';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';

import * as moment from 'moment';
import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { ApiService } from '@core/services/http/api.service';
import { Validators } from '@angular/forms';

export type SectionStatusType = 'Emitir' | 'Cotizar';

@Injectable({
  providedIn: 'root'
})
export class CondicionesComercialesService extends CotizadorPanelService {

  codProd: string;
  constructor(
    public formService: FormsFactoryService, 
    public formManager: FormsManagerService,
    public apiService: ApiService) {
    super(formService, formManager, fields, group );
  }

  
  initPanel(editable: boolean){

    let fields;
    if(editable){
      fields = formFields;
    }else{
      fields = viewFields;
    }

    this.initializeForms(fields, editable);

  }

  setProductor(codProd){
    this.codProd = codProd;
    this.addRangosComision();
  }

  addRangosComision(){
    const filters = {
      "p_cod_prod": this.codProd ? this.codProd  : '9083'
    }

    this.apiService.post('/cot_aero/TOPES_COMISION', filters, false).subscribe( res => {
      console.log('rangos comision', res);
      
      if(res && !res['p_error']){
        let config = { ...this.formGroupConfig['children']['porc_comision'] }
        this.formGroup.get('porc_comision').setValue(res['p_comision']);   
        this.formGroup.get('porc_comision').setValidators([Validators.required, Validators.max(res['p_pct_max']), Validators.min(res['p_pct_min'])]);     
      }
    })
  }

  setValue(data){
    //let cc = this.getCondicionesComerciales(data);
    //console.log('condiciones comerciales', cc);
    this.formGroup.patchValue(data);
    this.formGroup.markAllAsTouched();

    this.configVisibility();
    
  }

  configVisibility(){
    const forma_pago = this.formGroup.getRawValue().forma_pago;
    switch(forma_pago){
      case 'P': // cuponera
        this.formManager.disableAndHideGroupControls(
          this.formGroup, this.formGroupConfig, 
          ['cbu','titular_cbu','banco','tipo_tarjeta', 'tarjeta_credito', 'titular_tarjeta'], true);
          this.formGroup.markAsTouched();
        break;
      case  'T': // tarjeta
        this.formManager.disableAndHideGroupControls(
          this.formGroup, this.formGroupConfig, 
          ['cbu','titular_cbu'], true);
        break;
      case 'U': // CBU
        this.formManager.disableAndHideGroupControls(
          this.formGroup, this.formGroupConfig, 
          ['tipo_tarjeta', 'tarjeta_credito', 'titular_tarjeta'], true);
        break;
    }
  }

  getCondicionesComerciales(data){

    return {
      moneda: data['cod_mon'] || '',
      desc_moneda: data['x_moneda'] || '',
      forma_pago: data['t_forma_pago'] || '',
      desc_forma_pago: data['x_forma_pago'] || '',
      planes_pago: data['cod_plan'] || '',
      desc_planes_pago: data['x_plan_pagos'] || '',
      cbu: data['cbu'] || '',
      titular_cbu: data['titular_cbu'] || '',
      banco: data['cod_banco'] || '',
      desc_banco: data['x_banco'] || '',
      tipo_tarjeta: data['cod_tipo_tarjeta'] || '',
      desc_tipo_tarjeta: data['x_tipo_tarjeta'] || '',
      nro_tarjeta: data['nro_tarjeta'] || '',
      titular: data['titular'] || '',
      porcentaje_comision: data['pct_comision'] || ''
    }
  }

  getRawData(){
    return this.formGroup.getRawValue();
  } 

  setMediosDePago (codProducto) {
    if(codProducto){      
            
      let filtersMedioPago = { ...this.formGroupConfig['children']['cod_forma_pago'] };
      filtersMedioPago['control']['filters'] = {
        p_producto: codProducto        
      };
      
      this.formGroupConfig['children']['cod_forma_pago'] = filtersMedioPago;

    }
  }

  setFormaDePago (codProducto) {
    if(codProducto){      
      let filtersMedioPago = { ...this.formGroupConfig['children']['cod_plan'] };
      filtersMedioPago['control']['filters'] = {
        p_producto: codProducto,
        p_seccion: 14        
      };
      
      this.formGroupConfig['children']['cod_plan'] = filtersMedioPago;

    }
  }

}
