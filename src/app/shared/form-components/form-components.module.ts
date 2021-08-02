import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { RangeDatepickerComponent } from './range-datepicker/range-datepicker.component';

// Material Components Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';


import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectComponent } from './select/select.component';
import { RangeMonthyearpickerComponent, CustomDatepickerHeader } from './range-monthyearpicker/range-monthyearpicker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { InputComponent } from './input/input.component';
import { TableComponent } from './table/table.component';


import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';
import { FormViewerComponent } from './form-viewer/form-viewer.component';
import { PipesModule } from '../pipes/pipes.module';
import { UxComponentsModule } from '../ux-components/ux-components.module';
import { PeriodPickerComponent, CustomPeriodpickerHeader } from './periodpicker/periodpicker.component';
import { FormPanelComponent } from './form-panel/form-panel.component';
import { TileSelectComponent } from './tile-select/tile-select.component';
import { EllipsysTextDirective } from './ellipsisText.directive';

import { DialogFormComponent } from '../dynamic-form/dialog-form/dialog-form.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { CBUCardComponent } from './cbu-card/cbu-card.component';
import { FileComponent } from './file/file.component';
import { TextareaComponent } from './textarea/textarea.component';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { InputRadioComponent } from './input-radio/input-radio.component';
import { InputHourMinuteComponent } from './input-hour-minute/input-hour-minute.component';
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { FormBaseComponent } from './form-base/form-base.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { NgxMaskModule} from 'ngx-mask'

@NgModule({
  declarations: [
    AutocompleteComponent,
    RangeDatepickerComponent,
    SelectComponent,
    RangeMonthyearpickerComponent,
    DatepickerComponent,
    ButtonToggleComponent,
    CustomDatepickerHeader,
    CustomPeriodpickerHeader,
    InputComponent,
    TextareaComponent,
    TableComponent,
    SlideToggleComponent,
    CheckboxListComponent,
    FormViewerComponent,
    PeriodPickerComponent,
    EllipsysTextDirective,
    FormPanelComponent,
    TileSelectComponent,
    CreditCardComponent,
    CBUCardComponent,
    FileComponent,
    SelectionListComponent,
    InputRadioComponent,
    InputHourMinuteComponent,
    InputCheckboxComponent,
    FormBaseComponent,
    TextAreaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    UxComponentsModule,
    ReactiveFormsModule,
    DynamicFormModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatListModule,
    MatRadioModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    AutocompleteComponent,
    RangeDatepickerComponent,
    SelectComponent,
    RangeMonthyearpickerComponent,
    DatepickerComponent,
    ButtonToggleComponent,
    InputComponent,
    TableComponent,
    SlideToggleComponent,
    CheckboxListComponent,
    FormViewerComponent,
    PeriodPickerComponent,
    FormPanelComponent,
    TileSelectComponent,
    EllipsysTextDirective,
    CreditCardComponent,
    CBUCardComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    InputHourMinuteComponent,
    FormBaseComponent,
    TextareaComponent,
    MatFormFieldModule,
    TextAreaComponent
  ],
  entryComponents: [
    CustomDatepickerHeader,
    CustomPeriodpickerHeader,
    DialogFormComponent
  ]
})
export class FormComponentsModule { }
