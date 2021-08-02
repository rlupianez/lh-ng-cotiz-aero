import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, Form } from '@angular/forms';

import * as DatosTomador from './datos-tomador';
import { iFields, formFields, viewFields, tFields, tFieldname } from './datos-tomador';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';

import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

import { Observable } from 'rxjs';
import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';
import { delay } from 'rxjs/operators';


interface DatosTomador {
  cod_asegurado: string,
  nombre: string,
  apellido: string,
  razonsocial: string,
  cod_provincia: string | number,
  desc_provincia: string,
} 

export type SectionStatusType = 'Emitir' | 'Cotizar';

@Injectable({
  providedIn: 'root'
})
export class DatosTomadorService extends CotizadorPanelService implements OnDestroy {

  codAsegurado: string;
  allData: tFields;
  productorData: object;
  validAseg: boolean = false;
  clearAtInit: boolean = true;

  constructor(
    public formService: FormsFactoryService, 
    public formManager: FormsManagerService,
    public apiService: ApiService,
    public toasterService: ToasterService ) {
     /**
       *  
       *  Importante llamar al super y pasar estos parametros
       */
      super(formService, formManager, DatosTomador.fields, DatosTomador.group);
    
  }

  ngOnDestroy(){
    console.log('datos tomador on destroy');
  }

  initializeForms(fields,editable, defaultData?: object){
    super.initializeForms(fields,editable);

    if(defaultData){
      this.setValue(defaultData);
    }

    if(editable){
      this.initGroupCotizar();
      //this.isInitialized = true;
      // se pega todos los datos
      //this.setValue(this.allData);
    }
    
  }
  
  initPanel(editable: boolean, defaultData?: object){
    let fields;
    if(editable){
      fields = formFields;
    }else{
      fields = viewFields;
    }

    this.initializeForms(fields, editable, defaultData);
  }

  setProductor(data){
    this.productorData = data;
  }

  /**
   * Pega los datos en el formulario formGroup
   * 
   * ClearValues indica si se deben limpiar los valores al iniciar o no
   */
  setValue(data, clearValues?: boolean){
    //console.log('datos tomador', data);

    // Flag para saber si se deben limpiar los valores o no
    if(typeof clearValues !== 'undefined'){
      this.clearAtInit = clearValues;
    }

    const {}  = data;
    this.allData = data;
    this.codAsegurado = data.cod_asegurado;

    this.pasteDatosTomadorEmitir(data);

    // Pegar condicion de IVA
    if(data.cod_iva){
      this.formGroup.get('cod_iva').setValue(data.cod_iva);
    }

    // Al pegar la COND IVA - Se debe ajustar la visibilidad de los campos
    // Que campos se deben mostrar y cuales ocultar
    this.asyncConfigDatosTomadorVisibility().subscribe( res => {

      // Pegando valores que son selects
        this.codAsegurado = data.cod_asegurado;
        if(data.nro_documento){
          this.formGroup.get('nro_documento').setValue({ 
            nro_documento: data.nro_documento,
            ape_nom_rsoc: data.desc_doc_nomape,
            cod_asegurado: data.cod_asegurado || null,
            codpas: data.cod_prod,
            nombre: data.nombre,
            apellido: data.apellido,
            cod_provincia: data.cod_provincia,
            cod_suc: data.cod_suc
          });
        }

        
        if(data.cuit){
          
          this.formGroup.get('cuit').setValue({ 
            cuit: data.cuit,
            ape_nom_rsoc: data.desc_doc_nomape,
            cod_asegurado: data.cod_asegurado || null,
            codpas: data.cod_prod,
            nombre: data.nombre,
            apellido: data.apellido,
            cod_provincia: data.cod_provincia,
            cod_suc: data.cod_suc
          });


          
         //this.formGroup.get('cuit').setValue(data.cuit);
        }

        //this.isInitialized = true;

        //this.clearAtInit = true;
    });
    
    //this.clearAtInit = true;
    // super.setValue(data);

  }

  /**
   * Configurar visibilidad condicional de los campos del tomador, hacerlo async para enterarme cuando termina.
   * 
   */


  asyncConfigDatosTomadorVisibility(){

    return new Observable(obs => {
        this.configDatosTomadorVisibility();
        obs.next();
    })
  }

  pasteDatosTomadorEmitir(asegurado: object){
    //const iAsegurado = new Asegurado(asegurado);
    //const fields = Object.keys(iAsegurado);
    console.log('asegurado tomador', asegurado);
    if(asegurado){
      super.setValue(asegurado);
      //super.pasteAllValues(asegurado);

      // se deshabilitan solo los que estan completos 
      /*let completedFields = [];
      for(let field of fields){
        if(iAsegurado[field]){
          completedFields.push(field);
        }
      }*/

    }else{
     
    }
  }




  configDatosTomadorVisibility(){
    //let data: iFields = this.formGroup.getRawValue();
    let data = this.allData;
    
    //console.log('data', data);


    if(data.cod_iva === 'F'){

      this.formManager.disableGroupControls(
        this.formGroup, 
        this.formGroupConfig, 
        ['apellido', 'nombre', 'nro_documento'] as tFieldname[], 
        true);

      this.formManager.disableAndHideGroupControls(
        this.formGroup, this.formGroupConfig, 
        ['cod_nacionalidad', 'sexo', 'fec_nacimiento'], 
        false);

      this.formManager.disableAndHideGroupControls(
        this.formGroup, 
        this.formGroupConfig, 
        ['razon_social', 'cuit']  as tFieldname[] , 
        true);

    }else {
      
      this.formManager.disableGroupControls(
        this.formGroup, 
        this.formGroupConfig, 
        ['razon_social']  as tFieldname[], 
        true);
      
      this.formManager.disableAndHideGroupControls(
        this.formGroup, 
        this.formGroupConfig, 
        ['nombre','apellido','nro_documento','nacionalidad', 'sexo', 'fec_nacimiento'] , 
        true);

    }

  }
  

  /*********************************************************************
   *                  Cotizar
   *********************************************************************/
  initGroupCotizar(){
    this.addCondicionFiscalLogic();
    this.addCuitLogic();
    this.initNumeroDocumentoLogic();
    this.initTipoPersonaLogic();

    setTimeout( () => { 
      this.isInitialized = true;
    }, 4000 );
  }


  addCondicionFiscalLogic(){
     /**------------------------------------------------------------------------------------------------
     * 
     *    Condicion Fiscal
     * 
     ------------------------------------------------------------------------------------------------*/
     const cod_iva = this.formGroup.get('cod_iva');
     const desc_tipo_persona = this.formGroup.get('desc_tipo_persona');

     cod_iva.valueChanges.subscribe( condIva => {
      // console.log('condicion iva', condIva);

      // limpiar datos de tomador
      if(this.isInitialized){
        this.clearGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia','desc_provincia',  'razon_social']);
      }
      
      this.disableGroupControls(this.formGroup,['nombre','apellido', 'cod_provincia', 'razon_social'], false);
      // limpiar cuit y dni
      if(this.isInitialized){
        this.clearGroupControls(this.formGroup, ['cuit', 'nro_documento']);
      }
      

      /**
       * 
       * p_tipo_doc - p_cod_iva
       */
      let p_tipo_doc = null;
      let p_cod_iva = condIva;

      if(condIva === 'F'){
        // si es consumidor final
        // pegado DNI, deshabilitado
        //this.formGroup.get('desc_tipo_doc').setValue('DNI');
        // codigo 4
        p_tipo_doc = 4;

        this.formGroupConfig['children']['nro_documento']['hidden'] = false;
        this.formGroup.get('nro_documento').enable();

        // cuit
        this.formGroupConfig['children']['cuit']['hidden'] = true;
        this.formGroup.get('cuit').disable();
        // pegado Persona Fisica, deshabilitado
        desc_tipo_persona.setValue('Persona Fisica');
        
        // pegado Exento, deshabilitado
      } else if(condIva === 'M'){
          // pegado Exento pero habilitado monotributo
          this.formGroupConfig['children']['cuit']['hidden'] = false;
          this.formGroup.get('cuit').enable();

          this.formGroupConfig['children']['nro_documento']['hidden'] = true;
          this.formGroup.get('nro_documento').disable();
          this.formGroup.get('nro_documento').setValue('');

          // pegado CUIT, deshabilitado
          //this.formGroup.get('des_tipo_doc').setValue('CUIT');
          // codigo 88
          p_tipo_doc = 88;

          // pegado Persona Fisica, deshabilitado
          desc_tipo_persona.setValue('Persona Fisica');
          

        } else if(condIva === 'S'){
          // pegado Exento, habilitado RESP.  INSCRIPTO
          this.formGroupConfig['children']['cuit']['hidden'] = false;
          this.formGroup.get('cuit').enable();

          // pegado CUIT, deshabilitado
          //this.formGroup.get('des_tipo_doc').setValue('CUIT');
          p_tipo_doc = 88;

          this.formGroupConfig['children']['nro_documento']['hidden'] = true;
          this.formGroup.get('nro_documento').disable();
          this.formGroup.get('nro_documento').setValue('');

        } else if (condIva === 'Z' || condIva === 'E' || condIva === 'X') {
          // pegado Exento, habilitado NO RESPONSABLE EXENTO NO CATEGORIZADO
          this.formGroupConfig['children']['cuit']['hidden'] = false;
          this.formGroup.get('cuit').enable();

          // pegado CUIT, deshabilitado
          //this.formGroup.get('des_tipo_doc').setValue('CUIT');
          p_tipo_doc = 88;
          this.formGroupConfig['children']['nro_documento']['hidden'] = true;
          this.formGroup.get('nro_documento').disable();
          this.formGroup.get('nro_documento').setValue('');

        } else if(condIva !== ''){
          //this.formGroup.get('des_tipo_doc').setValue('');
          this.formGroupConfig['children']['nro_documento']['hidden'] = true;
          this.formGroup.get('nro_documento').setValue('');


          this.formGroupConfig['children']['cuit']['hidden'] = false;
          this.formGroup.get('cuit').enable();

        }else{
          //this.formGroup.get('des_tipo_doc').setValue('');
          this.formGroupConfig['children']['nro_documento']['hidden'] = true;
          this.formGroup.get('nro_documento').setValue('');


          this.formGroupConfig['children']['cuit']['hidden'] = true;
          this.formGroup.get('cuit').disable();
        }

        if(condIva){
          // agregar filtros a cuit 
          let filters = {
            p_cod_iva: p_cod_iva,
            p_tipo_doc: p_tipo_doc
          }

          // si es DNI
          if(p_tipo_doc === 4){
            let filtersConfig = { ...this.formGroupConfig['children']['nro_documento'] };
            filtersConfig['control']['filters'] = filters
            filtersConfig.disabled = false;
          }

          // si es CUIT
          if(p_tipo_doc === 88){
            let filtersConfig = { ...this.formGroupConfig['children']['cuit'] };
            filtersConfig['control']['filters'] = filters
            filtersConfig.disabled = false;
          }

        }

        this.formGroup.get('cod_tipo_doc').setValue(p_tipo_doc);

    });

  }

  addCuitLogic(){
    /***************************************+
     *    CUIT
     *****************************************/

    const controlCuit = this.formGroup.get('cuit');
    const desc_tipo_persona = this.formGroup.get('desc_tipo_persona');
    controlCuit.valueChanges.subscribe( (item: string) => {

      // limpiar datos del tomador
      if(this.isInitialized){
        this.clearGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia', 'desc_provincia', 'razon_social']);
      }
      
      this.disableGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia', 'razon_social'], false);

      if(item){
        this.pasteAsegurado(item);
      }
      

      if(controlCuit.valid && controlCuit.value){
        let cuit = item['cuit'] || item['value'] || item;
        cuit = cuit.toString();
        
        if (cuit.substring(0, 2) === '20' || cuit.substring(0, 2) === '27' ||
          cuit.substring(0, 2) === '23' || cuit.substring(0, 2) === '24' ||
          cuit.substring(0, 2) === '25' || cuit.substring(0, 2) === '26'){

          desc_tipo_persona.setValue('F');
          this.hideSectionControls(this.formGroupConfig, ['nombre','apellido', 'cod_provincia'], false);
          this.hideSectionControls(this.formGroupConfig, ['razon_social'], true);

        }else if (parseInt(cuit.substring(0, 2),0) >= 30) {

          desc_tipo_persona.setValue('J');
          this.hideSectionControls(this.formGroupConfig, ['razon_social', 'cod_provincia'], false);
          this.hideSectionControls(this.formGroupConfig, ['nombre','apellido'], true);

        }else {
          desc_tipo_persona.setValue('');
          this.hideSectionControls(this.formGroupConfig, ['nombre','apellido', 'cod_provincia'], false);
          this.hideSectionControls(this.formGroupConfig, ['razon_social'], true);
        }

        // pegar nombre y apellido
        this.codAsegurado = item['cod_asegurado'];

        if(item['tipo_persona'] === 'F'){
          let datos: DatosTomador = {
            cod_asegurado: item['cod_asegurado'] || null,
            nombre: item['nombre'] || null,
            apellido: item['apellido'] || null,
            cod_provincia: item['cod_provincia'] || null,
            desc_provincia: item['desc_provincia'] || null,
            razonsocial: null
          }

          this.pasteDatosTomador(datos);
        }
        
        if(item['tipo_persona'] === 'J'){
          let datos: DatosTomador = {
            cod_asegurado: item['cod_asegurado'] || null,
            nombre: null,
            apellido: null,
            cod_provincia: item['cod_provincia'] || null,
            desc_provincia: item['desc_provincia'] || null,
            razonsocial: item['ape_nom_rsoc']
          }

          this.pasteDatosTomador(datos);
        }

        this.formGroup.get('cod_tipo_doc').setValue(88);


      }else{
        desc_tipo_persona.setValue('');
        this.formGroup.get('cod_tipo_doc').setValue(null);
       
        this.formManager.disableAndHideGroupControls(this.formGroup,this.formGroupConfig, ['cod_provincia'], false);
        this.formManager.disableAndHideGroupControls(this.formGroup,this.formGroupConfig, ['desc_provincia'], true);
      }
     

    });

  }

  initNumeroDocumentoLogic(){
     /***************************************+
     *    Numero de Documento
     *****************************************/
    // ejemplo: 14818431
    let documento = this.formGroup.get('nro_documento');
    documento.valueChanges.subscribe( item => {

      // limpiar datos del tomador
      if(this.isInitialized){
        this.clearGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia', 'desc_provincia', 'razon_social']);
      }
      
      this.disableGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia', 'razon_social'], false);

      if(item){
        this.pasteAsegurado(item);
      }
      

      if(item && documento.valid && item['nro_documento']){
        // console.log('nro documento', item);

        let datos : DatosTomador  = {
          cod_asegurado: item['cod_asegurado'] || null,
          nombre: item.nombre || null,
          apellido: item.apellido || null,
          cod_provincia: item.cod_provincia || null,
          desc_provincia: item['desc_provincia'] || null,
          razonsocial: null
        }

        this.pasteDatosTomador(datos);

      }else{
       
      }

      /*if(item && documento.valid && item['value']){
        // console.log('nro documento', item);

        let datos : DatosTomador  = {
          cod_asegurado: null,
          nombre: item.nombre || null,
          apellido: item.apellido || null,
          provincia: item.cod_provincia || null,
          razonsocial: null
        }

        this.pasteDatosTomador(datos);

      }*/
      
    });

  }

  pasteAsegurado(data){

    this.aseguradoIsValid(data);
    if(data && data['cod_asegurado']){
      this.formManager.disableAndHideGroupControls(this.formGroup, this.formGroupConfig, ['cod_provincia'], true);
      this.formManager.hideSectionControls(this.formGroupConfig, ['desc_provincia'], false);
    }else{
      this.formManager.disableAndHideGroupControls(this.formGroup, this.formGroupConfig, ['desc_provincia'], true);
      this.formManager.disableAndHideGroupControls(this.formGroup,this.formGroupConfig, ['cod_provincia'], false);
      this.codAsegurado = null;
    }
  }

  aseguradoIsValid(data){
    if(data && typeof data === 'object'){
      this.validateAsegurado({ ...data, ...this.productorData });
    }else{
      this.validAseg = true;
    }
    
  }


  getAseguradoStatus(): boolean {
    return this.validAseg;
  }
  /**
   * 
   * Se debe validar si el asegurado seleccionado pertenece al Productor seleccionado.
   * @param data 
   */
  validateAsegurado(data){
    //console.log('validate aseg', data);
    let cod = null;
    if(data['cod_productor'] && data['cod_productor']['codpas']){
      cod = data['cod_productor']['codpas'];
    }
    
    let body = {
      p_cod_prod: cod
    }

    if(data['cuit']){
      body['p_nro_doc'] = data['nro_documento'];
    }
      
    if(data['cuit']){
      body['p_cuit'] = data['cuit'];
    }

    this.apiService.post('/cot_aero/VALIDA_PROD_ASEG',body, false).subscribe(
      res => {
        // console.log('validate', res);
        if(res['p_x_error'] || res['p_error']){
          this.toasterService.show(res['p_x_error'], 'error');
          this.validAseg = false;
        }else{
          this.validAseg = true;
        }
      }
    )
  }

  initTipoPersonaLogic(){

    /***************************************+
     *    TIPO Persona
     *****************************************/

    this.formGroup.get('cod_tipo_persona').valueChanges.subscribe( (tPersona: string)=>{
      
      if(tPersona === 'Persona Juridica'){
        // mostrar razon social
        
        this.formGroupConfig['children']['razon_social']['hidden'] = false;
        // ocultar nombre, apellido, edad
        this.formGroupConfig['nombre']['hidden'] = true;
        this.formGroup.get('nombre').setValue('');
        this.formGroupConfig['children']['apellido']['hidden'] = true;
        this.formGroup.get('apellido').setValue('');
      } else {
        // ocultar razon social
        this.formGroupConfig['children']['razon_social']['hidden'] = true;
        this.formGroup.get('razon_social').setValue('');
        // mostrar nombre, apellido, edad
        this.formGroupConfig['children']['nombre']['hidden'] = false;
        this.formGroupConfig['children']['apellido']['hidden'] = false;
      }

    });
  }


  pasteDatosTomador(datos: DatosTomador){

    if(datos.cod_asegurado){
      this.codAsegurado = datos.cod_asegurado;
    }

    if(datos.nombre){
      this.formGroup.get('nombre').setValue(datos.nombre);
    }

    if(datos.apellido){
      this.formGroup.get('apellido').setValue(datos.apellido);
    }

    if(datos.cod_provincia){
      this.formGroup.get('cod_provincia').setValue(datos.cod_provincia);
    }

    if(datos.desc_provincia){
      this.formGroup.get('desc_provincia').setValue(datos.desc_provincia);
    }

    if(datos.razonsocial){
      this.formGroup.get('razon_social').setValue(datos.razonsocial);
    }

    this.disableGroupControls(this.formGroup, ['nombre','apellido','cod_provincia', 'razon_social', 'desc_provincia'], true);

    if(this.isEditable){
      this.hideSectionControls(this.formGroupConfig, ['cod_provincia'], true);
      this.hideSectionControls(this.formGroupConfig, ['desc_provincia'], false);
    }else{
      this.hideSectionControls(this.formGroupConfig, ['cod_provincia'], false);
      this.hideSectionControls(this.formGroupConfig, ['desc_provincia'], true);
    }
  }

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


  disableGroupControls(form: FormGroup | AbstractControl, fields: string[], value: boolean){
    if(!form){
      return;
    }

    for(let item of fields){
      if(form.get(item)){
        // json config, se debe setear tambien
        if(this.formGroupConfig['children']['item']){
          let config = { ...this.formGroupConfig['children'][item] };
          config['disabled'] = value;
          
          this.formGroupConfig['children'][item] = config;
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


  getFieldOptions(formConfig: object, section: string, field: string): object[]{

    const config = this.getControlConfig(formConfig,section,field);

    if(config){
      const options = config['control']['list'];

      if(options){
        return options;
      }
    }

    return [];
    
  }


  getControlConfig(formConfig: object, section: string, field: string){
    if(formConfig[section]['children'][field]){
        return formConfig[section]['children'][field];
    }else{
      return null;
    }

  }

  hideFieldControl(formGroup: FormGroup, formConfig: object, field: string, hide: boolean){
    if(formConfig){

      if(formConfig['children'][field]){
        let config = formConfig['children'][field];
        config.hidden = hide;
        formConfig['children'][field] = config;
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
  
  getRawData(){
    return this.formGroup.getRawValue();
  }

}




