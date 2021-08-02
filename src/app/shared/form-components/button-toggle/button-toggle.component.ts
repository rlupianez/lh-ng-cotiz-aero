import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface LabelOptions {
  text: string;
  class: string;
}

export interface ControlOptions {
  type: string;
  class: string;
  path: string;
  label: LabelOptions;
  control: object;
}

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss']
})
export class ButtonToggleComponent implements OnInit {
  @Input() controlOptions: ControlOptions; 
  @Input() iFormControl: FormControl;
  
  constructor() { 
  }

  ngOnInit() {
  }

  get options(){
    return this.controlOptions.control['options'] || [];
  }

}
