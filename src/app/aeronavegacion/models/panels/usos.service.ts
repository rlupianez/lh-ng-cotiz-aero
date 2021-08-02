import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { fields, group } from './usos';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UsosService {

  active: boolean = false;
  editable: boolean;
  //////////////////////////////////////////
  formGroup: FormGroup;
  formFieldsConfig: object = { ...fields };
  formGroupConfig: object = { ...group };

  /////////////////////////////////////////
  producto: string;
  riesgo: string;
  filters: object = {
      p_seccion: '14',
      p_producto: null,
      p_riesgo: null 
  }

  constructor(
    private formService: FormsFactoryService,
    private formManager: FormsManagerService) {
    this.formGroup = this.formService.createForm(this.formFieldsConfig);
    this.initGroup();
  }

  get valid(){
    return this.formGroup.get('usos').value.length > 0;
  }

  
  initGroup(){
    
  }


  ///////////////////////////////////////////////////////////////

  setProducto(cod_prod: string){
    if(cod_prod){
      this.producto = cod_prod;
      // this.setFilters();

      //this.isEditable(this.editable);
    }
  }

  setRiesgo(cod_riesgo: string){
    if(cod_riesgo){
      this.riesgo = cod_riesgo
      this.setFilters()
    }
  }



  setUsos(data){

    /*for(let i=0; i < data.length; i++){
      data[i]['x_descri'] = data[i]['desc_uso'];  
    }*/

    this.addUsos(data);
    //this.isEditable(this.editable);
  }


  isEditable(editable: boolean){
    this.editable = editable;

    if(editable){
      this.enableGroup();
    }else{
      this.disableGroup();
    }
  }

  addUsos(data){

    let usosSelected = [];


    for(let uso of data){
      if(uso.cod_uso){
        usosSelected.push(uso.cod_uso);
      }
    }

    this.formGroup.patchValue({ usos: usosSelected });
  }

  disableGroup(){
    let config = { ...this.formGroupConfig['children']['usos'] };
    config['disabled'] = true;

    this.formGroupConfig['children']['usos'] = config;
  }

  enableGroup(){
    let config = { ...this.formGroupConfig['children']['usos'] };
    config['disabled'] = false;

    this.formGroupConfig['children']['usos'] = config;
  }


  setFilters(){
    let config = { ...this.formGroupConfig['children']['usos'] };

    config['control']['filters'] = {
      p_seccion: '14',
      p_producto: this.producto,
      p_riesgo: this.riesgo 
    };
    config['disabled'] = !this.editable;

    this.formGroupConfig['children']['usos'] = config;
  }

  getRawData(){
    return this.formGroup.getRawValue();
  }

  /*
  disableGroup(){
    this.formManager.disableGroupControls(this.formGroup, this.formGroupConfig, Object.keys(this.formFieldsConfig), true);
  }

  enableGroup(){
    this.formManager.disableGroupControls(this.formGroup, this.formGroupConfig, Object.keys(this.formFieldsConfig), false);
  }
  */
}
