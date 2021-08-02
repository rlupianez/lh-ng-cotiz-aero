import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';

import * as moment from 'moment';

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
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  showTarjetasAsegurado: boolean = false;
  asegurado: string;
  asegForm: FormGroup;
  showAddCard: boolean = false;
  fieldsOptions = formOptions;
  cardType: string;
  cardSelectedIcon: string;
  formNewCreditCard: FormGroup;
  cardLength: string = '16';
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
  

  cardsTypes = [
    { type: 'visa', regex: /^4/ , icon: 'visa.png' },
    { type: 'mastercard', regex: /^5[1-5]/ , icon: 'mastercard.png' },
    //{ type: 'american-express', regex: /^3[47]/ },
    //{ type: 'diners', regex: /^30[0-5]/ },
    ///{ type: 'jcb', regex: /^35(2[89]|[3-8][0-9])/ },
    { type: 'visa-electron', regex: /^(4026|417500|4508|4844|491(3|7))/  , icon: 'visa-electron.png' },
    { type: 'maestro', regex: /^(5000|5018|5020|5038|6304|6759|676[1-3])/ , icon: 'maestro.png' },
    //{ type: 'discover', regex: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/ , icon: '' }
  ];

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
        Validators.maxLength(16), 
        Validators.minLength(16) ] ],
      tipo_tarjeta: ['', [
        Validators.required
      ]],
      vencimiento:  ['', [ 
        Validators.required
      ]]

      /*month:  ['', [ 
        Validators.required,
        Validators.maxLength(2), 
        Validators.minLength(2),
        Validators.min(1),
        Validators.max(12)
      ] ],
      year:  ['', [ 
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4),
        Validators.min(currentYear),
        Validators.max(maxYear)] 
      ]*/
    });
  }

  ngOnInit(): void {

    this.asegForm = this.formFactory.createForm(this.fieldsOptions);
    // codigo de asegurado en el que existen tarjetas
   // this.codAsegurado = '6089492';
    // Observer del numero de tarjeta de credito
    this.formNewCreditCard.get('tarjeta_credito').valueChanges.subscribe( val => {
      
      if(val){
        this.checkCardType(val);
      }else{
        this.cardType = '';
      }
      
    });

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

    this.formNewCreditCard.get('tipo_tarjeta').valueChanges.subscribe( value => {
      
        this.validateCreditNumber()
      
    })


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
      p_forma_pago: "T"
    }

    this.fieldsOptions['tarjeta_aseg'] = config;

    this.showTarjetasAsegurado = true;

  }

  /** 
   * Chequea si el numero de la tarjeta de credito es
   * 
   * @param cardNumber 
   */
  checkCardType(cardNumber){

    this.cardsTypes.forEach( item => {

      if(item.regex.test(cardNumber.toString().substring(0,6))){
        this.cardType = item.type;
        this.cardSelectedIcon = item.icon;
      }

    });
 
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
          ...this.formNewCreditCard.getRawValue(),
          ...{ 
            //vencimiento_tarjeta: `${this.formNewCreditCard.get('month').value}/${this.formNewCreditCard.get('year').value}` 
            vencimiento_tarjeta: `${moment(this.formNewCreditCard.get('vencimiento').value).format('MM/YYYY')}` 
          }
        }
      }else{
        data = this.asegForm.getRawValue();
      }
      

      this.isValidEvent.emit({
        valid: valid,
        data: data
      });
  }

  focusoutCreditNumber(event){
    // console.log('focus out', event);
    this.validateCreditNumber();
  }

  /***
   * Valida el numero de Tarjeta de Credito, se le debe enviar el numero de tarjeta con el tipo de Tarjeta.
   */
  validateCreditNumber(){

    if(!this.formNewCreditCard.get('tarjeta_credito').valid || !this.formNewCreditCard.get('tipo_tarjeta').valid){
      return;
    }

    let cardNumber = this.formNewCreditCard.get('tarjeta_credito').value;
    let codTarj = this.formNewCreditCard.get('tipo_tarjeta').value;

    if(!cardNumber || !codTarj){
      return;
    }

    let query = {
      "p_cod_tarjeta": codTarj,
	    "p_nro_tarjeta": cardNumber
    };


    this.loading = true;
    this.creditCardValidated = false;
    this.apiService.post('/cot_aero/VALIDA_TARJETA',  query, false).subscribe(res => {
      //console.log('validate tarj', res);
      if(res['p_x_error']){
        this.formNewCreditCard.get('tarjeta_credito').setErrors({ 'invalid': true});
        this.toasterService.show(res['p_resultado'], 'error');
        this.creditCardValidated = false;
      }else{
        this.formNewCreditCard.get('tarjeta_credito').setErrors(null);
        this.creditCardValidated = true;
      }
      this.loading = false;
      this.sendFormData(this.isValid);
    },
    error => {
      this.loading = false;
      this.creditCardValidated = false;
      this.sendFormData(this.isValid);
    });
  }

  cleanNewCardForm(){
    this.formNewCreditCard.get('tarjeta_credito').setValue(null);
    this.formNewCreditCard.get('tipo_tarjeta').setValue(null);
    this.formNewCreditCard.get('titular_tarjeta').setValue(null);
    //this.formNewCreditCard.get('month').setValue(null);
    //this.formNewCreditCard.get('year').setValue(null);
    this.formNewCreditCard.get('vencimiento').setValue(null);
    this.formNewCreditCard.markAsPristine();
    this.formNewCreditCard.markAsUntouched();
    this.formNewCreditCard.updateValueAndValidity();
    
  }

  /***
   * Validaciones si es una tarjeta nueva o una ya guardada
   */

   //Campos
   /*
    - Tarjetas Asegurado
    --- Nueva Tarjeta
    - Numero Tarjeta
    - Tipo Tarjeta
    - Titular
    - Mes - Año
   */ 

  

}
