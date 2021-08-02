import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@core/services/http/api.service';

@Component({
  selector: 'app-tile-select',
  templateUrl: './tile-select.component.html',
  styleUrls: ['./tile-select.component.css']
})
export class TileSelectComponent implements OnInit {

  formOptions: object;
  loading: boolean;
  optionList: object[] = [];


  @Input() iFormControl: FormGroup;
  
  @Input() set controlOptions(options: object){
    // console.log('set options', options);
    this.formOptions = options;
    
    // agregar filters required
    if(this.formOptions['control']['path']){
      this.loading = true;
      this.apiService.getListOptions(this.formOptions['control']['path'],
        { ...this.formOptions['control']['filters'] } || {}).subscribe((data: object[]) => {
          // console.log('select options', data);
          // this.allOptions = data;
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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if(typeof this.controlOptions['control'].defaultValue !== 'undefined'){
      this.iFormControl.setValue( this.controlOptions['control'].defaultValue);
    }
  }

  get items(){
    return this.controlOptions['control'].list;
  }

  inputChange(value){
    this.iFormControl.setValue(value)
  }

  get editable(){
    return !this.controlOptions['disabled'];
  }

}
