import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-hour-minute',
  templateUrl: './input-hour-minute.component.html',
  styleUrls: ['./input-hour-minute.component.scss']
})
export class InputHourMinuteComponent implements OnInit, AfterViewInit {

  @Input() controlOptions: any;
  @Input() iFormControl: FormControl;
  @Output() blur = new EventEmitter<any>();

  defaultAppearance: string = 'outline';

  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdref.detectChanges();
  }

  get inputType() {
     return "time";
  }

  get isRequired() {
    return this.controlOptions['required'] || (this.controlOptions.validators && this.controlOptions.validators.indexOf('required') !== -1);
  }

  get controlAppearance() {
    return this.controlOptions['control'].appearance || this.defaultAppearance;
  }

  get labelHidden() {
    return this.controlOptions.hideLabel;
  }

  get max() {
    return this.controlOptions['control']['config'] && this.controlOptions['control']['config'].max ? this.controlOptions['control']['config'].max : null;
  }

  get min() {
    return this.controlOptions['control']['config'] && this.controlOptions['control']['config'].min ? this.controlOptions['control']['config'].min : null;
  }

  get inputConfig() {
    return this.controlOptions['control']['config'] || {};
  }

  inputChange(value: any) {

    // no permite tippear excediendo la longitud
    if (this.inputConfig.maxlength) {
      const length = this.inputConfig.maxlength;
      if (value.length > length) {
        this.iFormControl.setValue(value.substring(0, length));
      }
    }


  }

  blurEvent(event) {

    let value = event.target.value;
    this.validateRange(value);
    this.blur.emit(event);
  }

  validateRange(value) {
    if (value === "") {
      return;
    }

    if (this.min) {

      if (value < this.min) {
        this.iFormControl.setValue(this.min);
      }

    }

    if (this.max) {

      if (value > this.max) {
        this.iFormControl.setValue(this.max);
      }

    }
  }

}
