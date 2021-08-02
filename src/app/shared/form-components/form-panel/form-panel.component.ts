import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-panel',
  templateUrl: './form-panel.component.html',
  styleUrls: ['./form-panel.component.css']
})
export class FormPanelComponent implements OnInit {

  @Input() formConfig: object;
  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
