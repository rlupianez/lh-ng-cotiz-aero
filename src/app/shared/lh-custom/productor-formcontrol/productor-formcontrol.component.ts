import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';

import { ApiService } from '@core/services/http/api.service';
import {switchMap, debounceTime, tap, finalize, debounce, map, startWith, takeUntil} from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { FormControl, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { UserService } from '@core/services/user/user.service';

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
  selector: 'app-productor-formcontrol',
  templateUrl: './productor-formcontrol.component.html',
  styleUrls: ['./productor-formcontrol.component.scss']
})
export class ProductorFormcontrolComponent implements OnInit {

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
    required: 'Por favor complete este campo.'
  };


  constructor(
    private apiService: ApiService,
    private userService: UserService) {

  }

  ngOnInit() {

    if(!this.iFormControl){
      console.error('FormControl instance es obligatorio');
    }
    
  }

  @Input() set controlOptions( optionsObj: any){
    this.formOptions = optionsObj;

    if(this.formOptions['control']['loadCurrentProductor']){

      this.isLoading = true;
      this.iFormControl.disable();
      this.userService.getProductor().subscribe( productor => {
        // console.log('current productor', productor);
        
        if(productor){
          this.iFormControl.setValue(productor);
          if(productor['estitular'] === 'N'){ // si es N, Productor Normal
            this.iFormControl.disable();
           }
           this.formOptions['control'].defaultValue = productor;
           this.iFormControl.markAsTouched();

        }
        this.iFormControl.enable();
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.iFormControl.enable();
      });

    }
    
    if(this.iFormControl && this.formOptions['control']['path'] && this.editable){
      //this.iFormControl.disable();
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

            if( currentValue === ""){
              this.isLoading = true;
            }

            if(typeof currentValue !== 'object' && currentValue && currentValue.length > this.minLengthToSearch ){
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
              if(value !== "" && value.length < 4){
                this.isLoading = false;
                return of([])
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
                  //this.iFormControl.enable();
                  return data;
                }),
                finalize(
                  () =>  {
                    this.isLoading = false;
                    // this.iFormControl.enable();
                  })
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

  getResult(body) {
    // return this.apiService.get(`${this.controlOptions['control'].path}?q=${value}`);
    return this.apiService.getDataAutocomplete(`${this.controlOptions['control'].path}`, body);
  }

  isProductor(){
    let label = this.controlOptions.label.text;
    return label.toUpperCase() === 'PRODUCTOR' ? true : false;
  }

  inputChange(value){
    // console.log('input change', value);
    /*if(this.controlOptions.control.searchWithNoItemSelected){
      this.iFormControl.setValue(value);
    }*/
    this.inputValue = value;
    
    if(value === ''){
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

  displayItem = item => {
    // aca manejar la logica de que campo pegar -- con pasteFieldOnSelect 
    // console.log('item',item);
    if(item){
      
      if(this.controlOptions.control.searchWithNoItemSelected){
        if(item[this.controlOptions['control']['options']['key']]){
          return `${item[this.controlOptions['control']['options']['key']]} - ${item[this.controlOptions['control']['options']['value']]}`
        }else {
          return item.value;
        }
      }
      return `${item[this.controlOptions['control']['options']['key']]} - ${item[this.controlOptions['control']['options']['value']]}`
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

  suffixClicked(event){
    event.preventDefault();
    this.inputSuffixEvent.emit(true);
  }

}
