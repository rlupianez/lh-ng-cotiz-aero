import { Component, OnInit, Input, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { DynamicFormService } from '@core/services/forms/dynamic-form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() formConfig: object;
  /**
   * Formulario a visualizar
   */
  @Input() formGroup?: FormGroup;

  /**
   * Nombre del formulario
   */
  name?: string;

  /**
   * subscripcion a form group
   */
  formSubscription: Subscription = new Subscription();

  constructor(
    public formService: FormsFactoryService, 
    private dynFormService: DynamicFormService,
    private cdref: ChangeDetectorRef) { }

  ngOnInit() {

    // si existe formConfig, se genera el formGroup: Formulario Reactivo
    if(this.formConfig){

      if(!this.formGroup){
        this.formGroup = this.formService.createForm(this.formConfig);  
      }
      
      // this.dynFormService.setFormGroup(this.formGroup);

      this.formSubscription = this.formGroup.valueChanges.subscribe( nValues => {

        this.dynFormService.setFormData(nValues);
        
      }); 

    }
  }

  ngAfterViewInit(){
    this.cdref.detectChanges();
  } 

  ngOnDestroy(){
    this.formSubscription.unsubscribe();
  }
}
