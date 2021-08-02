import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';

import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { ApiService } from '@core/services/http/api.service';
import { UserService } from '@core/services/user/user.service';

import { ChangeDetectorRef } from '@angular/core';

import * as moment from 'moment';
import { UiService } from '@core/services/ui.service';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';
import { Subject, Observable, Subscription } from 'rxjs';

import { config } from '@core/config/app-config';
import * as animations from '@core/animations/router.animations';
import { trigger, useAnimation } from '@angular/animations';

/**
 * 
 * Barra de filtros, obtiene un formulario con datos a utilizar como filtros.
 * Como resultado se obtiene un formulario (FormGroup).
 * 
 */
@Component({
  selector: 'app-filters-toolbar',
  templateUrl: './filters-toolbar.component.html',
  styleUrls: ['./filters-toolbar.component.scss'],
  animations: [ trigger('fadeIn', animations.SkeletonfadeIn()) ]
})
export class FiltersToolbarComponent implements OnInit, OnDestroy, AfterViewChecked {
  
  
  /**
   * Objeto que indica los campos que va a tener el formulario de filtros
   */

  filtersSpecs: object;
  //@Input() filters: object;

  @Input() set filters( optionsObj: any){
    //console.log('options', optionsObj);
    this.filtersSpecs = optionsObj;
    if(this.filtersSpecs){
      this.loading = true;
      
      if(!this.toolbarService.isLoaded){
        //console.log('prod y perios', this.toolbarService.productor, this.toolbarService.period);
        this.toolbarServiceSubscription = this.toolbarService.getToolbarServiceNotifications().subscribe( (res:object) => {
          // informa cuando ya se obtuvo toda la informacion para los filtros por default
          this.initializeFilters(res);
          this.loading = false;
        },
        error => {
          console.error(error);
          this.loading = false;
        });
      // }else if(this.toolbarService.productor && this.toolbarService.period){
      } else {
        const filterConfig = this.toolbarService.filtersConfigData;
        this.initializeFilters(filterConfig);
        this.loading = false;
      }
      
    }
  }

  get filters() {
    return this.filtersSpecs;
  }

  /**
   * Formulario de filtros de tipo FormGroup
   */
  filterForm: FormGroup;


  @Input() set formFilter( form: FormGroup ){
    if(!this.formFilter && form){
      this.filterForm = form;
      
      if(!this.filtersVisibility){
        this.filtersVisibility = this.setFiltersVisibility();
      }

      // Notifica cuando se hizo cambios sobre el formulario de filtros
      this.formFilter.valueChanges.subscribe( value => {
        // console.log('form change', this.formFilter);
        // si productor esta deshabilitado lo envia igual
        if(this.formFilter.get('p_cod_prod') && this.formFilter.get('p_cod_prod').disabled){
          value['p_cod_prod'] = this.formFilter.get('p_cod_prod').value;
        }
        this.filtersFieldHasChange.emit(this.formFilter.value);
        this.loading = false;
      });

      // chequear esto no me gusta, si es valido
      // se hace porque si ya vienen filtros cargados por defecto
      // o recuperados del state (al volver al reporte)
      if(this.filterForm.touched){
        this.loading = false;
      }
      /////////////////////////////////////////////////////////////
    }
    /*else{
      //console.log('last filters', this.toolbarService.getFiltersData());
      this.filterForm = this.formBuilder.group(this.formValidator.generateForm(this.filters, this.filtersVisibility));
    }*/
  }

  get formFilter(){
    return this.filterForm;
  }
  /**
   * Evento que indica si se han aplicado filtros.
   */
  @Output() sendFilters: EventEmitter<object> = new EventEmitter<object>();

  /**
   * Evento que indica cuando cualquier campo del formulario de filtros fue cambiado.
   */
  @Output() filtersFieldHasChange: EventEmitter<object> = new EventEmitter<object>();


  /**
   * Objeto que especifica la visibilidad de cada filtro.
   */
  @Input() filtersVisibility?: object;
  /**
   * Texto del botón submit
   */
  submitText: string = 'Aplicar';

  /**
   *  Texto custom de boton submite 
   */

  @Input() customSubmitBtnText: string;

  /**
   * Indica si los datos de filtros fueron cargados
   */
  loaded: boolean;
  loading: boolean;

  /**
   * Indica si se se han aplicado los filtros
   */

   @Input() autoApplyFilters: boolean = true;


  applyingFilters: boolean = false;


  /**
   * Notifica los cambios en los parametros query de la url
   */
  queryParamsObserver: Observable<any>;


  toolbarServiceSubscription: Subscription = new Subscription();

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder, 
    private cdRef: ChangeDetectorRef, 
    private formValidator: FormsFactoryService,
    private apiService: ApiService,
    private userService: UserService,
    private uiService: UiService,
    private toolbarService: FilterToolbarService) {
    }



  ngOnInit() {
    this.uiService.loadingTableData.subscribe( loading => {
      this.applyingFilters = loading;
    });

    //this.toolbarService.initToolbar();

  }

  ngOnDestroy() {
    this.toolbarServiceSubscription.unsubscribe();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  get formControls(){
    return this.formFilter.controls;
  }

  get filtersKey(){
    return Object.keys(this.filters);
  }

  get hideWhenLoading(){
    return this.loading && config.ux.skeletonLoadingEnable;
  }
  
  addFiltersObserver(){
    
    // ver como agregar los observer en una sola recorrida del array
    for (const filterName of Object.keys(this.filters)) {
      if(this.filters.hasOwnProperty(filterName)){
        const filter = this.filters[filterName];

        if(filter.actions){
          const conditionValues = Object.keys(filter.actions);

          this.formFilter.get(filterName).valueChanges.subscribe( 
            value => {
              if(value === 'PDF'){
                this.submitText = 'Aplicar';
              }else if(value === 'EXCEL'){
                this.submitText = 'Exportar';
              }

              if(conditionValues.indexOf(value) !== -1){
                // si es hidden --> hay que ejecutar accion
                if(filter.actions[value].hidden){
                  // console.log(`value change ${filterName} = ${value}`, filter.actions[value].hidden);
                  this.formValidator.hideFilterControls(this.formFilter, filter.actions[value].hidden, this.filtersVisibility);

                }
              }

            }
          );
        }

      }
    }
  }


  public applyFilters() {
    // this.formFilter.markAllAsTouched();
    // solo envia los datos de los campos enabled
    const oFilter = this.formFilter.value;

    // obtiene todos los datos del formulario, incluye los disable
    const rawFilters = this.formFilter.getRawValue();
    const filterCopy = Object.assign({}, oFilter);
    
    // envio productor que puede estar disable
    filterCopy['p_cod_prod'] = rawFilters['p_cod_prod'];
    this.sendFilters.emit(filterCopy);
  }
  
  
  /*
      Genera un objeto con la descripcion de la visibilidad de los filtros,
      si deben estar ocultos o no.
  */
  setFiltersVisibility(){
    var visibility = {};
    var fields = Object.keys(this.filters || {});

    for(let filterName of fields){
      if(this.filters.hasOwnProperty(filterName)){
        if(this.filters[filterName].hidden){
          visibility[filterName] = true;
        }else{
          visibility[filterName] = false;
        }
      }

    }
    return visibility;
  }

  initializeFilters(filterConfig){
      
    // Genera el form filter si no existe
    if(!this.formFilter){
      this.filtersVisibility = this.setFiltersVisibility();
      this.formFilter = this.formBuilder.group(this.formValidator.generateForm(this.filters, this.filtersVisibility));
    }else{
      if(this.formFilter.get('p_periodo')){
        this.formFilter.removeControl('p_periodo');
        this.filters['p_periodo'].control.config.max = moment('01/'+filterConfig.period.fecha,'DD/MM/YYYY');
        this.filters['p_periodo'].control.config.min = moment('01/'+filterConfig.period.fecha,'DD/MM/YYYY').subtract(filterConfig.period.cantper,'M');
        this.formFilter.setControl('p_periodo',this.formValidator.getPeriodControl(this.filters['p_periodo']));
      }
    }


    const filtersStoreDate = this.toolbarService.getFiltersData();
    if(filtersStoreDate.lastAppliedFilters){
      console.log('last filters', filtersStoreDate);
      this.filtersVisibility = this.setFiltersVisibility();
      this.formFilter = this.formBuilder.group(this.formValidator.generateForm(this.filters, this.filtersVisibility));
      if(filtersStoreDate.lastAppliedFilters){
        this.formFilter.patchValue(filtersStoreDate.lastAppliedFilters);
        this.formFilter.markAsTouched();
      }
    }else{
      this.pasteDefaultFilters(filterConfig);
      //this.filtersVisibility = this.setFiltersVisibility();
      //this.formFilter = this.formBuilder.group(this.formValidator.generateForm(this.filters, this.filtersVisibility));
      
      
    }
    
    if(this.autoApplyFilters && this.formFilter.valid){
      // el formulario es valido y nunca fue presionado el boton aplicar
      this.applyFilters();
    }
    this.addFiltersObserver();

  }


  pasteDefaultFilters(filterConfig){
     // informa cuando ya se obtuvo toda la informacion para los filtros por default
      
     let range = this.formValidator.getRangeDates(filterConfig['period'],'MM/YYYY');

     // se carga la info para los periodos
     /////////////////////////////////////////////////////////////////////////////
     // RANGOS DE PERIODOS
     //////////////////////////////////////////////////////////////////////////////
     if(this.filtersSpecs['p_periodo']){
       
       let max = moment(moment(), 'MM/YYYY');
       if(range.max){
         max = moment(range.max, 'MM/YYYY');
       }
       
       // this.filters['p_periodo'].control.config.max = moment(range.max, 'MM/YYYY');
 
       /////// Si no tiene max y min por default , lo obtiene de la api
       if(!this.filtersSpecs['p_periodo'].control.config.max){
         this.filtersSpecs['p_periodo'].control.config.max = moment(max, 'MM/YYYY');
       }
 
       if(!this.filtersSpecs['p_periodo'].control.config.min){
         this.filtersSpecs['p_periodo'].control.config.min = moment(range.min, 'MM/YYYY');
       }
       
     }
       // cambiar por getType del field
     
     /////////////////////////////////////////////////////////////////////////////
     // FECHAS
     //////////////////////////////////////////////////////////////////////////////
     if(this.filters['p_fecha'] || this.filters['p_fec']){
 
       // el campo de fecha se puede llamar 'p_fecha' 'p_fec'
       
       var field = 'p_fecha';
       if(this.filters['p_fec']){
         field = 'p_fec';
       }
 
       //var range = this.formValidator.getRangeDates(res['period'],'DD/MM/YYYY');
       
       let max = moment(moment(), 'DD/MM/YYYY');
       if(range.max){
         max = moment(range.max, 'DD/MM/YYYY');
       }
       /////// Si no tiene max y min por default , lo obtiene de la api
       if(!this.filters[field].control.config.max){
         this.filters[field].control.config.max = moment(max, 'DD/MM/YYYY').endOf('month');
       }
 
       if(!this.filters[field].control.config.min){
         this.filters[field].control.config.min = moment(range.min, 'DD/MM/YYYY').startOf('month');
       }
     }
       
     //////////////////////////////////////////////////////////////////////////////
     // PRODUCTOR ---- Agrego valor default para productor
     //////////////////////////////////////////////////////////////////////////////
 
     if(this.filters['p_cod_prod']){
      
      let prod = filterConfig['prod'];
         
         if(prod){
           this.formFilter.get('p_cod_prod').setValue(prod);
           
           if(prod['estitular'] === 'N'){ // si es N, Productor Normal
            this.formFilter.controls['p_cod_prod'].disable();
           }

           this.filtersSpecs['p_cod_prod'].control.defaultValue = prod;

         }
         console.log('filters loaded');
         //// Cargo todo los filtros por default
         /*if(this.autoApplyFilters && this.formFilter.valid){
           // el formulario es valido y nunca fue presionado el boton aplicar
           this.applyFilters();
         }*/
 
    
     } else {
       console.log('filters loaded');
     }
 
  }

  get formIsEmpty(){
    const data = this.filterForm.value;
    return this.objectEmpty(data);

  }

  objectEmpty(obj: object){
    let fields = Object.keys(obj);

    for(let field of fields){

      if(obj[field] && typeof obj[field] === 'object'){
        if(!this.objectEmpty(obj[field])){
          return false;
        }
      }else{
        if(obj[field] !== '' && obj[field]){
          return false;
        }
      }
    }
    return true;
  }

}
