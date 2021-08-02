import {
  Component, OnInit, Input, Output, AfterViewInit, ViewChild,
  OnChanges, EventEmitter, Directive, ElementRef, OnDestroy
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToasterService } from '@core/services/toaster.service';
import { Subject, Subscription } from 'rxjs';

import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';
import { UiService } from '@core/services/ui.service';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';

import { config } from '@core/config/app-config';
import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';

/**
 *  
 *  Componente encargado de renderizar tabla con un listado de datos
 * 
 */

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss'],
  animations: [
    trigger('fadeIn', animations.SkeletonfadeIn()),
    trigger('rowsAnimation', animations.rowsSlideAnimation())
  ]
})
export class MaterialTableComponent implements OnInit, OnChanges, OnDestroy {

  /**
   * Titulo de la tabla
   */
  @Input() title?: string = 'Resultados de Búsqueda';
  /**
   * Listado de datos
   */
  @Input() dataSource: MatTableDataSource<object[]>;

  /**
   * Especifica si posee boton "load more", en caso contrario tendrá paginador 
   */
  @Input() loadMoreBtn: boolean = false;
  /**
   * Listado de columnas a mostrar
   */
  @Input() columns: {};
  // @Input() details: any[];
  // @Input() filtersData?: object;
  /**
   * Objeto que muestra la visibilidad de las columnas, si estan visibles o no
   */
  @Input() columnsVisibility: object;



  /**
   * Flag para indicar si se han terminado de cargos los datos del componente
   */
  @Input() isLoading: boolean;

  /**
   * 
   * Cargando la pantalla por primera vez
   * 
   */
  @Input() initialLoading: boolean = false;

  /**
   * Observer que se encarga de notificar cuando se cargaron nuevos datos a la tabla
   */

  @Input() filterAppliedSubject: Subject<number>;
  /**
   *  Número de items que se van a mostrar por página 
   */
  @Input() pageSize: number;
  /**
   *  Cantidad de total de items que posee la tabla
   */
  @Input() itemsTotal: number;
  /**
   * Evento Output que se ejecuta cada vez que se cambia de pagina de la tabla
   */
  @Output() paginationChange: EventEmitter<object> = new EventEmitter<object>();

  /**
   * Indica si el header de la tabla es sticky o si la tabla posee scroll horizontal
   */
  @Input() stickyHeader?: boolean = true;
  /**
   * Texto que se muestra cuando la tabla no posee datos para mostrar
   */
  emptyTableText: string = 'No se encontraron registros para mostrar';
  /**
   * Texto que se utiliza para buscar en los datos de la tabla
   */
  searchText: string;
  sortIsDesc: boolean;
  sortColumn: string;
  sortDirection: number;
  /**
   * Flag booleano que indica si se ha puesto el foco en el input de busqueda en tabla
   */
  searchFocused: boolean = false;
  // disabledToggleCols: boolean = false;


  // displayedColumns = [];
  /**
   * Modelo que contiene los items seleccionados
   */
  selection = new SelectionModel<any>(true, []);

  /**
   *  Objeto que se encarga de manejar el paginador, objeto propio de la libreria "angular material"
   */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /**
   *  Objeto encargado de manejar el ordenamiento, objeto propio de la libreria "angular material"
   */
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * Observer que notifica si los filtros han cambiado en relación a los datos que se muestra en la tabla.
   */
  @Input() filterHasChange: Subject<number>;

  /**
   * Evento que notifica cuando se presiono el boton de descargar Excel
   */
  @Output() downloadExcelEvent: EventEmitter<object> = new EventEmitter<object>();

  /**
   * Evento que notifica cuando se presiono el una columna con icono y/o link
   */
  @Output() linkRowClickedEvent: EventEmitter<object> = new EventEmitter<object>();

  /**
   * Guarda el numero de items por pagina
   */
  lastPageSize: number;

  /**
   * Ocultar botón de descargar en Excel
   */

  @Input() hideExcelExport: boolean = false;


  @Input() disableExcelExport: boolean = false;


  /**
   * Ocultar botón de descarga masiva en PDF
   */

  @Input() hidePDFDownload: boolean = false;

  /**
   * Ocultar botón de mostrar/ocultar columnas de la tabla
   */

  @Input() hideToggleColumns: boolean = false;



  /***
   *  Indica si la tabla posee la accion de clickear en una fila
   */

  @Output() rowClicked: EventEmitter<object> = new EventEmitter<object>();


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Se tendria que generar manejo de estados para la tabla,
  // Estados ---> Aplicado, Desactualizado, etc
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Indica si los filtros seleccionados en pantalla (formulario de filtros) fueron cambiados.
   * Significa que no coincide con los datos mostrados en la tabla
   */
  filtersChanged: boolean;

  /**
   * 
   * Indica cuando se esta procesando la descarga masiva de pdf
   *  
   */

  downloadingPDFs: boolean = false;

  downPDFSubs: Subscription = new Subscription();

  downloadingExcel: boolean = false;

  downExcelSubs: Subscription = new Subscription();

  appliedFiltersSubs: Subscription = new Subscription();

  filtersChangedSubs: Subscription = new Subscription();

  toolbarSubscription: Subscription = new Subscription();

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private toaster: ToasterService,
    private fdownloader: FileDownloaderService,
    private uiService: UiService,
    private filterToolbarService: FilterToolbarService) {
    this.searchText = '';
  }

  ngOnInit() {

    this.initialLoading = true;
    if (!this.filterToolbarService.isLoaded) {
      this.toolbarSubscription = this.filterToolbarService.getToolbarServiceNotifications().subscribe(
        res => {
          console.log('toolbar service', res);
          this.initialLoading = false;
        }
      )
    } else {
      this.initialLoading = false;
    }

    this.downExcelSubs = this.uiService.dowloadingExcel.subscribe(loading => {
      this.downloadingExcel = loading;
    });
    this.dataSource.sort = this.sort;
    this.lastPageSize = this.pageSize;
    // se aplica nuevo filtro, se debe reiniciar el sort, el paginator y selector de filas
    this.appliedFiltersSubs = this.filterAppliedSubject.subscribe(value => {
      if (this.paginator) {
        this.paginator.firstPage();
      }

      this.selection.clear();
      this.filtersChanged = false;
    });

    // notifica cuando el formulario de filtros cambio y todavia no se apreto el botón aplicar
    // Significa que los filtros no coinciden con los datos de la tabla
    this.filterHasChange.subscribe(value => {
      // console.log('filters change in table', value);
      this.filtersChanged = true;
    });
  }

  ngAfterViewCheck() {
  }

  ngOnDestroy() {
    this.downExcelSubs.unsubscribe();
    this.downPDFSubs.unsubscribe();
    this.appliedFiltersSubs.unsubscribe();
    this.filtersChangedSubs.unsubscribe();
    this.toolbarSubscription.unsubscribe();
  }
  /**
   * Objeto con las columnas visibles
   */
  get displayedColumns(): object {
    return Object.keys(this.columns);
  }

  /**
   * Número de registros seleccionados de la tabla
   */
  get rowsSelectedQty(): number {
    return this.selection.selected.length;
  }

  /**
   * Indica si la tabla está vacía o no
   */
  get tableIsEmpty(): boolean {
    return !this.dataSource || !this.dataSource.data || this.dataSource.data.length === 0;
  }

  /**
   *  Cantidad de items cargados en la tabla
   */
  get loadedItemsQty(): number {
    return this.dataSource.data.length;
  }

  /**
   *  Indica si se han cargado todos los items
   */
  get allItemsLoaded(): boolean {
    if (this.dataSource.data) {
      return this.dataSource.data.length === this.itemsTotal;
    } else {
      return false;
    }

  }

  /**
   * Indica si se debe mostrar la fila de "Mostrar más"
   */
  get showLoadMoreRow(): boolean {
    return !this.allItemsLoaded && this.loadMoreBtn && this.itemsTotal > 0;
  }

  /**
   *  Estilo css de la tabla
   */
  get tableStyle() {
    if (this.stickyHeader) {
      return 'w-100 table-hover'
    } else {
      return 'table-responsive w-100 table-hover'
    }
  }

  get hideWhenLoading() {
    return this.initialLoading && config.ux.skeletonLoadingEnable;
  }

  /**
   * Aplica filtro de busqueda, busca un string en el contenido de la tabla
   */
  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  /**
   * Función encargada de tildar o destildar todas las filas de una página
   */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() : this.selectRows();
  }

  /**
   * Indica si todas las filas de una página están seleccionadas 
   */
  isAllPageSelected(): boolean {
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      return false;
    }
    let pageSize = this.paginator.pageSize;
    const lastPageSize = this.paginator.length % this.paginator.pageSize;

    if (!this.paginator.hasNextPage() && lastPageSize !== 0) {
      pageSize = lastPageSize;
    }
    return numSelected === pageSize;
  }


  isAllSelected() {
    if (this.loadMoreBtn) {
      return this.isAllItemsSelected();
    } else { // si tiene paginado
      return this.isAllPageSelected();
    }
  }

  selectRows() {
    if (this.loadMoreBtn) {
      return this.selectAllRows();
    } else { // si tiene paginado
      return this.selectPageRows();
    }
  }

  /**
   * Indica si todos los items de la tabla estan seleciconados
   */
  isAllItemsSelected(): boolean {
    const numSelected = this.selection.selected.length;
    if (numSelected === 0) {
      return false;
    }

    return numSelected === this.loadedItemsQty;
  }

  /**
   * Seleccion todos los items de un pagina
   */
  selectPageRows(): void {
    const currentPage = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    // let firstElement =  pageSize * currentPage;
    const firstElement = 0;
    const lastElement = firstElement + pageSize;

    for (let index = firstElement; index < lastElement; index++) {
      if (this.dataSource.data[index]) {
        this.selection.select(this.dataSource.data[index]);
      }
    }
  }

  /**
   * Selecciona todos los items
   */
  selectAllRows() {
    // let firstElement =  pageSize * currentPage;
    const firstElement = 0;
    const lastElement = this.loadedItemsQty;

    for (let index = firstElement; index < lastElement; index++) {
      if (this.dataSource.data[index]) {
        this.selection.select(this.dataSource.data[index]);
      }
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position}`;
  }

  public urlToPromise(url) {
    return new Promise(function (resolve, reject) {
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public downloadSelected() {
    this.downloadingPDFs = true;
    this.downPDFSubs = this.fdownloader.downloadSelectedPDF(this.selection.selected).subscribe(res => {
      console.log('res url', res);
      if (res) {
        this.download(res, 'p_url_reporte');
        this.downloadingPDFs = false;
      }
    },
      error => {
        console.log('error download', error);
      });

  }



  /**
   * 
   */
  public download(row: object, fieldname: string) {
    // console.log('dowload row', row);
    // si no se indica el nombre del campo, por defecto se usa 'lnk_rep'
    const field = fieldname || 'lnk_rep';

    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.setAttribute('target', '_blank');
    link.href = row[field];
    link.download = './';
    document.body.appendChild(link);
    link.click();
    link.remove();
    // this.toaster.show('Descargando ...','');
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  clearSearch(event) {
    this.searchText = '';
    this.applyFilter();
  }

  /**
   * 
   * Evento que se ejecuta cuando el usuario presiona para obtener la siguiente pagina de resultados, o
   * presionar el boton de "cargar mas"
   * 
   * @param event 
   */
  changePage(event) {

    if (this.loadMoreBtn) {
      // si la cantidad de items por pagina cambio
      if (this.lastPageSize !== event.pageSize) {
        this.paginator.firstPage();
        this.lastPageSize = event.pageSize;
      }
      this.selection.clear();
    }

    if (this.paginator.pageIndex !== this.paginator.getNumberOfPages()) {
      this.selection.clear();

    }
    
    this.paginationChange.emit(event);

  }

  /**
   * Genera un objeto especificando la visibilidad de cada columna.
   * true --> visible
   * false --> oculto
   */
  get visibleColsQty() {
    const keys = Object.keys(this.columns);
    return keys.filter((col) => {
      return this.columns[col].visible;
    });
  }


  /**
   * Oculta/Muestra la columna de la tabla
   * 
   * @param columnName nombre de columna a ocultar o mostrar
   */
  toggleColumn(columnName) {
    if (!this.columns[columnName].visible) {
      this.columns[columnName].visible = !this.columns[columnName].visible;
    } else if (this.visibleColsQty.length > 2) {
      this.columns[columnName].visible = !this.columns[columnName].visible;
    }
  }

  /**
   * Cargar los siguientes datos de la tabla
   */
  loadMoreData() {
    console.log('itemsTotal', this.itemsTotal);
    console.log('pageSize', this.pageSize);
    console.log('getNumberOfPages', this.paginator.getNumberOfPages());
    console.log('this.paginator.length', this.paginator.length);
    console.log('this.paginator.pageSize', this.paginator.pageSize);
    console.log('this.paginator.pageIndex', this.paginator.pageIndex);
    this.paginator.nextPage();
  }

  /**
   * Emite Evento de hacer click en el boton de Descargar Excel
   */
  downloadExcel() {
    if (this.dataSource.data.length > 0) {
      this.downloadExcelEvent.emit({});
    }
  }


  /**
   * Emite el evento de hacer click en una fila de la tabla.
   * Devuelve la informacion de la fila clickeada
   * @param dataRow 
   */
  onRowClicked(dataRow: object) {
    this.rowClicked.emit(dataRow);
  }


  linkRowClicked(name, row) {
    this.linkRowClickedEvent.emit({ columnName: name, rowData: row });
  }

}
