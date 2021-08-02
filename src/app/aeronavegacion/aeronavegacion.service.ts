import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/http/api.service';
import { of, forkJoin, Observable, throwError, combineLatest } from 'rxjs';

import { delay, retry, catchError, finalize, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CoberturasTableService } from '@core/services/components/coberturas-table.service';
import { CoberturasDataSet, Cobertura} from './row/cobertura-seleccionada/models/cobertura'

import { Cotizacion } from './models/cotizacion';
import { Riesgo } from './models/riesgo';
import { Propuesta } from './models/propuesta';
 
@Injectable({
  providedIn: 'root'
})
export class AeronavegacionService {

  retryRequestQty: number = 1;
  primaFiltes: object = {};
  defaultCoberturas: object[];
  coberturasDataSet: CoberturasDataSet;
  
  constructor(
    private apiService: ApiService, 
    private http: HttpClient, 
    private cookieService: CookieService,
    private coberturaTableService: CoberturasTableService) { }

  getCotizacion(id: string){
  
    return of({
      productor: 'Productor',
      tipo_doc: 'DNI',
      dni: '322121231231',
      tipo_persona: 'Persona Juridica',
      personeria: 'Banco',
      condicionIibb: 'Colegio Profesional'
    }).pipe( delay(1000) );
  }


  getCoberturaPrima(path, coberturaQuery: object): Observable<object> {
    const pageSize = coberturaQuery['p_regxpag'];
    // obtiene la session de la cookie
    coberturaQuery['p_o_sesion'] = this.cookieService.get('sid');

    if(!path){
        console.error('Path debe ser definido');
        return;
    }

    return this.http.post(this.apiService.getApiUrl() + path, coberturaQuery, this.apiService.getHttpOptions())
        .pipe(
            retry(this.retryRequestQty),
            catchError( err => {
                return throwError(err);
            }),
            finalize (
                () => {
                    // this.loaderService.hide();
                    // this.hideLoader();
                }
            ),
            map(
                response => { 
                    // console.log('post response', response);
                    if(!response['p_error']){

                        return response;
                        
                    }else{
                        console.error(`reponse api method post --> p_error = ${response['p_error']}`);
                        return null;
                    }
                    
                }
            ));
  }

  getCoberturas(coberturaFilters: object, primaFilters) {
    
    this.coberturaIsLoading(true);
    // ('inicializando coberturas');

    this.apiService.post('/listas/LIST_COBERTURAS',coberturaFilters).subscribe( (coberturas:any) => {
      // console.log('coberturas', coberturas);

      if(coberturas.length > 0){
        this.getAllPrimas(primaFilters, coberturas).subscribe( (primas:any) => {
          // console.log('primas', primas);
          const dataTable = this.genCoberturasDataTable(coberturas, primas);
          // agrega todos los datos de la tabla
          this.coberturaTableService.setCoberturas(dataTable);

          this.coberturaIsLoading(false);
          // guardo los filtros en el servicio
          this.savePrimaFilters(primaFilters);
        });
      }else{
        this.coberturaTableService.action( {
          action: 'clear'
        });
        this.coberturaIsLoading(false);
      }
        
    });
  }

  getAllPrimas(filters: object, coberturas: object[]): Observable<object>{
    // agrego todas las llamas al servicio
    let requestCob = []
    for(const cob of coberturas){

      if(cob['cod_cobert'] && this.filtersPrimaIsValid(filters)){
          let filtersData = filters;
          filtersData['p_cobertura'] = cob['cod_cobert'];
          requestCob.push(this.getCoberturaPrima('/cot_aero/PRIMA', filtersData));
      }
    }
    // todos los request
    return combineLatest(requestCob);
  }

  getPrima(filters){

    let primaFilters = this.getPrimaFilters();
    let mergedFilters = { ...primaFilters, ...filters};

    return this.getCoberturaPrima('/cot_aero/PRIMA', mergedFilters)
  }

  getPrimaPremio(cobs, filters){

    let requests = [];


    let primaFilters = this.getPrimaFilters();
    let mergedFilters = { ...primaFilters, ...filters};

    requests.push(this.getCoberturaPrima('/cot_aero/PRIMA', mergedFilters));
    requests.push(this.getAllPremioCoberturas(cobs,mergedFilters));

    return combineLatest(requests).pipe( map( (res: object[]) => {
      return { ...res[0], ...res[1][0] };
    }))
  }


  updateCoberturaRow(index){
    // despues pensar el update para que lo maneje el servicio
  }

  genCoberturasDataTable(coberturas: object[], primas: object[]){

    let coberturasData = [];

    for(let [index,cob] of coberturas.entries()){

      let obj = {
        selected: cob['obligatoria'] === 'S' ? true: false,
        required: cob['obligatoria'] === 'S' ? true: false,
        cod_cobert: cob['cod_cobertura'],
        descri: cob['descri'],
        suma_asegurada: primas[index]['p_suma_asegurada'],
        prima: primas[index]['p_prima'],
        tasa: primas[index]['p_tasa']
      };

      coberturasData.push(obj);

    }

    // console.log('coberturas tabla', coberturasData);
    return coberturasData;
  }

  filtersPrimaIsValid(filters: object): boolean {

    if( filters['p_producto'] && 
        // filters['p_cobertura'] && 
        filters['p_cod_aero'] && 
        filters['p_list_usos'] && 
        filters['p_plazas'] && 
        filters['p_moneda']){
          return true;
    }

    return false;

  }

  clearCoberturas(){
    this.coberturaTableService.action( {
      action: 'clear'
    });
  }

  coberturaIsLoading(loading: boolean){
    this.coberturaTableService.action( {
      action: 'loading',
      data: loading
    });
  }

  savePrimaFilters(filters){
    this.primaFiltes = filters;
  }

  getPrimaFilters(){
    return this.primaFiltes;
  }

  getPremio(filters){
    return this.apiService.post('/cot_aero/PREMIO',filters, false);
  }

  getAllPremioCoberturas(coberturas: object[], cobFilters: object){

    let baseFilters = {
      "p_producto": cobFilters['p_producto'],
      "p_cod_mon": cobFilters['p_moneda'],
      "p_forma_pago": cobFilters['p_forma_pago'],
      "p_plan_pago":  cobFilters['p_plan_pago'],
      "p_cod_jur":  cobFilters['p_cod_jur'],
      "p_cod_suc":  cobFilters['p_cod_suc'],
      "p_cond_iva":  cobFilters['p_cod_iva'],
      "p_cod_prod":  cobFilters['p_cod_prod'],
      "p_pct_comis": cobFilters['p_pct_comis'],
      "p_cod_asegurado":  cobFilters['p_cod_asegurado'],
      "p_cod_docum":cobFilters['p_tipo_doc'],
      "p_documento": cobFilters['p_documento']
    }


    let req = [];
    for(const cob of coberturas){

      if(cob){
          let itemFilter = {
            "p_cod_cobertura": cob['cod_cobertura'],
            "p_prima": cob['imp_prima'],
            "p_suma_asegurada": cob['imp_suma_asegurada'],
          };

          let filtersData =  { ...baseFilters, ...itemFilter };
          req.push(this.getPremio(filtersData));
      }
    }
    // todos los request
    return combineLatest(req)/*.pipe( map( res => {
      let premioTotal = 0;
      for(let r of res){
        if(r && r['p_premio']){
          premioTotal = premioTotal + r['p_premio'];
        }

      }
      return { premio: premioTotal };
    }));*/

  }

  getPremioFilters(cobFilters){
    let baseFilters = {
      "p_producto": cobFilters['p_producto'],
      "p_cod_mon": cobFilters['p_moneda'],
      "p_forma_pago":"T",
      "p_plan_pago":12,
      "p_cod_jur":1,
      "p_cod_suc":0,
      "p_cond_iva":"S",
      "p_cod_prod":9083,
      "p_pct_comis":1,
      // "p_cod_asegurado":"",
      "p_cod_docum":88,
      "p_documento":"20259109141"
    }



  }

  getDummyCotizacion(){
    return {
      /*
       datos_productor
      
       "p_cod_prod":9083, // codpas
       "p_cod_jur":1, // cod_jur
       "p_cod_postal":7130, 
       "p_sub_cod_postal":0,
     */
     /*
       cond_fiscal_tomador
      
       "p_apellido":"URIBARRI", // apellido
       "p_nombre":"SERGIO", // nombre
       "p_cod_doc":"1", // 
       "p_documento":"25910914", // nro_documento
       "p_cod_asegu":null, // cod_asegurado
       "p_cod_iva":"F", // cod_iva
       */
       /*
         forma_pago
       
       "p_cod_mon":1, // moneda
       "p_cod_plan":12, // cantidad_cuotas
       "p_forma_pago":"T", // forma_pago
       "p_cod_suc":0, // cod_suc
       */
       // condiciones_comerciales
       "p_pct_comision":0, // porcentaje_comision

       "p_fec_cotizacion":null, 
       "p_solicitud":null,
       "p_o_cotizacion_version":0,
       "p_dias":10, 
       "p_emitir_certificado":"S",
       "p_detalle_rgo_cob": [],
       "p_list_aero": [
           {
             "nro_rie":1, 
             "cod_riesgo":1,
             "cod_marca":2, 
             "cod_modelo":2, 
             "anio":1976, 
             "suma_asegurada":10000000, 
             "matricula":"ASD-FRT34", 
             "nro_serie":"234234134234", 
             "producto":"1053", 
             "plazas":144, 
             "peso_maximo_des":5000, 
             "zona":1, 
             "list_cob": [
               {
                 "n_secuencia":1, 
                 "cod_cobert":983, 
                 "tiene_adicionales":"N", 
                 "prima":54212, 
                 "premio":75000, 
                 "contado":75000, 
                 "en_cuotas":0, 
                 "x_en_cuotas":"N", 
                 "tarifa":0
               }
             ]
           }
         ]
        }
  }

  saveCotizacion(formData: object){

    // hacer 

    let datosTomador = formData;
 
    // si es un asegurado guardado
    if(formData['nro_documento'] && !formData['nro_documento'].value){
      datosTomador = formData['nro_documento'];
    }else if(formData['cuit'] && !formData['cuit'].value){
      datosTomador = formData['cuit'];
    }
    
    
    // si es un asegurado nuevo
    if(formData['nro_documento'] && formData['nro_documento'].value){
      datosTomador = { 
        ...formData, 
        ...{ 
          nro_documento: formData['nro_documento'].value
        }};
    }else if(formData['cuit'] && formData['cuit'].value){
      datosTomador = { ...formData, ...{ nro_cuit: formData['cuit'].value}}
    }

    let cotizacion = new Cotizacion(formData['cod_productor'], datosTomador, formData);
    let riesgo = new Riesgo({ ...formData, ...formData['cod_producto'] }, formData['cobertura']);


    let riesgodummy = {
      "nro_rie":1, 
      "cod_riesgo":1,
      "cod_marca":2, 
      "cod_modelo":2, 
      "anio":1976, 
      "suma_asegurada":10000000, 
      "matricula":"ASD-FRT34", 
      "nro_serie":"234234134234", 
      "producto":"1053", 
      "plazas":144, 
      "peso_maximo_des":5000, 
      "zona":1, 
      "list_cob": [
        {
          "n_secuencia":1, 
          "cod_cobert":983, 
          "tiene_adicionales":"N", 
          "prima":54212, 
          "premio":75000, 
          "contado":75000, 
          "en_cuotas":0, 
          "x_en_cuotas":"N", 
          "tarifa":0
        }
      ]
    }
        
      
    
    let cob = {
      "n_secuencia":1, 
      "cod_cobert":983, 
      "tiene_adicionales":"N", 
      "prima":54212, 
      "premio":75000, 
      "contado":75000, 
      "en_cuotas":0, 
      "x_en_cuotas":"N", 
      "tarifa":0
    }

    let base = {
      "p_pct_comision":0, // porcentaje_comision
      "p_fec_cotizacion":null, 
      "p_solicitud":null,
      "p_o_cotizacion_version":0,
      "p_dias":10, 
      "p_emitir_certificado":"S",
      "p_detalle_rgo_cob": [],
      "p_list_aero": riesgodummy
    };
      
      
      
  

    let data = { ...cotizacion };
    data['p_list_aero'] = [ { ...riesgo }];
    // data['p_list_aero'][0]['list_cob'] = { ...riesgo['list_cob'] };
    
    let cotizacionData = { ...this.getDummyCotizacion(), ...cotizacion };

    // console.log('data', formData, data, cotizacionData);
    console.log('Cotizacion DATA --->', data);

    return this.apiService.post('/cot_aero/GUARDAR_COTIZACION', data, false);

    
  }

  getTomador(){
    
  }

  generarPropuesta(data: object){
    // console.log('emitir data', data);
    let emision = new Propuesta(data);

    let filters = emision;
    filters['p_emitir'] = 'S';

    console.log('Propuesta DATA ---->', filters);
    return this.apiService.post('/cot_aero/GUARDAR_PROPUESTA',filters,false);
  }

  guardarPropuesta(data){
    console.log("mi data", data)
    let emision = new Propuesta(data);

    let filters = emision;
    filters['p_emitir'] = 'N';

    console.log('Propuesta DATA ---->', filters);
    return this.apiService.post('/cot_aero/GUARDAR_PROPUESTA',filters,false);
  }

  getAllCoberturasPrima(filters, defaultData?: object[]){
    this.coberturaIsLoading(true);
    // console.log('inicializando coberturas');
    this.defaultCoberturas = defaultData;

    this.apiService.post('/cot_aero/PRIMA_COBERTURA',filters).subscribe( (res:any) => {
      // console.log('coberturas', coberturas);
      const coberturas = res['result'] || [];

      if(coberturas.length > 0){

        // this.coberturaTableService.loadingPremio(true);
        this.getAllPremioCoberturas(coberturas, filters).subscribe( (res: object[]) => {
          // console.log('premio', res);
          //this.coberturaTableService.setPremio( res || []);

          let coberturasPremio = this.mergeCoberturaPremio(coberturas,res);

          const dataTable = this.initCoberturasData(coberturasPremio, this.defaultCoberturas);
          this.coberturaTableService.setCoberturas(dataTable);
          this.defaultCoberturas = null;
          
          this.coberturaIsLoading(false);
          //this.coberturaTableService.loadingPremio(false);
        });

        
        // guardo los filtros en el servicio
        this.savePrimaFilters(filters);

      }else{
        this.coberturaTableService.action( {
          action: 'clear'
        });
        this.coberturaIsLoading(false);
      }
        
    });
  }

  mergeCoberturaPremio(coberturas: object[], premios: object[]){
    let allData = [];
    for(let i = 0; i < coberturas.length; i ++ ){

      let item = { ...coberturas[i], ...premios[i] };
      allData.push(item);
    }
    
    return allData;
  }


  initCoberturasData(coberturas, defaultData?: object[] ){
    let coberturasData = [];


    for(let [index,cob] of coberturas.entries()){

      // si tiene datos default, pega los datos en las coberturas que vienen del servicio.
      // los une.
      if(defaultData){
        
        let defaultCob = defaultData.filter( item => { 
          return item['cod_cobertura'].toString() === cob['cod_cobertura']; 
        })[0];


        if(defaultCob){
          cob['obligatoria'] = 'S';
          cob['imp_suma_asegurada'] = defaultCob['imp_suma_asegurada'];
          cob['imp_prima'] = defaultCob['imp_prima'];
          cob['porc_tasa'] = defaultCob['porc_tasa'];
          cob['p_premio'] = defaultCob['imp_premio'];
        }

        console.log('default cobertura', defaultCob);
      }

      let obj = {
        selected: cob['obligatoria'] === 'S' ? true: false,
        required: cob['obligatoria'] === 'S' ? true: false,
        cod_cobertura: cob['cod_cobertura'],
        desc_cobertura: cob['desc_cobertura'],
        imp_suma_asegurada: cob['imp_suma_asegurada'],
        imp_prima: cob['imp_prima'],
        porc_tasa: cob['porc_tasa'],
        imp_premio: cob['p_premio']
      };

      coberturasData.push(obj);

    }

    if(defaultData){

    }
    // console.log('coberturas tabla', coberturasData);
    return coberturasData;
  }

  

  getDatosTomador(id: string){
    return this.apiService.post('/listas/LIST_ASEGURADO', {
      p_cod_asegurado: id
    }).pipe( 
      map( (res: object[]) => {
        if(res.length > 0){
          return res[0];
        }else{
          return {};
        }
      }
    ));
  }

  getActividades(){
    return this.apiService.post('/listas/LIST_ACTIVIDADES', {}, false);

  }

  getSexos(){
    return this.apiService.post('/listas/LIST_SEXOS', {}, false);

  }
  getNacionalidades(){
    return this.apiService.post('/listas/LIST_NACIONALIDADES', {}, false);

  }

  getProvincias(){
    return this.apiService.post('/listas/LIST_PROVINCIAS', {}, false);

  }

  getMediosDePagos(cod){
    let filters = {
      p_producto : cod
    }
    return this.apiService.post('/listas/LIST_MEDIOS_PAGO', filters, false);

  }

  getProductor(cod){
    let filters = {
      p_filtro : cod
    }
    return this.apiService.post('/listas/LIST_PAS', filters, false);

  }

  getLocalidades(provincia){

    let filters ={
      p_buscar: "",
      p_filtro:"",
      p_limite: 10000,
      p_nropag: 0,
      p_provincia: provincia,
      p_regxpag:10,
      p_seccion:"14"

    }
    return this.apiService.post('/listas/LIST_LOCALIDADES_CP', filters, false);

  }
}
