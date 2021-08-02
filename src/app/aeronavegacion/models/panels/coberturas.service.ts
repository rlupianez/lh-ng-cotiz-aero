import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { fields, group, fieldsEmitir, groupEmitir } from './coberturas';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { AeronavegacionService } from '../../aeronavegacion.service';
import { CotizadorSectionService } from '@core/services/components/cotizador-section.services';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';
import { CoberturasTableService } from '@core/services/components/coberturas-table.service';
import { CoberturasDataSet} from '../../row/cobertura-seleccionada/models/cobertura'

@Injectable({
  providedIn: 'root'
})
export class CoberturasService extends CotizadorSectionService {

  defaultData: object[];
  coberturasDataSet: CoberturasDataSet;

  constructor(
    public formService: FormsFactoryService,
    public formManager: FormsManagerService,
    private aeroService: AeronavegacionService,
    private coberturasTableService: CoberturasTableService) {
      super(formService, formManager, {
        Cotizar: {
          fields: { ...fields },
          group: { ...group }
        },
        Emitir: {
          fields: { ...fieldsEmitir },
          group: { ...groupEmitir }
        }
      }, 'Cotizar');
  }
  

  initializeForms(){
   
    super.initializeForms();
    if(this.formGroupConfig){
      this.formGroupConfig['children']['cobertura']['control']['editable'] = this.editable;
    }
    
  }

  initGroup(){
  }

  setDefaultData(data){
    this.defaultData = data;
  }

  setTableData(items){
    /*const coberturasConfig = { ...this.formGroupConfig['children']['cobertura']['control'],
        editable: false,
        defaultData: items
      }

      this.formGroupConfig['children']['cobertura']['control'] = coberturasConfig; 

      this.initializeForms();
      */
     this.coberturasTableService.setCoberturas(this.parseCoberturaData(items));
  }

  parseCoberturaData(items){
    let data = [];

    
    for( let cob of items){
      let item = {
        selected: true,
        required: true,
        ...cob
      }

      data.push(item);
    }

    return data;
  }

  getRawData(){

    let data = this.formGroup.value;
    // solo los tildados
    return { cobertura: data.cobertura.filter( item => item['selected'] === true) };
    
    
  }

  cambiarMoneda(){
    this.formGroupConfig['children']['cobertura']['control']['items']['imp_suma_asegurada']['control'].moneda = 'us$';
  }


  getFiltersData(data: object){
    console.log('all data coberturas', data);
    this.setFilters(data);
  }

  setFilters(data: object){
      let usosList = [];

      for(const cod of data['usos']){
        usosList.push({
          cod_uso: cod
        });
      }


      let primaFilters = 
      {
        p_tipo_doc: data['cod_tipo_doc'],
        p_cod_iva: data['cod_iva'],
        p_forma_pago: data['cod_forma_pago'],
        p_plan_pago: data['cod_plan'],
        p_cod_jur: data['cod_productor'] && data['cod_productor']['cod_jur'] ? data['cod_productor']['cod_jur'] : null,
        p_cod_suc: data['cod_productor'] && data['cod_productor']['cod_suc'] !== null ? data['cod_productor']['cod_suc'] : null,
        p_cod_prod: data['cod_productor'] && data['cod_productor']['codpas'] ? data['cod_productor']['codpas'] : null,
        //p_documento: data['cod_productor'] && data['cod_productor']['cuit'] ? data['cod_productor']['cuit'] : null,
        /////////////////////////////////////
        p_pct_comis: data['porc_comision'],
        p_moneda: data['cod_mon'],
        p_plazas: data['cant_plazas'],
        p_list_usos: usosList,
        p_riesgo:  data['cod_riesgo'],
        p_cod_marca: data['cod_marca'],
        p_cod_modelo: data['cod_modelo'],
        p_anio: data['anio'],
        p_producto: data['cod_producto']
      };

      if(primaFilters['p_tipo_doc'] === 4){
        primaFilters['p_documento'] = data['nro_documento'] && data['nro_documento']['nro_documento'] ? data['nro_documento']['nro_documento'] : data['nro_documento'];
        primaFilters['p_cod_asegurado'] = data['nro_documento'] && data['nro_documento']['cod_asegurado'] ? data['nro_documento']['cod_asegurado'] : data['nro_documento'];
      }
      if(primaFilters['p_tipo_doc'] === 88){
        primaFilters['p_documento'] = data['cuit'] && data['cuit']['cuit'] ? data['cuit']['cuit'] : data['cuit'];
        primaFilters['p_cod_asegurado'] = data['cuit'] && data['cuit']['cod_asegurado'] ? data['cuit']['cod_asegurado'] : data['cuit'];
      }
      
      this.aeroService.getAllCoberturasPrima(primaFilters, this.defaultData);
      this.coberturasDataSet = this.aeroService.coberturasDataSet;
      //this.defaultData = null;

  }

  getCoberturaFilters(data: object){

    let usosList = [];
    
    for(const cod of data['usos']){
      usosList.push({
        cod_uso: cod
      });
    }


    let primaFilters = 
    {
      p_tipo_doc: data['cod_tipo_doc'],
      p_cod_iva: data['cod_iva'],
      p_forma_pago: data['cod_forma_pago'],
      p_plan_pago: data['cod_plan'],
      p_cod_jur: data['cod_provincia'] ? data['cod_provincia'] : null,
      p_cod_suc: data['cod_productor'] && data['cod_productor']['cod_suc'] !== null ? data['cod_productor']['cod_suc'] : null,
      p_cod_prod: data['cod_productor'] && data['cod_productor']['codpas'] ? data['cod_productor']['codpas'] : null,
      //p_documento: data['cod_productor'] && data['cod_productor']['cuit'] ? data['cod_productor']['cuit'] : null,
      /////////////////////////////////////
      p_pct_comis: data['porc_comision'],
      p_moneda: data['cod_mon'],
      p_plazas: data['cant_plazas'],
      p_list_usos: usosList,
      p_riesgo:  data['cod_riesgo'],
      p_cod_marca: data['cod_marca'],
      p_cod_modelo: data['cod_modelo'],
      p_anio: data['anio'],
      p_producto: data['cod_producto'],
      p_cant_pasajeros: parseInt(data['pasajeros']),
      p_cant_tripulantes: parseInt(data['tripulantes'])
    };

    if(primaFilters['p_tipo_doc'] === 4){
      primaFilters['p_documento'] = data['nro_documento'] && data['nro_documento']['nro_documento'] ? data['nro_documento']['nro_documento'] : data['nro_documento'];
      primaFilters['p_cod_asegurado'] = data['nro_documento']['cod_asegurado'] || null;
    }
    if(primaFilters['p_tipo_doc'] === 88){
      primaFilters['p_documento'] = data['cuit'] && data['cuit']['cuit'] ? data['cuit']['cuit'] : data['cuit'];
      primaFilters['p_cod_asegurado'] = data['nro_documento']['cod_asegurado'] || null;
    }

    return primaFilters;
  }

}
