import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ChangeDetectorRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '@core/services/http/api.service';
import { pairwise } from 'rxjs/operators';

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
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges, AfterViewInit {


  @Input() iFormControl: FormControl;
  optionList: object[];
  allOptions: object[];
  formOptions: object;
  isFocused: boolean = false;

  defaultAppearance = 'outline';
  @ViewChild('selectInput') mySelect;
  @ViewChild('searchInput') searchInput: ElementRef;
  @Output() blur = new EventEmitter<any>();
  currentValue: any = null;

  @Input() set controlOptions(optionsObj: any) {
    this.formOptions = optionsObj;

    if (((this.formOptions['control']['path'] && this.editable) || this.formOptions['control']['loadOptions']) && this.canSearch) {

      this.loading = true;

      this.apiService.getListOptions(this.formOptions['control']['path'],
        { ...this.formOptions['control']['filters'] } || {}, this.formOptions['control']['cache']).subscribe((data: object[]) => {
          // console.log('select options', data);
          this.allOptions = data;
          this.optionList = data;
          this.controlSpecs.list = data;
          this.setDefaultItem();
          this.loading = false;
        },
          error => {
            this.loading = false;
          });

    } else {
      this.optionList = this.formOptions['control']['list'] || [];
      this.allOptions = this.formOptions['control']['list'] || [];
      this.setDefaultItem();
    }

    // deshabilitar o habilitar el form control
    this.setFormControlStatus(this.formOptions['disabled']);
  }

  get controlOptions() {
    return this.formOptions;
  }

  get editable() {
    return this.formOptions['editable'] || true;
  }

  get canSearch(){
    if(this.controlOptions['control'].filtersRequired){
      return this.controlOptions['control']['filters'] ? true : false;
    }else{
      return true;
    }
  }


  constructor(
    private apiService: ApiService,
    private cdref: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdref.detectChanges();
  }

  ngOnInit() {

    this.iFormControl.valueChanges.subscribe(value => {

      // si no es editable o disable y no tienen options
      if (this.allOptions && this.allOptions.length == 0 && !this.editable || this.formOptions['disabled']) {
        // si el form control tiene algo
        if (value) {
          let item = {};
          item[this.controlSpecs['options']['value']] = value;
          let options = [item];
          this.allOptions = options;
          this.optionList = options;
          this.controlSpecs.list = options;
          this.mySelect.value = item;
        } else {
          // si el form control si esta vacio
          this.allOptions = [];
          this.controlSpecs.list = [];
          this.optionList = [];
          this.mySelect.value = null;
        }
      }

    });

  }

  setDefaultItem(item?: object) {

    if (item) {
      this.formOptions['control'].defaultValue = item;
    }

    if(this.formOptions['control'].defaultValue){
      this.iFormControl.patchValue( this.formOptions['control'].defaultValue);
    }else if(this.allOptions.length === 1 && this.isRequired){
      if(this.formOptions['control']['options']['key']){
        this.iFormControl.patchValue( this.allOptions[0][this.formOptions['control']['options']['key']] );
      }
      
    }
  }

  ngOnChanges() {
    // console.log('select property change');
  }

  get controlSpecs() {
    this.currentValue = this.iFormControl.value
    return this.controlOptions.control
  }

  get label() {
    return this.controlOptions.label.text || this.controlOptions.label
  }

  get loading() {
    return this.controlOptions['control'].loading;
  }

  set loading(value: boolean) {
    this.controlOptions['control'].loading = value;
  }


  changeEvent(event) {
    //Paso el valor anterior en el evento por si falla el post tener cómo rollbackear
    event.previousValue = this.currentValue;
    this.currentValue = event.value;
    this.blur.emit(event);
  }



  get isRequired() {
    return this.controlOptions['required'] || (this.controlOptions['validators'] &&
      this.controlOptions['validators'].indexOf('required') !== -1);
  }

  get controlAppearance() {
    return this.controlOptions['control']['appearance'] || this.defaultAppearance;
  }

  get isEmpty() {
    return !this.iFormControl.value
  }

  public clearValue(event) {
    // event.stopPropagation();
    // console.log('clear');
    this.iFormControl.patchValue('');
  }

  onFocusOut(event) {
    this.isFocused = false;
  }

  onFocus(event) {
    this.isFocused = true;
  }

  clickInputSelect(event) {
    event.stopPropagation();
  }

  openedSelect() {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }

  searchInSelect(value) {

    if (value.length >= 4) {
      this.optionList = this.filterOptions(value);
    } else {
      this.optionList = this.allOptions;
    }
  }

  filterOptions(query: string): object[] {
    let result: object[] = [];
    const valueField = this.controlOptions.control['options'] && this.controlOptions.control['options'].value || 'value';

    for (const item of this.allOptions) {
      const valueCleared = item[valueField].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (valueCleared.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        result.push(item);
      }
    }
    return result;
  }

  pressEnter() {
    if (this.optionList.length === 1) {
      this.iFormControl.setValue(this.optionList[0][this.controlSpecs['pasteFieldOnSelect'] || 'value']);
      this.mySelect.close();
      this.clearInput();
    }
  }

  clearInput() {
    this.searchInput.nativeElement.value = '';
    this.optionList = this.allOptions;
  }

  setFormControlStatus(disabled: boolean) {
    if (this.iFormControl) {
      if (disabled) {
        this.iFormControl.disable();
      } else {
        this.iFormControl.enable();
      }
    }
  }

  pasteSelectedItem(item) {
    //si es datatype es string number 
    if (this.dataType === 'object') {
      return item;
    }

    return item;

    //si datatype es object

  }


  get dataType(): 'object' | 'text' | 'number' {
    return this.controlOptions.control.dataType || 'text';
  }

  getSelectedItemObject(value) {
    const key = this.controlSpecs['pasteFieldOnSelect'];
    return this.allOptions.filter(item => {
      return item[key] === value;
    })[0] || null;
  }


}
