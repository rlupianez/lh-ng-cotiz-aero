import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss']
})
export class InputRadioComponent implements OnInit {


  @Input() iFormControl: FormControl;
  formOptions: object;
  optionList: object[] = [];
  @Input() controlOptions: any;
  

  constructor() { 
  }
  
  ngOnInit() {
    this.optionList = this.controlOptions['control']['list'] || [];
    this.formOptions = this.controlOptions;

  }

  get value(){
    return this.iFormControl.value || [];
  }

  onChange(event){
    this.iFormControl.setValue(event.source.value);
  }

}
