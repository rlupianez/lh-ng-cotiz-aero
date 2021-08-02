import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

/***
 *  
 *  Servicio que se encarga del manejo de los formularios creados a traves de configuracion JSON
 * 
 *************************************************************************************************/
export class FormsManagerService {

  formGroup: FormGroup;
  jsonConfig: object;

  constructor() { }


  init(form: FormGroup, config: object){
    this.formGroup = form;
    this.jsonConfig = config;
  }

  get serviceInitialized(){
      return this.formGroup && this.jsonConfig;
  }

  orderFormItems(items: object, order: any[] ){
    let ordererItems = {}

    for(let field of order){

      if(items[field]){
        ordererItems[field] = items[field];
      }

    }

    return ordererItems;
  }

  
  disableField(fieldConfig: object, value: boolean){
    if(fieldConfig){
      let config = { ...fieldConfig };
      
      fieldConfig['disabled'] = value;

      return config;
    }

    return null;
  }


  disableControl(fieldConfig: object, formControl: FormGroup, value: boolean){
    
  }

  setFiltersInControl(fieldConfig: object, filters: object){

  }

  /////////////////////////////////////////////////////////////////////////////////////
  //
  //             Funciones de manejo de formControl y configuracion JSON
  //
  /////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////
  //
  //                        FUNCIONES GENERICA MANEJO DE FORM CONTROL
  //
  /////////////////////////////////////////////////////////////////////////////////////

  pasteSectionControlsValues(){

  }

  clearGroupControls(group: FormGroup, fields: string[]){

    if(!group){
      return;
    }
    for(let item of fields){
      if(group.get(item)){
        group.get(item).setValue('');
      }
    }
  }


  disableGroupControls(form: FormGroup | AbstractControl, config: object, fields: string[], value: boolean){
    if(!form){
      return;
    }

    for(let item of fields){
      if(form.get(item)){
        // json config, se debe setear tambien
        if(config['children'][item]){
          config['children'][item]['disabled'] = value;
        }

        // disabled
        if(value){
          form.get(item).disable();
        }else{
          // enabled
          form.get(item).enable();
        }
        
      }
    }
  }


  getFieldOptions(formConfig: object, field: string): object[]{

    const config = this.getControlConfig(formConfig,field);

    if(config){
      const options = config['control']['list'];

      if(options){
        return options;
      }
    }

    return [];
    
  }


  getControlConfig(formConfig: object, field: string){
    if(formConfig['children'][field]){
        return formConfig['children'][field];
    }else{
      return null;
    }

  }

  hideFieldControl(formGroup: FormGroup, formConfig: object, field: string, hide: boolean){
    if(formConfig){

      if(formConfig['children'][field]){
        formConfig['children'][field].hidden = hide;
      }

    }
  }

  hideSectionControls(formConfig: object, fields: string[], hide: boolean){

    if(formConfig){

      for(let field of fields){

        if(formConfig['children'][field]){
          this.hideFieldControl(null, formConfig, field, hide);
        }

      }

    }

  }

  disableAndHideGroupControls(form: FormGroup | AbstractControl, config: object, fields: string[], value: boolean){
    if(!form){
      return;
    }

    for(let item of fields){
      if(form.get(item)){
        // json config, se debe setear tambien
        if(config['children'][item]){
          let newConfig = { ...config['children'][item] } ;
          newConfig['disabled'] = value;
          newConfig['hidden'] = value;
          config['children'][item] = newConfig;
        }

        

        // disabled
        if(value){
          form.get(item).disable();
        }else{
          // enabled
          form.get(item).enable();
        }
        
      }
    }
  }
  
  

}
