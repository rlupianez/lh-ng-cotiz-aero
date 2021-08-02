import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent {

  @Input() service: any
  @Input() name: any
  @Input() fields: any
  constructor() { }
  
}
