import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, Form } from '@angular/forms';

import * as DatosTomador from '../datos-tomador';
import { viewFieldsEmitir, formFieldsEmitir, fieldsEmitir, groupEmitir } from '../emitir/datos-tomador-emitir';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';

import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

import { Asegurado } from '@core/models/Asegurado';
import * as moment from 'moment';


interface DatosTomador {
  cod_asegurado: string,
  nombre: string,
  apellido: string,
  razonsocial: string,
  provincia: string | number
} 

export type SectionStatusType = 'Emitir' | 'Cotizar';

@Injectable({
  providedIn: 'root'
})
export class DatosTomadorEmitirService extends CotizadorPanelService implements OnDestroy {

  codAsegurado: string;
  allData: object;
  currentProv: number = null;
  //editable: boolean;

  constructor(public formService: FormsFactoryService, public formManager: FormsManagerService ) {
     /**
       *  
       *  Importante llamar al super y pasar estos parametros
       */
      super(formService, formManager, fieldsEmitir, groupEmitir);
    
  }

  ngOnDestroy(){
    console.log('datos tomador on destroy');
  }

  initializeForms(fields,editable){
    super.initializeForms(fields,editable);
    
    if(!editable){
      this.disableGroup(); 
    }else{
      this.initGroupEmitir();
    }
    
  }
  
  initPanel(editable: boolean){
    this.isEditable = editable;
    let fields;
    if(editable){
      fields = formFieldsEmitir;
    }else{
      fields = viewFieldsEmitir;
    }

    this.initializeForms(fields, editable);
  }

  setValue(data){
    const {}  = data;
    this.allData = data;
    this.codAsegurado = data.cod_asegurado;
    
    this.pasteDatosTomadorEmitir(data);
    this.configDatosTomadorVisibility();

    this.currentProv = this.allData['cod_provincia'];

  }

  pasteDatosTomadorEmitir(asegurado: object){
    //const iAsegurado = new Asegurado(asegurado);
    //const fields = Object.keys(iAsegurado);
    this.setPolizaElectronica(asegurado['poliza_electronica']);
    // parseando datos necesario que tiene un formato distinto
    asegurado['fec_nacimiento'] = asegurado['fec_nacimiento'] !== '' ? moment(asegurado['fec_nacimiento'], 'DD/MM/YYYY') : '';
    
    // si no existe codigo localidad no autocompleto el combo de Localidad
    if(asegurado['cod_localidad'] !== null){
      asegurado['cod_localidad'] = asegurado['desc_localidad'] !== '' ? 
      { 
        desc_localidad: asegurado['desc_localidad'], 
        cod_postal: asegurado['cod_postal'],
        sub_cod_postal: asegurado['cod_localidad']
      } : '';
    }
    
    asegurado['cod_postal'] =  parseInt(asegurado['cod_postal']) ? parseInt(asegurado['cod_postal']) : null;
    
    
    if(asegurado){
      super.setValue(asegurado);
    }else{
     
    }
  }


  setPolizaElectronica(polizaValue){
    let config = { ...this.formGroupConfig['children']['poliza_electronica'] };
    config['control'].defaultValue = polizaValue === 'S' ? true: false;
    
    this.formGroupConfig['children']['poliza_electronica'] = config;
  }

  configDatosTomadorVisibility(){
    let data = this.allData;

    if(data['cod_iva'] === 'F'){


      this.formManager.disableGroupControls(
        this.formGroup, 
        this.formGroupConfig, 
        ['apellido', 'nombre', 'nro_documento'], 
        true);


      this.formManager.disableAndHideGroupControls(
        this.formGroup, 
        this.formGroupConfig, 
        ['razon_social', 'cuit'], 
        true);

     
        if(this.isEditable){

          this.formManager.disableAndHideGroupControls(
            this.formGroup, 
            this.formGroupConfig, 
            ['desc_sexo','desc_nacionalidad'] , 
            true);

          
        }else{
          
          this.formManager.disableAndHideGroupControls(
            this.formGroup, 
            this.formGroupConfig, 
            ['cod_sexo','cod_nacionalidad'] , 
            true);

         
        }
      
    }else {
      
      
      this.formManager.disableGroupControls(
        this.formGroup, 
        this.formGroupConfig, 
        ['razon_social', 'cuit'], 
        true);
      
      this.formManager.disableAndHideGroupControls(
        this.formGroup, 
        this.formGroupConfig, 
        ['nombre','apellido','nro_documento','cod_nacionalidad','desc_nacionalidad', 'cod_sexo', 'desc_sexo'] , 
        true);
      
    }


    if(data['cod_tipo_persona'] === 'F'){

      if(this.isEditable){
        this.formManager.disableGroupControls(
          this.formGroup, 
          this.formGroupConfig, 
          ['fec_nacimiento'], 
          false);
      }else{

        this.formManager.disableGroupControls(
          this.formGroup, 
          this.formGroupConfig, 
          ['fec_nacimiento'], 
          true);

      }


    }else{
      
      this.formManager.disableAndHideGroupControls(
        this.formGroup, 
        this.formGroupConfig, 
        ['fec_nacimiento'], 
        true);

    }
    
   

  }

  initGroupEmitir(){

    /***************************************+
     *    Provincia
     *****************************************/
    let provinciaControl = this.formGroup.get('cod_provincia')
    provinciaControl.valueChanges.subscribe( provincia => {

      if(!provinciaControl.valid && !provincia){
        

        let filtersConfig = { ...this.formGroupConfig['children']['cod_localidad'] };
        filtersConfig['control']['filters'] = {
          p_seccion: '14',
          p_provincia: ''
        };

        filtersConfig['disabled'] = true;
        
        if (this.formGroup.get('cod_postal').value){
          filtersConfig['control']['filters'].p_cod_postal = this.formGroup.get('cod_postal').value;
        }

        this.formGroupConfig['children']['cod_localidad'] = filtersConfig;
        this.formGroup.get('cod_localidad').disable();
        this.clearGroupControls(this.formGroup, ['cod_localidad', 'cod_postal']);
        
        //this.formManager.disableGroupControls(this.formGroup, this.formGroupConfig, ['cod_provincia'], true);

      }else if(provincia){

        let filtersConfig = { ...this.formGroupConfig['children']['cod_localidad'] };
        filtersConfig['control']['filters'] = {
          p_seccion: '14',
          p_provincia: provincia
        };

        filtersConfig['disabled'] = false;


        this.formGroupConfig['children']['cod_localidad'] = filtersConfig;
        this.formGroup.get('cod_localidad').enable();
        

        // se utiliza para limpiar localidad y provincia
        if(this.currentProv && provincia && this.currentProv !== provincia ){
          this.clearGroupControls(this.formGroup, ['cod_localidad', 'cod_postal']);
          this.currentProv = provincia;
        }
       
      }

    });
   
    let cod_postal =  this.formGroup.get('cod_postal');
    let localidad = this.formGroup.get('cod_localidad')
    localidad.valueChanges.subscribe( cod => {

      if(cod && localidad.valid && cod.cod_postal){
        
        cod_postal.setValue(cod.cod_postal);

      }

      if( (cod && !cod.cod_postal) || !cod ){
        this.clearGroupControls(this.formGroup, ['cod_postal']);
      }

     

    });
    
  }
  

  /*********************************************************************
   *                  Cotizar
   *********************************************************************/
  initGroupCotizar(){
    this.addCondicionFiscalLogic();
    this.addCuitLogic();
    this.initNumeroDocumentoLogic();
    this.initTipoPersonaLogic();
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
      this.clearGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia', 'razon_social']);
      this.disableGroupControls(this.formGroup,['nombre','apellido', 'cod_provincia', 'razon_social'], false);
      // limpiar cuit y dni
      this.clearGroupControls(this.formGroup, ['cuit', 'nro_documento']);

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
      this.clearGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia', 'razon_social']);
      this.disableGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia', 'razon_social'], false);

      
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
            provincia: item['cod_provincia'] || null,
            razonsocial: null
          }

          this.pasteDatosTomador(datos);
        }
        
        if(item['tipo_persona'] === 'J'){
          let datos: DatosTomador = {
            cod_asegurado: item['cod_asegurado'] || null,
            nombre: null,
            apellido: null,
            provincia: item['cod_provincia'] || null,
            razonsocial: item['ape_nom_rsoc']
          }

          this.pasteDatosTomador(datos);
        }


      }else{
        desc_tipo_persona.setValue('');
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
      this.clearGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia', 'razon_social']);
      this.disableGroupControls(this.formGroup, ['nombre','apellido', 'cod_provincia', 'razon_social'], false);

      if(item && documento.valid && item['nro_documento']){
        // console.log('nro documento', item);

        let datos : DatosTomador  = {
          cod_asegurado: item['cod_asegurado'] || null,
          nombre: item.nombre || null,
          apellido: item.apellido || null,
          provincia: item.cod_provincia || null,
          razonsocial: null
        }

        this.pasteDatosTomador(datos);

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

    if(datos.provincia){
      this.formGroup.get('cod_provincia').setValue(datos.provincia);
    }

    if(datos.razonsocial){
      this.formGroup.get('razon_social').setValue(datos.razonsocial);
    }

    this.disableGroupControls(this.formGroup, ['nombre','apellido','cod_provincia', 'razon_social'], true);

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
          this.formGroupConfig['children'][item]['disabled'] = value;
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
  
  getRawData(){
    return this.formGroup.getRawValue();
  }

}




