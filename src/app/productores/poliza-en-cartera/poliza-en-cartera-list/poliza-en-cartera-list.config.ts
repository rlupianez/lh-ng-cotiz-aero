import * as moment from 'moment';
import { Validators } from '@angular/forms';


export interface ColumnItem {
  label: string;
  visible: boolean;
  class: string;
  icon?: string;
}

export let columns = {
  // select : { label: 'Select', class: 'col' },
  cod_org: { label: 'Organizador', visible: true, class: 'col', suffix: 'nombre_org', cellStyle: 'text-left' },
  cod_prod: { label: 'Productor', visible: true, class: 'col', suffix: 'nombre_prod', cellStyle: 'text-left' },
  cod_sec: { label: 'Sección', visible: true, class: 'col', suffix: 'seccion', cellStyle: 'text-left' },
  poliza: { label: 'Póliza', visible: true, class: 'col' },
  impresiones_link: { type: 'link', label: '', visible: true, class: 'col', icon: 'description', tooltip: 'Ver Impresiones' },
  endoso: { label: 'Endoso', visible: true, class: 'col' },
  cod_asegu: { label: 'Asegurado', visible: true, class: 'col', suffix: 'asegurado', cellStyle: 'text-left' },
  asegurado_link: { type: 'link', label: '', visible: true, class: 'col', icon: 'group', tooltip: 'Ver Asegurado' },
  fec_emi: { label: 'Emisión', visible: true, class: 'col' },
  fec_vig: { label: 'Inicio Vigencia', visible: true, class: 'col' },
  fec_vto: { label: 'Fin Vigencia', visible: true, class: 'col' },
  estado: { label: 'Estado', visible: true, class: 'col', cellStyle: 'text-left' },
  suma_aseg: { label: 'Suma Aseg.', visible: true, class: 'col', prefix: 'moneda', cellStyle: 'text-right' },
  prima: { label: 'Prima', visible: true, class: 'col', prefix: 'moneda', cellStyle: 'text-right' },
  premio: { label: 'Premio', visible: true, class: 'col', prefix: 'moneda', cellStyle: 'text-right' },
  //poliza_ant: { label: 'Póliza Anterior', visible: true, class: 'col' },
  //poliza_ini: { label: 'Póliza Iniciar', visible: true, class: 'col' },
  tipo_emision: { label: 'Tipo Emisión', visible: true, class: 'col', cellStyle: 'text-left' },
  nro_rie: { label: 'Número Riesgo', visible: false, class: 'col' },
  riesgo: { label: 'Riesgo', visible: true, class: 'col', cellStyle: 'text-left' },
  //forma_pago: { label: 'Forma Pago', visible: true, class: 'col' },
  producto: { label: 'Producto', visible: true, class: 'col', cellStyle: 'text-left' },
  ubicacion: { label: 'Ubicación', visible: true, class: 'col', cellStyle: 'text-left' },
  // descargar: { label: 'Descargar', class: 'col', action: true, icon: 'far fa-file-pdf fa-lg' }
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
  label: LabelItem;
  control: any;
  class: string;
  required: boolean;
}

export let filters = {
  p_cod_prod: {
    label: 'Productor',
    control: {
      type: 'productor-control',
      class: 'col-sm-6',
      path: '/listas/LIST_PAS',
      options: {
        value: 'nombre',
        key: 'codpas',
        description: 'codpas'
      },
      pasteFieldOnSelect: 'nombre',
      defaultValue: '',
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3'
  },
  p_cod_asegu: {
    label: 'Asegurado',
    control: {
      type: 'typeahead',
      class: 'col-sm-6',
      path: '/listas/LIST_ASEGURADOS',
      options: {
        key: 'cod_asegurado',
        value: 'list_val_aseg',
        description: 'cod_asegurado'
      },
      notSelectedItemIsValid: true,
      apiSearchFieldname: 'p_filtro',
      pasteFieldOnSelect: 'cod_asegurado',
      defaultValue: '',
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3'
  },
  p_fec_emi: {
    label: 'Emisión',
    control: {
      type: 'date-range',
      class: 'col-sm-6',
      format: 'dd/mm/yyyy',
      config: {
        max: null,
        min: moment().subtract(100, 'years')
      },
      defaultValues: {
        hasta: null,
        desde: null
      }
    },
    required: true,
    class: 'col-12 col-sm-12 col-md-6 col-lg-6'
  },
  p_fec_vig: {
    label: 'Vigencia',
    control: {
      type: 'date-range',
      class: 'col-sm-6',
      format: 'dd/mm/yyyy',
      config: {
        max: moment(),
        min: moment().subtract(100, 'years')
      },
      defaultValues: {
        hasta: null,
        desde: null
      }
    },
    class: 'col-12 col-sm-12 col-md-6 col-lg-6'
  },
  p_cod_sec: {
    label: 'Sección',
    control: {
      type: 'select',
      class: 'col-sm-3',
      searchable: true,
      path: '/listas/LIST_TIPOS_SECCIONES',
      options: {
        key: 'value',
        value: 'label'
      },
      pasteFieldOnSelect: 'value',
      hasEmptyOption: true
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3'
  },
  p_poliza: {
    label: 'Póliza',
    control: {
      type: 'number',
      class: 'col-sm-3',
      config: {
        maxlength: 10
      }
    },
    validators: [
      Validators.minLength(10)
    ],
    class: 'col-12 col-sm-12 col-md-3 col-lg-3'
  },
  p_estado: {
    label: 'Estado',
    control: {
      type: 'select',
      class: 'col-sm-3',
      path: '/listas/LIST_ESTADOS_POLIZA',
      options: {
        key: 'cod_estado',
        value: 'desc_estado'
      },
      pasteFieldOnSelect: 'cod_estado',
      hasEmptyOption: true
    },
    class: 'col-12 col-sm-12 col-md-3 col-lg-3'
    // required: true
  },
  p_endoso: {
    label: 'Endoso',
    control: {
      type: 'number',
      class: 'col-sm-3',
      config: {
        maxlength: 7
      }
    },
    validators: [
      Validators.minLength(7)
    ],
    class: 'col-12 col-sm-12 col-md-3 col-lg-3'
  },
  p_patente: {
    label: 'Dominio',
    hidden: true,
    control: {
      type: 'text',
      config: {
        maxlength: 7
      }
    },
    validators: [
      Validators.minLength(7)
    ],
    class: 'col-sm-12 col-md-12 col-lg-2'
  }
};