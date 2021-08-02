import { Injectable } from '@angular/core';

import { fields, group, fieldsEmitir, groupEmitir, formFields, viewFields } from './productos'
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { CotizadorPanelService } from '@core/services/components/cotizador-panel.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends CotizadorPanelService {

  constructor(public formService: FormsFactoryService, public formManager: FormsManagerService) {
    super(formService, formManager, fields, group );
  }

  initializeForms(fields,editable){
    super.initializeForms(fields, editable);
    if(editable){
        this.initProductosLogic(); 
    }else{
      this.disableGroup();
    }
    
  }

  initPanel(editable: boolean){
    let fields;
    if(editable){
      fields = formFields;
    }else{
      fields = viewFields;
    }

    this.initializeForms(fields, editable);
  }

  setValue(data){
    super.setValue(data);


    
    if(data['cod_producto']){
      this.formGroup.get('cod_producto').setValue(data['cod_producto']);
      this.setRiesgoByProducto(data['cod_producto'], data['cod_riesgo']);
    }

  }



  initProductosLogic(){
    const cotizar_prod = this.formGroup.get('cod_producto');
    //const cotizar_usos = this.formGroup.get('producto');
    /***************************************+
     *    Producto
     *****************************************/
    
    cotizar_prod.valueChanges.subscribe((producto: string) => {
      // console.log('producto change', producto);

      // esto se tiene que hacer en un servicio, para que lo reconozca el set, hay que pisar toda la variable

      if(producto){
          this.setRiesgoByProducto(producto);
          //////////////////////////////////////////////////////////////////////////////////

      }else{
        //cotizar_usos.setValue([]);
      }

    });

  }

  getRawData(){
    return this.formGroup.getRawValue();
  }

  setRiesgoByProducto(idProducto, defaultValue?){
     /*******************************************
           *  Actualizando RIESGO
           ********************************************/

          this.formGroup.get('cod_riesgo').enable();
          let filtersConfigRiesgo = { ...this.formGroupConfig['children']['cod_riesgo'] };
          filtersConfigRiesgo['control']['filters'] = {
            p_seccion: '14',
            p_producto: idProducto
            // p_producto: 1084
          };
          if(defaultValue){
            filtersConfigRiesgo.control['defaultValue'] = defaultValue
          }
          filtersConfigRiesgo.disabled = false;


          this.formGroupConfig['children']['cod_riesgo'] = filtersConfigRiesgo;
  }

}
