import { Component, OnInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormControl, Validators } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';
import * as animations from '@core/animations/router.animations';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  animations: [ 
    trigger('chipsAnimation', [
      state('hide', style({ width:'100%', transform: 'translateY(-530%)', overflow: 'hidden' })),
      state('show', style({ width:'100%',  })),
      transition('hide => show', 
        animate('0.6s ease-in-out', style({ transform: 'translateY(0%)' }))),
      transition('show => hide', 
        animate('0.3s ease-in-out', style({ opacity: 0 })))
    ])
  ]
})
export class SearchInputComponent implements OnInit {

  control: FormControl;
  controlOptions: object = {
    label: 'Buscador Integral',
    control: { 
      type: 'typeahead',
      inputId: 'searchInput',
      class: 'col-sm-8',
      options: {
        value: 'nombre',
        key: 'codpas',
        description: 'codpas'
      },
      suffixIcon: 'search',
      suffixTooltip: '',
      pasteFieldOnSelect: 'nombre',
      defaultValue: '',
    },
    class: 'col-sm-12 col-md-12 col-lg-4',
    required: true
  };

  

  @ViewChildren('searchControl') search: ElementRef;

  visibleFilters: boolean = false;
  // chipStatus: string;
  filterSelected: string = '';
  filtersState: string = 'hide';
  // chipSelected: string;
  searchFilters: object[] = [
    { field: 'asegurado', text: 'Asegurado', svgIcon: 'home_umbrella', tooltip: 'Buscar Asegurado' },
    { field: 'poliza', text: 'Póliza', svgIcon: 'poliza-cartera', tooltip: 'Buscar Póliza' },
    { field: 'dominio', text: 'Dominio', svgIcon: 'home_document', tooltip: 'Buscar Dominio' }
  ];


  @ViewChild('chipList') chipList: MatChipList;

  constructor(
    private formService: FormsFactoryService, 
    private router: Router,
    private navService: NavigationService) { }

  ngOnInit() {
    this.control = this.formService.getFormControl(this.controlOptions);
    //this.control.disable();
  }

  get showFilters(){
    return this.visibleFilters;
  }


  get chipSelected(){
    return this.filterSelected;
  }

  set chipSelected(value){
    this.filterSelected = value;
  }

  get chipStatus(){
    /*if(this.filtersState === 'show'){
      this.control.disable();
    }else if(this.filtersState){
      this.control.enable();
    }*/
    return this.filtersState;
  }

  set chipStatus(value){
    if(value === 'show' && !this.chipSelected){
      this.control.disable();
    }
    this.filtersState = value;
  }

  onFocus(event){
    /*if(!this.chipSelected){
      this.chipStatus = 'show';
    }*/
    
  }

  onFocusOut(event){
    // this.chipStatus = 'hide';
  }

  onBlur(event){
    // console.log('blur');
    
  }

  changeChipList(event){
    // console.log('selected chips', this.selectedFilter);
  }

  clickSelectedFilter(item){
    // console.log('selected', item);

    this.chipSelected = item['field'];
    // this.search['first'].onFocus();
    let options = this.controlOptions;
    
    if(item.field === 'asegurado'){
      item['text'] = 'Asegurado';
      options = this.AseguradoConfig;
      
    }

    if(item.field === 'poliza'){
      item['text'] = 'Póliza';
      options = this.PolizaConfig;
    }

    if(item.field === 'dominio'){
      item['text'] = 'Dominio';
      options = this.DominioConfig;
    }
    
    options['label'] = `Buscar ${item['text']}`;
   
    this.controlOptions = { ...options };

    // this.chipStatus = 'hide';
    this.control.enable();
    // document.getElementsByName('searchInput')[0].focus();
    //this.search['last'].autocomplete.openPanel()
    //this.search['first'].autocomplete.autocomplete._element.nativeElement.focus();
    //this.search['last'].autocomplete._element.nativeElement.focus();
  }

  suffixClicked(selected){
    // this.chipSelected = '';
    //this.chipStatus = 'show';
    //if(!this.chipSelected){
      //this.control.disable();
    //}
    this.clickSelectedFilter({
      field: selected
    })
  }

  get AseguradoConfig() {
    return {
      label: 'Buscar Asegurado',
      control: { 
        type: 'typeahead',
        inputId: 'searchInput',
        class: 'col-sm-8',
        path: '/listas/LIST_ASEGURADOS',
        options: {
          key: 'cod_asegurado',
          value: 'list_val_aseg',
          description: 'cod_asegurado'
        },
        pasteFieldOnSelect: 'cod_asegurado',
        apiSearchFieldname: 'p_filtro',
        defaultValue: '',
      },
      class: 'col-sm-12 col-md-12 col-lg-4',
      required: true
    }
  }

  get PolizaConfig(){
    return {
      label: 'Buscar Póliza',
      control: { 
        type: 'typeahead',
        inputId: 'searchInput',
        controlType: 'number',
        class: 'col-sm-8',
        path: '/listas/LIST_POLIZAS',
        options: {
          value: 'desc_sec',
          key: 'poliza',
          description: 'poliza'
        },
        pasteFieldOnSelect: 'poliza',
        apiSearchFieldname: 'p_poliza',
        defaultValue: ''
      },
      validators: [
        Validators.minLength(10)
      ],
      class: 'col-sm-12 col-md-12 col-lg-4',
      required: true
    };

  }


  get DominioConfig(){
    return {
      label: 'Buscar Dominio',
      control: { 
        type: 'typeahead',
        inputId: 'searchInput',
        class: 'col-sm-8',
        path: '/listas/LIST_DOMINIOS_POLIZAS',
        options: {
          value: 'poliza_sec',
          key: 'dominio',
          description: 'dominio'
        },
        pasteFieldOnSelect: 'dominio',
        apiSearchFieldname: 'p_dominio',
        defaultValue: ''
      },
      validators: [
        Validators.minLength(7)
      ],
      class: 'col-sm-12 col-md-12 col-lg-4',
      required: true
    };

  }

  itemSelected(data){
    //console.log('item selected', data);
    this.control.setValue('');
    if(this.chipSelected === 'asegurado'){
      const cod = data['cod_asegurado'];
      if(cod && data['list_val_aseg']){
        this.navService.navigateToPage({
          baseUrl: '/reportes',
          modulePath: '/reportes-productores',
          //pagePath: `/poliza-cartera/list?cod_asegurado=${this.currentAsegurado}`
          pagePath: `/poliza-cartera/list`,
          queryParams: {
            p_cod_asegu: JSON.stringify({ 
              cod_asegurado: data.cod_asegurado,
              list_val_aseg: data['list_val_aseg'].toUpperCase()
            })
          }
        });
        
      }

    }

    if(this.chipSelected === 'poliza' || this.chipSelected === 'dominio'){
      if(data){
        this.navService.navigateToPage({
          baseUrl: '/reportes',
          modulePath: '/reportes-productores',
          //pagePath: `/poliza-cartera/list?cod_asegurado=${this.currentAsegurado}`
          pagePath: `/poliza-cartera/${data.poliza}/${data.cod_sec}/0/0`
        });
        //this.router.navigate([`/reportes-productores/poliza-cartera/${data.poliza}/${data.cod_sec}/0/0`]);
      }
    }
  }

}
