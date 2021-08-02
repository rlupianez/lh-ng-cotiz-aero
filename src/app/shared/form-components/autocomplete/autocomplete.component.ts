import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';

import { ApiService } from '@core/services/http/api.service';
import {switchMap, debounceTime, tap, finalize, debounce, map, startWith, takeUntil} from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { FormControl, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';

export interface LabelOptions {
  text: string;
  class: string;
}

export interface ControlOptions {
  type: string;
  class: string;
  path: string;
  label: LabelOptions;
}


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() items?: object[];
  @Input() iFormControl: FormControl;
  @Output() inputSuffixEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemSelectedEvent: EventEmitter<any> = new EventEmitter<any>();
  defaultAppearance: string = 'outline';
  isLoading: boolean = false;
  dataOptions: Observable<any>;
  isSelected: boolean;
  isFocused: boolean = false;
  optionsNotFound = false;
  emptyOptionsMessage: string = 'No se encontraron resultados';
  searchFocused: boolean;
  currentPage: number = 0;
  bodyData: object = {
    p_filtro: '',
    p_o_sesion:1234,
    p_limite:1000, 
    p_nropag: 0,            
    p_regxpag :10 
  };
  allDataLoaded: boolean = false;
  formOptions: object = {};
  minLengthToSearch: number = 3;
  inputValue: string = '';

  @ViewChild('autocomplete', { read: MatAutocompleteTrigger, static: true }) autocomplete: MatAutocompleteTrigger;
  @ViewChild('selectAutocomplete', { read: MatAutocomplete, static: true }) selectAutocompleteRef: MatAutocomplete;

  errorMessages = {
    incorrect: 'Debe ingresar un dato válido.',
    required: 'Por favor complete este campo.',
    cuit: 'El CUIT ingresado es inválido'
  };


  constructor(private apiService: ApiService) {

  }

  ngOnInit() {

    if(!this.iFormControl){
      console.error('FormControl instance es obligatorio');
    }
    
  }

  /*
  		Json de configuracion del input control
  */
  @Input() set controlOptions( optionsObj: any){
    this.formOptions = optionsObj;
    this.isLoading = false;
    this.items = [];
    this.optionsNotFound = false;
    if(this.iFormControl && this.formOptions['control']['path'] && this.editable){

      this.dataOptions = this.iFormControl
        .valueChanges
        .pipe(
          startWith(''),
          debounceTime(600),
          tap(() => { 
            let currentValue = this.iFormControl.value;
            if(this.iFormControl.value && typeof this.iFormControl.value !== 'object'){
              currentValue = this.iFormControl.value.toString();
            }

            if(typeof currentValue !== 'object' && currentValue && currentValue.length > this.minLengthToSearch){
              this.isLoading = true;
            }
          }),
          switchMap(
            // value => this.apiService.get(`${this.controlOptions['control'].path}?q=${value}`)
            value => {

              if(value && typeof value !== 'object'){
                value = value.toString();
              }
              
              /*if(!value){
                this.isLoading = false;
                return;
              }*/
              // se realiza la busqueda si se escriben mas de 3 letras
              if(!value || value.length < 4){
                this.isLoading = false;
                this.items = [];
                this.optionsNotFound = false;
                return of([]);
              }

              this.bodyData['p_nropag'] = 0;
              // p_filtro por defecto
              this.bodyData[this.formOptions['control']['apiSearchFieldname'] || ['p_filtro']] = 
                typeof(value) === 'object' ? value[this.formOptions['control']['pasteFieldOnSelect']] : value;
              
              if(this.formOptions['control']['filters']){
                this.bodyData = { ...this.bodyData, ...this.formOptions['control']['filters'] };
              }

              return this.apiService.getDataAutocomplete(`${this.controlOptions['control'].path}`, this.bodyData)
              .pipe(
                map( data => {
                  // console.log('autocomplete data', data);
                  this.allDataLoaded = false;
                  this.items = data;
                  this.isLoading = false;
                  return data;
                }),
                finalize(
                  () =>  this.isLoading = false )
                );
              
            })
          );


      this.dataOptions.subscribe( data => {
        if(data.length === 0){
          this.optionsNotFound = true;
        }else{
          this.optionsNotFound = false;
        }
      }); 
          
    }else{

    }

  }
  
  get controlOptions() {
    return this.formOptions;
  }

  get isRequired(){

    if(!this.iFormControl.validator){
      return false;
    }
    const validator = this.iFormControl.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
    return false;
  }

  get editable(){
    return this.formOptions['editable'] || true;
  }

  get inputConfig(){
    return this.controlOptions['control']['config'] || {};
  }

  getResult(body) {
    // return this.apiService.get(`${this.controlOptions['control'].path}?q=${value}`);
    return this.apiService.getDataAutocomplete(`${this.controlOptions['control'].path}`, body);
  }


  inputChange(value){
    // console.log('input change', value);
    /*if(this.controlOptions.control.searchWithNoItemSelected){
      this.iFormControl.setValue(value);
    }*/
    this.inputValue = value;
    
    // no permite tippear excediendo la longitud
    if(this.inputConfig.maxlength){
      const length = this.inputConfig.maxlength;
      if(value.length > length ){
        this.inputValue = value.substring(0,length);
        this.iFormControl.setValue(value.substring(0,length));
      }
    }

    if(value === ''){
      
    }

    if(value){
      this.validateRange(value);
    }else{
      this.items = [];
    }
  }

  selectedItem(event){

    if(event.option.value){
      this.itemSelectedEvent.emit(event.option.value);
    }else{

      if(this.controlOptions.control.searchWithNoItemSelected){
        let option = {
          value: this.inputValue
        };
        this.iFormControl.setValue(option);
      }
      // si no se selecciono, devuelve el valor que esta escrito en el control
      this.itemSelectedEvent.emit(this.inputValue);
    }
    
  }

  public clearValue(){
    // console.log('clear');
    this.iFormControl.patchValue('');
    this.items = [];
  }

  get isEmpty(){
    return !this.iFormControl.value || this.iFormControl.value === '';
  }

  get inputValueValid(){
    return this.inputValue && this.inputValue.length > 0 &&  this.inputValue.length > this.minLengthToSearch;
  }

  displayItem = item => {
    // aca manejar la logica de que campo pegar -- con pasteFieldOnSelect 
    // console.log('item',item);
    if(item){
      
      if(this.controlOptions.control.searchWithNoItemSelected){
        
        if(item[this.controlOptions['control']['pasteFieldOnSelect']]){
          return `${item[this.controlOptions['control']['pasteFieldOnSelect']]}`
        }else if(item[this.controlOptions['control']['options']['key']]){
          return `${item[this.controlOptions['control']['options']['value']]}`
        }else {
          return item.value || item;
        }
      }
      return `${item[this.controlOptions['control']['options']['value']]}`
    } else {
      return '';
    }
  }

  onFocusOut(event){
    this.isFocused = false;
  }

  onFocus(event){
    this.isFocused = true;
  }

  onEmptyOptions(){
    this.autocomplete.closePanel();
  }

  autocompleteScroll() {
    setTimeout(() => {
      if (
        this.selectAutocompleteRef &&
        this.autocomplete &&
        this.selectAutocompleteRef.panel
      ) {
        fromEvent(this.selectAutocompleteRef.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.selectAutocompleteRef.panel.nativeElement.scrollTop),
            takeUntil(this.autocomplete.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.selectAutocompleteRef.panel.nativeElement
              .scrollTop;
            const scrollHeight = this.selectAutocompleteRef.panel.nativeElement
              .scrollHeight;
            const elementHeight = this.selectAutocompleteRef.panel.nativeElement
              .clientHeight;
            const atBottom = scrollHeight === scrollTop + elementHeight;

            if (atBottom) {
              // fetch more data
              if(this.allDataLoaded){
                return;
              }

              this.bodyData['p_nropag'] = this.bodyData['p_nropag'] + 1;
              // this.isLoading = true;
              
              this.getResult(this.bodyData) 
                .subscribe( data => {
                  // this.isLoading = false;
                  if(data.length > 0){
                    this.items = [...this.items,...data];
                  }else{
                    this.allDataLoaded = true;
                  }
                
                });
              
            }
          });
      }
    });
  }

  get controlAppearance(){
    return this.controlOptions['control'].appearance || this.defaultAppearance;
  }

  get showStringSearch(){
    return this.inputValue.length > this.minLengthToSearch;
  }
  
  get inputType(){
    return this.controlOptions['control'].inputType || 'text';
  }

  get max(){
    return this.controlOptions['control']['config'] && this.controlOptions['control']['config'].max ? this.controlOptions['control']['config'].max : null;
  }

  get min(){
    return this.controlOptions['control']['config'] && this.controlOptions['control']['config'].min ? this.controlOptions['control']['config'].min : null;
  }

  suffixClicked(event){
    event.preventDefault();
    this.inputSuffixEvent.emit(true);
  }

  validateRange(value){
    if(value === ""){
      return;
    }

    if(this.min){

      if(value < this.min){
        this.iFormControl.setValue(this.min);
      }

    }

    if(this.max){

      if(value > this.max){
        this.iFormControl.setValue(this.max);
      }

    }
  }
}