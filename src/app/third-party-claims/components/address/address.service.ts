import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

// fields
import { fields, group, formFields } from './address-form';
import { AddressFieldEnum } from './address.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService implements OnDestroy {

 
  constructor(public formService: FormsFactoryService, public formManager: FormsManagerService ) {
     /**
       *  
       *  Importante llamar al super y pasar estos parametros
       */
      super(formService, formManager, 
        fields,
        group);

      // aca le pasas los formFields, por ahora no existe view fields.
      
  }

  ngOnDestroy(){

  }


  private getFormControls() {
    return this.formGroup;
  }

  initializeForms(fields,editable){
    super.initializeForms(fields,editable);
    
  }

  initPanel(editable: boolean){
    let fields;
    if(editable){
      fields = formFields;
    }else{
      fields = formFields;
    }
    this.initializeForms(fields, editable);
    this.setObservables();
  }

  setObservables(){
    const formGroup = this.getFormControls();
    if( !formGroup ) return ;

    const region = formGroup.controls[AddressFieldEnum.region];
    const postalCode = formGroup.controls[AddressFieldEnum.postalCode];
    region.valueChanges.subscribe(value => {
      this.setCityFilters({ ...this.formGroupConfig['children'][AddressFieldEnum.city] });
    })

/*     postalCode.valueChanges.subscribe(value => {
      this.setCityFilters({ ...this.formGroupConfig['children'][AddressFieldEnum.city] });
    }) */


  }

  private getCityFilters() {
    let vehicle = this.formGroup;
    let region = vehicle.controls[AddressFieldEnum.region];
    let postalCode = vehicle.controls[AddressFieldEnum.postalCode];
    return {
      p_provincia: region.value || 0,
    //  p_cod_postal : postalCode.value || null
    }
  }

  private setCityFilters(filtersConfigModelo) {
    let formControl = this.getFormControls();
    let city = formControl.get(AddressFieldEnum.city);
    filtersConfigModelo['control']['filters'] = this.getCityFilters();
    filtersConfigModelo['disabled'] = false;    
    this.formGroupConfig['children'][AddressFieldEnum.city] = { ...filtersConfigModelo };
    filtersConfigModelo['disabled'] = false;
    city.enable();
  }

}




