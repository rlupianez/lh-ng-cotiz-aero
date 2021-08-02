import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '@core/services/http/api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent implements OnInit {

  formOptions: object;
  optionList: object[] = [];
  data: any[] = [];
  loading: boolean = false;
  multiple: boolean = false;
  defaultIcon: string = 'credit_card';
  // manejo de items seleccionados
  selectedOptions: any[] = [];

  @Input() iFormControl: FormControl;

  @Input() set controlOptions(options: object){
    this.formOptions = options;
    // agregar filters required
    if(this.formOptions['control']['path']){
      this.loading = true;
      this.apiService.getListOptions(this.formOptions['control']['path'], { 
        ...this.formOptions['control']['filters'] } || {}).subscribe(
        (data: object[]) => {
          this.optionList = data;
          this.formOptions['control']['list'] = this.optionList;
          this.loading = false;
        });
    }else{
      this.optionList = this.formOptions['control']['list'] || [];
    }
    
  }


  
  get controlOptions(){
    return this.formOptions;
  }

  get controlSpecs() {
    return this.controlOptions['control'];
  }

  get isEmpty(){
    return this.optionList.length === 0;
  }

  get value(){
    return this.iFormControl.value || [];
  }


  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.iFormControl.valueChanges.subscribe( value => {

      // Solo se usa para limpiar
      if(!value){
        this.selectedOptions = [];
      }
        
      
      
    })
  }

  onSelected(list, iPos){
    //console.log('change check', list.selectedOptions.selected, iPos);
    if(this.multiple){

      if(this.selectedOptions.indexOf(iPos) !== -1){
        const itemPos = this.selectedOptions.indexOf(iPos);
        // Elimino el item de la posicion del array
        this.selectedOptions = this.selectedOptions.splice(itemPos,1);
      }else{
        this.selectedOptions = [iPos];
      }

    }else{
      if(this.selectedOptions.indexOf(iPos) !== -1){
        this.selectedOptions = [];
      }else{
        this.selectedOptions = [iPos];
      }

    }

    // pegar el valor del selected en el formControl
    // si es multiple pega el array
    if(this.multiple){
      // falta pegar cuando es multiple
      // en el array selected solo pega la posicion del item seleccionado
      // los valores de los items estan en optionsList
      //this.iFormControl.setValue(selected);
    }else{ // si no es multiple pega solo la primera posicion
      let itemData = this.optionList[this.selectedOptions[0]];
      this.iFormControl.setValue(itemData);
    }
  }

}
