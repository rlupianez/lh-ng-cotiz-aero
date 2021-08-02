import { Injectable } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';

import * as moment from 'moment';

type FormControlType = 'text' | 'number' | 'date';
type FormControlValidator = 'required';
type FormType = 'group' | 'array';

@Injectable({
  providedIn: 'root'
})
export class FormsFactoryService {

  validatorsTypes: object = {
    'monthyear-range': [this.validateRangeDate],
    'date-range': [this.validateRangeDate],
    'typeahead': [this.requireMatchOption.bind(this)],
    'combobox': [],
    'date': [],
    'required': [Validators.required],
    'email': [Validators.email],
    'minCero': [Validators.min(0)],
    'max': [],
    'min': [],
  };

  /**
   * Cantidad de meses por defecto en los campos de rango de periodo (formato MM/YYYY y DD/MM/YYYY)
   */
  rangePeriodMonths: number = 0;


  constructor(private formBuilder: FormBuilder) {

  }

  formControlIsRequired(control: FormControl) {

  }

  validateRangeDate(group: FormGroup) {

    const startDate = group.controls.desde.value;
    const endDate = group.controls.hasta.value;

    if (!group.controls.desde.validator && !group.controls.hasta.validator) {
      return null;
    }

    if (!startDate || !endDate) {
      return null;
    }

    if (startDate > endDate) {
      return { greaterThan: true };
    }

    if (startDate < endDate) {
      return null;
    }

    return null;
  }

  requireMatchOption(control: AbstractControl) {
    const selection: any = control.value;
    if (typeof selection === 'string') {
      return { incorrect: true };
    }
    return null;
  }

  cbuValid(control: AbstractControl) {
    const selection: any = control.value;
    if (!selection) {
      return { formatInvalid: true };
    }
    return null;
  }

  /*
    Genera objeto formularo en base a objeto especificado de opciones
  */

  generateForm(filters: object, filtersVisibility: object, defaultData?: any) {
    let form = {};

    for (const filterName of Object.keys(filters)) {
      let validators = [];
      if (filters.hasOwnProperty(filterName)) {

        const filter = filters[filterName];
        // this.getFieldValidator(filterName, filter);

        /// ------ Agregar el validator required
        if (filter.required) {
          validators.push(Validators.required);
        }



        /*
          Agrega filtros segun el tipo de control
        */
        switch (filter.control.type) {
          case 'monthyear-range':
            // Define el rango standard --> 1 mes
            let desde = moment(filter.control.config.max).startOf('month').subtract(this.rangePeriodMonths, 'M');
            let hasta = filter.control.config.max === '' ? moment() : filter.control.config.max;
            ///////////////////////////////////////// 
            if (filter.control.defaultValues) {
              desde = filter.control.defaultValues.desde;
              hasta = filter.control.defaultValues.hasta;
            }

            form[filterName] = this.formBuilder.group({
              desde: [desde, validators],
              hasta: [hasta, validators],
            }, { validator: this.validateRangeDate });

            break;
          case 'date-range':
            // Define el rango standard --> 1 mes
            let desdeD = moment(filter.control.config.max).startOf('month').subtract(this.rangePeriodMonths, 'M');
            if (this.rangePeriodMonths === 1) {
              desdeD = moment(filter.control.config.max).startOf('month');
            }
            let hastaD = filter.control.config.max === '' ? moment() : filter.control.config.max;
            /////////////////////////////////////////  

            if (filter.control.defaultValues) {
              // si es vacio se mantiene el vacio
              if (filter.control.defaultValues.max) {
                desdeD = filter.control.defaultValues.max;
              } else {
                desdeD = filter.control.defaultValues.desde ? moment(filter.control.defaultValues.desde).startOf('month') : null;
              }

              if (filter.control.defaultValues.min) {
                hastaD = filter.control.defaultValues.max;
              } else {
                hastaD = filter.control.defaultValues.hasta ? moment(filter.control.defaultValues.hasta) : null;
              }
            }

            if (filter.required) {
              form[filterName] = this.formBuilder.group({
                desde: [desdeD, validators],
                hasta: [hastaD, validators],
              }, { validator: this.validateRangeDate });
            } else {
              form[filterName] = this.formBuilder.group({
                desde: [desdeD, validators],
                hasta: [hastaD, validators],
              });
            }


            break;
          case 'typeahead':

            if (filter.required) {
              validators.push(this.requireMatchOption.bind(this));
              form[filterName] = new FormControl('', validators);
            } else {
              form[filterName] = new FormControl('');
            }


            break;
          case 'datepicker':

            let dateValue = moment(new Date(), 'DD/MM/YYYY');
            // parametro default value 
            if (filter.control.hasOwnProperty('defaultValue')) {
              if (filter.control.defaultValue === '') {
                dateValue = filter.control.defaultValue;
              } else {
                dateValue = moment(filter.control.defaultValue, 'DD/MM/YYYY');
              }
            }

            if (filter.required) {
              form[filterName] = new FormControl(dateValue, validators);
            } else {
              form[filterName] = new FormControl(dateValue);
            }
            break;
          default:
            if (filter.control.defaultValue != '')
              form[filterName] = new FormControl(filter.control.defaultValue, validators);
            else
              form[filterName] = new FormControl('', validators);
            break;
        }

        // habilitar o deshabilitar filtros y controles segun condiciones dinamicas
        // console.log('visibility', this.filtersVisibility);
        if (!filtersVisibility[filterName]) {
          form[filterName].enable();
        } else {
          form[filterName].disable();
        }


        // habilitado o deshabilitado
        if (filters[filterName]['disabled']) {
          form[filterName].disable();
        } else {
          form[filterName].enable();
        }

      }


    }

    return form;
  }


  /*
    Oculta los controles del filtro en la vista y los deshabilita en el formulario para que no chequeen las validaciones
  */

  hideFilterControls(formFilter, visibilityCondition, filtersVisibility) {

    for (const filter in visibilityCondition) {

      if (filtersVisibility.hasOwnProperty(filter)) {
        // tambien se deshabilita el control
        if (visibilityCondition[filter]) {
          formFilter.controls[filter].disable();
        } else {
          formFilter.controls[filter].enable();
        }
        // ocultar el control en la pantalla
        filtersVisibility[filter] = visibilityCondition[filter];
      }

    }
  }

  getRangeDates(options, format) {

    let rangeOpts = {
      max: moment().endOf('month').format(format),
      min: moment().startOf('month').format(format)
    };

    if (options) {
      const currentDate = moment(`01/${options.fecha}`, 'DD/MM/YYYY');
      const monthQty = options.cantper;

      let cDate = moment(currentDate, `DD/MM/YYYY`);
      if (format === 'MM/YYYY') {
        // let endMonth = moment().endOf('month');
        cDate = moment(currentDate, format);
      }

      rangeOpts = {
        min: null,
        max: cDate.format(format)
      };

      if (cDate) {
        rangeOpts['min'] = cDate.startOf('month').subtract(monthQty, 'M').format(format);
      }

    }

    return rangeOpts;
  }



  createForm(formConfig: object, defaultData?: object) {

    if (!formConfig) {
      console.error('formConfig es obligatorio');
    }

    let form = {};
    const formItems = Object.keys(formConfig);

    // Recorro todos los items del formConfig
    for (const item of formItems) {
      // si existe la propiedad
      if (formConfig.hasOwnProperty(item)) {
        const formField = formConfig[item];

        // si el campo tiene hijos
        // es un formGroup
        if (formField.children) {

          form[item] = this.createForm(formField.children || formField.control.items);

        } else {
          // si no tiene hijos
          // es un formControl
          if (formField.control && formField.control.items) {
            form[item] = this.formBuilder.array([], this.getFormControlValidator(formField.control.validators || []));
          } else {
            // si posee datos default se los manda para que ya esten seteados al crear el control
            if(defaultData && defaultData[item]){
              form[item] = this.getFormControl(formField, defaultData[item]);
            }else{
              form[item] = this.getFormControl(formField);
            }
            
          }

        }

      }

    } // fin for

    return this.formBuilder.group(form);


  }

  getFormArray(controlOptions: object) {
    const controlItems = controlOptions['items'];
    const itemsFields = Object.keys(controlItems);
    var array = {};

    const validators = this.getFormControlValidator(controlOptions['validators'] || []);

    for (const item of itemsFields) {

      if (controlItems.hasOwnProperty(item)) {
        const field = controlItems[item];
        array[item] = '';

      }

    }

    return this.formBuilder.group(array, validators);

  }

  /**
   * 
   * Devuelve una instancia de formControl
   */
  getFormControl(controlOptions: object, defaultValue?: any) {

    if (!controlOptions) {
      console.error('controlOptions es obligatorio');
    }
    const validators = this.getFormControlValidator(controlOptions['validators'] || []);

    var control = new FormControl(defaultValue || '', validators);

    if (controlOptions['disabled']) {
      control.disable();
    }

    return control;

  }

  /**
   * Devuelve una instancia de Validator
   */
  getFormControlValidator(validatorOptions: []) {
    let validators = [];
    for (const type of validatorOptions) {

      // significa que es de tipo validator
      // luego hacer un chequeo mas preciso
      if (typeof type === 'function') {
        validators = validators.concat([type]);
      } else if (this.validatorsTypes.hasOwnProperty(type)) {
        validators = validators.concat(this.validatorsTypes[type]);
      }

    }

    return validators;
  }

  /*
      Genera un objeto con la descripcion de la visibilidad de los filtros,
      si deben estar ocultos o no.
  */
  setFiltersVisibility(filters) {
    var visibility = {};
    const fields = Object.keys(filters);

    for (const filterName of fields) {
      if (filters.hasOwnProperty(filterName)) {
        if (filters[filterName].hidden) {
          visibility[filterName] = true;
        } else {
          visibility[filterName] = false;
        }
      }

    }
    return visibility;
  }

  getPeriodControl(filter) {
    let formControl = null;
    let validators = [];

    if (filter.required) {
      validators.push(Validators.required);
    }

    switch (filter.control.type) {
      case 'monthyear-range':
        // Define el rango standard --> 1 mes
        let desde = moment(filter.control.config.max).startOf('month').subtract(this.rangePeriodMonths, 'M');
        let hasta = filter.control.config.max === '' ? moment() : filter.control.config.max;
        ///////////////////////////////////////// 
        if(filter.control.defaultValues){
          desde = filter.control.defaultValues.desde ? filter.control.defaultValues.desde : null;
          hasta = filter.control.defaultValues.hasta ? filter.control.defaultValues.hasta : null;
        }

        formControl = this.formBuilder.group({
          desde: [desde, validators],
          hasta: [hasta, validators],
        }, { validator: this.validateRangeDate });

        break;
      case 'date-range':
        // Define el rango standard --> 1 mes
        let desdeD = moment(filter.control.config.max).startOf('month').subtract(this.rangePeriodMonths, 'M');
        if (this.rangePeriodMonths === 1) {
          desdeD = moment(filter.control.config.max).startOf('month');
        }
        let hastaD = filter.control.config.max === '' ? moment() : filter.control.config.max;
        /////////////////////////////////////////  

        if (filter.control.defaultValues) {
          // si es vacio se mantiene el vacio
          if (filter.control.defaultValues.max === '') {
            desdeD = filter.control.defaultValues.max;
          }else{
            desdeD = filter.control.defaultValues.desde ? moment(filter.control.defaultValues.desde).startOf('month') : null;
          }

          if (filter.control.defaultValues.min === '') {
            hastaD = filter.control.defaultValues.max;
          }else{
            hastaD = filter.control.defaultValues.hasta ? moment(filter.control.defaultValues.hasta) : null;
          }
        }

        formControl = this.formBuilder.group({
          desde: [desdeD, validators],
          hasta: [hastaD, validators],
        }, { validator: this.validateRangeDate });

        break;
    }

    return formControl;
  }



}


