import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { DynamicContainerComponent, DialogFormComponent, DynamicFormComponent, DynamicFieldDirective, DynamicFormContentComponent } from './index';
import { CoberturasTableComponent } from '../ui-components/coberturas-table/coberturas-table.component';

import { 
  AutocompleteComponent, 
  InputComponent, 
  SelectComponent, 
  DatepickerComponent, 
  TableComponent, 
  SlideToggleComponent,
  CheckboxListComponent,
  PeriodPickerComponent,
  InputRadioComponent } from '../form-components';
import { DynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    DynamicContainerComponent,
    DialogFormComponent,
    DynamicFormContentComponent,
    DynamicFormControlComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule
  ],
  exports: [
    DynamicFieldDirective,
    DynamicFormComponent,
    DynamicContainerComponent,
    DialogFormComponent,
    DynamicFormContentComponent,
    DynamicFormControlComponent
  ],
  entryComponents: [
    InputComponent,
    AutocompleteComponent,
    SelectComponent,
    DatepickerComponent,
    TableComponent,
    SlideToggleComponent,
    CheckboxListComponent,
    CoberturasTableComponent,
    PeriodPickerComponent,
    InputRadioComponent
  ]
})
export class DynamicFormModule { }
