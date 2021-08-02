import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ControlOptions } from '@core/models/form/controlOptions';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { CoverageTableService } from '@app/life-quote/coverage/coverage-table.service';

@Component({
  selector: 'app-coverage-life-table',
  templateUrl: './coverage-life-table.component.html',
  styleUrls: ['./coverage-life-table.component.scss']
})
export class CoverageLifeTableComponent implements OnInit {

  @Input() controlOptions: ControlOptions;
  @Input() iFormControl: FormArray;
  addModalTitle: string = 'Agregando Riesgo';
  isLoading: boolean = false;
  rowsSelected: object[] = [];
  
  totals: object = {
    prima: 0,
    premio: 0,
    suma_asegurada: 0
  }
  oldValue: object[];
  customAddDialog: boolean = true;
  loadingPremio: boolean = false;
  coberturaPremio: object[];
  injuredData: any[] = [];
  showBtnSave: boolean;
  showBtnEmit: boolean;

  constructor(
    private coverageTableService: CoverageTableService, 
    private formService: FormsFactoryService, 
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) { 
    
  }

  get tableIsEmpty(){
    return this.iFormControl.value.length === 0;
  }

  get tableData(){
    return this.iFormControl.value || [];
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.cd.detectChanges();
    
    this.coverageTableService.getCoverageTableService().subscribe( res => {
     
      // console.log('cobertura table action', res);
      switch(res.action){
        case 'setAll':
          // agregar formarray a iFormControl
          this.addFormItems(res.data.length);
          // pega los datos
          // this.iFormControl.patchValue(res.data);
          this.setCoverageData(res.data);
          
          break;
        case 'clear':
          this.iFormControl.clear();
          this.setCoverageData([]);
        case 'loading':
          this.isLoading = res.data;
      }
      
    });

    this.coverageTableService.coverage.subscribe( coberturas => {
     
       // agregar formarray a iFormControl
       this.addFormItems(coberturas.length);
       // pega los datos
       // this.iFormControl.patchValue(res.data);
       this.setCoverageData(coberturas);

       this.showBtnSave = this.controlOptions['control']['action'].showBtnSave;
       this.showBtnEmit = this.controlOptions['control']['action'].showBtnEmit;
    });

    this.iFormControl.valueChanges.subscribe( data => {
      this.injuredData = data;
    });
  }


  getTotals(){
    
    this.totals['prima'] = 0;
    this.totals['suma_asegurada'] = 0;
    this.totals['premio'] = 0;
    
    if(this.rowsSelected.length > 0){
      
      for(let row of this.rowsSelected){

        this.totals['prima'] += row['imp_prima'];
        this.totals['suma_asegurada'] += row['imp_suma_asegurada'];
        this.totals['premio'] += row['imp_premio'];
  
      }

    }
    
  }

  ngDoCheck() {}

  getItems(){
    return this.formService.getFormArray(this.controlOptions['control']);
  }

  addFormItems(dataRows){
    // limpiar el formarray por las dudas
    this.iFormControl.clear();
    var controls = []

    for (let i = 0; i < dataRows; i++){
      //controls.push(this.getItems());
      this.iFormControl.push(this.getItems());
    }

    // seteo los items en una unica vez
    //this.iFormControl.controls. = controls;
  }

  inputHasChange(event: object){

  }
  
  coverageIsSelected(cobertura){

    return this.rowsSelected.filter( item => {
      return item['cod_cobertura'] === cobertura
    });

  }

  onRowSelected(rows){
    //console.log('rows selected', rows, this.isLoading);
    this.rowsSelected = rows;
    this.getTotals();
  }

  disableNoSelectedRowInput(){

    for(let [i,row] of this.iFormControl.value.entries()){
      const cod = row.cod_cobert;
      const index = this.rowsSelected.findIndex( x => x['cod_cobertura'] === cod);
      if( index !== -1 ){
        this.iFormControl.value[i].selected = true;
      }else{
        this.iFormControl.value[i].selected = false;
      }

    }

  }

  setDefaultData(data){
    let options = this.controlOptions;
    options.control['defaultData'] = data;

    this.controlOptions = { ...options };
  }
  
  
  setCoverageData(data: object[]){
    this.setDefaultData(data);
   
   
    this.iFormControl.markAsTouched();
  }

  addDialogOpened(){
    console.log('dialog opened');
  }

}
