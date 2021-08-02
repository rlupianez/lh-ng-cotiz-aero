import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { ApiService } from '@core/services/http/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesPropuestasService {

  constructor(private apiService: ApiService) { }

  getPoliza(polizaData){
    
  } 

  getPolizas(poliza: number){
    return this.apiService.post('/listados/LIST_POLIZA_CARTERA', { 
      p_poliza: poliza,
      p_nropag :0,
      p_regxpag:30
    }, false );
  }

 

  getBienAsegurado(filter: object){
    return this.apiService.post('/listados/LIST_RIESGOS', { 
      p_poliza: filter['poliza'],
      p_cod_sec: filter['cod_sec'],
      // p_nro_rie: filter['nro_rie'],
      p_nro_rie: 0,
      // p_endoso: filter['endoso'],
      p_nropag :0,
      p_regxpag:30
    }, false );
  }
  

  getPolizasVinculadas(filter){
    return this.apiService.post('/listados/POLIZAS_ANTERIORES', { 
      p_poliza: filter['poliza'],
      p_cod_sec: filter['cod_sec'],
      p_nro_rie: filter['nro_rie'],
      // p_endoso: filter['endoso'],
      p_nropag :0,
      p_regxpag:30
    }, false ); 
  }
  
  
  getSiniestros(filter){
    return this.apiService.post('/listados/LIST_SINIESTROS', { 
      p_poliza: filter['poliza'],
      p_cod_sec: filter['cod_sec'],
      // p_nro_rie: filter['nro_rie'],
      p_nro_rie: 0,
      // p_endoso: filter['endoso'],
      p_nropag :0,
      p_regxpag:30
    }, false ); 
  }
  getAccionesPoliza(data){


    let filtro = {
      "p_o_sesion":3539850713,
      "p_limite":1000,
      "p_nropag":0,
      "p_regxpag":10,
      "p_cod_sec": data['cod_sec'],
      "p_producto":null
    };

    return this.apiService.post('/listados/ACCIONES_POLIZA', filtro, false);

  }
 

    getDetalleRiesgo(filters){
      
      /*
        ------ Filtros -------  
        "p_id_rie":441409,
        "p_tipo_rie":"AUTO"
      ************************/

     let filtro = {
        p_id_rie: filters['id_rie'], 
        p_tipo_rie: filters['p_tipo_rie'] || filters['tipo_rie'],
        p_nropag :0,
        p_regxpag:30,
        p_limite:1000
      };

    return this.apiService.post('/listados/DETALLE_RIESGO', filtro, false);


    }

    getDetalleEntity(path, filters){

      let query = {
        p_nropag :0,
        p_regxpag:30,
        p_limite:1000
      }

      query = { ...query, ...filters };

      return this.apiService.post(path, query, false);
    }


    getDetailFilters(filtersConfig, rowData){

      let fields = Object.keys(filtersConfig);
      let filters = {};
  
      for(let field of fields){
        
        filters[field] = rowData[filtersConfig[field]];
  
      }
  
      return filters;
    }
}