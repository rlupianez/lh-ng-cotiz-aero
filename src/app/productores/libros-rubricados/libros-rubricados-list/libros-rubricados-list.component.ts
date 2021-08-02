import { Component, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';

import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';

import * as moment from 'moment';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UiService } from '@core/services/ui.service';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';


declare let $: any;

const columns = {
  desc_prod : { label: 'Productor', visible: true, class: 'col'},
  emision_desde: { label: 'Fecha Emisión desde', visible: true, class: 'col' },
  emision_hasta: { label: 'Fecha Emisión hasta', visible: true, class: 'col' },
  solicitud_desde: { label: 'Fecha Solicitud desde', visible: true, class: 'col' },
  solicitud_hasta: { label: 'Fecha Solicitud hasta', visible: true, class: 'col' },
  desc_seccion: { label: 'Sección', visible: true, class: 'col' },
  descargar: {
    label: 'Descargar',
    class: 'col',
    action: true,
    field: 'link_cobranza',
    tooltip: 'Cobranza',
    icon: 'far fa-file-alt fa-lg',
    // muestra 2 iconos en la misma columna
    prefix: {
      field: 'link_emision',
      icon: 'far fa-file-alt fa-lg',
      tooltip: 'Emisión'
    }
  },
  descargarXml: {
    label: 'Descargar Xml',
    class: 'col',
    action: true,
    field: 'link_cobranza_xml',
    tooltip: 'Cobranza',
    icon: 'far fa-file-alt fa-lg',
    // muestra 2 iconos en la misma columna
    prefix: {
      field: 'link_emision_xml',
      icon: 'far fa-file-alt fa-lg',
      tooltip: 'Emisión'
    }
  }

};

const filters = {
  p_tipo_productor: {
    label: 'Tipo de busqueda',
    control: {
      type: 'select',
      list: [
        { key: 'PRD_NORMAL', value: 'Por productor' },
        { key: 'PRD_TITULAR', value: 'Productor Titular' },
        { key: 'PRD_CUIT', value: 'Por CUIT del productor' },
      ],
      options: {
        value: 'value',
        key: 'key'
      },
      pasteFieldOnSelect: 'key',
      hasEmptyOption: false,
      defaultValue: 'PRD_NORMAL'
    },
    actions: {
      PRD_NORMAL: { hidden: { p_cuit: true, p_cod_prod: false} },
      PRD_TITULAR: { hidden: { p_cuit: true, p_cod_prod: false} },
      PRD_CUIT: { hidden: { p_cuit: false, p_cod_prod: true} },
    },
    class: 'col-12 col-sm-12 col-md-4 col-lg-4',
    required: true
  },
  p_cuit : {
    label: { text: 'Cuit', class: 'col-sm-4' },
    control: {
      type: 'typeahead',
      class: 'col-sm-8',
      path: '/listas/LIST_PAS',
      options: {
        value: 'nombre',
        key: 'cuit',
        description: 'cuit'
      },
      pasteFieldOnSelect: 'cuit',
      defaultValue: ''
    },
    class: 'col-12 col-sm-12 col-md-4 col-lg-4',
    required: true,
    hidden : true
  },
  p_cod_prod : {
    label: { text: 'Productor', class: 'col-sm-4' },
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
    class: 'col-12 col-sm-12 col-md-4 col-lg-4',
    required: true,
    caracteres_bus: 0
  },
  p_tipo_fechas: {
    label: 'Fechas',
    control: {
      type: 'select',
      list: [
        { key: 'sol', value: 'Por fecha solicitud' },
        { key: 'emi', value: 'Por fecha emisión' }
      ],
      options: {
        value: 'value',
        key: 'key'
      },
      pasteFieldOnSelect: 'key',
      hasEmptyOption: false,
      defaultValue:'sol'
    },
    actions: {
      emi: { hidden: {p_fec_emi: false, p_fec_sol: true, p_seccion_desde: false } },
      sol: { hidden: {p_fec_emi: true, p_fec_sol: false,  p_seccion_desde: false } }
    },
    class: 'col-12 col-sm-12 col-md-4 col-lg-4',
    required: false
  },
  p_fec_emi: {
    label: 'Emisión',
    control: {
      type: 'date-range',
      format: 'dd/mm/yyyy',
      config: {
        max: moment(),
        min: moment().subtract(7,'years')
      },
      defaultValues : {
        hasta: null,
        desde: null
      }
    },
    class: 'col-12 col-sm-12 col-md-8 col-lg-8',
  },
  p_fec_sol: {
    label: 'Solicitud',
    control: {
      type: 'date-range',
      format: 'dd/mm/yyyy',
      config: {
        max: moment(),
        min: moment().subtract(7,'years')
      },
      defaultValues : {
        hasta: null,
        desde: null
      }
    },
    class: 'col-12 col-sm-12 col-md-8 col-lg-8',
    hidden : true
  },
  p_seccion_desde: {
    label: 'Sección',
    control: {
      type: 'select',
      searchable: true,
      path: '/listas/LIST_TIPOS_SECCIONES',
      options: {
        key: 'value',
        value: 'label'
      },
      pasteFieldOnSelect: 'value',
      hasEmptyOption: true
    },
    class: 'col-12 col-sm-12 col-md-4 col-lg-4',
  }
};

@Component({
  selector: 'app-libros-rubricados-list',
  templateUrl: './libros-rubricados-list.component.html',
  styleUrls: ['./libros-rubricados-list.component.scss'],
  providers: [ FilterToolbarService ]
})
export class LibrosRubricadosListComponent implements OnInit, OnDestroy {

  /**
   * Titulo de la cabecera
   */
  listTitle: string = 'Rúbrica Digital';

  apiPath: string = '/listados/LIST_RUBRICA_DIGITAL';

  tableTitle: string = 'Resultado de Búsqueda'
  panelExpanded: boolean = true;
  rowDetails: any[];
  filterModel: object;
  columnsVisibility: object;
  isLoadingResults: boolean = false;
  resultLength: number = 0;
  applyFilterInTable: Subject<number> = new Subject<number>();
  listItems: MatTableDataSource<any>;
  columns: object;
  filtersFields: object;
  tablePageSize: number = 25;

  retForm: FormGroup;

  /**
   * Ultimo form filter aplicado, se usa para mandar los datos para descargar el excel
   */
  formFilterObject: object = null;


  /**
   * Observer que notifica si los campos de filtros han sido modificados.
   * Sirve para identificar si lo que se esta mostrando en la tabla corresponde a los filtros en pantalla.
   */
  filtersHasChange: Subject<boolean> = new Subject<boolean>();

  /**
   * Especifica si posee paginador o boton "load more"
   */
  loadMorePaginator: boolean = true;


  formSubscription: Subscription = new Subscription();

  formVisibility: Object;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private progressBarService: ProgressBarService,
    private formValidator: FormsFactoryService,
    private uiService: UiService,
    private fileDowloadService: FileDownloaderService) {
  }

  ngOnInit() {
    this.listItems = new MatTableDataSource([]);
    this.columns = columns;
    this.filtersFields = filters;
    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    this.retForm = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));

  }

  ngOnDestroy(){
    this.formSubscription.unsubscribe();
  }

  getlibrosRubricados() {
    /*this.modelService.getAll().subscribe(
      siniestros => this.librosRubricados = siniestros
    );*/

  }

  applyFilters(oFilterData: object) {
    // const filterString = this.apiService.generateStringFilter(oFilterData, this.filtersFields);
    const opts = {
      'p_o_sesion':1234,
      'p_limite': 1000,
      'p_nropag': 0,
      'p_regxpag': this.tablePageSize
    };

    oFilterData = Object.assign(oFilterData,opts);
    oFilterData['p_cod_prod'] = oFilterData.hasOwnProperty('p_cod_prod')?oFilterData['p_cod_prod']['codpas']:'';
    oFilterData['p_cuit'] =oFilterData.hasOwnProperty('p_cuit')?oFilterData['p_cuit']['cuit']:'';
    console.log('filters data', oFilterData);
    if(oFilterData['p_tipo_fechas'] == 'emi'){
       this.columns['solicitud_desde'].visible = false;
       this.columns['solicitud_hasta'].visible = false;
       this.columns['emision_desde'].visible = true;
       this.columns['emision_hasta'].visible = true;
       }
     else{
       this.columns['emision_desde'].visible = false;
       this.columns['emision_hasta'].visible = false;
       this.columns['solicitud_desde'].visible = true;
       this.columns['solicitud_hasta'].visible = true;
   }
    if(oFilterData.hasOwnProperty('p_fec_emi') ){
      const periodos = {
        p_periodo_desde: oFilterData['p_fec_emi'].desde ? oFilterData['p_fec_emi'].desde.format('DD-MM-YYYY').toString() : '',
        p_periodo_hasta: oFilterData['p_fec_emi'].hasta ? oFilterData['p_fec_emi'].hasta.format('DD-MM-YYYY').toString() : '',
      };

      delete oFilterData['p_fec_emi'];

      this.filterModel = Object.assign(oFilterData,periodos);
    }
    if(oFilterData.hasOwnProperty('p_fec_sol')){
      const periodos = {
        p_fec_solicitud_desde: oFilterData['p_fec_sol'].desde ? oFilterData['p_fec_sol'].desde.format('DD-MM-YYYY').toString() : '',
        p_fec_solicitud_hasta: oFilterData['p_fec_sol'].hasta ? oFilterData['p_fec_sol'].hasta.format('DD-MM-YYYY').toString() : '',
      };

      delete oFilterData['p_fec_sol'];

      this.filterModel = Object.assign(oFilterData,periodos);
    }
    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : object) => {
      console.log('libros rubricados get', data);
      if(data){
        this.listItems = new MatTableDataSource(data['result']);
        this.resultLength = data['pagination'].totalItems;

        if(data['result'].length > 0){
          // se guarda los ultimos datos de filtros aplicados
          //console.log(data['result'][0]['emision_desde']);

          this.formFilterObject = this.filterModel;

          // this.panelExpanded = false;
        } else { // si no trae datos se limpia
          this.formFilterObject = null;
        }

        this.applyFilterInTable.next(0);
      }

      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);

    },
    error => {
      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
    });

  }


  pageChange(paginationData: object){

    const bodyData = this.filterModel;
    bodyData['p_nropag'] = paginationData['pageIndex'],
    bodyData['p_regxpag'] = paginationData['pageSize'];

    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.getDataTable(this.apiPath, bodyData).subscribe( data => {

      // SI POSEE EL BOTON "Mostrar mas"
      // si es pagina 0 debe volver limpiar la lista y setear los nuevos items
      // sino los acumula

      if(this.loadMorePaginator && paginationData['pageIndex'] !== 0){
        this.listItems.data = this.listItems.data.concat(data);
      }else{
        this.listItems = new MatTableDataSource(data);
      }

      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
      console.log('api response data', data);
    }, 
    error => {
      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
    });

  }

  filterFieldChange(changed: boolean){
    // console.log('filters has change', changed);

    this.filtersHasChange.next(true);
  }

  downloadExcel(data: object){
    // se limpia los registros por pagina asi trae todos los datos
    this.formFilterObject['p_regxpag'] = 10000;
    // this.formFilterObject['p_nropag'] = null;
    this.progressBarService.show();
    // this.toasterService.show('Descargando ...', 'info');
    this.uiService.loadingExcel(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : any) => {
      const filename = this.fileDowloadService.generateFilename('librosRubricados', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.uiService.loadingExcel(false);
      this.progressBarService.hide();
    },
    error => {
      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
    });
  }

}
