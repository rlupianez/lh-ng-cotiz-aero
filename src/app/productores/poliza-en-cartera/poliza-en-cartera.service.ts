import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, combineLatest } from 'rxjs';
import { ApiService } from '@core/services/http/api.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PolizaEnCarteraService {

  constructor(private apiService: ApiService) { }

  getPoliza(polizaData){

    return new Observable( obs => { 
      let polizaServices = [];
      polizaServices.push(this.getPolizaDetail(polizaData));
      // polizaServices.push(this.getEndoso(polizaData));
      // polizaServices.push(this.getAccionesPoliza(polizaData));

      combineLatest(
        polizaServices
      ).pipe(
        take(1),
      ).subscribe( (res: object[]) => {
        //console.log('detail', res);
        if(res){
          // obs.next({ ...res[0], ...res[1] });
          obs.next({ ...res[0] });
        }else{
          obs.next({ });
        }
      });

    });
  }

  getPolizaDetail(polizaData) : Observable<object> {

    return this.apiService.post('/listados/POLIZA', { 
      p_poliza: polizaData['poliza'],
      p_cod_sec: polizaData['cod_sec'],
      // p_nro_rie: polizaData['nro_rie'],
      p_nro_rie: 0,
      // p_endoso: polizaData['endoso'],
      // p_tipo_emi: polizaData['tipo_emi'],
      p_nropag :0,
      p_regxpag:30,
      p_limite:1000  
    }, false );

  }

  getEndoso(filter){
    return this.apiService.post('/listados/ENDOSO', { 
      p_poliza: filter['poliza'],
      p_cod_sec: filter['cod_sec'],
      // p_nro_rie: filter['nro_rie'],
      p_nro_rie: 0,
      p_endoso: filter['endoso'],
      p_tipo_emi: filter['tipo_emi'],
      p_nropag :0,
      p_regxpag:30,
      p_limite:1000
    }, false ); 
  }

  getPolizas(poliza: number){
    return this.apiService.post('/listados/LIST_POLIZA_CARTERA', { 
      p_poliza: poliza,
      p_nropag :0,
      p_regxpag:30
    }, false );
  }

  getPolizaById(polizaId: number){
    return new Observable( obs => { 
      this.getPolizas(polizaId).subscribe( data => {
        let polizaServices = []

        if(!data){
          obs.next(null);
        }

        const filtro = { 
          poliza: data['p_list_poliza_cartera'][0]['poliza'],
          cod_sec: data['p_list_poliza_cartera'][0]['cod_sec'],
          nro_rie: data['p_list_poliza_cartera'][0]['nro_rie'],
          endoso: data['p_list_poliza_cartera'][0]['endoso'],
          tipo_emi: data['p_list_poliza_cartera'][0]['tipo_emi'] 
        }
        //data['p_list_poliza_car'].pop();
        // data['p_detalle_poliza'] = data['p_list_poliza_cartera'][0];
        // console.log('data',data);

        polizaServices.push(this.getPolizaDetail(filtro));
        polizaServices.push(this.getEndoso(filtro));
        //polizaServices.push(this.getAccionesPoliza(filtro));
        //polizaServices.push(this.getPolizasVinculadas(filtro));
        // polizaServices.push(this.getSiniestros(filtro));
        //polizaServices.push(this.getComisiones(filtro));
        
        
        combineLatest(
          polizaServices
        ).pipe(
          take(1),
        ).subscribe( (res: object[]) => {
          console.log('detail', res);
          if(res){
            //obs.next({ ...data, ...res[0], ...res[1], ...res[2] });
            obs.next({ ...data, ...res[0], ...res[1] });
          }else{
            obs.next({ ...data });
          }
        });

      });
    });
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

  getComisiones(filter){
    return this.apiService.post('/listados/DETALLE_COM', { 
      p_poliza: filter['poliza'],
      p_cod_sec: filter['cod_sec'],
      p_nro_rie: filter['nro_rie'],
      //p_nro_rie: 0,
      p_endoso: filter['endoso'],
      p_tipo_emi: filter['tipo_emi'],
      p_nropag :0,
      p_regxpag:30,
      p_limite:1000
    }, false ); 
  }

  getAccionesPoliza(data){


    let filtro = {
      p_o_sesion:3539850713,
      p_limite:1000,
      p_nropag:0,
      p_regxpag:10,
      p_cod_sec: data['cod_sec'],
      //p_producto: data['producto'],
      //p_solicitud: data['solicitud'],
      //p_cod_riesgo: '',
      p_endoso:0,
      p_poliza: data['poliza'],
      p_nro_rie: data['nro_rie'],
      p_tipo_accion: "ENDOSO"
    };

    return this.apiService.post('/listados/ACCIONES_POLIZA', filtro, false);

  }

  getCobertura(data){

    let filtro = {
      "p_limite":1000,
      "p_nropag":0,
      "p_regxpag":20,
      "p_cod_sec": data['cod_sec'],
      "p_poliza": data['poliza'],
      p_nro_rie: data['nro_rie']
    };

    return this.apiService.post('/listados/DETALLE_RIESGO_COB', filtro, false);
  }

  /***
   * 
   * Impresiones del endoso
   * 
   * {"p_o_sesion":6527315374,
      "p_poliza": "10542640",
      "p_endoso": lo que viene
      "p_cod_sec": o que viene
      "p_nro_rie": "0",
      "p_tipo_emi": o que viene
      "p_solicitud":655693
      }
   * 
   */
 
   /****
    * 
    *   Detalles
    */

    /////////////////////////////////////
    /// Detalle Riesgos
    /////////////////////////////////////


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