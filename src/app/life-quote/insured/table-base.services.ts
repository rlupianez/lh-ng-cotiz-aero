import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormsManagerService } from '@core/services/forms/forms-manager.service';

export type SectionStatusType = 'Cotizar' | 'Emitir' | 'View';
@Injectable()

export abstract class TableBaseService {

    defaultStatus: string = 'Cotizar';
    active: boolean;
    status: SectionStatusType;
    formGroup: FormGroup;
    formFieldsConfig: object;
    formGroupConfig: object;
    editable: boolean = true;
    private sectionConfig: object;

    constructor(
        public formService: FormsFactoryService, 
        public formManager: FormsManagerService, 
        status: 'Cotizar' | 'Emitir'){
        this.status = status;
    }

    initializeForms(config){
        this.sectionConfig = config;
        if(this.status === 'Cotizar' || this.status === 'Emitir'){
            this.formFieldsConfig = this.sectionConfig[this.status].fields;
            this.formGroupConfig = this.sectionConfig[this.status].group;
        }
        this.formGroup = this.formService.createForm(this.formFieldsConfig);

        if(!this.editable){
            this.disableGroup();
        }
    }

    setStatus(status: SectionStatusType): void {
        this.status = status;
        //this.initializeForms();
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
    }

}