import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent implements OnInit, AfterViewInit {

  @Input() controlOptions: any;
  @Input() iFormControl: FormControl;
  @Output() blur = new EventEmitter<any>();

  defaultAppearance: string = 'outline';

  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('iFormControl', this.iFormControl)
  }

  ngAfterViewInit() {
    this.cdref.detectChanges();
  }

  get isRequired() {
    return this.controlOptions['required'] || false;
  }

  get labelHidden() {
    return this.controlOptions.hideLabel;
  }

  get inputConfig() {
    return this.controlOptions['control']['config'] || {};
  }

  inputChange(value: any) {

  }

  blurEvent(event) {

    let value = event.target.value;
    this.blur.emit(event);
  }

}
