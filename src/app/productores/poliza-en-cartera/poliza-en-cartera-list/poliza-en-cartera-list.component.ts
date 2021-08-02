import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PolizaEnCartera } from '../poliza-en-cartera.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';
import { delay } from 'q';
import { Location } from '@angular/common';

import { columns, filters } from './poliza-en-cartera-list.config';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { UiService } from '@core/services/ui.service';
import { Subject } from 'rxjs';

import * as moment from 'moment';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';
import { config } from '@core/config/app-config';
import { ProgressBarService } from '@core/services/progress-bar.service';

declare let $: any;

import * as routerAnimations from '@core/animations/router.animations';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NavigationService } from '@core/services/navigation.service';
import {  MatDialog } from '@angular/material/dialog';
import { ImpresionesViewComponent } from '@shared/ui-components/impresiones-view/impresiones-view.component';

/**
 * Validator de Rango
 */
const validateRangeDate = function (group: FormGroup) {

  const startDate = group.controls.desde.value;
  const endDate = group.controls.hasta.value;

  if (!group.controls.desde.validator && !group.controls.hasta.validator) {
    return null;
  }

  if (!startDate || !endDate) {
    return null;
  }

  if (startDate > endDate) {
    return { greaterThan: true };
  }

  if (startDate < endDate) {
    return null;
  }

  return null;
}

@Component({
  selector: 'app-poliza-en-cartera-list',
  templateUrl: './poliza-en-cartera-list.component.html',
  styleUrls: ['./poliza-en-cartera-list.component.css'],
  providers: [FilterToolbarService]
})
export class PolizaEnCarteraListComponent implements OnInit, AfterViewInit {

  // retenciones: RetencionesIva[] = [];
  apiPath: string = '/listados/LIST_POLIZA_CARTERA';
  tableTitle: string = 'Pólizas en Cartera';
  panelExpanded: boolean = true;
  listItems: any;
  columns: object;
  rowDetails: any[];
  filtersFields: object;
  filterModel: object;
  columnsVisibility: object;
  isLoadingResults: boolean = false;
  formVisibility: object;
  filterFormGroup: FormGroup;
  tablePageSize: number = 25;
  resultLength: number = 0;
  applyFilterInTable: Subject<number> = new Subject<number>();
  loadMorePaginator: boolean = true;

  /**
   * Ultimo form filter aplicado, se usa para mandar los datos para descargar el excel
   */
  formFilterObject: object = null;

  /**
   * Observer que notifica si los campos de filtros han sido modificados.
   * Sirve para identificar si lo que se esta mostrando en la tabla corresponde a los filtros en pantalla.
   */
  filtersHasChange: Subject<boolean> = new Subject<boolean>();
  initialLoading: boolean = false;


  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private formValidator: FormsFactoryService,
    private uiService: UiService,
    private navService: NavigationService,
    private router: Router,
    private route: ActivatedRoute,
    private filterToolbarService: FilterToolbarService,
    private progressBarService: ProgressBarService,
    private fileDowloadService: FileDownloaderService,
    private dialog: MatDialog
    ) {

  }

  ngOnInit() {
    this.listItems = [];
    this.columns = columns;
    this.filtersFields = filters;
    const params = this.filterToolbarService.getRouteParams();
    // si viene como params el asegurado las fechas no son obligatorias
    if (params && (params.p_cod_asegu || params.p_poliza)) {
      this.filtersFields['p_fec_emi'].required = false;
    }

    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    this.filterFormGroup = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));


    this.route.queryParams.subscribe(params => {
      // si existen params que vienen desde la url
      //console.log('params subscribe', params);
      if (params) {

        if (params.p_cod_asegu) {
          this.filterFormGroup.get('p_cod_asegu').setValue(JSON.parse(params.p_cod_asegu));

        }

        if (params.p_poliza) {
          this.filterFormGroup.get('p_poliza').setValue(params.p_poliza);
        }

      }

    });

    this.setDynamicFieldsFilters();

    if (! (Object.entries(this.filterToolbarService.getFiltersData()).length === 0)) {
      this.applyFilters(this.filterToolbarService.getFiltersData().lastAppliedFilters);
    }
    
  }

  get hideWhenLoading() {
    return this.initialLoading && config.ux.skeletonLoadingEnable;
  }

  setDynamicFieldsFilters() {
    this.filterFormGroup.get('p_cod_prod').valueChanges.subscribe(pCod => {
      const aseguradoId = 'p_cod_asegu';
      // console.log('codigo prod', pCod);
      if (pCod && pCod['codpas']) {

        this.filtersFields[aseguradoId]['control']['filters'] = {
          p_cod_prod: pCod['codpas']
        };

        this.filtersFields[aseguradoId] = { ...this.filtersFields[aseguradoId] };

      } else {

        this.filtersFields[aseguradoId]['control']['filters'] = null;

      }
    });


    this.filterFormGroup.get('p_cod_sec').valueChanges.subscribe(codSec => {
      const dominioId = 'p_patente';
      if (codSec) {
        /////////////////////////////////////////////////////////
        // filtro dominio condicional si seccion es 3
        if (codSec === 3 || codSec === 13 || codSec === 14 || codSec === 18) {

          /*let patenteField = this.filtersFields[dominioId];
          patenteField['hidden'] = false;*/
          this.formVisibility[dominioId] = false;
          //this.filtersFields[dominioId] = { ... patenteField };
          this.filterFormGroup.get(dominioId).enable();
        } else {

          /*let patenteField = this.filtersFields[dominioId];
          patenteField['hidden'] = true;*/
          this.formVisibility[dominioId] = true;
          //this.filtersFields[dominioId] = { ... patenteField };
          this.filterFormGroup.get(dominioId).disable();
          this.filterFormGroup.get(dominioId).setValue(null);
        }

      } else {
        // this.filterFormGroup.get('p_producto').disable();
        // this.filterFormGroup.get('p_producto').setValue(null);
        this.filterFormGroup.get(dominioId).disable();
        this.filterFormGroup.get(dominioId).setValue(null);
      }
    });

    this.filterFormGroup.valueChanges.pipe(
      debounceTime(100), distinctUntilChanged((p: any, n: any) => JSON.stringify(p) === JSON.stringify(n)))
      .subscribe(data => {
        this.setRequiredFields();
      });
  }

  ngAfterViewInit() { }

  applyFilters(oFilterData: object) {
    console.log('oFilterData',oFilterData);
    this.filterModel = this.getParsedFormDataInValidFilters(oFilterData);
    this.filterToolbarService.saveLastAppliedFilters(oFilterData, this.filterModel, this.apiPath);
    if(this.filterModel['p_poliza']){
      this.filterModel['p_poliza'] = this.filterModel['p_poliza'].replace('.','');
    }
    console.log('filter params', this.filterModel);

    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe((data: object) => {
      console.log('response api get', data);
      this.filterToolbarService.saveReportResults(data['result'] || []);
      if (data) {
        this.listItems = new MatTableDataSource(data['result']);
        this.resultLength = data['pagination'].totalItems;

        if (data['result'].length > 0) {
          // se guarda los ultimos datos de filtros aplicados
          this.formFilterObject = this.filterModel;
          // this.excelLink = data['p_lnk_excel'];
          // this.panelExpanded = false;
        } else { // si no trae datos se limpia
          this.formFilterObject = null;
          // this.excelLink = null;
        }

        this.applyFilterInTable.next(0);
      }

      this.isLoadingResults = false;
      this.uiService.loadingDataTable(false);

    },
      error => {
        this.filterToolbarService.saveReportResults([]);
        this.uiService.loadingDataTable(false);
        this.isLoadingResults = false;
      });
  }

  pageChange(paginationData: object) {
    
    const bodyData = this.filterModel;
    bodyData['p_nropag'] = paginationData['pageIndex'],
      bodyData['p_regxpag'] = paginationData['pageSize'];

    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.getDataTable(this.apiPath, bodyData).subscribe(data => {

      // SI POSEE EL BOTON "Mostrar mas"
      // si es pagina 0 debe volver limpiar la lista y setear los nuevos items
      // sino los acumula
      debugger;

      if (this.loadMorePaginator && paginationData['pageIndex'] !== 0) {
        debugger;
        this.listItems.data = this.listItems.data.concat(data);
      } else {
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

  onRowCliked(rowData: object) {
    //console.log('row', rowData);
    if (rowData) {

      this.navService.navigateToPage(
        {
          baseUrl: '/reportes',
          modulePath: '/reportes-productores',
          pagePath: `/endosos/${rowData['poliza']}/${rowData['cod_sec']}/${rowData['endoso']}/${rowData['tipo_emi']}`
        }
      );

    }
  }

  getParsedFormDataInValidFilters(oFilterData: object) {
    const opts = {
      p_nropag: 0,
      p_regxpag: this.tablePageSize,
      p_limite: 1000
    };


    let filterModel = { ...oFilterData, ...opts };

    if (oFilterData['p_cod_prod']['codpas']) {
      filterModel['p_cod_prod'] = oFilterData['p_cod_prod']['codpas'].toString() || "";
    }



    if (oFilterData['p_cod_asegu']['cod_asegurado']) {
      filterModel['p_cod_asegu'] = oFilterData['p_cod_asegu']['cod_asegurado'];
    } else {
      filterModel['p_cod_asegu'] = null;
    }

    // filterModel['p_cod_asegu'] = oFilterData['p_cod_asegu']['cod_asegurado'] || oFilterData['p_cod_asegu'];

    if (filterModel['p_fec_emi'] && filterModel['p_fec_emi']['hasta'] && filterModel['p_fec_emi']['desde']) {
      filterModel['p_fec_emi_hasta'] = oFilterData['p_fec_emi']['hasta'].format('DD/MM/YYYY').toString() || "";
      filterModel['p_fec_emi_desde'] = oFilterData['p_fec_emi']['desde'].format('DD/MM/YYYY').toString() || "";
      delete filterModel['p_fec_emi'];
    } else {
      delete filterModel['p_fec_emi'];
    }

    if (filterModel['p_fec_vig'] && filterModel['p_fec_vig']['desde'] && filterModel['p_fec_vig']['hasta']) {
      filterModel['p_fec_vig_hasta'] = oFilterData['p_fec_vig']['hasta'].format('DD/MM/YYYY').toString() || "";
      filterModel['p_fec_vig_desde'] = oFilterData['p_fec_vig']['desde'].format('DD/MM/YYYY').toString() || "";
      delete filterModel['p_fec_vig'];
    } else {
      delete filterModel['p_fec_vig'];
    }

    // recibe string el post de la api -- se le agrega el 0, no esta bueno
    if (filterModel['p_cod_sec']) {
      filterModel['p_cod_sec'] = /*'0' + */ filterModel['p_cod_sec'].toString();
    }

    return filterModel;
  }

  downloadExcel(data: object) {
    // se limpia los registros por pagina asi trae todos los datos
    this.formFilterObject['p_regxpag'] = 10000;
    // this.formFilterObject['p_nropag'] = null;
    this.progressBarService.show();
    // this.toasterService.show('Descargando ...', 'info');
    this.uiService.loadingExcel(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe((data: any) => {
      const filename = this.fileDowloadService.generateFilename('poliza-en-cartera', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.uiService.loadingExcel(false);
      this.progressBarService.hide();
    });
  }

  tableLinkClicked(data) {
    if (data['columnName'] === 'asegurado_link') {

      // link a asegurado
      if (data['rowData'].cod_asegu) {
        this.router.navigate([`/asegurados/asegurado-basico/${data['rowData'].cod_asegu}`]);
      }

    }

    if (data['columnName'] === 'impresiones_link') {      
      const dialogRef = this.dialog.open(ImpresionesViewComponent, {
        width: '60%',        
        data: data.rowData
      });


    }

  }

  datesIsEmpty() {

  }


  /**
   * Campos obligatorios segun filtros ingresados
   */
  setRequiredFields() {
    const data = this.filterFormGroup.value;
    if ((data.p_cod_asegu || data.p_poliza || data.p_estado === 'VIG' || data.p_patente) && (!data.p_fec_emi.desde && !data.p_fec_emi.hasta)) {
      //console.log('marcar fechas como no obligatorias');
      let cFecEmi = this.filterFormGroup.get('p_fec_emi');

      cFecEmi.get('desde').clearValidators();
      cFecEmi.get('desde').updateValueAndValidity();

      cFecEmi.get('hasta').clearValidators();
      cFecEmi.get('hasta').updateValueAndValidity();



    } else {
      // console.log('marcar fechas como obligatorias');
      let cFecEmi = this.filterFormGroup.get('p_fec_emi');

      cFecEmi.setValidators([validateRangeDate]);
      cFecEmi.updateValueAndValidity();

      //cFecEmi.get('desde').clearValidators();
      cFecEmi.get('desde').setValidators([Validators.required]);
      cFecEmi.get('desde').updateValueAndValidity();

      // cFecEmi.get('hasta').clearValidators();
      cFecEmi.get('hasta').setValidators([Validators.required]);
      cFecEmi.get('hasta').updateValueAndValidity();


    }

  }

}
