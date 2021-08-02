import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ControlOptions } from '@core/models/form/controlOptions';
import { FormControl, FormArray } from '@angular/forms';
import { ApiService } from '@core/services/http/api.service';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent implements OnInit {


  @Input() iFormControl: FormControl;
  public formOptions: object;

  optionList: object[] = [];
  data: any[] = [];
  loading: boolean = false;

  @Input() set controlOptions(options: object) {
    // console.log('set options', options);
    this.formOptions = options;
    // agregar filters required
    if (this.formOptions['control']['path']) {
      this.loading = true;
      this.apiService.getListOptions(this.formOptions['control']['path'],
        { ...this.formOptions['control']['filters'] } || {}).subscribe((data: object[]) => {
          // console.log('select options', data);
          // this.allOptions = data;
          this.optionList = data;
          this.formOptions['control']['list'] = this.optionList;
          this.loading = false;
        });
    } else {
      this.optionList = this.formOptions['control']['list'] || [];
    }

  }



  get controlOptions() {
    return this.formOptions;
  }

  get controlSpecs() {
    return this.controlOptions['control'];
  }

  get isEmpty() {
    return this.optionList.length === 0;
  }

  get value() {
    return this.iFormControl.value || [];
  }


  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges) {

    // console.log('checkbox list property change', changes);
  }

  onChange(event) {
    // console.log('change check', event);
    // const interests = <FormArray>this.iFormControl.get('usos') as FormArray;

    if (event.checked) {
      this.data.push(event.source.value);
    } else {
      const index = this.data.indexOf(event.source.value);
      if (index > -1) {
        this.data.splice(index, 1);
      }
      // this.data.removeAt(i);
    }

    this.iFormControl.setValue(this.data);
  }

  isSelected() {

  }

}
