import { Component, OnInit, Inject } from '@angular/core';
import { Detail, ActionNav, ExpansionForm } from './endosos-detail.config';
import { EndososService } from '../endosos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { FormsFactoryService } from '@core/services/forms/forms-factory.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImpresionesViewComponent } from '@shared/ui-components/impresiones-view/impresiones-view.component';
import { Location } from '@angular/common';
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
  selector: 'app-endosos-detail',
  templateUrl: './endosos-detail.component.html',
  styleUrls: ['./endosos-detail.component.scss'],
  animations: [ trigger('fadeIn', animations.SkeletonfadeIn() )]
})
export class EndososDetailComponent implements OnInit {

  detailConfig: object = Detail;
  actionNav: object = ActionNav;
  cardFormFields: object[] = [];
  headerTab: object[] = [];
  polizaId: string;
  loading: boolean = false;
  endososData: object = {
    prev: null,
    current: null,
    next: null
  };
  currentParams: object;

  /**  Hacerlo dinamico puede haber muchas tablas */
  tables: object = {};
  polizaSeccion: string;
  polizaData: object = {
    p_datos_endoso: [
      {}
    ]
  };
  polizaTipo: string = null;
  loadingPanel: string;
  iconoSeccion: string;


  constructor(
    private polizaService: EndososService, 
    private route: ActivatedRoute, 
    private router: Router,
    private formService: FormsFactoryService,
    private navService: NavigationService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location) {

    this.getFormFieldsByCols(this.detailConfig['card_form']);
    // this.getHeaderFormConfig(this.detailConfig['expansion_form']);


    

    this.route.params.subscribe( params => {
      this.polizaId = params.poliza;
      this.currentParams = params;
      const state = this.router.getCurrentNavigation().extras.state;
      //this.loading = true;
      
      if(state && state.data){
      
        this.loading = true;
        // this.showSnackBarMessage('Obteniendo información de Póliza...', null);
        this.polizaService.getPoliza(state.data).subscribe( (data:object) => {
          if(!data){
            this.router.navigate(['404'])
          }
          // this.polizaId = data['id'];
          console.log('datos servicio /ENDOSO y /ACCIONES_POLIZA = ', data);
          this.polizaData = data;
          if(this.polizaData['p_list_riesgos_endoso'].length > 0){
            this.polizaTipo = this.polizaData['p_list_riesgos_endoso'][0]['tipo_rie'];
          }
          
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
          console.log('datos servicio /ENDOSO = ', poliza);
         
          this.polizaData = poliza;
          if(this.polizaData['p_list_riesgos_endoso'].length > 0){
            this.polizaTipo = this.polizaData['p_list_riesgos_endoso'][0]['tipo_rie'];
          }

          this.iconoSeccion = this.polizaData['p_icono_seccion'];
          
          this.loadViewData();
          this.loading = false;
        }, error => {
          this.loading = false;
        });
      
      } 

      this.getEndososData();

      // this.loading = false;

    });

  }

  loadViewData(){
    const data = { ...ExpansionForm.panels };

    // agrego poliza electronica
    if(this.polizaData['p_datos_endoso'] && this.polizaData['p_datos_endoso'].length > 0){
      this.polizaData['p_datos_endoso'][0]['p_poliza_electronica'] = this.polizaData['p_poliza_electronica']
    }
    
    // Comisiones
    data.comisiones.content.com_section.list.control.defaultData = this.polizaData['p_detalle_comisiones'];
    // Plan de pagos
    data.plan_pagos.content.pagos_cabecera.list.control.defaultData = this.polizaData['p_plan_pagos']; 
    // Pagos (Pagos y cuotas)
    //data['pagos']['content']['pagos_sec']['list']['control']['defaultData'] =  this.polizaData['p_detalle_cuotas'];

    // Obtener datos de endoso
    if(this.polizaData['p_datos_endoso'] && this.polizaData['p_datos_endoso'].length > 0){
      this.polizaSeccion = this.polizaData['p_datos_endoso'][0].seccion;
    }

    /**** Hay que unir las cuotas con los pagos para hacer una unica tabla *****/
    const cuotas = this.polizaData['p_detalle_cuotas'] || [];
    const pagos = this.polizaData['p_detalle_pagos'] || [];
    let cuotasPagos = []
    for(let i=0; i < cuotas.length ; i++){
      const c = cuotas[i];
      const p = pagos[i] || {};
      let cp = { ...c, ...p };
      cuotasPagos.push(cp);
    }

    data['pagos']['content']['pagos_sec']['list']['control']['defaultData'] =  cuotasPagos;

    data.riesgos_endoso.content.riesgos_endoso.list.control.defaultData = this.polizaData['p_list_riesgos_endoso']; 

    if(this.polizaData['p_list_riesgos_endoso'].length > 0){

      /*** Riesgos por seccion ***/
      const tipoRiesgo = this.polizaData['p_list_riesgos_endoso'][0].tipo_rie;
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
        data['riesgos_endoso']['content'].riesgos_endoso.form.fields = { ...BienAseguradoList, ...fields };
      }else{
        data['riesgos_endoso']['content'].riesgos_endoso.form.fields = { ...BienAseguradoList } as any;
      }
      
      if(this.polizaData['p_list_riesgos_endoso'][0].tipo_rie === null){
        data['riesgos_endoso']['content'].riesgos_endoso.list.control.items.acciones['hidden'] = true;
      }else {
        data['riesgos_endoso']['content'].riesgos_endoso.list.control.items.acciones['hidden'] = false;
      }

      this.setCobertura(this.polizaData['p_list_riesgos_endoso'][0]);

      if(this.polizaData['p_list_riesgos_endoso'].length === 1){
        const riesgo = this.polizaData['p_list_riesgos_endoso'][0];
        //this.loadingPanel = 'riesgos_endoso';
        // data.riesgos_endoso.content.riesgos_endoso.list.title = 'Bien Asegurado';
        this.polizaService.getDetalleRiesgo(riesgo).subscribe( res => {
          if(res['p_detalle_rgo']){
            data.riesgos_endoso.content.riesgos_endoso.list.control.defaultData = [{ ...riesgo, ...res['p_detalle_rgo'][0]}];
          }

          
          //this.loadingPanel = null;
        });
      }
    }

    this.detailConfig['expansion_form'].panels = { ...data };
    this.setDisabledPanels();
    // this.detailConfig['expansion_form'].panels = { ...data };
    

    this.tables['com_section'] = this.formService.createForm( {
      comisiones_list: this.detailConfig['expansion_form'].panels.comisiones.content.com_section.list }).get('comisiones_list');
    
    /*this.tables['siniestros_section'] = this.formService.createForm( {
      siniestros_list: this.detailConfig['expansion_form'].panels.siniestros.content.siniestros_section.list }).get('siniestros_list');
    */

    this.tables['pagos_sec'] = this.formService.createForm( {
      pagos_list: this.detailConfig['expansion_form'].panels.pagos.content.pagos_sec.list }).get('pagos_list');
      
    this.tables['plan_pagos'] = this.formService.createForm( {
      plan_pagos_list: this.detailConfig['expansion_form'].panels.plan_pagos.content.pagos_cabecera.list }).get('plan_pagos_list');

    this.tables['riesgos_endoso'] = this.formService.createForm( {
      riesgos_endoso_list: this.detailConfig['expansion_form'].panels.riesgos_endoso.content.riesgos_endoso.list }).get('riesgos_endoso_list');
    
    
      
      this.getEndososData();

      

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
      //console.log('The dialog was closed');
    });
    */
  }

  rowClicked(event){
    const name = event.name;
    const section = event.section;
    const data = event.data;
    if(name === 'riesgos_endoso'){
      console.log('Riesgo Seleccionado', event);
      this.detailConfig['expansion_form'].panels.cobertura.expanded = true;
      this.setCobertura(event.data);
    }
  }

  setCobertura(rowData){
    this.detailConfig['expansion_form'].panels['cobertura'].loading = true;
      
      this.polizaService.getCobertura(rowData).subscribe( res => {
        // console.log('cobertura data', res);
        if(res){
          console.log('datos cobertura DETALLE RIESGO COB = ', res['p_detalle_riesgo_cob_endoso']);
          this.polizaData['p_detalle_riesgo_cob_endoso'] = res['p_detalle_riesgo_cob_endoso'];
          let data = this.detailConfig['expansion_form'].panels.cobertura.content.cobertura_section.list.control;
          data.defaultData = this.polizaData['p_detalle_riesgo_cob_endoso'];
          this.detailConfig['expansion_form'].panels.cobertura.content.cobertura_section.list.control = { ...data }
          this.tables['cobertura_section'] = this.formService.createForm( {
            cobertura_list: this.detailConfig['expansion_form'].panels.cobertura.content.cobertura_section.list }).get('cobertura_list');

          // deshabilita los paneles que no tienen datos
          this.setDisabledPanels();

          this.detailConfig['expansion_form'].panels['cobertura'].loading = false;
        }
      }, error => {
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

  tableAction(event){
    const name = event.name;
    const section = event.section;
    const data = event.data;
    //console.log('custom action data', data, name, section);
    if(name === 'riesgos_endoso'){
      const dialogRef = this.dialog.open(DialogFormViewerComponent, {
        width: '50%',
        data: {
          title: this.detailConfig['expansion_form'].panels[name].text,
          formConfig: this.detailConfig['expansion_form'].panels[name].content[section].form,
          data: { ...this.detailConfig['expansion_form'].panels[name].content[section].list.control.defaultData[data.index] }
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
      });
    }

    if(name === 'pagos'){

      if(data['row'] && data['row']['url_link_recibo']){
        window.open(data['row']['url_link_recibo'],'_blank');
      }
      
    }
    
    
  }


  polizaAction(event){


    // console.log('click action', actionName, actionData);
    if(event['actionName'] === 'comprobando_poliza'){
      const dialogRef = this.dialog.open(ImpresionesViewComponent, {
        width: '60%',
        
        data: this.polizaData['p_datos_endoso'][0]
      });
    }

    if(event['actionName'] === 'poliza_vigente'){
      this.openPolizaVigente();
    }

  }

  openPolizaVigente(){
    const data = this.polizaData['p_datos_endoso'][0];
    if(data){
      this.navService.navigateToPage(
        {
          baseUrl: '/reportes',
          modulePath: '/reportes-productores',
          pagePath: `/poliza-cartera/${data['poliza']}/${data['cod_sec']}/${data['endoso']}/${data['tipo_emi']}`
        }
      );
    }
    //this.router.navigate([`/poliza-cartera/${data['poliza']}/${data['cod_sec']}/${data['endoso']}/${data['tipo_emi']}`]);
  }

  getEndososData(){
    
    let endosos = {
      prev: {
        endoso: this.polizaData['p_endoso_ant'] || '',
        tipo_emi: this.polizaData['p_tipo_emi_ant'] || '',
      },
      current: this.currentParams['endoso'] || '',
      next: {
        endoso: this.polizaData['p_endoso_sig'] || '',
        tipo_emi: this.polizaData['p_tipo_emi_sig'] || '',
      }
    };

    /*let prev = parseInt(endosos.current) - 10;

    if(prev >= 0){
      endosos.prev = prev;
    }

    let next = parseInt(endosos.current) + 10;
    endosos.next = next;*/

    this.endososData = endosos;


  }

  goToEndoso(data, navType){
    if(data.endoso && data.tipo_emi){
      const data = this.polizaData['p_datos_endoso'][0];

      this.navService.navigateToPage(
        {
          baseUrl: '/reportes',
          modulePath: '/reportes-productores',
          pagePath: `/endosos/${data['poliza']}/${data['cod_sec']}/${this.endososData[navType]['endoso']}/${this.endososData[navType]['tipo_emi']}`
        }
      );

      //this.router.navigate([`/endosos/${data['poliza']}/${data['cod_sec']}/${this.endososData[navType]['endoso']}/${this.endososData[navType]['tipo_emi']}`]);
    }
  }

  backRoute(){
    this.location.back();
  }

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
    private polizaService: EndososService,
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
