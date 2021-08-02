import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';


import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '../../dynamic-form/dialog-form/dialog-form.component';
import { DynamicFormComponent} from '../../dynamic-form/dynamic-form/dynamic-form.component';
import { DialogFormService } from '@core/services/forms/dialog-form.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { ToasterService } from '@core/services/toaster.service';
import { ApiService } from '@core/services/http/api.service';
import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [ trigger('fadeIn', animations.SkeletonfadeIn() )]
})
export class TableComponent implements OnInit, OnDestroy {

  @Input() iFormControl: FormArray;
  @Input() loading?: boolean = false;
  @Input() dataTable?: object[];
  @Input() actionFormTitle: string;
  @Input() customAddDialog: boolean = false;
  @Output() arrayInputChange = new EventEmitter<any>();
  @Output() openDialog: EventEmitter<any> = new EventEmitter<any>();
  
  oldValue: object[];

  /**
   *  Devuelve lista de rows seleccionados
   */
  @Output() rowSelectionChange = new EventEmitter<any>();

  /**
   *  Devuelve lista de rows seleccionados
   */
  @Output() rowClicked = new EventEmitter<any>();

  /**
   *  Devuelve lista de rows seleccionados
   */
  @Output() rowDblClicked = new EventEmitter<any>();


  /**
   *  Devuelve lista de rows seleccionados
   */
  @Output() customActionClicked = new EventEmitter<any>();



  activeRowIndex: number = 0;
  formOptions: object;
  subscription: Subscription = new Subscription();
  dataSource: any;
  // loadingFlag: boolean = false;
  totals: any = {};
  /**
   * Modelo que contiene los items seleccionados
   */
  selection = new SelectionModel<any>(true, []);
  

  @Input() set controlOptions(options: object){

    this.formOptions = options;
    if (this.formOptions['control']['path'] && this.editable) {

      this.loading = true;

      // set encarga de setear los datos de la table si es que proviene de un servicio 'control.path'
      this.apiService.getListOptions(this.formOptions['control']['path'],
        { ...this.formOptions['control']['filters'] } || {}).subscribe((data: object[]) => {

          if(data.length > 0){

            // agrega los datos del servicio en un array
            const dataTable = this.fillDataTable(data);
            // uno la informacion de la api con los datos de la tabla
            this.dataSource = new MatTableDataSource(dataTable);
             // agregar formarray a iFormControl
            this.addFormItems(data.length);
            // pega los datos
            this.iFormControl.patchValue(dataTable);

          }else{
            // hay que vaciar la tabla y mostrar mensaje de que esta vacio
            this.dataSource = new MatTableDataSource([]);
            if (this.iFormControl) {
              this.iFormControl.clear();
            }
          }
          
          this.loading = false;
        });

    } else {
      
      // si podes datos por defecto, tabla pre cargada
      if(this.formOptions['control']['defaultData']){
        var defaultData = this.formOptions['control']['defaultData'];
        this.dataSource = new MatTableDataSource(defaultData);
        if (this.iFormControl == undefined) {
          console.error('no deberia ser undefined el iFormControl');
          return;
        }
        // agregar formarray a iFormControl
        if(this.iFormControl && (this.iFormControl.length === 0 || this.iFormControl.length < defaultData.length) ){
          this.addFormItems(defaultData.length);
        }
        // pega los datos
        this.iFormControl.patchValue(defaultData);
        this.setDefaultsCheckedRows(defaultData);
      }else {
        // hay que vaciar la tabla y mostrar mensaje de que esta vacio
        this.dataSource = new MatTableDataSource([]);
        if (this.iFormControl) {
          this.iFormControl.clear();
        }
        this.setDefaultsCheckedRows([]);
      }
      
    }


  }

  get controlOptions(){
    return this.formOptions;
  }

  constructor(
    public dialog: MatDialog,
    private formService: FormsFactoryService,
    private dialogService: DialogFormService,
    private toastService: ToasterService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {

      //this.loading = true;
    }

  ngOnInit() {
    // console.log('init form table', this.controlOptions, this.iFormControl);  
    this.dataSource = new MatTableDataSource(this.tableData);
    if(this.showFooter){
      // this.initTotals();
    }
    // console.log('table form', this.iFormControl);
    /**
     * Chequear la inicializacion de la tabla segun el tipo de tabla
     * Si se va a editar o va a ser editable con dialog
     */
    if(!this.controlOptions['control'].editable){

      if (this.actions && this.actions.addDialog){
        // me subscribo al servicio del dialog
        this.subscription = this.dialogService.getDialogFormActions().subscribe(
          formData => {
            // this.iFormControl.push(formData);
            const itemsGroup = this.getItems();
            itemsGroup.patchValue(formData);
            this.iFormControl.push(itemsGroup);
            this.iFormControl.markAsTouched();
            this.dataSource = new MatTableDataSource(this.iFormControl.getRawValue());
            this.toastService.show('Se ha agregado correctamente', 'success');
  
          });

      } else {

        
        if(this.iFormControl.value.length === 0){
          // ver si debo crear un item vacio
          if(this.editable){
            const itemsGroup = this.getItems();
            this.iFormControl.push(itemsGroup);
            this.iFormControl.markAsTouched();
            this.dataSource = new MatTableDataSource(this.iFormControl.getRawValue());
          }else{
            this.dataSource = new MatTableDataSource([]);
          }
          
        }
        
      }

    }

   

    

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.cd.detectChanges(); 

     // evento que carga los items a la tabla
    this.iFormControl.valueChanges.subscribe( data => {
      // console.log('input change', data, this.loading);
      /*if(!this.loading){
        let rowHasChange = this.getRowHasChange(data);
        if(rowHasChange){
          console.log('row has change', rowHasChange);
        }
      }*/
      //this.dataSource = this.dataSource = new MatTableDataSource(data);
      //this.setDefaultsCheckedRows(data);
      
    });
  }

  /*ngDoCheck() {
    
    if(JSON.stringify(this.oldValue) !== JSON.stringify(this.iFormControl.value)){
      // console.log('do check', this.iFormControl.value);
      this.oldValue = this.iFormControl.value;
    }
    
  }*/

  get actions(){
    return this.controlOptions['control'].actions;
  }

  get displayedColumns(){

    // devuelve como primer columna 'select'
    if(this.selectable){
      return ['select'].concat(this.controlOptions['control'].columns);
    }
    return this.controlOptions['control'].columns;
  }

  get items(){
    return this.controlOptions['control'].items;
  }

  get tableData(){
    return this.iFormControl.value;
  }

  get isHidden(){
    return this.controlOptions['hidden'];
  }

  get showFooter(){
    return this.controlOptions['control']['footer'] && this.controlOptions['control'].footer.length !== 0;
  }

  get columns(){
    return this.controlOptions['control']['columns'];
  }

  get selectable(){
    return this.controlOptions['control'].selectable || false;
  }


  get editable() {
    return this.controlOptions['control'].editable || false;
  }

  get tableIsEmpty(){
    return this.dataSource.data.length === 0;
  }

  get formValue(){
    return this.iFormControl.value || [];
  }

  get initialLoading(){
    return this.loading && true;
  }

  /*get footer(){
    return this.controlOptions['control']['footer'] || [];
  }*/

  initTotals(){
    let totals = {};
    /*const footerItems = this.footer || [];

    for(const item of footerItems){
      totals[item] = 0;
    }

    this.totals = totals;*/
  }

  setDefaultsCheckedRows(data: object[]){
    this.selection.clear();
    for(let row of data){
      if(row['selected']){
        this.selection.toggle(row);
        this.rowSelectionChange.emit(this.selection.selected);
      }
    }
  }

  checkInputVisibility(index: number): boolean {
    if( this.iFormControl.value[index]){
      return this.iFormControl.value[index].selected;
    }

    return true;
  }

  addRow(){

    if(!this.customAddDialog){
      const dialogRef = this.dialog.open(DialogFormComponent, {
        width: '70%',
        height: 'auto',
        data: { 
          component: DynamicFormComponent,
          inputs: {
            formConfig: this.controlOptions,
            title: this.actionFormTitle
          }
        }
      });
      /*let items = this.iFormControl;
      items.push(this.newItem());
      this.dataSource.data = items.value; */
    }else{
      this.openDialog.emit(true);
    }
    

  }

  deleteRow(element: any, index: number){
    // console.log('delete row', element, index);
    this.iFormControl.removeAt(index);
    this.dataSource = new MatTableDataSource(this.iFormControl.getRawValue());
    this.toastService.show('Se ha borrado correctamente', 'success');
  }

  getItems(){
    return this.formService.getFormArray(this.controlOptions['control']);
  }

  getTotalColumn(columnName: string){
    return this.iFormControl.value.map(
      t => t[columnName]).reduce(
        (acc, value) => parseInt(acc,0) + parseInt(value || 0,0), 0);
  }

  inputChange(columnName: string, arrayIndex: number, inputValue: string){

    let control = this.iFormControl.controls[arrayIndex].get(columnName);
    // si cambio el valor del input
    if(inputValue !== control.value){
      control.setValue(inputValue);
      this.arrayInputChange.emit({
        controlName: columnName,
        indexArray: arrayIndex
      });

      if(this.showFooter){
        // this.calcTotal(columnName);
      }
    }
    
  }

  calcTotal(columnName: string){
    /*if(this.footer.indexOf(columnName) !== -1){
      this.totals[columnName] = this.getTotalColumn(columnName);
    }*/
  }

  fillDataTable(data){
    let list = [];

    for(const row of data){
      let item = {}
      for(const field of this.columns){
        item[field] = row[field] || ''; 
      }

      list.push(item);

    }

    // ('data list', list);
    return list;
  }

  addFormItems(dataRows){
    // limpiar el formarray por las dudas
    this.iFormControl.clear();

    for (let i = 0; i < dataRows; i++){
      this.iFormControl.push(this.getItems());
    }

  }

  /** Metodos de seleccion */
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  setTableData(data){
    // agrega los datos del servicio en un array
    const dataTable = this.fillDataTable(data);
    // uno la informacion de la api con los datos de la tabla
    this.dataSource = new MatTableDataSource(dataTable);
     // agregar formarray a iFormControl
    this.addFormItems(data.length);
    // pega los datos
    this.iFormControl.patchValue(dataTable);
  }
  

  rowChecked(event, row){
    event ? this.selection.toggle(row) : null
    this.rowSelectionChange.emit(this.selection.selected);
  }

  allRowChecked(event){
    event ? this.masterToggle() : null;
    this.rowSelectionChange.emit(this.selection.selected);
  }

  clickedRow(event, row){

    if(this.formOptions['selectable']){
      this.activeRowIndex = row;
    }
    
    if(this.formOptions['control']['defaultData'] && this.formOptions['control']['defaultData'].length > 0){
      this.rowClicked.emit(this.formOptions['control']['defaultData'][row]);
    }else{
      this.rowClicked.emit(this.iFormControl.value[row]);
    }
    
  }

  doubleClickedRow(event, row){
    this.rowDblClicked.emit(row);
  }

  customAction(row, columnName, index){
    this.customActionClicked.emit({ row: this.controlOptions['control'].defaultData[index], columnNam: columnName, index: index });
  }

  focusOut(event, inputName, index){
    this.arrayInputChange.emit({
      event: event,
      controlName: inputName,
      indexArray: index,
      valid: this.iFormControl.controls[index].get(inputName).valid
    });
  }

  getRowHasChange(data){
    // si data length es igual a 0
    // y 
    if(this.oldValue.length > 0 && data.length > 0 && data.length === this.iFormControl.value.length){
      for(let i=0; i < data.length; i++){
        const row = data[i]
        if(this.changeObjectRow(this.oldValue[i],row)){
          return { index: i, data: row };
        }

      }
    }

    return false
  }

  changeObjectRow(old: object, data: object){
    return (JSON.stringify(old) !== JSON.stringify(data));
  }

  
}
