import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {

  @Input() controlOptions: any;
  @Input() iFormControl: FormControl;

  constructor() { }

  ngOnInit() {
    if(this.hasDefaultValue){
      this.iFormControl.setValue(this.controlOptions['control']['defaultValue']);
    }
  }

  get isRequired(){
    return this.controlOptions['required'] || ( this.controlOptions.validators && 
      this.controlOptions.validators.indexOf('required') !== -1);
  }

  get hasDefaultValue(){
    return typeof this.controlOptions['control']['defaultValue'] !== 'undefined';
  }

}
