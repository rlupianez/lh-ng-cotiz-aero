import { Component, OnInit, Inject } from '@angular/core';
import { PolizaEnCarteraDetail, ActionNav } from './poliza-en-cartera-detail.config';
import { PolizaEnCarteraService } from '../poliza-en-cartera.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ImpresionesViewComponent } from '@shared/ui-components/impresiones-view/impresiones-view.component';
import { 
  BienAseguradoAuto, 
  BienAseguradoAero, 
  BienAseguradoCascos, 
  BienAseguradoMercaderias, 
  BienAseguradoPersonas, 
  BienAseguradoUbicaciones,
  BienAseguradoVarios,
  BienAseguradoList } from '@core/models/BienAsegurado';

import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-poliza-en-cartera-detail',
  templateUrl: './poliza-en-cartera-detail.component.html',
  styleUrls: ['./poliza-en-cartera-detail.component.scss'],
  animations: [ trigger('fadeIn', animations.SkeletonfadeIn()) ]
})
export class PolizaEnCarteraDetailComponent implements OnInit {

  actionNav: object;
  detailConfig: object = {};
  cardFormFields: object[] = [];
  headerTab: object[] = [];
  polizaId: string;
  loading: boolean = false;

  /**  Hacerlo dinamico puede haber muchas tablas */
  tables: object = {};
  polizaData: object = {
    p_datos_poliza: {}
  };
  polizaTipo: string = null;
  loadingPanel: string;
  currentsParams: object;
  polizaSeccion: string;
  iconoSeccion: string = '';
  esFlota: boolean;

  constructor(
    private polizaService: PolizaEnCarteraService, 
    private route: ActivatedRoute, 
    private router: Router,
    private formService: FormsFactoryService,
    private navService: NavigationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location) {

    this.detailConfig = PolizaEnCarteraDetail;
    this.getFormFieldsByCols(this.detailConfig['card_form']);


    this.route.params.subscribe( params => {
      this.polizaId = params.poliza;
      this.currentsParams = params;
      const state = this.router.getCurrentNavigation().extras.state;

      if(state && state.data){
      
        this.loading = true;
        // this.showSnackBarMessage('Obteniendo información de Póliza...', null);
        this.polizaService.getPoliza(state.data).subscribe( (data:object) => {
          if(!data){
            this.router.navigate(['404'])
          }
          // this.polizaId = data['id'];
          console.log('datos servicio /POLIZA', data);
          this.polizaData = data;
          if(this.polizaData['p_list_riesgos_poliza'].length > 0){
            this.polizaTipo = this.polizaData['p_list_riesgos_poliza'][0]['tipo_rie'];
            if(this.polizaData['p_list_riesgos_poliza'].length > 1){
              this.esFlota = true;
            }else{
              this.esFlota = false;
            }
          }

          this.polizaService.getAccionesPoliza({ ...data, ...state.data }).subscribe( res => {
            // console.log('res acciones', res);
            if(res['p_acciones_poliza'] && res['p_acciones_poliza'].length > 0){
              this.actionNav = this.parseAccionNavList(res['p_acciones_poliza'][0]);
            }

          });
          /*if(this.polizaData['p_acciones_poliza'] && this.polizaData['p_acciones_poliza'].length > 0){
            this.actionNav = this.polizaData['p_acciones_poliza'];
          }*/

          this.iconoSeccion = this.polizaData['p_icono_seccion'];
          
          this.loadViewData();
          this.loading = false;
        }, error => {
          this.loading = false;
        });
      
      }else if(params){
      
        this.loading = true;
        // this.showSnackBarMessage('Obteniendo información de Póliza...', null);
        this.polizaService.getPoliza(params).subscribe( (poliza: any) => {
          console.log('datos servicio /POLIZA', poliza);
         
          this.polizaData = poliza;
          if(this.polizaData['p_list_riesgos_poliza'].length > 0){
            this.polizaTipo = this.polizaData['p_list_riesgos_poliza'][0]['tipo_rie'];
            if(this.polizaData['p_list_riesgos_poliza'].length > 1){
              this.esFlota = true;
            }else{
              this.esFlota = false;
            }
          }

          this.polizaService.getAccionesPoliza({ ...params, ...poliza['p_datos_poliza'][0]}).subscribe( res => {
            
            if(res['p_acciones_poliza'] && res['p_acciones_poliza'].length > 0){
              this.actionNav = this.parseAccionNavList(res['p_acciones_poliza'][0]);
            }

          });
 
          


          this.iconoSeccion = this.polizaData['p_icono_seccion'];
          this.loadViewData();
          this.loading = false;
        }, error => {
          this.loading = false;
        });
      
      } 

      // this.loading = false;

    });

  }

  polizaAction(event){
    if(event['actionName'] === 'comprobando_poliza'){
      const dialogRef = this.dialog.open(ImpresionesViewComponent, {
        width: '60%',
        data: this.polizaData['p_datos_poliza'][0]
      });
    }

  }

  accionesLink(data){
    //console.log('acciones click', data);
    if(data && data.link){
      window.open(data.link);
    }
  }

  /***
   * 
   * Se encarga de organizar las acciones devueltas por el servicio en un objeto con link y titulo por cada accion.
   * 
   */
  parseAccionNavList(data){
    const keys = Object.keys(data);
    let acciones = {}

    for(let key of keys){

        if(!data[key]){
          continue;
        }

        if( key.indexOf('link_') !== -1){
          let name = key.replace('link_','');
          if(acciones[name]){
            acciones[name].link = data[key];
          }else{
            acciones[name] = {
              link: data[key]
            }
          }
        }

        if(key.indexOf('titulo_') !== -1){
          let name = key.replace('titulo_','');

          
          if(acciones[name]){
            acciones[name].titulo = data[key];
          }else{
            acciones[name] = {
              titulo: data[key]
            }
          }
        }
      
    }

    return acciones;


  }

  loadViewData(){

    const data = { ...this.detailConfig['expansion_form'].panels };

    // Riesgos - Bienes Asegurados
    data['bien_asegurado']['content'].bienes.list.control.defaultData = this.polizaData['p_list_riesgos_poliza'];


    /***************************************************************
     *                RIESGOS 
     * ************************************************************/ 
    if(this.polizaData['p_list_riesgos_poliza'].length > 0){

      /*** Riesgos por seccion ***/
      const tipoRiesgo = this.polizaData['p_list_riesgos_poliza'][0].tipo_rie;
      let fields = null;

      switch(tipoRiesgo){
        case 'AUTO':
          fields = BienAseguradoAuto;
          break;
        case 'AERO':
          fields = BienAseguradoAero;
          break;
        case 'CASCO':
          fields = BienAseguradoCascos;
          break;
        case 'MERC':
          fields = BienAseguradoMercaderias;
          break;
        case 'PERS':
          fields = BienAseguradoPersonas;
          break
        case 'UBIC':
          fields = BienAseguradoUbicaciones;
          break;
        case 'RGVS':
          fields = BienAseguradoUbicaciones;
          break;
      }

      if(fields){
        data['bien_asegurado']['content'].bienes.form.fields = { ...BienAseguradoList, ...fields };
      }else{
        data['bien_asegurado']['content'].bienes.form.fields = { ...BienAseguradoList };
      }

      if(this.polizaData['p_list_riesgos_poliza'][0].tipo_rie === null){
        data['bien_asegurado']['content'].bienes.list.control.items.acciones['hidden'] = true;
      }else {
        data['bien_asegurado']['content'].bienes.list.control.items.acciones['hidden'] = false;
      }
      
      if(this.polizaData['p_list_riesgos_poliza'].length === 1){
        const riesgo = this.polizaData['p_list_riesgos_poliza'][0];
        data.bien_asegurado.content.bienes.list.title = 'Bien Asegurado';
        //this.loadingPanel = 'bien_asegurado';
        this.polizaService.getDetalleRiesgo(riesgo).subscribe( res => {
          if(res['p_detalle_rgo']){
            data.bien_asegurado.content.bienes.list.control.defaultData = [{ ...riesgo, ...res['p_detalle_rgo'][0]}];
          }
          //this.loadingPanel = null;
        });
      }
    }



    /***************************************************************
     *                COBERTURAS 
     * ************************************************************/ 

    this.setCobertura(this.polizaData['p_list_riesgos_poliza'][0]);
    data['cobertura']['content'].cobertura_section.list.control.defaultData = [];
    ///////////////////////////////////////////////////////
    
    
    // Polizas vinculadas
    data.polizas_vinculadas.content.poliza.list.control.defaultData = this.polizaData['p_list_polizas_vinculadas'];
    ///listados/LIST_POLIZA_CARTERA
    // Si posee una unica poliza debe obtener los datos de la poliza
    if(this.polizaData['p_list_polizas_vinculadas'].length === 1){
      const poliza = this.polizaData['p_list_polizas_vinculadas'][0];
      data.polizas_vinculadas.content.poliza.list.title = 'Póliza Vinculada';
      let filters =this.polizaService.getDetailFilters(data.polizas_vinculadas.content.poliza.form.filters, poliza);
      this.polizaService.getDetalleEntity('/listados/LIST_POLIZA_CARTERA', filters).subscribe( res => {
        if(res['p_list_poliza_cartera'].length > 0){
          data.polizas_vinculadas.content.poliza.list.control.defaultData = [{ ...poliza, ...res['p_list_poliza_cartera'][0]}];
        }
      });
    }

    // Siniestros
    data.siniestros.content.siniestros_section.list.control.defaultData = this.polizaData['p_list_siniestros_poliza']; 
    
    if(this.polizaData['p_list_siniestros_poliza'].length === 1){
      const siniestro = this.polizaData['p_list_siniestros_poliza'][0];
      data.siniestros.content.siniestros_section.list.title = 'Siniestro';
      let filters =this.polizaService.getDetailFilters(data.siniestros.content.siniestros_section.form.filters, siniestro);
      this.polizaService.getDetalleEntity('/listados/DETALLE_SINIESTRO', filters).subscribe( res => {
        if(res['p_list_det_siniestro'].length > 0){
          data.siniestros.content.siniestros_section.list.control.defaultData = [{ ...siniestro, ...res['p_list_det_siniestro'][0]}];
        }
      });
    }
    // Endosos
    data.endosos.content.endoso.list.control.defaultData = this.polizaData['p_list_endosos_poliza']; 
    // Obtener datos de endoso
    if(this.polizaData['p_datos_poliza']){
      this.polizaSeccion = this.polizaData['p_datos_poliza'][0].seccion;
    }

    this.detailConfig['expansion_form'].panels = { ...data };

    this.setDisabledPanels();


    this.tables['bienes'] = this.formService.createForm( {
      bien_asegurado_list: this.detailConfig['expansion_form'].panels.bien_asegurado.content.bienes.list }).get('bien_asegurado_list');

    this.tables['poliza'] = this.formService.createForm( {
      polizas_list: this.detailConfig['expansion_form'].panels.polizas_vinculadas.content.poliza.list }).get('polizas_list');

    this.tables['siniestros_section'] = this.formService.createForm( {
      siniestros_list: this.detailConfig['expansion_form'].panels.siniestros.content.siniestros_section.list }).get('siniestros_list');

    this.tables['endoso'] = this.formService.createForm( {
      endosos_list: this.detailConfig['expansion_form'].panels.endosos.content.endoso.list }).get('endosos_list');  

  }

  ngOnInit() {

    
  }

  get navItems(){
    return this.detailConfig['nav']['items'];
  }


  openRowDetail(event, name, section){
    // console.log('clicked', event, name );
    /*if(!this.detailConfig['expansion_form'].panels[name].content[section].form || this.detailConfig['expansion_form'].panels[name].content[section].form.hideDetailDialog){
      return
    }
    
    const dialogRef = this.dialog.open(DialogFormViewerComponent, {
      width: '50%',
      data: {
        title: this.detailConfig['expansion_form'].panels[name].text,
        formConfig: this.detailConfig['expansion_form'].panels[name].content[section].form,
        data: this.detailConfig['expansion_form'].panels[name].content[section].list.control.defaultData[event]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
    */



  }

  rowClicked(event){
    const name = event.name;
    const section = event.section;
    const data = event.data;
    if(name === 'bien_asegurado'){
      console.log('Riesgo Seleccionado', data);
      this.detailConfig['expansion_form'].panels.cobertura.expanded = true;
      this.setCobertura(data);
    }

    /*if(name === 'endosos'){

      if(event){
        const rowData = event;
        this.router.navigate([`/endosos/${rowData['poliza']}/${rowData['cod_sec']}/${rowData['endoso']}/${rowData['tipo_emi']}`], 
        { 
          state: { 
            data: rowData
          } 
        });
      }
    }*/
  }


  setCobertura(rowData){
    this.detailConfig['expansion_form'].panels['cobertura'].loading = true;
      this.polizaService.getCobertura(rowData).subscribe( res => {
        // console.log('cobertura data', res);
        if(res){
          console.log('detalle cobertura /DETALLE_RIESGO = ', res['p_detalle_riesgo_cob']);
          this.polizaData['p_detalle_riesgo_cob'] = res['p_detalle_riesgo_cob'];
          this.detailConfig['expansion_form'].panels.cobertura.content.cobertura_section.list.control.defaultData = this.polizaData['p_detalle_riesgo_cob'];
          this.tables['cobertura_section'] = this.formService.createForm( {
            cobertura_list: this.detailConfig['expansion_form'].panels.cobertura.content.cobertura_section.list }).get('cobertura_list');

          this.setDisabledPanels();
          this.detailConfig['expansion_form'].panels['cobertura'].loading = false;
        }
      },
      error=> {
        this.detailConfig['expansion_form'].panels['cobertura'].loading = false;
      });
  }

  /**
   *  Funciones para el manejo del formulario panel-expansion
   */
  getFormFieldsByCols(formConfig){
    let cols = [];

    for(const name in formConfig.cols){
      const col = formConfig.cols[name];

      if(col.type === 'form'){
        cols.push(col.fields);
      }

    }
    this.cardFormFields = cols;
  }

  showSnackBarMessage(message, action){
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }



  returnPage(){
   
  }

  tableAction(event){

    const name = event.name;
    const section = event.section;
    const data = event.data;
    // console.log('custom action data', data, name, section);
    if(name === 'bien_asegurado' || name === 'siniestros'){
      const dialogRef = this.dialog.open(DialogFormViewerComponent, {
        width: '50%',
        data: {
          title: this.detailConfig['expansion_form'].panels[name].content[section].form.title,
          formConfig: this.detailConfig['expansion_form'].panels[name].content[section].form,
          data: this.detailConfig['expansion_form'].panels[name].content[section].list.control.defaultData[data.index]
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
    }

    if(name === 'endosos'){

      if(event){
        const rowData = data.row || data;

        this.navService.navigateToPage(
          {
            baseUrl: '/reportes',
            modulePath: '/reportes-productores',
            pagePath: `/endosos/${rowData['poliza']}/${rowData['cod_sec']}/${rowData['endoso']}/${rowData['tipo_emi']}`
          }
        );
        /*this.router.navigate([`/endosos/${rowData['poliza']}/${rowData['cod_sec']}/${rowData['endoso']}/${rowData['tipo_emi']}`], 
        { 
          state: { 
            data: rowData
          } 
        });*/
      }
    }  

    if(name === 'polizas_vinculadas'){
      console.log('poliza link', data.row);

      if(data && !data.row){
        this.navService.navigateToPage(
          {
            baseUrl: '/reportes',
            modulePath: '/reportes-productores',
            pagePath: `/poliza-cartera/${data['poliza']}/${data['cod_sec']}/${data['endoso']}/${data['tipo_emi'] || 0 }`
          }
        );
        //this.router.navigate([`/poliza-cartera/${data['poliza']}/${data['cod_sec']}/${data['endoso']}/${data['tipo_emi'] || 0 }`]);
      }

      if(data.row){
        // poliza/:cod_sec/:endoso/:tipo_emi
        this.navService.navigateToPage(
          {
            baseUrl: '/reportes',
            modulePath: '/reportes-productores',
            pagePath: `/poliza-cartera/${data.row['poliza']}/${data.row['cod_sec']}/${data.row['endoso']}/${data.row['tipo_emi'] || 0 }`
          }
        );
        //this.router.navigate([`/poliza-cartera/${data.row['poliza']}/${data.row['cod_sec']}/${data.row['endoso']}/${data.row['tipo_emi'] || 0 }`]);
      }

    }
  }

  backRoute(){

    this.location.back();
  }


  /****
   * Marcar
   */
  setDisabledPanels(){
    this.getHeaderFormConfig(this.detailConfig['expansion_form']);

    for(let tab of this.headerTab){
      const tabName = tab['name'];
      let panel = this.detailConfig['expansion_form'].panels[tabName];
      if( panel ){
        const subsection = Object.keys(panel.content)[0];
        if(panel.content[subsection].list.control.defaultData.length === 0){
          this.detailConfig['expansion_form'].panels[tabName].disabled = true;
        }else{
          this.detailConfig['expansion_form'].panels[tabName].disabled = false;
        }

      }
    }
  }

  getHeaderFormConfig(formConfig){

    const panelsIndexs = Object.keys(formConfig.panels);
    let header = []; // o que sea object ??
    for(const panelId of panelsIndexs){
      const panel = formConfig.panels[panelId];

      header.push( {
        name: panelId,
        icon: panel.icon || '',
        text: panel.text || '',
        class: panel.class || ''
      })

    }

    this.headerTab = header;
  }

  get initialLoading(){
    return this.loading && true;
  }

}


export interface DialogFormData {
  formConfig: object;
  data: object;
  title: string;
}

@Component({
  selector: 'dialog-form-viewer',
  template: `
    <h1 mat-dialog-title>{{ title }}</h1>
    <div mat-dialog-content>
    <!--mat-progress-bar *ngIf="loading" class="col-12 col-sm-12 col-md-12 col-lg-12" mode="indeterminate"></mat-progress-bar-->
      <!-- Forms  -->
      <div class="form-card row pl-3 pr-3">
          <!-- formulario column-->
          <ng-container *ngFor="let colFields of content.formConfig | formViewerColumns: 1 ">
            <app-form-viewer [loading]="loading" class="col p-0" [formConfig]="colFields" [formData]="data"></app-form-viewer>
          </ng-container>
      </div> 
    </div>
    <div mat-dialog-actions  align="end">
      <button mat-button cdkFocusInitial (click)="closeDialog()">Cerrar</button>
    </div>
  `,
})
export class DialogFormViewerComponent implements OnInit {

  data: any;
  path: object;
  responseField: string;
  loading: boolean = false;

  constructor(
    private polizaService: PolizaEnCarteraService,
    public dialogRef: MatDialogRef<DialogFormViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public content: DialogFormData) {}

  closeDialog(): void {
    this.dialogRef.close();
  }


  get title(){
    return this.content.title;
  }

  ngOnInit(){
    this.path = this.content.formConfig['path'];
    this.responseField = this.content.formConfig['responseField'];
    this.getAsyncData(this.content);
  }

  getDetailFilters(filtersConfig, rowData){

    let fields = Object.keys(filtersConfig);
    let filters = {};

    for(let field of fields){
      
      filters[field] = rowData[filtersConfig[field]];

    }

    return filters;
  }

  getAsyncData(dialogContent){
    
    let filters = this.getDetailFilters(this.content.formConfig['filters'], this.content.data);

    this.loading = true;
    this.polizaService.getDetalleEntity(this.content.formConfig['path'], filters).subscribe( res => {
      if(res[this.responseField]){
        this.data = { ...res[this.responseField][0], ...this.content.data };
        console.log(`datos detalle ${this.content.formConfig['path']} = ${this.data}`);
      } else {
        this.data = this.content.data;
      }
      this.loading = false;
    },
    error => {
      this.loading = false;
    });
  }


}
