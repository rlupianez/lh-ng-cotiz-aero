import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';

@Component({
  selector: 'app-add-coberturas-dialog',
  templateUrl: './add-coberturas-dialog.component.html',
  styleUrls: ['./add-coberturas-dialog.component.scss']
})
export class AddCoberturasDialogComponent implements OnInit {

  @Input() formConfig: object;
  /**
   * Formulario a visualizar
   */
  @Input() formGroup?: FormGroup;

  /**
   * Nombre del formulario
   */
  name?: string;

  /**
   * subscripcion a form group
   */
  formSubscription: Subscription = new Subscription();


  constructor(private formService: FormsFactoryService) { }

  ngOnInit() {

    // si existe formConfig, se genera el formGroup: Formulario Reactivo
    if(this.formConfig){

      if(!this.formGroup){
        this.formGroup = this.formService.createForm(this.formConfig);  
      }
      
    }
  }

  ngOnDestroy(){
    this.formSubscription.unsubscribe();
  }

  

}
