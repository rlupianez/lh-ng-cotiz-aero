import { Injectable, OnDestroy } from '@angular/core';
import { DatosProductorService } from '../models/panels/datos-productor.service';
import { DatosTomadorService } from '../models/panels/datos-tomador.service';
import { CondicionesComercialesService } from '../models/panels/condiciones-comerciales.service';
import { RiesgosService } from '../models/panels/riesgos.service';
import { ProductosService } from '../models/panels/productos.service';
import { UsosService } from '../models/panels/usos.service';
import { CoberturasService } from '../models/panels/coberturas.service';
import { ApiService } from '@core/services/http/api.service';
import { retry, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CotizarService implements OnDestroy {

  serviceData: object = null;
  editable: boolean;
  isACopy: boolean = false;
  isNew: boolean = true;

  constructor(
    public datosProductorService: DatosProductorService,
    public datosTomadorService: DatosTomadorService,
    public condicionesComercialesService: CondicionesComercialesService,
    public riesgosService: RiesgosService,
    public productosService: ProductosService,
    public usosService: UsosService,
    public coberturasService: CoberturasService,
    public apiService: ApiService
  ) { 

  }

  ngOnDestroy(){
    console.log('service cotizar destroy')
  }

  get(id){
    let filters = {
      p_o_cotizacion: id,
      p_tipo_operacion: 'C',
      p_fecha_desde:"01/01/2018",
      p_fecha_hasta: moment().format('DD/MM/YYYY'),
      p_cod_sec: 14,
      p_limite: 1000,
      p_regxpag: 10,
      p_nropag: 0
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

  /**
   * Guarda los datos de la cotizacion
   * @param data 
   */
  setCotizacionData(data: object){
    this.serviceData = data;
  }

  /**
   * 
   * Indica si la cotizacion es una copia, es importante para saber si se van a pegar datos que provienen desde el servicio.
   * Al inicializar no se deben limpiar los datos.
   * Se deben mantener.
   * 
   * @param isCopy 
   */
  setCotizacionStatus(isCopy: boolean){
    this.isACopy = isCopy;
  }
  /**
   * Pega la informacion del formulario Cotizador en el iFormGroup
   * Sirve para pegar valores por defecto
   * 
   * @param data 
   */
  setDataInForm(data){
    this.serviceData = data;

    /*-------------------------
     *    Datos Productor
     --------------------------*/
    this.datosProductorService.setValue(data);

    /*-------------------------
     *    Datos Tomador
     --------------------------*/
    this.datosTomadorService.setValue(data);

    /*------------------------------
     *    Condiciones Comerciales
     --------------------------------*/
    this.condicionesComercialesService.setValue(data);
    // this.riesgosService.setValue(data);

    /*------------------------------
     *    Riesgos
     --------------------------------*/
    const cotizacion = data['nro_cotizacion'] || '';
    const propuesta = data['nro_propuesta'] || '';

    this.getRiesgos(cotizacion, null).subscribe( res => {
      console.log('riesgos data',res );
      if(res){
        this.riesgosService.setValue(res);
        this.productosService.setValue(res);
        this.usosService.setProducto(res.cod_producto);
      }
    });

    /*------------------------------
     *    Coberturas
     --------------------------------*/
    this.getCoberturas(cotizacion, null).subscribe( res => {
      console.log('coberturas data',res );
      if(res){
        this.coberturasService.setDefaultData(res);
        this.coberturasService.setTableData(res);
        // ()
        //this.productosService.setValue(res);
      }
    });

    this.getUsos(cotizacion, null).subscribe( res => {
      console.log('usos data',res );
      if(res){
        //this.usosService.setProducto(data.cod_prod);
        this.usosService.setUsos(res);

      }
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

  getCoberturas(cotizacion, propuesta){
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

  get valid(){
    return  this.datosProductorService.valid && this.datosTomadorService.valid &&
            this.condicionesComercialesService.valid 
           // && this.riesgosService.tipoRiesgoValid 
            &&
            this.riesgosService.datosRiesgoValid && this.productosService.valid &&
            this.usosService.valid;
  }

  canEditForm(data): boolean{
    const cotizacion = data['nro_cotizacion'];
    const fecha_cotizacion = data['fec_cotizacion'];
    const propuesta = data['nro_propuesta'];
    const fecha_propuesta = data['fec_propuesta'];
    if(cotizacion && propuesta){
      return false;
    }

    if(cotizacion && fecha_cotizacion && !propuesta){
      return false;
    }

    return true;
  }

  setAllPanelsStatus(editable: boolean){
    this.editable = editable

    this.datosProductorService.initPanel(editable);
    this.datosTomadorService.initPanel(editable, this.serviceData);
    this.condicionesComercialesService.initPanel(editable);
    
    this.riesgosService.initPanel(editable, this.serviceData);
    
    this.productosService.initPanel(editable);
    
    this.coberturasService.editable = this.editable;
    this.coberturasService.setStatus('Cotizar');

    this.usosService.isEditable(this.editable);
  }


}
