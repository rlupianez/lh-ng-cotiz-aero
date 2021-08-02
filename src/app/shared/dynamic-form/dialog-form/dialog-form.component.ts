import { Component, Inject, ViewChild, TemplateRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFormService } from '@core/services/forms/dynamic-form.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { DialogFormService } from '@core/services/forms/dialog-form.service';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';


@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  formConfig: object;
  dialogForm: FormGroup;
  formData: object;
  subscription: Subscription = new Subscription();
  title: string = 'Agregando Registro';
  
  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dynFormService: DynamicFormService,
    private dialogService: DialogFormService,
    private formService: FormsFactoryService) { }

  ngOnInit() {

    if(this.data.inputs.title){
      this.title = this.data.inputs.title;
    }

    if(this.data.inputs.formConfig['control'].type === 'table'){
      this.formConfig = this.data.inputs.formConfig['control'].items;
    }else{
      this.formConfig = this.data.inputs.formConfig;
    }

    this.dialogForm = this.formService.createForm(this.formConfig);

    // subscribir al servicio de formularios dinamicos, se encarga de notificar los cambios en el form
    this.subscription = this.dynFormService.getDynamicFormNotificacions().subscribe(
      formData => {
        this.formData = formData;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitForm(){
    this.dialogService.submitForm(this.formData);
    this.dialogForm.reset();
  }

}
