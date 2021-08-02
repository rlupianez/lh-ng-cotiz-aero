import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment, Moment} from 'moment';
import { Moment } from 'moment';

// const moment = _rollupMoment || _moment;
const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class DatepickerComponent implements OnInit {
  @Input() iFormControl: FormControl;
  @Input() controlOptions: object;
  @Output() blur = new EventEmitter<any>();
  moment = moment;
  
  defaultAppearance: string = 'outline';
  
  constructor() { }
  
  ngOnInit() {
    // console.log('datepicker', this.formControl, this.controlOptions)
  }
  
  get isRequired(){
    return this.controlOptions['required'];
  }
  
  get isEmpty(){
    return !this.iFormControl.value || this.iFormControl.invalid ? true : false;
  }

  get controlAppearance(){
    return this.controlOptions['control'].appearance || this.defaultAppearance;
  }
  
  blurEvent(event){
    //let value = event.target.value;
    //this.validateRange(value);
    this.blur.emit(event);
  }
}
