import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ControlOptions } from '@core/models/form/controlOptions';
import { CoberturasTableService } from '@core/services/components/coberturas-table.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { AeronavegacionService } from '@app/aeronavegacion/aeronavegacion.service';

@Component({
  selector: 'app-coberturas-table',
  templateUrl: './coberturas-table.component.html',
  styleUrls: ['./coberturas-table.component.scss']
})
export class CoberturasTableComponent implements OnInit {

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
  primaFinal: string;
  premioFinal: string;
  sumaAseguradaFinal: string;
  oldValue: object[];
  customAddDialog: boolean = true;
  loadingPremio: boolean = false;
  coberturaPremio: object[];
  coberturasData: any[] = [];
  simbolo: string = "$";
  
  constructor(
    private cobTableService: CoberturasTableService, 
    private formService: FormsFactoryService, 
    private fb: FormBuilder,
    private aeroService: AeronavegacionService,
     private cd: ChangeDetectorRef
  ) { 
  }

  get tableIsEmpty(){
    return this.iFormControl.value.length === 0;
  }

  get tableData(){
    return this.iFormControl.value || [];
  }

  get simboloFinal(){
    return this.simbolo;
  }


  ngOnInit() {
   // console.log('cobertura table', this.controlOptions, this.iFormControl);

    this.simbolo = this.controlOptions.control['items']['imp_suma_asegurada']['control'].moneda

  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    /*
    this.iFormControl.valueChanges.subscribe( data => {
      if(!this.isLoading){
        console.log('input change', data);
      }
      
    });
    */

    
    this.cobTableService.getCoberturaTableService().subscribe( res => {
      // console.log('cobertura table action', res);
      switch(res.action){
        case 'setAll':
          // agregar formarray a iFormControl
          this.addFormItems(res.data.length);
          // pega los datos
          // this.iFormControl.patchValue(res.data);
          this.setCoberturasData(res.data);
          
          break;
        case 'clear':
          this.iFormControl.clear();
          this.setCoberturasData([]);
        case 'loading':
          this.isLoading = res.data;
      }
      
    });

    this.cobTableService.loadingPremioSubject.subscribe( loading => {
      this.loadingPremio = loading;
    });

    this.cobTableService.premio.subscribe( premio => {
      this.coberturaPremio = premio;
      this.setPremio();
    });

    this.cobTableService.coberturas.subscribe( coberturas => {
       // agregar formarray a iFormControl
       this.addFormItems(coberturas.length);
       // pega los datos
       // this.iFormControl.patchValue(res.data);
       this.setCoberturasData(coberturas);
    });

    this.iFormControl.valueChanges.subscribe( data => {
      this.coberturasData = data;
    });
  }

  ngDoCheck() {
    
    /*if(this.oldValue !== this.iFormControl.value){
      console.log('do check coberturas table', this.iFormControl.value);
      this.oldValue = this.iFormControl.value;
    }*/
    
  }



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

    if(!event['valid']){
      return;
    }
    const controlName = event['controlName'];
    const index = event['indexArray']
    const rowData = this.iFormControl.controls[index].value;
    const controlsRow = this.iFormControl.controls[index];

    const filters = {
      p_cobertura: rowData.cod_cobertura,
      p_suma_asegurada: rowData.imp_suma_asegurada,
      p_prima: rowData.imp_prima,
      p_tasa: rowData.porc_tasa
    }

   

    this.isLoading = true;
    // actualizar la prima en la tabla
    this.aeroService.getPrimaPremio([rowData], filters).subscribe( prima => {

      console.log('update prima changed', prima);
      if(prima){
        let data =  this.iFormControl.getRawValue();
        
        
      data[index].imp_prima = prima['p_prima'];
      data[index].imp_suma_asegurada = prima['p_suma_asegurada'];
      data[index].porc_tasa =  prima['p_tasa'];
      data[index].imp_premio = prima['p_premio']
        
      this.iFormControl.controls[index].get('imp_prima').setValue(prima['p_prima'])
      this.iFormControl.controls[index].get('imp_suma_asegurada').setValue(prima['p_suma_asegurada']);
      this.iFormControl.controls[index].get('porc_tasa').setValue(prima['p_tasa']);
      this.iFormControl.controls[index].get('imp_premio').setValue(prima['p_premio']);

      this.setCoberturasData(data);
    }
      this.isLoading = false;
    },
    error => {
      this.isLoading = false;
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

    this.primaFinal = this.simbolo + this.totals['prima'].toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    this.premioFinal = this.simbolo + this.totals['premio'].toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    this.sumaAseguradaFinal = this.simbolo + this.totals['suma_asegurada'].toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    
  }


  setPremio(){
    let total = 0;
   
    if(this.coberturasData && this.coberturasData.length > 0 && this.coberturaPremio && this.coberturaPremio.length > 0){
      console.log('premios', this.coberturaPremio);
      for(let i = 0; i < this.coberturasData.length; i++){
        let item = this.coberturasData[i];
       
        /*if(this.coberturaIsSelected(item['cod_cobert']).length > 0){
          let premio = this.coberturaPremio[i]['p_premio'];
          total = total + premio;
        }*/
        let premio = this.coberturaPremio[i]['p_premio'];
        this.iFormControl.controls[i].get('imp_premio').setValue(premio);

      }

    }

    //this.totals['premio'] = total;
  }
  
  coberturaIsSelected(cobertura){

    return this.rowsSelected.filter( item => {
      return item['cod_cobertura'] === cobertura
    });

  }

  onRowSelected(rows){
    //console.log('rows selected', rows, this.isLoading);
    this.rowsSelected = rows;

    // deshabilitar campos no seleccionados
    // this.disableNoSelectedRowInput();
    // this.setPremio();
    this.getTotals();

  }


  disableNoSelectedRowInput(){

    for(let [i,row] of this.iFormControl.value.entries()){

      const cod = row.cod_cobert;

      const index = this.rowsSelected.findIndex( x => x['cod_cobertura'] === cod);
      if( index !== -1 ){
        this.iFormControl.value[i].selected = true;
        //this.iFormControl.controls[index].get('suma_asegurada').enable();
        //this.iFormControl.controls[index].get('tasa').enable();
      }else{

        this.iFormControl.value[i].selected = false;
        //this.iFormControl.controls[i].get('suma_asegurada').disable();
        //this.iFormControl.controls[i].get('tasa').disable();
      }

    }

  }

  setDefaultData(data){
    let options = this.controlOptions;
    options.control['defaultData'] = data;

    this.controlOptions = { ...options };
  }
  
  
  setCoberturasData(data: object[]){
    this.setDefaultData(data);
    this.getTotals();
    // this.setPremio();
    this.iFormControl.markAsTouched();
  }

  addDialogOpened(){
    console.log('dialog opened');
  }

}
