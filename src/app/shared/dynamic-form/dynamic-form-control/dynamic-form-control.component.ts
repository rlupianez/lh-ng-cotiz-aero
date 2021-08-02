import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent implements OnInit {

  loaded: boolean = false;

  @Input() set controlOptions(options: object){
    this.options = this.controlOptions;
    if(!this.iFormControl && options){
      this.initFormControl(options);
    }

    
  }

  get controlOptions(){
    return this.options;
  }

  options: object;
  iFormControl: FormGroup;

  constructor(private formFactory: FormsFactoryService) { 
  
  }

  ngOnInit(): void {
    if(this.controlOptions){
      this.initFormControl(this.controlOptions); 
    }
  }

  initFormControl(options){
    this.iFormControl = this.formFactory.createForm({ control: options });
    this.loaded = true;
  }

}
