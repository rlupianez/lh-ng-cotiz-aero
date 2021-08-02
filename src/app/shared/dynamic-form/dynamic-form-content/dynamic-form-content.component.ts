import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-content',
  templateUrl: './dynamic-form-content.component.html',
  styleUrls: ['./dynamic-form-content.component.css']
})
export class DynamicFormContentComponent implements OnInit {

  @Input() formConfig: object;
  @Input() formGroup: FormGroup;
  
  constructor() { }

  ngOnInit() {
  }

}
