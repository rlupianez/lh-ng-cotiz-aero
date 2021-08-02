import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { 
  TipoRiesgoFields, 
  TipoRiesgoGroup, 
  DatosRiesgoGroup,
  DatosRiesgoFields,
  tipoRiesgoGroupEmitir,
  tipoRiesgofieldsEmitir,
  datosRiesgosFieldsEmitir,
  datosRiesgosGroupEmitir } from './riesgos';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { ApiService } from '@core/services/http/api.service';
import { map } from 'rxjs/operators';

export type FormsConfig = {
  formGroup: FormGroup,
  formGroupConfig: object,
  active: boolean
}

@Injectable({
  providedIn: 'root'
})



export class RiesgosService {

  editable: boolean = true;
  clearAtInit: boolean = true;
  defaultData: object = null;
  isInitialized: boolean = false;
  timeoutId: any = null;
  itemsToAdd: any = [];
  // TIPO DE RIESGO
  tipoRiesgo: FormsConfig = {
    formGroup: null,
    formGroupConfig: null,
    active: false
  };
  // DATOS DE RIESGO
  datosRiesgo: FormsConfig = {
    formGroup: null,
    formGroupConfig: null,
    active: false
  };
  /////////////////////////////////
  modeloData: object;

  status: 'Cotizar' | 'Emitir' = 'Emitir';
  


  constructor(
    private formService: FormsFactoryService, private formManager: FormsManagerService, private apiService: ApiService
    ) {
      //this.initializeForms();

  }

  get flota(){
    return this.tipoRiesgo.formGroup.get('es_flota').value;
  }

  get tipoRiesgoValid(){
    return this.flota !== "";
  }

  get datosRiesgoValid(){
    return this.datosRiesgo.formGroup.valid && this.datosRiesgo.formGroup.touched;
  }

  initPanel(editable: boolean, defaultData?: object){
    if(defaultData){
      this.defaultData = defaultData
    }else{
      this.isInitialized = true;
    }

    this.editable = editable;
    this.initializeForms();
  }

  initializeForms(){

    let tipoRFields;
    let tipoRGroup;

    let datosRFields;
    let datoRGroup;

    if(!this.editable){

      tipoRFields = tipoRiesgofieldsEmitir;
      tipoRGroup = tipoRiesgoGroupEmitir;
  
      datosRFields = datosRiesgosFieldsEmitir;
      datoRGroup = datosRiesgosGroupEmitir;

    }else { 
      tipoRFields = TipoRiesgoFields;
      tipoRGroup = TipoRiesgoGroup;
  
      datosRFields = DatosRiesgoFields;
      datoRGroup = DatosRiesgoGroup;
    }

    this.tipoRiesgo = {
      formGroup: this.formService.createForm({ ...tipoRFields}, this.defaultData),
      formGroupConfig: { ...tipoRGroup },
      active: false
    }


    this.datosRiesgo = {
      formGroup: this.formService.createForm({ ...datosRFields }, this.defaultData),
      formGroupConfig: { ...datoRGroup },
      active: false
    }

    if(this.editable){
      // this.initTipoRiesgoGroup();
      
        this.initTipoRiesgoGroup();
        this.configDatosRiesgo(false);

    }else{
      this.disableGroupDatosRiesgo();
      this.disableGroupTipoRiesgo();
    }
    
    
  }

  setStatus(status){
    this.status = status;
    //this.initializeForms(); 
    if(this.status === 'Emitir'){
        
    }
  }

  setValue(data){
    // Flag para saber si se deben limpiar los valores o no
    // setear experimental
    this.defaultData = data;
    
    if(data['experimental']){
      data['experimental'] =  data['experimental'] === 'N' ? false : true;
    }

    if(!this.editable){
      this.datosRiesgo.formGroup.patchValue(data);
    }else{

      const fields = ['cod_tipo_aeronave','cod_marca', 'cod_modelo', 'anio', 'matricula' , /*'cant_plazas', 'peso_max_des'*/];
    
      for(let field of fields){
        this.setValueToControlById(field, data[field]);
      }
  
  
      setTimeout( ( ) => {
        const fields = ['cant_plazas', 'peso_max_des'];
      
        for(let field of fields){
          this.setValueToControlById(field, data[field]);
        }
      }, 3000)
  
    }
    


   
    this.datosRiesgo.formGroup.markAllAsTouched();


    setTimeout( ( ) => {
      this.isInitialized = true;
    }, 12000)
  }

  setValueToControlById(id: string, value){
    let control = this.datosRiesgo.formGroup.get(id);
    if(control){
      control.patchValue(value);
    }
  }

  
  initTipoRiesgoGroup(){
    /*this.tipoRiesgo.formGroup.valueChanges.subscribe( value => {
      console.log('change tipo de riesgo', value);
    });*/
  }

  initDatosRiesgoGroup(){
    this.datosRiesgo.formGroup.valueChanges.subscribe( value => {
      console.log('change datos de riesgo', value);
    });
  }

  getRiesgos(cotizacion, propuesta){
    return this.apiService.post('/listados/LIST_RIE_PROP', {
      p_o_cotizacion: cotizacion,
      p_o_propuesta: propuesta,
      p_cod_sec: 14
    },false)
      .pipe( map ( 
        res => {
          if(res['p_lista_rie_prop'] && res['p_lista_rie_prop'].length > 0){
            return res['p_lista_rie_prop'].pop();
          }

          return null;
        }
        
      ));
  }

  disableGroupTipoRiesgo(){
    this.formManager.disableGroupControls(this.tipoRiesgo.formGroup, this.tipoRiesgo.formGroupConfig, Object.keys(this.tipoRiesgo.formGroupConfig['children']), true);
  }

  disableGroupDatosRiesgo(){
    this.formManager.disableGroupControls(this.datosRiesgo.formGroup, this.datosRiesgo.formGroupConfig, Object.keys(this.datosRiesgo.formGroupConfig['children']), true);
  }

  addRangosSumaAsegurada(min, max){
    this.datosRiesgo.formGroup.get('suma_asegudada_por_asiento').setValidators([Validators.required, Validators.max(max), Validators.min(min)]);
  }

   /////////////////////////////////////////////////////////////////////////////////////
  //
  //                        DATOS RIESGO (FLOTA Y NO FLOTA)
  //
  /////////////////////////////////////////////////////////////////////////////////////


  private configDatosRiesgo(flota: boolean){

    // por defecto no es flota
    let riesgo = this.getRiesgoControls(flota);
    let filtersConfigMarca = { ...this.datosRiesgo.formGroupConfig['children']['cod_marca'] };

    // si es flota selecciona los formcontrol del dialog
    /*if(flota){
      riesgo = this.datosRiesgo.formGroup.get('datos_riesgo').get('riesgos');
      filtersConfigMarca = { ...this.datosRiesgo.formGroupConfig['datos_riesgo']['children']['riesgos']['control']['items']['riesgo']['marca'] };
    }*/

    // Marca y Año
    let cotizar_anio = riesgo.get('anio');
    let cotizar_plazas_exp = riesgo.get('cant_plazas_exp');
    let cotizar_marca = riesgo.get('cod_marca');
    // Experimental
    let cotizar_experimental = riesgo.get('experimental');
    // Tipo AeroNave
    let cotizar_aeronave = riesgo.get('cod_tipo_aeronave');
    // matricula
    let cotizar_matricula = riesgo.get('matricula');
    // riesgo
    let cotizar_riesgo = riesgo.get('riesgo');

    let pasajeros = riesgo.get('pasajeros');
    let tripulantes = riesgo.get('tripulantes');



    // Campos a pegar cuando se seleccione una marca-modelo
    let cot_cant_plazas = riesgo.get('cant_plazas');
    let cot_peso_max_des = riesgo.get('peso_max_des');
    let cot_cod_modelo = riesgo.get('cod_modelo');
    let cot_cod_marca = riesgo.get('cod_marca');


    ///////////////////////////////////////////
    //          EXPERIMENTAL
    //////////////////////////////////////////

    cotizar_experimental.valueChanges.subscribe( experimental => {
      
      this.setMarcaFilters(flota, filtersConfigMarca);
      this.showDatosRiesgo(experimental);
     
      // ES EXPERIMENTAL
      if(cotizar_aeronave.valid){

        this.setMatriculaExperimental(cotizar_aeronave.value, flota);
      }else{
        // NO ES EXPERIMENTAL
        cotizar_matricula.setValue('');
      }

      
    
    });

    ///////////////////////////////////////////
    //          TIPO AERONAVE
    //////////////////////////////////////////

    cotizar_aeronave.valueChanges.subscribe( value => {
      
      //this.setMarcaFilters(flota, filtersConfigMarca);
      // si cambia tipo de aeronave, limpio todo
      if(this.isInitialized){
        this.clearDatosRiesgo(flota, ['cod_marca','marca_experimental','cod_modelo', 'desc_modelo', 'anio', 'cant_plazas', 'peso_max_des']);
      }
      
      this.showDatosRiesgo(cotizar_experimental.value);
      this.setMarcaFilters(flota, this.datosRiesgo.formGroupConfig['children']['cod_marca'])

      if(cotizar_experimental.value && cotizar_aeronave.valid){
        this.setMatriculaExperimental(cotizar_aeronave.value, flota);
        cotizar_marca.enable();
      }else{
        cotizar_marca.disable();
      }
    
    });

    
    ///////////////////////////////////////////
    //          MARCA
    //////////////////////////////////////////

    cotizar_marca.valueChanges.subscribe( modelo => {

      if(this.isInitialized){
        this.clearDatosRiesgo(flota, ['cod_modelo', 'desc_modelo', 'anio', 'cant_plazas', 'peso_max_des']);
      }
      this.showDatosRiesgo(cotizar_experimental.value);
      if(cotizar_marca.valid){
        this.setModeloFilters(flota, { ...this.datosRiesgo.formGroupConfig['children']['cod_modelo'] });
      }else{
        
      }
    });
    

     ///////////////////////////////////////////
    //          MODELO
    //////////////////////////////////////////

    cot_cod_modelo.valueChanges.subscribe( value => {
      
      
      // si cambia tipo de aeronave, limpio todo
      if(this.isInitialized){
        this.clearDatosRiesgo(flota, ['anio', 'cant_plazas', 'peso_max_des']);
      }
      this.showDatosRiesgo(cotizar_experimental.value);

      if(cotizar_aeronave.valid && cot_cod_modelo.valid && cotizar_marca.valid){
        this.setAnioFilters(flota, {...this.datosRiesgo.formGroupConfig['children']['anio']});
        // this.setMatriculaExperimental(cotizar_aeronave.value, flota);
      }
    
    });


     ///////////////////////////////////////////
    //          AÑO
    //////////////////////////////////////////

   cotizar_anio.valueChanges.subscribe( anio => {

    if(this.isInitialized){
      this.clearDatosRiesgo(flota, ['cant_plazas', 'peso_max_des']);
    }
    this.showDatosRiesgo(cotizar_experimental.value);


    if(cotizar_anio.valid){
      let modeloData = this.getModeloData(anio);

      if(modeloData){
        this.modeloData = modeloData;
        console.log("modelo", modeloData)
        cot_cant_plazas.setValue(modeloData['cant_plazas']);
        cot_peso_max_des.setValue(modeloData['peso_max_des_kg']);

        let configPasajeros = this.datosRiesgo.formGroupConfig['children']["pasajeros"];
        let configTripulantes = this.datosRiesgo.formGroupConfig['children']["tripulantes"];
        configPasajeros.disabled = false;
        configTripulantes.disabled = false;

        this.datosRiesgo.formGroupConfig['children']['pasajeros'] = { ...configPasajeros };
        this.datosRiesgo.formGroupConfig['children']['tripulantes'] = { ...configTripulantes };
        pasajeros.enable();
        tripulantes.enable();

        pasajeros.setValidators([Validators.required, Validators.max(modeloData['cant_plazas']), Validators.min(0)]);
        tripulantes.setValidators([Validators.required, Validators.max(modeloData['cant_plazas'] ), Validators.min(0)]);
        
        let configMatricula = this.datosRiesgo.formGroupConfig['children']["matricula"];
        configMatricula.control.config.formato = modeloData['formato_matricula'];
        this.datosRiesgo.formGroupConfig['children']['matricula'] = { ...configMatricula };

      }else{
        this.modeloData = modeloData;
      }
    }else{
      this.modeloData = null;
      cot_cant_plazas.setValue('');
      cot_peso_max_des.setValue('');
      cot_cant_plazas.disable();
      cot_peso_max_des.disable();
    }
      //this.setMarcaFilters(flota, filtersConfigMarca);
      //this.showDatosRiesgo(cotizar_experimental.value);
  });

}


  setAnioFilters(flota, filtersConfigAnio){
    let riesgo = this.getRiesgoControls(flota);
    // obtiene los form control para llenar los campos de lo filtros
    // MarcaAño
    //let cotizar_anio = riesgo.get('anio');
    // Experimental
    let cotizar_experimental = riesgo.get('experimental');
    // Tipo AeroNave
    let cotizar_aeronave = riesgo.get('cod_tipo_aeronave');
    // Marca
    let cotizar_marca = this.getMarcaControl(cotizar_experimental.value, flota);

    let cotizar_modelo = riesgo.get('cod_modelo');

    let cotizar_anio = riesgo.get('anio');


    if( cotizar_aeronave.valid && 
        cotizar_experimental.value === false && cotizar_marca.valid && 
        cotizar_modelo.valid){
      //console.log('anio', anio);
      //if(cotizar_anio){

        filtersConfigAnio['control']['filters'] = this.getAnioFilters(flota);
        filtersConfigAnio['disabled'] = false;

        // ver como hacerlo fuera sin el if
        /*if(flota){
          this.datosRiesgo.formGroupConfig['datos_riesgo']['children']['riesgos']['control']['items']['riesgo']['marca'] = filtersConfigMarca;
        }else{*/
          this.datosRiesgo.formGroupConfig['children']['anio'] = { ...filtersConfigAnio };
        //}
        
        cotizar_anio.enable();
      //}
    }else{
      cotizar_anio.setValue('');
      cotizar_anio.disable();
    }

  
  }

  setModeloFilters(flota, filtersConfigModelo){
    let riesgo = this.getRiesgoControls(flota);
    // obtiene los form control para llenar los campos de lo filtros
    // MarcaAño
    //let cotizar_anio = riesgo.get('anio');
    // Experimental
    let cotizar_experimental = riesgo.get('experimental');
    // Tipo AeroNave
    let cotizar_aeronave = riesgo.get('cod_tipo_aeronave');
    // Marca
    let cotizar_marca = this.getMarcaControl(cotizar_experimental.value, flota);

    let cotizar_modelo = riesgo.get('cod_modelo');


    if(cotizar_aeronave.valid && cotizar_experimental.value === false && cotizar_marca.valid){
      //console.log('anio', anio);
      //if(cotizar_anio){

        filtersConfigModelo['control']['filters'] = this.getModeloFilters(flota);
        filtersConfigModelo['disabled'] = false;

        // ver como hacerlo fuera sin el if
        /*if(flota){
          this.datosRiesgo.formGroupConfig['datos_riesgo']['children']['riesgos']['control']['items']['riesgo']['marca'] = filtersConfigMarca;
        }else{*/
          this.datosRiesgo.formGroupConfig['children']['cod_modelo'] = { ...filtersConfigModelo };
        //}
        
        cotizar_modelo.enable();
      //}
    }else{
      cotizar_modelo.setValue('');
      cotizar_modelo.disable();
    }

  
  }

  getAnioFilters(flota){
    let riesgo = this.datosRiesgo.formGroup
    if(flota){
      // falta flota
    }

    // Año
    let cotizar_marca = riesgo.get('cod_marca');
    // Experimental
    let cotizar_experimental = riesgo.get('experimental');
    // Tipo AeroNave
    let cotizar_aeronave = riesgo.get('cod_tipo_aeronave');

    let cotizar_modelo = riesgo.get('cod_modelo');


    return {
      p_marca: cotizar_marca.value || '',
      p_modelo: cotizar_modelo.value || '',
      p_experimental: cotizar_experimental.value ? 'S' : 'N',
      p_tipo_aeronave: cotizar_aeronave.value || ''
    }
  }

  private getModeloFilters(flota: boolean){
    let riesgo = this.datosRiesgo.formGroup
    if(flota){
      // falta flota
    }

    // Año
    let cotizar_marca = riesgo.get('cod_marca');
    // Experimental
    let cotizar_experimental = riesgo.get('experimental');
    // Tipo AeroNave
    let cotizar_aeronave = riesgo.get('cod_tipo_aeronave');


    return {
      p_marca: cotizar_marca.value || '',
      p_experimental: cotizar_experimental.value ? 'S' : 'N',
      p_tipo_aeronave: cotizar_aeronave.value || ''
    }

  }

  private getModeloData(anio){

    const options = this.formManager.getFieldOptions(this.datosRiesgo.formGroupConfig, 'anio');

    if(options && options.length > 0){
      // console.log('options marca', options);
      let modelo = options.filter( item => {
        return item['anio'] === anio;
      });

      if(modelo && modelo.length > 0){
        return modelo[0];
      }

    }

    return null;
  }


  

  /**
   * 
   *  Setea los filtros en las opciones json de la marca, para poner obtener el listado de marcas
   * 
   * @param flota 
   * @param filtersConfigMarca 
   */
  private setMarcaFilters(flota, filtersConfigMarca){
    let riesgo = this.getRiesgoControls(flota);
    // obtiene los form control para llenar los campos de lo filtros
    // MarcaAño
    //let cotizar_anio = riesgo.get('anio');
    // Experimental
    let cotizar_experimental = riesgo.get('experimental');
    // Tipo AeroNave
    let cotizar_aeronave = riesgo.get('cod_tipo_aeronave');
    // Marca
    let cotizar_marca = this.getMarcaControl(cotizar_experimental.value, flota);

    if(cotizar_aeronave.valid && cotizar_experimental.value === false){
      //console.log('anio', anio);
      //if(cotizar_anio){

        filtersConfigMarca['control']['filters'] = this.getMarcaFilters(flota);
        filtersConfigMarca['disabled'] = false;

        // ver como hacerlo fuera sin el if
        /*if(flota){
          this.datosRiesgo.formGroupConfig['datos_riesgo']['children']['riesgos']['control']['items']['riesgo']['marca'] = filtersConfigMarca;
        }else{*/
          this.datosRiesgo.formGroupConfig['children']['cod_marca'] = { ...filtersConfigMarca };
        //}
        cotizar_marca.enable();
      //}
    }else{
      cotizar_marca.setValue('');
      cotizar_marca.disable();
    }

  }


  /**
   * 
   *  Obtiene los datos de los filtros para utilizarlo en el input marca
   * 
   */
  private getMarcaFilters(flota: boolean){
    let riesgo = this.datosRiesgo.formGroup
    if(flota){
      // falta flota
    }

    // Experimental
    let cotizar_experimental = riesgo.get('experimental');
    // Tipo AeroNave
    let cotizar_aeronave = riesgo.get('cod_tipo_aeronave');


    return {
      p_experimental: cotizar_experimental.value ? 'S' : 'N',
      p_tipo_aeronave: cotizar_aeronave.value || ''
    }

  }


  private marcaIsValid(experimental, flota){
    let riesgo = this.getRiesgoControls(flota);

    if(experimental){
      return riesgo.get('marca_experimental').valid;
    }else{
      return riesgo.get('cod_marca').valid;
    }
  }

  private getMarcaValue(experimental, flota){
    let riesgo = this.getRiesgoControls(flota);
    
    if(experimental){
      return riesgo.get('marca_experimental').value;
    }else{
      return riesgo.get('cod_marca').value;
    }
  }

  private getMarcaControl(experimental, flota){
    let riesgo = this.getRiesgoControls(flota);
    
    if(experimental){
      return riesgo.get('marca_experimental');
    }else{
      return riesgo.get('cod_marca');
    }
  }

  private clearDatosRiesgo(flota, fields){

    let riesgo = this.getRiesgoControls(flota);

    //riesgo.get('marca').setValue('');

    for(let field of fields){
      if(riesgo.get(field)){
        riesgo.get(field).setValue('');
        riesgo.get(field).disable();
      }else{
        console.log(`field ${field} no existe`);
      }
    }

  }

  mostrarCamposExperimental(mostrar: boolean){

    if(mostrar){
      this.formManager.hideSectionControls(this.datosRiesgo.formGroupConfig, ['cod_marca','cod_modelo','anio', 'anio_experimental','cant_plazas','peso_max_des'], true);
      this.formManager.hideSectionControls(this.datosRiesgo.formGroupConfig, ['marca_exp','anio_exp','modelo_exp','cant_plazas_exp','peso_max_des_exp'], false);
      this.formManager.disableGroupControls(this.datosRiesgo.formGroup, this.datosRiesgo.formGroupConfig, ['marca_exp','anio_exp','modelo_exp','cant_plazas_exp','peso_max_des_exp'], false);
    }else{
      this.formManager.hideSectionControls(this.datosRiesgo.formGroupConfig,['marca_exp','anio_exp','modelo_exp','cant_plazas_exp','peso_max_des_exp'], true);
      this.formManager.hideSectionControls(this.datosRiesgo.formGroupConfig, ['cod_marca','cod_modelo','anio','cant_plazas','peso_max_des'], false);
      this.formManager.disableGroupControls(this.datosRiesgo.formGroup, this.datosRiesgo.formGroupConfig, ['marca_exp','anio_exp','modelo_exp','cant_plazas_exp','peso_max_des_exp'], true);
    }

    console.log("formGrouop", this.datosRiesgo.formGroup)
    console.log("formGrouopConfig", this.datosRiesgo.formGroupConfig)
  }

  showDatosRiesgo(experimental){
    
  }

  /*
  showDatosRiesgo(form: FormGroup, config: object, experimental: boolean){
    if(experimental){
      // se carga modelo marca etc de forma manual
      this.hideSectionControls(config, 'no_es_flota', ['marca_experimental'], false);
      this.hideSectionControls(config, 'no_es_flota', ['marca'], true);

      this.disableSectionControls(form, 'no_es_flota', ['marca_experimental','desc_modelo','cant_plazas','peso_max_des'], false);
    }else{
       // se carga modelo marca etc de forma manual
       this.hideSectionControls(config, 'no_es_flota', ['marca_experimental'], true);
       this.hideSectionControls(config, 'no_es_flota', ['marca'], false);

       this.disableSectionControls(form, 'no_es_flota', ['desc_modelo','cant_plazas','peso_max_des'], true); 
    }
  }*/

  /**
   *  
   *  Obtiene los form controls de riesgo si es flota o no
   * 
   */

  private getRiesgoControls(flota){
   return this.datosRiesgo.formGroup;

  }

  //////////////////////////////////////////////////////////////
  //        MATRICULA
  //////////////////////////////////////////////////////////////

  private getMatriculaExperimental(tipoAeronave: string){
    if(tipoAeronave === "1" || tipoAeronave === "2"){
      return {
        prefix: 'NV-X',
        length: 3
      }
    }

    if(tipoAeronave === "3"){
      return {
        prefix: 'VNT-',
        length: 4
      }
    }

    return false;
  }

  private setMatriculaExperimental(tipoAeronave, flota){
    let riesgo = this.getRiesgoControls(flota);
    let matricula = riesgo.get('matricula');

    let matriculaConfig = this.getMatriculaExperimental(tipoAeronave);

    if(matriculaConfig){
      matricula.setValue(matriculaConfig.prefix);
    }else{
      matricula.setValue('');
    }

  }

  getRawData(){
    return { ...this.datosRiesgo.formGroup.getRawValue(),
      ...this.tipoRiesgo.formGroup.getRawValue() }
  }

  setTipoAeronave(datos: any){
    console.log(datos);
    if(datos){      
            
      let filtersMedioPago = { ...this.datosRiesgo.formGroupConfig['children']['cod_tipo_aeronave'] };
      filtersMedioPago['control']['filters'] = {
        p_producto: datos["cod_producto"],
        p_riesgo: datos["cod_riesgo"]        
      };
      
      this.datosRiesgo.formGroupConfig['children']['cod_tipo_aeronave'] = filtersMedioPago;

    }
  }


}
