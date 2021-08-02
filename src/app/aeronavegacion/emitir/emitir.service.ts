import { Injectable, OnDestroy } from '@angular/core';
import { DatosProductorService } from '../models/panels/datos-productor.service';
import { VigenciaService } from '../models/panels/vigencia.service';
// import { DatosTomadorService } from '../../models/panels/datos-tomador.service';
import { RiesgosService } from '../models/panels/riesgos.service';
import { ProductosService } from '../models/panels/productos.service';
import { UsosService } from '../models/panels/usos.service';
import { CoberturasService } from '../models/panels/coberturas.service';
import { ApiService } from '@core/services/http/api.service';

import { DatosTomadorEmitirService } from '../models/panels/emitir/datos-tomador-emitir.service';
import { CondicionesComercialesEmitirService } from '../models/panels/emitir/condiciones-comerciales-emitir.service';


import { retry, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EmitirService  implements OnDestroy {

  seccion: 'Cotizar' | 'Emitir' = 'Emitir';
  allData: object;

constructor( 
  public apiService: ApiService,
  public datosProductorService: DatosProductorService,
  public vigenciaService: VigenciaService,
  public datosTomadorEmitirService: DatosTomadorEmitirService,
  public condicionesComercialesEmitirService: CondicionesComercialesEmitirService,
  public riesgosService: RiesgosService,
  public productosService: ProductosService,
  public usosService: UsosService,
  public coberturasService: CoberturasService) { }

  
  ngOnDestroy(){
    console.log('service emitir destroy')
  }

  get allFormsValid(){
    return this.datosTomadorEmitirService.valid && this.datosTomadorEmitirService.formGroup.touched &&  
      this.condicionesComercialesEmitirService.valid;
  }



  get(params){
    let filters = {
      p_fecha_desde:"01/01/2016",
      p_fecha_hasta: moment().format('DD/MM/YYYY'),
      p_cod_sec: 14,
      p_limite: 1000,
      p_regxpag: 10,
      p_nropag: 0,
      ...params
    };

    return this.apiService.post('/listados/LIST_PROPUESTAS', filters).pipe(
      retry(1),
      catchError(error => {
        return of(error);
      }),
      map( response => {
          if(response.result){
              return response.result.pop();
          }
          return [];
      }));
  }

  getPorpuestaNosis(params){

    let filters = {
      p_nro_docum: params["nro_documento"],
      p_cod_docum: params["cod_tipo_doc"],
    };

    return this.apiService.post('/cot_aero/ASEG_PROPUESTA',filters, false)
 
  }


  setDataInForm(data){
    this.allData = data;
    this.datosProductorService.setValue(data);
    this.datosTomadorEmitirService.setValue(data);
    this.condicionesComercialesEmitirService.setValue(data);
    let vigencia = {
      vigencia_desde: moment(data["vigencia_desde"], "DD/MM/YYYY"),
    }
    this.vigenciaService.formGroup.patchValue(vigencia);
    this.vigenciaService.formGroup.get('hora_inicio').setValue("00:00 hs");
    if(data['cod_mon'] != 1){
    this.coberturasService.cambiarMoneda()
    }
    // this.riesgosService.setValue(data);

    // datos para riesgos
    /**
     * Hay que enviar solamente propuesta o cotizacion, sino no sabe que traer.
     */
    let cotizacion = data['nro_cotizacion'] || '';
    let propuesta = data['nro_propuesta'] || '';
    if(propuesta){
      cotizacion = '';
    }

    

    this.getRiesgos(data['nro_cotizacion'], data['nro_propuesta']).subscribe( res => {
      //console.log('riesgos data',res );
      if(res){

        this.riesgosService.setValue(res);
        this.productosService.setValue(res);
        this.usosService.setProducto(res.cod_producto);
      }
    });

    this.getCoberturas(data['nro_cotizacion'], '').subscribe( res => {
      if(res){
        this.coberturasService.setTableData(res);
        //this.productosService.setValue(res);
      }
    })

    this.getUsos(data['nro_cotizacion'], '').subscribe( res => {
      //console.log('usos data',res );
      if(res){
        // es necesario pasarle el producto
        //this.usosService.setProducto(data.cod_prod);
        this.usosService.setUsos(res);
      }
    })

  }

  getRiesgos(cotizacion, propuesta){

    let filters = this.getPropuestaCotizacionFilter(cotizacion, propuesta);
    filters['p_cod_sec'] = 14;

    return this.apiService.post('/listados/LIST_RIE_PROP', filters ,false)
      .pipe( map ( 
        res => {
          if(res['p_lista_rie_prop'] && res['p_lista_rie_prop'].length > 0){
            return res['p_lista_rie_prop'].pop();
          }

          return null;
        }
        
      ));
  }

  getCoberturas(cotizacion, propuesta){

    let filters = this.getPropuestaCotizacionFilter(cotizacion, propuesta);
    filters['p_cod_sec'] = 14;

    return this.apiService.post('/listados/LIST_RIE_USOS_COB_PROP', {
      p_o_cotizacion: cotizacion,
      p_o_propuesta: propuesta,
      p_cod_sec: 14
    },false)
      .pipe( map ( 
        res => {
          if(res['p_lista_rie_cob_prop'] && res['p_lista_rie_cob_prop'].length > 0){
            return res['p_lista_rie_cob_prop'];
          }

          return null;
        }
        
      ));
  }

  getUsos(cotizacion, propuesta){
    return this.apiService.post('/listados/LIST_RIE_USOS_COB_PROP', {
      p_o_cotizacion: cotizacion,
      p_o_propuesta: propuesta,
      p_cod_sec: 14
    },false)
      .pipe( map ( 
        res => {
          if(res['p_lista_rie_usos_prop'] && res['p_lista_rie_usos_prop'].length > 0){
            return res['p_lista_rie_usos_prop'];
          }

          return null;
        }
        
    ));
    
  }

  getData(){
    return {
      ...this.allData,
     // ...this.datosTomadorEmitirService.formGroup.getRawValue(),
      ...this.condicionesComercialesEmitirService.getRawData(),
      ...this.vigenciaService.getRawData()
    }
  }

  getPropuestaCotizacionFilter(cotizacion, propuesta){
    // si es cotizacion
    let filters = {};

    if(cotizacion && !propuesta){
      filters = {
        p_o_cotizacion: cotizacion,
        p_o_propuesta: '',
      }
      
    } 

    if(cotizacion && propuesta){
      filters = {
        p_o_cotizacion: '',
        p_o_propuesta: propuesta,
      }
      
    } 

    return filters;

  }

  canEditForm(cotizacion, propuesta): boolean{

    if(cotizacion && propuesta){
      return false;
    }

    if(cotizacion && !propuesta){
      return true;
    }

    return false;
  }

  disableForms(){
    this.datosProductorService.disableGroup();
    this.datosTomadorEmitirService.disableGroup();
    this.condicionesComercialesEmitirService.disableGroup();
    this.productosService.disableGroup();
    this.coberturasService.disableGroup();
  }
}
