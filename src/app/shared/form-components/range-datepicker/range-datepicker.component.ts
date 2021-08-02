import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-range-datepicker',
  templateUrl: './range-datepicker.component.html',
  styleUrls: ['./range-datepicker.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class RangeDatepickerComponent implements OnInit {

  @Input() iFormControl: FormGroup;
  @Input() controlOptions: object;
  valuesChanges: boolean = false;

  rangeDatesLabels = {
    startDate: 'Fecha Desde',
    endDate: 'Fecha Hasta'
  }

  rangeDatesErrorsMsg = {
    required: 'Por favor complete este campo.',
    invalid: 'Formato de fecha inválida.',
    endDateMin: `La fecha debe ser superior a ${this.labels['startDate']}`
  }


  constructor(private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('es-ES');
  }

  get rangeControls(){
    return this.iFormControl.controls;
  }

  get groupIsValid() {
    return this.iFormControl.valid;
  }

  get startDateRequired(){
    return this.isRequired(this.rangeControls.desde);
  }

  get endDateRequired(){
    return this.isRequired(this.rangeControls.hasta);
  }

  get labels(){
    if(this.controlOptions && this.controlOptions['label']){
      return {
        startDate: `${this.controlOptions['label']} Desde`,
        endDate: `${this.controlOptions['label']} Hasta`
      }
    }else{
      return this.rangeDatesLabels;
    }
  }

  isRequired(control: AbstractControl){
    if(!control.validator){
      return false;
    }
    const validator = control.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
    return false;
  }

  ngOnInit() {
  }
}
