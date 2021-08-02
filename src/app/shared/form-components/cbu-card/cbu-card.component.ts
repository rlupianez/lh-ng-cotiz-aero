import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,AbstractControl, Form } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';

import * as moment from 'moment';

function cuitValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if(!control.value){
      return { cuit: true }
  }
  if(control && control.value && control.value.toString().length != 11){
    return { cuit: true };

  }
  return null;
}

const formOptions = {
  tarjeta_aseg: {
    label: 'Tarjetas de Crédito',
    control: {
        type: 'check-list',
        searchable: true,
        // appearance: 'standard',,
        path: '/listas/LIST_TARJETAS_ASEG',
        options: {
            value: 'descri',
            key: 'cod_tarjeta'
        },
        pasteFieldOnSelect: 'cod_tarjeta',
        hasEmptyOption: true
    },
    required: true,
    class: 'col-6 col-sm-3 col-md-3 col-lg-4'
  },
  tipo_tarjeta: {
    label: 'Tipo de Tarjeta',
    control: {
        type: 'select',
        searchable: true,
        filters:{
          p_medio_pago : "C"
        },
        path: '/listas/LIST_TARJETAS_CREDITO',
        options: {
            value: 'nombre',
            key: 'cod_tarje'
        },
        pasteFieldOnSelect: 'cod_tarje'
    },
    class: 'col-6 col-sm-3 col-md-3 col-lg-4'
  },
  titular_tarjeta: {
      label: 'Titular',
      control: {
          type: 'text'
      },
      class: 'col-6 col-sm-3 col-md-3 col-lg-4'
  }
}


@Component({
  selector: 'app-cbu-card',
  templateUrl: './cbu-card.component.html',
  styleUrls: ['./cbu-card.component.scss']
})
export class CBUCardComponent implements OnInit {

  showTarjetasAsegurado: boolean = false;
  asegurado: string;
  asegForm: FormGroup;
  showAddCard: boolean = false;
  fieldsOptions = formOptions;
  cardType: string;
  cardSelectedIcon: string;
  formNewCreditCard: FormGroup;
  cardLength: string = '22';
  cuitLength: string = '11';
  loading: boolean = false;
  creditCardValidated: boolean = false;
  vencimiento = {
    label: 'Fecha de Vencimiento',
    hidden: true,
    control: {
      type: 'datepicker',
      appearance: 'outline',
      config: {
        min: moment().startOf('month'),
        max: moment().add(15,'years').endOf('month')
      },
    },
    class: 'col-sm-12 col-md-12 col-lg-4'
  }
  

  @Input() set codAsegurado(cod: string){
    this.asegurado = cod;
    if(this.asegurado){
      this.showTarjetasAsegurado = true;
      this.addAseguradoFilter(this.codAsegurado);
    }else{
      this.showTarjetasAsegurado = false;
      this.addAseguradoFilter('');
    }
  }

  @Output() isValidEvent: EventEmitter<any> = new EventEmitter();

  get codAsegurado(){
    return this.asegurado;
  }

  constructor(
    private fb: FormBuilder, 
    private formFactory: FormsFactoryService, 
    private apiService: ApiService,
    private toasterService: ToasterService) {
    // Validaciones de años
    const currentYear = parseInt(moment().format('YYYY'));
    const maxYear = parseInt(moment().add(20, 'years').format('YYYY'));

    this.formNewCreditCard = this.fb.group({
      tarjeta_credito:  ['', [ 
        Validators.required,
        Validators.maxLength(22), 
        Validators.minLength(22) ] ],
        cuit: ['', [ 
          Validators.minLength(11),
          cuitValidator
           ] ]
    });
  }

  ngOnInit(): void {

    this.asegForm = this.formFactory.createForm(this.fieldsOptions);

    ///////////////////////////////////////////
    // inspecciona formulario
    ///////////////////////////////////////////

    const asegForm =  this.asegForm;
    // Observer formulario de tarjetas de asegurado 
    asegForm.valueChanges.subscribe( values => {
      console.log('aseg tarj', values);
      if(values['tarjeta_aseg']){
        // limpiar datos de nueva tarjeta
        this.showAddCard = false;
        this.cleanNewCardForm();
      }
      this.sendFormData(this.isValid);


    });

    const creditCardForm = this.formNewCreditCard;
    // Observer formulario de nueva tarjeta de credito
    creditCardForm.valueChanges.subscribe( values => {

      this.sendFormData(this.isValid);

    });

  

  }

  get isNewCard(){
    return !this.asegForm.get('tarjeta_aseg').value && this.addCard ? true : false;
  }
  /**
   * Puede agregar nueva tarjeta de credito
   */
  get canAddNewCard(){
    return !this.asegForm.get('tarjeta_aseg').value;
  }

  /**
   * Mostrar el formulario de agregar nueva tarjeta de credito
   */
  addCard(){
    this.asegForm.get('tarjeta_aseg').setValue(null);
    if(this.canAddNewCard){
      this.showAddCard = !this.showAddCard;
    }else{
      this.showAddCard = false;
    }
    
  }

  /**
   * Agregar codigo de asegurado
   * 
   * @param codAsegurado 
   */
  addAseguradoFilter(codAsegurado){

    let config = { ...this.fieldsOptions['tarjeta_aseg'] };
    config['control']['filters'] = {
      p_cod_asegu: codAsegurado,
      p_forma_pago: "U"
    }

    this.fieldsOptions['tarjeta_aseg'] = config;

    this.showTarjetasAsegurado = true;

  }

 
  /**
   * 
   *  Devuelve si el formulario de Tarjetas de Credigo es valido
   *  Puede ser:
   *    - Tarjeta ya guardada seleccionada
   *    - Nueva Tarjeta de credito
   * 
   */

  get isValid(){

    if(!this.formNewCreditCard || !this.asegForm){
      return false;
    }

    if(this.showAddCard && !this.asegForm.get('tarjeta_aseg').value){

      if(this.formNewCreditCard.valid &&  this.creditCardValidated){
        return true
      }else{
        return false;
      }

    }else{
        // let valid = this.asegForm.get('tarjeta_aseg').valid;
        return this.asegForm.get('tarjeta_aseg').value ? true : false;
    }
  }


  /**
   * Evento que envia los datos del formulario 
   * 
   * @param valid 
   */
  sendFormData(valid){
      
      let data = {};
      if(this.isNewCard){
        data =  { 
          ...this.formNewCreditCard.getRawValue()
          
        }
      }else{
        data = this.asegForm.getRawValue();
      }
      

      this.isValidEvent.emit({
        valid: valid,
        data: data
      });
  }

  

  cleanNewCardForm(){
    this.formNewCreditCard.get('tarjeta_credito').setValue(null);
    this.formNewCreditCard.get('cbu').setValue(null);
    this.formNewCreditCard.markAsPristine();
    this.formNewCreditCard.markAsUntouched();
    this.formNewCreditCard.updateValueAndValidity();
    
  }

  

}
