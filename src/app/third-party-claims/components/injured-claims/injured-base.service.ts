import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

@Injectable()

export abstract class InjuredBaseService {

    formGroup: FormGroup;
    formFieldsConfig: object;
    formGroupConfig: object;

    public allFieldsConfig: object;

    private currentFieldsList: string[];
    private editable: boolean = false;
    public active: boolean;
   

    constructor(
        public formService: FormsFactoryService, 
        public formManager: FormsManagerService,
        allFieldsConfig: object,
        panelConfig: object){
            this.allFieldsConfig = allFieldsConfig;
            this.formGroupConfig = panelConfig;

    }

    initializeForms(fieldsList: any[], editable: boolean){
        this.editable = editable;
        this.currentFieldsList = fieldsList;
        this.formFieldsConfig = this.getFieldsConfig();
        this.formGroupConfig = this.getGroupConfig();
        this.formGroup = this.formService.createForm(this.formFieldsConfig);

        if(!this.editable){
            this.disableGroup();
        }
    }

    initPanel(editable: boolean){
        this.editable = editable;
    }

    
    set isEditable(editable: boolean){
        this.editable = editable;
    }

    get isEditable(): boolean{
        return this.editable;
    }

    getRawData(){
        return this.formGroup.getRawValue();
    }

    get valid(){
        if(!this.formGroup){
            return false;
        }
        return this.formGroup.valid && this.formGroup.touched;
    }

    disableGroup(){
        this.formManager.disableGroupControls(this.formGroup, this.formGroupConfig, Object.keys(this.formFieldsConfig), true);
    }

    enableGroup(){
        this.formManager.disableGroupControls(this.formGroup, this.formGroupConfig, Object.keys(this.formFieldsConfig), false);
    }

    setValue(data){
        this.formGroup.patchValue(data);
        if(this.editable){
            this.formGroup.markAllAsTouched();
        }
        
    }

    getField(name: string){
        return this.formGroup.get(name);
    }

    getFieldConfig(name: string){
        return this.formGroupConfig['children'][name];
    }

    getFieldsConfig(){
        let oFields = {}
        let fields = Object.keys(this.currentFieldsList);
        for(let name of fields){
            if(this.allFieldsConfig[name]){
                let fieldConfig = this.allFieldsConfig[name];
                fieldConfig['hidden'] = this.currentFieldsList[name].hidden;
                fieldConfig['disabled'] = this.currentFieldsList[name].disabled;
                oFields[name] = fieldConfig;
            }
        }
    
        return oFields;
    } 
    
    getGroupConfig(){
    
        let groupConfig = this.formGroupConfig;
        this.formGroupConfig['children'] = this.getFieldsConfig();
        
        return groupConfig;
    }
    


}