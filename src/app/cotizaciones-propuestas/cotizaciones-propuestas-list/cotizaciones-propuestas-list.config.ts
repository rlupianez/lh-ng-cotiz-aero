import * as moment from 'moment';
import { Validators } from '@angular/forms';


export interface ColumnItem {
    label: string;
    visible: boolean;
    class: string;
    icon?: string;
}

export let cotizacionesColumns = {
  // select : { label: 'Select', class: 'col' },
  cod_sec: { label: 'Sección', visible: true, class: 'col', suffix: 'desc_seccion', cellStyle: 'text-left' },
  desc_doc_nomape: { label: 'Asegurado', visible: true, class: 'col', cellStyle: 'text-left' },
  fec_cotizacion: { label: 'Fecha Cotización', visible: true, class: 'col' },
  nro_cotizacion: { label: 'Nro Cotización', visible: true, class: 'col', cellStyle: 'text-center' },
  nueva_version: { type: 'link', label: '', visible: true, class: 'col', icon: 'content_copy', tooltip: 'Generar nueva versión' },
  /*
  retomar_cotizacion: { 
    label: '', 
    visible: true, 
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      S: { icon: 'create' }
    },
    tooltip: 'Emitir'
  },
  */
  generar_propuesta: { 
    label: '', 
    visible: true, 
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      S: { icon: 'create' }
    },
    tooltip: 'Emitir'
  },
  ver_cotizacion: { 
    label: '', 
    visible: true, 
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      S: { icon: 'description' }
    },
    tooltip: 'Ver Cotización'
  },
  descarga_cotizacion_pdf: { 
    label: '', 
    visible: true, 
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      S: { icon: 'get_app' }
    },
    tooltip: 'Descargar Cotización'
  },
  fec_propuesta: { label: 'Fecha Propuesta', visible: true, class: 'col' },
  nro_propuesta:{ label: 'Nro Propuesta', visible: true, class: 'col', cellStyle: 'text-center' },
  desc_estado: { label: 'Estado', visible: true, class: 'col', cellStyle: 'text-left' },
  ver_propuesta: { 
    label: '', 
    visible: true,
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      S: { icon: 'receipt' },
    },
    tooltip: 'Ver Propuesta'
  },
  retomar_propuesta: { 
    label: '', 
    visible: true, 
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      S: { icon: 'create' }
    },
    tooltip: 'Retomar'
  },
  descarga_propuesta_pdf: { 
    label: '', 
    visible: true, 
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      S: { icon: 'get_app' }
    },
    tooltip: 'Descargar Propuesta'
  },
  descarga_certificado_pre: { 
    label: '', 
    visible: true, 
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      S: { icon: 'get_app' }
    },
    tooltip: 'Descargar Certificado'
  },
  nro_poliza: { label: 'Poliza', visible: true, class: 'col', cellStyle: 'text-center' },
  desc_forma_pago: { label: 'Forma de Pago', visible: true, class: 'col' , cellStyle: 'text-center' },
  fec_envio: { label: 'Fecha Enviada', visible: true, class: 'col' },
  desc_sucursal: { label: 'Sucursal', visible: true, class: 'col' , cellStyle: 'text-center' },
  ver_poliza: { 
    label: '', 
    visible: true,
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      S: { icon: 'description' }
    },
    tooltip: 'Ver Póliza'
  },
  link_impresiones_pol: { 
    label: '', 
    visible: true, 
    class: 'col', 
    cellStyle: 'text-center',
    formatter: {
      NOT_EMPTY: { icon: 'print' }
    },
    tooltip: 'Impresiones'
  },
  dominio:{ label: 'Dominio', visible: true, class: 'col', cellStyle: 'text-center' }
}


export let propuestasColumns = {
  x_doc_nomape: { label: 'Asegurado', visible: true, class: 'col', cellStyle: 'text-center' },
  cod_sec: { label: 'Sección', visible: true, class: 'col', suffix: 'x_seccion', cellStyle: 'text-left' },
  o_propuesta:{ label: 'Nro Propuesta', visible: true, class: 'col', cellStyle: 'text-center' },
  fecha_propuesta: { label: 'Fecha Propuesta', visible: true, class: 'col' },  
  x_estado: { label: 'Estado', visible: true, class: 'col', cellStyle: 'text-left' },
  fecha_envio: { label: 'Fecha Enviada', visible: true, class: 'col' },
  x_forma_pago: { label: 'Forma de Pago', visible: true, class: 'col' , cellStyle: 'text-center' },
  poliza: { label: 'Póliza', visible: true, class: 'col', cellStyle: 'text-center' },
  dominio:{ label: 'Dominio', visible: true, class: 'col', cellStyle: 'text-center' }
}

export let pdfColumns = {
  desc_doc_nomape: { label: 'Asegurado', visible: true, class: 'col', cellStyle: 'text-center' },
  cod_sec: { label: 'Sección', visible: true, class: 'col', suffix: 'desc_seccion', cellStyle: 'text-left' },
  nro_cotizacion: { label: 'Nro Cotización', visible: true, class: 'col', cellStyle: 'text-center' },
  fec_cotizacion: { label: 'Fecha Cotización', visible: true, class: 'col' },
  desc_estado: { label: 'Estado', visible: true, class: 'col', cellStyle: 'text-left' },
  nro_propuesta:{ label: 'Nro Propuesta', visible: true, class: 'col', cellStyle: 'text-center' },
  fec_propuesta: { label: 'Fecha Propuesta', visible: true, class: 'col' },
  desc_forma_pago: { label: 'Forma de Pago', visible: true, class: 'col' , cellStyle: 'text-center' },
  fec_envio: { label: 'Fecha Enviada', visible: true, class: 'col' },
  desc_sucursal: { label: 'Sucursal', visible: true, class: 'col' , cellStyle: 'text-center' },
  nro_poliza: { label: 'Póliza', visible: true, class: 'col', cellStyle: 'text-center' },
  dominio:{ label: 'Dominio', visible: true, class: 'col', cellStyle: 'text-center' }
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
    type: 'typeahead' | 'autocomplete' | 'text' | 'select' ;
    class?: string,
    path:  string,
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
        class: 'col-sm-8',
        path: '/listas/LIST_PAS',
        options: {
          value: 'nombre',
          key: 'codpas',
          description: 'codpas'
        },
        pasteFieldOnSelect: 'nombre',
        defaultValue: '',
      },
      class: 'col-sm-12 col-md-12 col-lg-3'
    },
    p_cod_asegu: {
      label: 'Asegurado',
      control: { 
        type: 'typeahead',
        class: 'col-sm-8',
        path: '/listas/LIST_ASEG_PROPUESTAS',
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
      class: 'col-sm-12 col-md-12 col-lg-3'
    },
    p_tipo_operacion: {
      label: 'Tipo Operación',
      control: {
        type: 'select',
        list: [
          { key: 'C', value: 'Cotizacion' },
          { key: 'P', value: 'Propuesta' }          
        ],
        options: {
          value: 'value',
          key: 'key'
        },
        defaultValue: 'C',
        pasteFieldOnSelect: 'key',
        hasEmptyOption: false
      },      
      actions: {
        C: { hidden: { p_o_propuesta: true, p_cod_suc: true, p_o_cotizacion: false, p_cod_medio_pago: false } },
        P: { hidden: { p_o_propuesta: false, p_cod_suc: false, p_o_cotizacion: true, p_cod_medio_pago: true } }
      },
      class: 'col-sm-12 col-md-12 col-lg-2',
      required: true
    },
    p_fecha: {
      label: 'Fecha',
      control: {
        type: 'date-range',
        format: 'dd/mm/yyyy',
        config: {
          max: moment(),
          min: moment().subtract(7,'years')
        },
        defaultValues : {
          hasta: moment(),
          desde: moment().subtract(2, 'M')
        }
      },
      class: 'col-sm-12 col-md-12 col-lg-4',
      required: true
    },
    p_cod_sec: {
      label: 'Sección',
      control: { 
        type: 'select',
        searchable: true,
        path: '/listas/LIST_RAMOS_PROPUESTAS',
        options: {
          key: 'cod_sec',
          value: 'nombre'
        },
        defaultValue: 14, // Seccion Aeronavegacion
        pasteFieldOnSelect: 'cod_sec',
        hasEmptyOption: true
      },
      class: 'col-sm-12 col-md-12 col-lg-2',
      required: true
    },
    p_o_cotizacion: {
      label: 'Nro Cotización',
      hidden:true,
      control: {
          type: 'number',
          config: {
            maxlength: 10
          }
      },
      validators: [
        Validators.minLength(10)
      ],
      class: 'col-sm-12 col-md-12 col-lg-2'
    },
    p_o_propuesta: {
      label: 'Nro Propuesta',
      hidden:true,
      control: {
          type: 'number',
          config: {
            maxlength: 10
          }
      },
      validators: [
        Validators.minLength(10)
      ],
      class: 'col-sm-12 col-md-12 col-lg-2'
    },
    p_estado: {
      label: 'Estado',
      control: { 
        type: 'select',
        path: '/listas/LIST_ESTADOS_COTIZACION',       
        options: {
          key: 'cod_estado',
          value: 'desc_estado'
        },
        pasteFieldOnSelect: 'cod_estado',
        hasEmptyOption: true
      },
      class: 'col-sm-12 col-md-12 col-lg-2',
      // required: true
    },
    p_cod_medio_pago: {
      label: 'Forma De Pago',
      hidden:true,
      control: { 
        type: 'select',
        path: '/listas/LIST_MEDIOS_PAGO',
        options: {
          key: 'cod_medio_pago',
          value: 'desc_medio_pago'
        },
        pasteFieldOnSelect: 'cod_medio_pago',
        hasEmptyOption: true
      },
      class: 'col-sm-12 col-md-12 col-lg-2',
      // required: true
    },
    p_cod_suc: {
      label: 'Sucursales',
      hidden:true,
      control: { 
        type: 'select',
        path: '/listas/LIST_SUCURSALES',
        options: {
          key: 'codigo',
          value: 'descri'
        },
        pasteFieldOnSelect: 'codigo',
        hasEmptyOption: true
      },
      class: 'col-sm-12 col-md-12 col-lg-2',
    },
    p_dominio: {
      label: 'Dominios',
      hidden:true,
      control: { 
        type: 'typeahead',
        path: '/listas/LIST_DOMINIOS_PROPUESTAS',
        options: {
          key: 'o_cotizacion',
          value: 'dominio',
          description: 'o_cotizacion'
        },
        pasteFieldOnSelect: 'dominio',
        apiSearchFieldname: 'p_dominio'
      },
      class: 'col-sm-12 col-md-12 col-lg-2',
      // required: true
    }    
  };