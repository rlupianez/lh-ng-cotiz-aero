import { ComponentFactoryResolver, ComponentRef, EventEmitter, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {
  InputComponent,
  AutocompleteComponent,
  SelectComponent,
  DatepickerComponent,
  TableComponent,
  SlideToggleComponent,
  CheckboxListComponent,
  RangeDatepickerComponent,
  RangeMonthyearpickerComponent,
  ButtonToggleComponent,
  TileSelectComponent
} from '../../form-components';

import { ProductorFormcontrolComponent } from 'src/app/shared/lh-custom/productor-formcontrol/productor-formcontrol.component';
import { CoberturasTableComponent } from '../../ui-components/coberturas-table/coberturas-table.component';
import { PeriodPickerComponent } from '../../form-components/periodpicker/periodpicker.component';
import { FileComponent } from '@shared/form-components/file/file.component';
import { TextareaComponent } from '@shared/form-components/textarea/textarea.component';
import { StarRatingComponent } from '../../form-components/star-rating/star-rating.component';
import { InputCheckboxComponent } from '@shared/form-components/input-checkbox/input-checkbox.component';
import { InputRadioComponent } from '@shared/form-components/input-radio/input-radio.component';
import { InputHourMinuteComponent } from '@shared/form-components/input-hour-minute/input-hour-minute.component';
import { TextAreaComponent } from '../../form-components/text-area/text-area.component';


const components: { [type: string]: Type<any> } = {
  input: InputComponent,
  textarea: TextareaComponent,
  textArea: TextAreaComponent,
  number: InputComponent,
  text: InputComponent,
  email: InputComponent,
  inputCheckbox: InputCheckboxComponent,
  inputRadio: InputRadioComponent,
  inputHourMinute: InputHourMinuteComponent,
  typeahead: AutocompleteComponent,
  select: SelectComponent,
  datepicker: DatepickerComponent,
  periodpicker: PeriodPickerComponent,
  table: TableComponent,
  slide: SlideToggleComponent,
  'check-list': CheckboxListComponent,
  'coberturas-table': CoberturasTableComponent,
  'date-range': RangeDatepickerComponent,
  'monthyear-range': RangeMonthyearpickerComponent,
  'button-toggle': ButtonToggleComponent,
  'productor-control': ProductorFormcontrolComponent,
  'tile-select': TileSelectComponent,
  'file': FileComponent,
  starRating: StarRatingComponent
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnChanges, OnInit, AfterViewInit {

  @Input() controlOptions: any;

  @Input() config: any;

  @Input() iFormControl?: FormControl;

  @Input() iFormGroup?: FormGroup;

  @Input() items?: object[];

  @Output() focusout = new EventEmitter();

  component: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.controlOptions = this.controlOptions;
      this.component.instance.iFormGroup = this.iFormGroup;
      this.component.instance.iFormControl = this.iFormControl;
    }
  }

  ngAfterViewInit() {
    this.cdref.detectChanges();
  }

  ngOnInit() {
    if (!components[this.controlOptions.control.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.controlOptions.control.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<any>(components[this.controlOptions.control.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.iFormControl = this.iFormControl;
    this.component.instance.controlOptions = this.controlOptions;
    // agregando eventos
    if (this.component.instance.blur) {
      this.component.instance.blur.subscribe(value => {
        //console.log('blur', value);
        this.focusout.emit(value);
      });
    }
  }

  ngOnDestroy() {
    this.component.destroy();
  }


}
