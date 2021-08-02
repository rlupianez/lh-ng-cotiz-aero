import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@core/services/http/api.service';
import { ToasterService } from '@core/services/toaster.service';
import { delay } from 'q';
import { Location } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { propuestasColumns, cotizacionesColumns, filters, pdfColumns } from './cotizaciones-propuestas-list.config';
import { IvyParser } from '@angular/compiler';
import { NavigationService } from '@core/services/navigation.service';


@Component({
  selector: 'app-cotizaciones-propuestas-list',
  templateUrl: './cotizaciones-propuestas-list.component.html',
  styleUrls: ['./cotizaciones-propuestas-list.component.scss'],
  providers: [ FilterToolbarService ]
})
export class CotizacionesPropuestasListComponent implements OnInit {

  // retenciones: RetencionesIva[] = [];
  apiPath: string = '/listados/LIST_PROPUESTAS';
  tableTitle: string = 'Cotizaciones-Propuestas';
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
    private navService: NavigationService,
    private formBuilder: FormBuilder, 
    private formValidator: FormsFactoryService, 
    private uiService: UiService,
    private router: Router,
    private filterToolbarService: FilterToolbarService,
    private progressBarService: ProgressBarService,
    private location: Location,
    private fileDowloadService: FileDownloaderService) {

  }

  ngOnInit() {
    // this.getRetenciones();
    this.listItems = [];
    this.columns = cotizacionesColumns;
    this.filtersFields = filters;
    
    this.formVisibility = this.formValidator.setFiltersVisibility(this.filtersFields);
    this.filterFormGroup = this.formBuilder.group(this.formValidator.generateForm(this.filtersFields, this.formVisibility));
    // Observer Codigo Productor
    this.filterFormGroup.get('p_cod_prod').valueChanges.subscribe( pCod => {
      const aseguradoId = 'p_cod_asegu';
      
      if(pCod && pCod['codpas']){

        this.filtersFields[aseguradoId]['control']['filters'] = {
          p_cod_prod: pCod['codpas']
        };

        this.filtersFields[aseguradoId] = { ...this.filtersFields[aseguradoId] };

      }else{

        this.filtersFields[aseguradoId]['control']['filters'] = null;
        
      }
    });

    // Observer Codigo de Seccion
    this.filterFormGroup.get('p_cod_sec').valueChanges.subscribe( codSec => {
     const tipoOperacion=this.filterFormGroup.get('p_tipo_operacion').value;
     const dominioId = 'p_dominio';
     let config = { ...this.filtersFields[dominioId] }

      if(codSec && tipoOperacion){        
        if((codSec === 3 || codSec === 13 || codSec === 18 || codSec === 19) && (tipoOperacion=== 'C')){
          this.filterFormGroup.get(dominioId).enable();
          config['hidden'] = false;
          this.formVisibility[dominioId] = false;
          this.filtersFields[dominioId] = {...config};
          
        }else if((codSec === 14) && (tipoOperacion=== 'P')){
          this.filterFormGroup.get(dominioId).enable();  
          config['hidden'] = false;
          this.formVisibility[dominioId] = false;
          this.filtersFields[dominioId] = {...config};
            
        }else{
          this.filterFormGroup.get(dominioId).disable();  
          config['hidden'] = true;
          this.formVisibility[dominioId] = true;
          this.filtersFields[dominioId] = {...config};
        }

      }else{
        this.formVisibility[dominioId] = true;
        this.filterFormGroup.get(dominioId).disable();
        this.filterFormGroup.get(dominioId).setValue(null);
      }
     
    
    });   
    
    // Observer Tipo de Operacion
    this.filterFormGroup.get('p_tipo_operacion').valueChanges.subscribe( tipoOperacion => {
      const codSec=this.filterFormGroup.get('p_cod_sec').value;  
      const dominioId = 'p_dominio';
      let config = { ...this.filtersFields[dominioId] }
      if(codSec && tipoOperacion){        
        if((codSec === 3 || codSec === 13 || codSec === 18 || codSec === 19) && (tipoOperacion=== 'P')){
          config['hidden'] = false;
          this.filterFormGroup.get(dominioId).enable();
          this.formVisibility[dominioId] = false;
          this.filtersFields[dominioId] = {...config};
          
        }else if((codSec === 14) && (tipoOperacion=== 'C')){
          config['hidden'] = false;
          this.formVisibility[dominioId] = false;
          this.filterFormGroup.get(dominioId).enable(); 
          this.filtersFields[dominioId] = {...config};
               
        }else{
          config['hidden'] = true;
          this.formVisibility[dominioId] = true;
          this.filterFormGroup.get(dominioId).disable(); 
          this.filtersFields[dominioId] = {...config};
        }

      }else{
        this.filterFormGroup.get(dominioId).disable();
        this.formVisibility[dominioId] = true;
        this.filterFormGroup.get(dominioId).setValue(null);
      }

      if(tipoOperacion){
        
        let configEstado = { ...this.filtersFields['p_estado'] }
        configEstado['control']['filters'] = {
          p_tipo_operacion: tipoOperacion
        }
        this.filtersFields['p_estado'] = configEstado;
      }else{
        let configEstado = { ...this.filtersFields['p_estado'] }
        configEstado['control']['filters'] = {
          p_tipo_operacion: ''
        }
        this.filtersFields['p_estado'] = configEstado;
      }
      
     });   

  }

  get hideWhenLoading(){
    return this.initialLoading && config.ux.skeletonLoadingEnable;
  }

  ngAfterViewInit() {}

  /**
   * Se ejecuta al presionar el boton Aplicar del formulario de Filtros.
   * Ejecuta la llamada al servicio para obtener resultados
   * @param oFilterData 
   */
  applyFilters(oFilterData: object) {
    this.filterModel = this.getParsedFormDataInValidFilters(oFilterData);
    this.filterToolbarService.saveLastAppliedFilters(oFilterData, this.filterModel, this.apiPath);
    
    console.log('filter params', this.filterModel);

    this.isLoadingResults = true;
    this.uiService.loadingDataTable(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : object) => {
      console.log('response api get', data);

      this.filterToolbarService.saveReportResults(data['result']);
      if(data){
        //////////////////////////////////////////////////////////
        this.listItems = new MatTableDataSource(data['result']);
        this.resultLength = data['pagination'].totalItems;
        
        if(data['result'].length > 0){
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
      this.isLoadingResults = false;
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


  /**
   * Transforma los datos del form con la estructura que recibe el Servicio de LIST_PROPUESTAS
   */
  getParsedFormDataInValidFilters(oFilterData: object){
    // agrego los datos necesarios para el paginado
    const opts = { 
      p_limite: 1000,
      p_regxpag: this.tablePageSize,
      p_nropag: 0,
      p_n_cbte_impos:"",
    };


    let filterModel = { ...oFilterData, ...opts};

    if(oFilterData['p_cod_prod']['codpas']){
      filterModel['p_cod_prod'] = oFilterData['p_cod_prod']['codpas'].toString() || "";
    }

    if(oFilterData['p_dominio']){
      filterModel['p_dominio'] = oFilterData['p_dominio']['dominio'] || "";
    }

    
    
    if( oFilterData['p_cod_asegu']['cod_asegurado']){
      filterModel['p_cod_asegu'] = oFilterData['p_cod_asegu']['cod_asegurado'];  
    }else {
      filterModel['p_cod_asegu'] = null;
    }

    // filterModel['p_cod_asegu'] = oFilterData['p_cod_asegu']['cod_asegurado'] || oFilterData['p_cod_asegu'];

    if(filterModel['p_fecha'] && filterModel['p_fecha']['hasta'] && filterModel['p_fecha']['desde']){
      filterModel['p_fecha_hasta'] = oFilterData['p_fecha']['hasta'].format('DD/MM/YYYY').toString() || "";
      filterModel['p_fecha_desde'] = oFilterData['p_fecha']['desde'].format('DD/MM/YYYY').toString() || "";
      delete filterModel['p_fecha'];
    }        
    
    // recibe string el post de la api -- se le agrega el 0, no esta bueno
    if(filterModel['p_cod_sec']){
      filterModel['p_cod_sec'] = /*'0' + */ filterModel['p_cod_sec'].toString();
    }

    return filterModel;
  }

  ///////////////////////////////////////////////////////////////////
  //
  //          Eventos
  //
  ///////////////////////////////////////////////////////////////////
  downloadExcel(data: object){
    // se limpia los registros por pagina asi trae todos los datos
    this.formFilterObject['p_regxpag'] = 10000;
    // this.formFilterObject['p_nropag'] = null;
    this.progressBarService.show();
    // this.toasterService.show('Descargando ...', 'info');
    this.uiService.loadingExcel(true);

    this.apiService.post(this.apiPath, this.filterModel).subscribe( (data : any) => {
      const filename = this.fileDowloadService.generateFilename('poliza-en-cartera', this.filterModel);
      this.fileDowloadService.exportToCsv(data.result, filename, this.columns);
      this.uiService.loadingExcel(false);
      this.progressBarService.hide();
    });
  }

  tableLinkClicked(data){
    const rowData = data['rowData'];
    const cotizacion = data['rowData']['nro_cotizacion'];
    const propuesta = data['rowData']['nro_propuesta'];
    if(data['columnName'] === 'asegurado_link'){

      // link a asegurado
      if(data['rowData'].cod_asegu){
        
        this.router.navigate([`/asegurados/asegurado-basico/${data['rowData'].cod_asegu}`]);
        /*this.navService.navigateToPage({
          baseUrl: '/consultas',
          modulePath: '/asegurados',
          pagePath: `/asegurado-basico/${data['rowData'].cod_asegu}`
        });*/
      
      } 
      
    }

    if(data['columnName'] === 'impresiones_link'){

      // link a asegurado
      if(data['rowData'].lnk_impresion){
        window.open(data['rowData'].lnk_impresion,'_blank');
      } 
      
    }

    switch(data['columnName']){
      case 'ver_cotizacion':
        
        this.router.navigate([`/aeronavegacion/propuesta/view/${cotizacion}`], { queryParams: { cotizacion: true}});
        /*this.navService.navigateToPage({
          baseUrl: '/cotizaciones-propuestas',
          modulePath: '/aeronavegacion',
          pagePath: `/aeronavegacion/cotizar/${cotizacion}`
        });*/

        break;
      case 'ver_propuesta':
        this.router.navigate([`/aeronavegacion/propuesta/view/${propuesta}`]);
        /*this.navService.navigateToPage({
          baseUrl: '/cotizaciones-propuestas',
          modulePath: '/aeronavegacion',
          pagePath: `/propuesta/view/${propuesta}`
        });*/

        break;
      case 'generar_propuesta':
        this.retomar(data['rowData']);
        //this.router.navigate([`/aeronavegacion/cotizar`]);
        break;
      case 'retomar_propuesta':
        this.retomar(data['rowData']);
        //this.router.navigate([`/aeronavegacion/cotizar`]);
        break;
      case 'descarga_cotizacion_pdf':
        if(data['rowData'].link_pdf_cotizacion){
          window.open(data['rowData'].link_pdf_cotizacion,'_blank');
        } 
        break;
      case 'descarga_propuesta_pdf':
         this.downloadPDF(`Propuesta#${propuesta}`, rowData, pdfColumns);
        /*if(data['rowData'].link_pdf_propuesta){
          window.open(data['rowData'].link_pdf_propuesta,'_blank');
        } */
        break;
      case 'descarga_certificado_pre':
        this.downloadPDF(`Certificado`, rowData, pdfColumns);
        /*if(data['rowData'].link_pdf_certificado_pre){
          window.open(data['rowData'].link_pdf_certificado_pre,'_blank');
        } */
        break;
      case 'ver_poliza':
        this.openPoliza(rowData);
        break;
      case 'nueva_version':
        this.router.navigate([`/aeronavegacion/cotizar/copy/${cotizacion}`]);
        /*this.navService.navigateToPage({
          baseUrl: '/cotizaciones-propuestas',
          modulePath: '/aeronavegacion',
          pagePath: `/aeronavegacion/cotizar/copy/${cotizacion}`
        });*/
        break;
      case 'link_impresiones_pol':
        if(data['rowData']['link_impresiones_pol']){
          window.open(data['rowData']['link_impresiones_pol'], '_blank');
        }
        break;
    }
    
  }

  openPoliza(data){
    if(data){

       this.router.navigate([`/reportes-productores/poliza-cartera/${data.nro_poliza}/${data.cod_sec}/0/0`]);
      /*this.navService.navigateToPage({
        baseUrl: '/reportes',
        modulePath: '/reportes-productores',
        pagePath: `/poliza-cartera/${data.nro_poliza}/${data.cod_sec}/0/0`
      });*/

    }
  }

  downloadPDF(title: string, fields, columns ){
    this.fileDowloadService.downloadJSONinPDF(title,fields,columns);
  }


  retomar(data){
    const cotizacion = data['nro_cotizacion'];
    const fec_cotizacion = data['fec_cotizacion'];
    const propuesta = data['nro_propuesta'];
    const fec_propuesta = data['fec_propuesta'];
    console.log("fecha esta de aca", data)
    if(!fec_propuesta){
      this.router.navigate([`/aeronavegacion/emitir/${cotizacion}`]);
      /*this.navService.navigateToPage({
        baseUrl: '/cotizaciones-propuestas',
        modulePath: '/aeronavegacion',
        pagePath: `/emitir/${cotizacion}`
      });*/
      
    }else{
      this.router.navigate([`/aeronavegacion/emitir/${cotizacion}`]);
      /*this.navService.navigateToPage({
        baseUrl: '/cotizaciones-propuestas',
        modulePath: '/aeronavegacion',
        pagePath: `/propuesta/${propuesta}`
      });*/

    }

  }

}


