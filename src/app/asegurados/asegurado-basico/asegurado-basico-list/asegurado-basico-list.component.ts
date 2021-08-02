import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AseguradoBasico } from '../asegurado-basico.model';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';


import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';

declare let $: any;
import * as moment from 'moment';
import { UiService } from '@core/services/ui.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';
import { NavigationService } from '@core/services/navigation.service';


@Component({
  selector: 'app-asegurado-basico-list',
  templateUrl: './asegurado-basico-list.component.html',
  styleUrls: ['./asegurado-basico-list.component.css'],
  providers: [ FilterToolbarService ]
})
export class AseguradoBasicoListComponent implements OnInit, AfterViewInit {

  /**
   * Titulo de la cabecera
   */
  listTitle: string = 'Asegurados';
  
  apiPath: string = '/listados/LIST_ASEG';

  tableTitle: string = 'Resultado de Búsqueda'
  panelExpanded: boolean = true;
  rowDetails: any[];
  filterModel: object;
  columnsVisibility: object;
  isLoadingResults: boolean = false;
  resultLength: number = 0;
  applyFilterInTable: Subject<number> = new Subject<number>();
  listItems: any;
  columns: object;
  filtersFields: object;
  formVisibility: object;
  filterFormGroup: FormGroup;
  tablePageSize: number = 25;

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

  excelLink: string;
  
  constructor(
    private apiService: ApiService, 
    private progressBarService: ProgressBarService,
    private toasterService: ToasterService,
    private fileDowloadService: FileDownloaderService,
    private uiService: UiService,
    private navService: NavigationService,
    private router: Router,
    private formValidator: FormsFactoryService,
    private formBuilder: FormBuilder,
    private filterToolbarService: FilterToolbarService) {
  }

  ngOnInit() {
    // this.getRetenciones();
    this.listItems = [];
    this.columns = {
      // select : { label: 'Select', class: 'col' },
      cod_asegurado: { label: 'Cód. Asegurado', visible: true, class: 'col' },
      desc_asegurado: { label: 'Asegurado', visible: true, cellStyle: 'text-left', class: 'col' },
      desc_tipo_documento: { label: 'Tipo Doc', visible: true, cellStyle: 'text-left', class: 'col' },
      nro_docum: { label: 'Nro Doc', visible: true, class: 'col' },
      desc_condicion_fiscal: { label: 'Cond Fiscal', visible: true, cellStyle: 'text-left', class: 'col' },
      domicilio: { label: 'Domicilio', visible: true, cellStyle: 'text-left', class: 'col' },
      desc_provincia: { label: 'Provincia', visible: true,  cellStyle: 'text-left', class: 'col' },
      desc_localidad: { label: 'Localidad', visible: true, cellStyle: 'text-left', class: 'col' },
      telefono: { label: 'Teléfono', visible: true, class: 'col' }
      // descargar: { label: 'Descargar', class: 'col', action: true, icon: 'far fa-file-pdf fa-lg' }
    }

    this.filtersFields = {
      p_asegurado: {
        label: 'Asegurado',
        control: { 
          type: 'typeahead',
          class: 'col-sm-8',
          searchWithNoItemSelected: true,
          path: '/listas/LIST_ASEGURADOS',
          options: {
            key: 'cod_asegurado',
            value: 'list_val_aseg',
            description: 'cod_asegurado'
          },
          pasteFieldOnSelect: 'list_val_aseg',
          apiSearchFieldname: 'p_filtro',
          defaultValue: '',
        },
        class: 'col-sm-12 col-md-12 col-lg-5',
        required: true
      },
    };

    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    this.filterFormGroup = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));

  }


  ngAfterViewInit() {}

  applyFilters(oFilterData: object) {
    // const filterString = this.apiService.generateStringFilter(oFilterData, this.filtersFields);
    const opts = {	
      "p_o_sesion":1234,
      "p_limite": 1000, 
      "p_nropag": 0,            
      "p_regxpag": this.tablePageSize
    };
    delete oFilterData['p_cod_prod'];

    this.filterToolbarService.saveLastAppliedFilters(oFilterData, this.filterModel, this.apiPath);
    this.filterModel = Object.assign(oFilterData,opts);
    
    if(oFilterData['p_asegurado']['cod_asegurado']){
      oFilterData['p_asegurado'] = oFilterData['p_asegurado']['cod_asegurado'];
      oFilterData['p_buscar'] = oFilterData['p_asegurado'];
    }else{
      oFilterData['p_buscar'] = oFilterData['p_asegurado']['value'];
      oFilterData['p_asegurado'] = null;
    }
    //oFilterData['p_asegurado'] = oFilterData['p_asegurado']['cod_asegurado'];
    //oFilterData['p_buscar'] = oFilterData['p_asegurado'];
    
    
   /* this.filterModel['p_fecha_hasta'] = this.filterModel['p_fecha_hasta'].format('DD/MM/YYYY').toString();
    // recibe string el post de la api -- se le agrega el 0, no esta bueno
    if(this.filterModel['p_cod_sec']){
      this.filterModel['p_cod_sec'] = '0' + this.filterModel['p_cod_sec'].toString();
    }*/
    
    console.log('filter params', this.filterModel);
    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : object) => {
      
      console.log('response api get', data);
      if(data){
        this.filterToolbarService.saveReportResults(data['result']);
        this.listItems = new MatTableDataSource(data['result']);
        this.resultLength = data['pagination'].totalItems;
        
        if(data['result'].length > 0){
          // se guarda los ultimos datos de filtros aplicados
          this.formFilterObject = this.filterModel;
          this.excelLink = data['p_lnk_excel'];
          // this.panelExpanded = false;
        } else { // si no trae datos se limpia
          this.formFilterObject = null;
          this.excelLink = null;
        }

        this.applyFilterInTable.next(0);
      }

      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);
      
    },
    error => {
      this.isLoadingResults = false;
      this.filterToolbarService.saveReportResults([]);
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
      console.log('response api data', data);
    });

  }

  filterFieldChange(changed: boolean){
    // console.log('filters has change', changed);
    this.filtersHasChange.next(true);
  }

  downloadExcel(data: object){

    if(!this.excelLink){
      return; 
    }

    this.formFilterObject['p_regxpag'] = 10000;
    this.progressBarService.show();
    this.toasterService.show('Descargando ...', 'info');

    /*this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : any) => {
      const filename = this.fileDowloadService.generateFilename('asegurado-basico', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.progressBarService.hide();
    });
    */
   window.open(this.excelLink);
   this.progressBarService.hide();

  }

  onRowCliked(rowData: object){
    console.log('row', rowData);
    if(rowData){
     
      this.router.navigate([`/asegurado-basico/${rowData['cod_asegurado']}`], 
        { 
          state: { 
            data: rowData
          } 
        });
    }
  }

}
