import { Injectable } from '@angular/core';
import { fields, group, formFields, viewFields } from './condiciones-comerciales-emitir';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';

import * as moment from 'moment';

import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

export type SectionStatusType = 'Emitir' | 'Cotizar';

@Injectable({
  providedIn: 'root'
})
export class CondicionesComercialesEmitirService extends CotizadorPanelService {

  allData: object;
  showCreditCardForm: boolean = false;
  codAsegurado: string;
  creditCardFormIsValid: boolean = false;
  creditCardFormData: object;
  codFormaPago: string;

  constructor(public formService: FormsFactoryService, public formManager: FormsManagerService) {
    super(formService, formManager, fields, group );
  }

  /**
   * Inicializa el panel, si es editable o no
   */
  initPanel(editable: boolean){

    let fields;
    if(editable){
      fields = formFields;
    }else{
      fields = viewFields;
    }

    this.initializeForms(fields, editable);

  }

  /**
   * Setea los datos en el formulario
   * 
   * @param data 
   */
  setValue(data){
    this.allData = data;
    this.formGroup.patchValue(data);

    this.configVisibility();
  }

  /**
   * Configura la visibilidad de los campos, los campos que se muestran o no.
   * Todo depende la forma de pago
   */
  configVisibility(){
    const forma_pago = this.allData['cod_forma_pago'];
    this.codFormaPago = forma_pago;
    switch(forma_pago){
      case 'P': // cuponera
        this.formManager.disableAndHideGroupControls(
          this.formGroup, this.formGroupConfig, 
          ['cbu','titular_cbu','cod_banco','tipo_tarjeta', 'tarjeta_credito', 'titular_tarjeta', 'vencimiento_tarjeta', 'asegurado_tarjeta','titular_tarjeta','nro_tarjeta', 'desc_tarjeta'], true);
          this.formGroup.markAsTouched();
          this.showCreditCardForm  = false;
        break;
      case  'T': // tarjeta
        this.formManager.disableAndHideGroupControls(
          this.formGroup, this.formGroupConfig, 
          ['cbu','titular_cbu'], true);
          this.showCreditCardForm  = true;
        break;
      case 'U': // CBU
        this.formManager.disableAndHideGroupControls(
          this.formGroup, this.formGroupConfig, 
          ['tipo_tarjeta', 'tarjeta_credito', 'titular_tarjeta','vencimiento_tarjeta','asegurado_tarjeta','nro_tarjeta','desc_tarjeta'], true);
          this.showCreditCardForm  = false;
        break;
    }

    
  }

  /**
   * 
   * Obtiene 
   * @param data 
   */
  getCondicionesComerciales(data){

    return {
      moneda: data['cod_mon'] || '',
      desc_moneda: data['cod_moneda'] || '',
      forma_pago: data['cod_forma_pago'] || '',
      desc_forma_pago: data['cod_forma_pago'] || '',
      planes_pago: data['cod_plan'] || '',
      desc_planes_pago: data['desc_plan_pagos'] || '',
      cbu: data['cbu'] || '',
      titular_cbu: data['titular_cbu'] || '',
      banco: data['cod_banco'] || '',
      desc_banco: data['desc_banco'] || '',
      tipo_tarjeta: data['cod_tipo_tarjeta'] || '',
      desc_tipo_tarjeta: data['desc_tipo_tarjeta'] || '',
      nro_tarjeta: data['nro_tarjeta'] || '',
      titular: data['titular'] || '',
      porc_comision: data['pct_comision'] || ''
    }
  }


  
  /**
   *  Agrega el codigo del asegurado para poder obtener los datos de las tarjetas de asegurados 
   *  ya guardadas.
   * @param codAsegurado 
   */
  setAsegurado(codAsegurado){

    if(codAsegurado){

      this.codAsegurado = codAsegurado;
      /*
      let config = { ...this.formGroupConfig['children']['asegurado_tarjeta'] };
         config['control']['filters'] = {
          cod_asegu: codAsegurado
        }

      this.formGroupConfig['children']['asegurado_tarjeta'] = config;
      */

    }
    
  }


  get valid(){
    // cuando es cuponera no tiene que ingresar nada mas
    // si es forma de pago 'Tarjeta'
    if(this.codFormaPago === 'T'){

      if(this.showCreditCardForm){
        return this.creditCardFormIsValid;
      }

    }else{
      // Si todo el formulario esta deshabilitado, se debe dar como valido
      if(this.formGroup.disabled){
        return true;
      }  
      return this.formGroup.valid; 
    }
    
  }

  getCreditCardForm(event){
    // console.log('get credit card', event);
    this.creditCardFormIsValid = event.valid;
    this.creditCardFormData = event.data;
  }


  /**
   * Inicializa la logica de la vigencia
   */


  /**
   * Obtiene todos los datos del formulario
   */
  getRawData(){
    return { ...this.formGroup.getRawValue(), ...this.creditCardFormData }
  }

}
