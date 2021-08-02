/**
 * @property label String Nombre de la columna
 * @property visible boolean Si hay que mostrarlo
 * @property class String Si se le agrega una clase Css
 * @property icon String Url del icono
 * @property formatter Object Tiene un objeto en donde las claves son los valores y una propiedad value con el valor a reemplazar
 * @property defaultValue String El valor por defecto que se muestra si es null y tiene formatter
 */

import { MatTableDataSource } from '@angular/material/table';

export interface ColumnItem {
  label: string;
  visible: boolean;
  class: string;
  icon?: string;
  formatter?: Object;
  defaultValue?: string;
}

export interface LabelItem {
  text: string;
  class: string;
}

export interface ControlItemOptions {
  value: 'nombre',
  key: 'idProductor'
}

export interface ControlItem {
  type: 'typeahead' | 'autocomplete' | 'text' | 'select';
  class?: string,
  path: string,
  options?: ControlItemOptions
  pasteFieldOnSelect?: string;
  defaultValue?: string;
}

export interface FilterItem {
  label: LabelItem | string;
  control: any;
  class: string;
  required?: boolean;
}

export interface IAccordion {
  active: boolean,
  expanded: boolean,
  title: string,
  loading: boolean,
  loadingChanges?: boolean,
  data: MatTableDataSource<unknown>,
  type: string,
  disabled?: boolean,
  columns?: string[],
  emptyMessage?: string,
  list?: any[],
  opened?: boolean,
  headerCheckboxValue?: boolean,
  input?: object,
  formGroup?
};