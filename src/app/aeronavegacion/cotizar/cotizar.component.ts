import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';

import * as _moment from 'moment';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { ToasterService } from '@core/services/toaster.service';

import { CotizarService } from './cotizar.service';
import { AeronavegacionService } from '../aeronavegacion.service';
import { DatosProductorService, DatosTomadorService, RiesgosService, CondicionesComercialesService, ProductosService, UsosService, CoberturasService } from '../models/panels/_index';
import { CoberturasTableService } from '@core/services/components/coberturas-table.service';
import { FileDownloaderService } from '@core/services/utils/file-downloader.service';
import { NavigationService } from '@core/services/navigation.service';
import { Cobertura} from '../row/cobertura-seleccionada/models/cobertura'
import { ApiService } from '@core/services/http/api.service';
import { filter } from 'rxjs/operators';



const moment = _moment;


@Component({
  selector: 'app-aerocotizador',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.scss'],
  providers: [ 
    ProgressBarService,
    CotizarService, 
    AeronavegacionService, 
    DatosProductorService,
    DatosTomadorService,
    CondicionesComercialesService,
    RiesgosService,
    ProductosService,
    UsosService,
    CoberturasService,
    CoberturasTableService
   ]
})
export class CotizarComponent implements OnInit, OnDestroy, AfterViewInit {
 
  loading: boolean;
  loaded: boolean = false;
  // panels managment -- luego delegar en otro componente o servicio
  activePanelName: string;
  panelsId: any[] = [
    'productor',
    'tomador',
    'condiciones-comerciales',
    'tipo-riesgo',
    'datos-riesgo',
    'productos',
    'usos',
    'coberturas'
  ]
  showUsePanel: boolean =  false;
  mostrarEjemploMatricula: boolean = false;
  mostrarEjemploMatriculaNumerica: boolean = false;
  errorMatricula: boolean = false;
  ejemploMatricula: string = "";
  /// Cotizador Service
  nroCotizacion: string;
  nroPropuesta: string;
  codAsegurado: string;
  editable: boolean = false;
  isCopyComponent: boolean = null;
  isNewCotizacion: boolean = true;
  cotizacionEmitida: boolean = false;
  sumaDePlazas: number=  0;
  timeoutId: any = null;
  itemsToAdd: any = [];
  listCoberturas: Array<Cobertura> = [];
  coberturasSeleccionadas: Array<Cobertura> = [];
  sumaAseguradaMin: string;
  sumaAseguradaMax: string;
  mostrarTabla: boolean= false;
  mostrarErrorTabla: boolean= false;
  totals: object = {
    prima: 0,
    premio: 0,
    suma_asegurada: 0
  }

  constructor(
    public navService: NavigationService,
    public aeroService: AeronavegacionService,
    public cotizarService: CotizarService,
    private cdref: ChangeDetectorRef,
    private progressService: ProgressBarService,
    private toastService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService, 
    private fileDownloader: FileDownloaderService,
    private _bottomSheet: MatBottomSheet) { 
     
    
  }

  ngOnInit() {
    // Observer a parametros de url
    this.route.params.subscribe( params => { 
      // console.log('params emitir', params);
      if(params.id){
       
        this.progressService.show();
        this.loading = true;
        this.isNewCotizacion = false;
        this.editable = true;
        this.initService();

        // Obtiene los datos de la cotizacion segun id
        this.cotizarService.get(params.id).subscribe( res => {
          console.log('get cotizacion response = ', res);
          if(res){

            this.nroCotizacion = res['nro_cotizacion'];
            this.nroPropuesta = res['nro_propuesta'];
            this.codAsegurado = res['cod_asegurado'];
            
            this.cotizarService.setCotizacionData(res);
            //}
            
            
            this.cotizarService.setDataInForm(res);
            //}

          }

          this.loading = false;
          this.progressService.hide();
        },
        error => {
          this.loading = false;
          this.progressService.hide();
        })

      }else{
        this.editable = true;
        this.initService();
      }
      

    },
   );
   this.cotizarService.productosService.formGroup.controls['cod_producto'].valueChanges
    .subscribe( (val) =>{

      this.cotizarService.condicionesComercialesService.setMediosDePago(val); 
      this.cotizarService.condicionesComercialesService.setFormaDePago(val); 

    })
    this.cotizarService.productosService.formGroup.controls['cod_riesgo'].valueChanges
    .subscribe( (val) =>{
      console.log("riesgo",val)
      let data = this.cotizarService.productosService.formGroup.getRawValue();
      if(data.cod_riesgo != ""){
        this.showUsePanel = true;
        this.passDataToUsosPanel();
        this.llenarTipoAeronave();
       /* if(data.cod_riesgo == 5){
          this.cotizarService.riesgosService.mostrarCamposExperimental(true)
        }else{
          this.cotizarService.riesgosService.mostrarCamposExperimental(false)
        }*/
      }
    })
    this.cotizarService.usosService.formGroup.controls['usos'].valueChanges
    .subscribe( (val) =>{
      clearTimeout(this.timeoutId);
      this.itemsToAdd = val;
      this.timeoutId = setTimeout(() => {
        if(!this.plazasInvalidas && this.cotizarService.condicionesComercialesService.formGroup.valid){
        this.listCoberturas = [];
        this.vaciarCoberturasSeleccionadas()
        if(val.length > 0){
        this.llenarTablaCoberturas();  
        }     
      }
      }, 2000);
      
    })

    this.cotizarService.datosProductorService.formGroup.controls['cod_productor'].valueChanges
    .subscribe((val) =>{
      this.cotizarService.condicionesComercialesService.setProductor(val['codpas']);
    })

    this.cotizarService.riesgosService.datosRiesgo.formGroup.controls["pasajeros"].valueChanges.subscribe((val) => {
      
        clearTimeout(this.timeoutId);
        this.itemsToAdd = val;
        this.timeoutId = setTimeout(() => {
          if(!this.plazasInvalidas && this.listCoberturas.length != 0){
            this.listCoberturas = [];
            this.vaciarCoberturasSeleccionadas()
            this.llenarTablaCoberturas();    
          }   
        
        }, 2000); 
    });

    this.cotizarService.riesgosService.datosRiesgo.formGroup.controls["tripulantes"].valueChanges.subscribe((val) => {
      
      clearTimeout(this.timeoutId);
      this.itemsToAdd = val;
      this.timeoutId = setTimeout(() => {
        if(!this.plazasInvalidas && this.listCoberturas.length != 0){
          this.listCoberturas = [];
          this.vaciarCoberturasSeleccionadas()
          this.llenarTablaCoberturas();    
        }   
      
      }, 2000); 
  });

  this.cotizarService.riesgosService.datosRiesgo.formGroup.controls["suma_asegudada_por_asiento"].valueChanges.subscribe((val) => {
      
      clearTimeout(this.timeoutId);
      this.itemsToAdd = val;
      this.timeoutId = setTimeout(() => {
        if(!this.plazasInvalidas && this.listCoberturas.length != 0){
          this.listCoberturas = [];
          this.vaciarCoberturasSeleccionadas()
          this.llenarTablaCoberturas();    
        }   
      
      }, 2000); 
  });

  this.cotizarService.riesgosService.datosRiesgo.formGroup.controls["anio"].valueChanges.subscribe((val) => {

    if(val){
      let formato = this.cotizarService.riesgosService.datosRiesgo.formGroupConfig["children"]["matricula"]["control"]["config"]["formato"];
      this.ejemploMatricula = formato;
      if(formato.toString().includes('n')){
        this.mostrarEjemploMatriculaNumerica = true;
      }else{
        this.mostrarEjemploMatricula = true;
      }
    }
  });

  this.cotizarService.riesgosService.datosRiesgo.formGroup.controls["matricula"].valueChanges.subscribe((val) => {

    clearTimeout(this.timeoutId);
    this.itemsToAdd = val;
    this.timeoutId = setTimeout(() => {
      let filters = {
        "p_cod_riesgo": this.cotizarService.productosService.formGroup.controls['cod_riesgo'].value,
        "p_tipo_aeronave": this.cotizarService.riesgosService.datosRiesgo.formGroup.controls["cod_tipo_aeronave"].value,
        "p_matricula": val
      }

      this.validarMatricula(filters).subscribe(error => {
        if(error["p_error"]){
        this.errorMatricula = true;
        }else{
          this.errorMatricula = false;
        }
      })
      

    }, 2000); 
  });
    
  this.cotizarService.condicionesComercialesService.formGroup.controls['cod_mon'].valueChanges.subscribe((val) => {
    clearTimeout(this.timeoutId);
    this.itemsToAdd = val;
    this.timeoutId = setTimeout(() => {
      if(!this.plazasInvalidas && this.cotizarService.condicionesComercialesService.formGroup.valid){
        this.listCoberturas = [];
        this.vaciarCoberturasSeleccionadas()
        this.llenarTablaCoberturas();    
      }   
    
    }, 2000); 

  })

  this.cotizarService.condicionesComercialesService.formGroup.controls['cod_forma_pago'].valueChanges.subscribe((val) => {
    clearTimeout(this.timeoutId);
    this.itemsToAdd = val;
    this.timeoutId = setTimeout(() => {
      if(!this.plazasInvalidas && this.cotizarService.condicionesComercialesService.formGroup.valid){
        this.listCoberturas = [];
        this.vaciarCoberturasSeleccionadas()
        this.llenarTablaCoberturas();    
      }   
    
    }, 2000); 

  })

  this.cotizarService.condicionesComercialesService.formGroup.controls['porc_comision'].valueChanges.subscribe((val) => {
    clearTimeout(this.timeoutId);
    this.itemsToAdd = val;
    this.timeoutId = setTimeout(() => {
      if(!this.plazasInvalidas && this.cotizarService.condicionesComercialesService.formGroup.valid){
        this.listCoberturas = [];
        this.vaciarCoberturasSeleccionadas()
        this.llenarTablaCoberturas();    
      }   
    
    }, 2000); 

  })

  this.cotizarService.condicionesComercialesService.formGroup.controls['cod_plan'].valueChanges.subscribe((val) => {
    clearTimeout(this.timeoutId);
    this.itemsToAdd = val;
    this.timeoutId = setTimeout(() => {
      if(!this.plazasInvalidas && this.cotizarService.condicionesComercialesService.formGroup.valid){
        this.listCoberturas = [];
        this.vaciarCoberturasSeleccionadas()
        this.llenarTablaCoberturas();    
      }   
    
    }, 2000); 

  })


  }


  ngAfterViewInit(){
    this.cdref.detectChanges();
  }

  ngOnDestroy(){
    this.loaded = false;
  }

  initService(){
    this.loaded = false;
    this.activePanel('productor');
    this.cotizarService.setAllPanelsStatus(this.editable);
    this.loaded = true;
  }

  ////////////////////////////////////////////////////////////////////////////////

  vaciarCoberturasSeleccionadas(){
    this.totals['prima'] = 0;
    this.totals['suma_asegurada'] = 0;
    this.totals['premio'] = 0;
    this.coberturasSeleccionadas = [];
  }
  
  plazasError(){
    if(this.cotizarService.riesgosService.datosRiesgo.formGroup.controls["pasajeros"].value == 0 || this.cotizarService.riesgosService.datosRiesgo.formGroup.controls["tripulantes"].value == 0){
      return true;
    }
    return false;
  }


  passDataToPanel(){

    let currentPanel = this.activePanelName;
    switch(currentPanel){

      case 'tomador':
        this.passDataToTomador();
        this.passDataToCondicionesComerciales();
        break;
      case 'productos':

        break;
      case 'usos':
        this.passDataToUsosPanel();
        break;
      case 'coberturas':
        //this.passDataToCoberturas();
        this.llenarTablaCoberturas();
    }

  }

  passDataToTomador(){
    let data = this.cotizarService.datosProductorService.formGroup.getRawValue();
    if(data.cod_productor && data.cod_productor.codpas){
      this.cotizarService.datosTomadorService.setProductor(data);
    }
  }

  passDataToCondicionesComerciales(){
    let data = this.cotizarService.datosProductorService.formGroup.getRawValue();
    if(data.cod_productor && data.cod_productor.codpas){
      this.cotizarService.condicionesComercialesService.setProductor(data.cod_productor.codpas);
    }
  }

  passDataToUsosPanel(){
    let data = this.cotizarService.productosService.formGroup.getRawValue();
    if(data.cod_producto){
      this.cotizarService.usosService.setProducto(data.cod_producto);
      this.cotizarService.usosService.setRiesgo(data.cod_riesgo)
      this.cotizarService.usosService.enableGroup();
    }
  }

  passDataToCoberturas(){
    let data =  { ...this.cotizarService.datosProductorService.getRawData(),
      ...this.cotizarService.datosTomadorService.getRawData(),
      ...this.cotizarService.condicionesComercialesService.getRawData(),
      ...this.cotizarService.riesgosService.getRawData(),
      ...this.cotizarService.productosService.getRawData(),
      ...this.cotizarService.usosService.getRawData() };


    this.cotizarService.coberturasService.getFiltersData(data);
  }

  coberturaAdded(cobertura: Cobertura) {
    console.log("cobertura seleccionada" , cobertura);
    let listaFinal = this.listCoberturas;
    if(cobertura.selected){
     this.coberturasSeleccionadas.push(cobertura);

     listaFinal.forEach(cob => {
       if(cobertura.inhabilita_a == cob.codigo.toString()){
         cob.selected = false;
         cob.obligatorio = false;
         const index: number = this.coberturasSeleccionadas.indexOf(cob); 
        if (index !== -1) {
          this.coberturasSeleccionadas.splice(index, 1);
        }

        console.log("obliga", cob.obliga_a)
        if(cob.obliga_a){
          listaFinal.forEach(coberturaAsociada =>{
            console.log("cobertura asociada", coberturaAsociada)
            if(cob.obliga_a.toString() === coberturaAsociada.codigo.toString()){
              console.log("entro", coberturaAsociada)
              coberturaAsociada.selected = false;
              coberturaAsociada.obligatorio = false;
              const index: number = this.coberturasSeleccionadas.indexOf(coberturaAsociada); 
              if (index !== -1) {
                this.coberturasSeleccionadas.splice(index, 1);
              }
            }

          });
        }
       }

       if(cobertura.obliga_a == cob.codigo.toString()){
         cob.selected = true;
         cob.obligatorio = true;
         this.coberturasSeleccionadas.push(cob);
       }

     });
     console.log("lista final", this.coberturasSeleccionadas)
     
    }
    else{
      const index: number = this.coberturasSeleccionadas.indexOf(cobertura); 
      if (index !== -1) {
        this.coberturasSeleccionadas.splice(index, 1);
      }

      listaFinal.forEach(cob => {
        if(cobertura.obliga_a == cob.codigo.toString()){
          cob.selected = false;
          cob.obligatorio = false;
          const index: number = this.coberturasSeleccionadas.indexOf(cob); 
        if (index !== -1) {
          this.coberturasSeleccionadas.splice(index, 1);
        }
        }

      })
      
    }
    this.getTotals();
  }

  getTotals(){
    
    this.totals['prima'] = 0;
    this.totals['suma_asegurada'] = 0;
    this.totals['premio'] = 0;
    
    if(this.coberturasSeleccionadas.length > 0){
      
      for(let row of this.coberturasSeleccionadas){

        this.totals['prima'] += row.prima;
        this.totals['premio'] += row.premio;
        
        if(this.sumaDePlazas > 0){
          this.totals['suma_asegurada'] += row.sumaAsegurada * this.sumaDePlazas; 
        }else{
          this.totals['suma_asegurada'] += row.sumaAsegurada;
        }

      }  

    }
    
  }

  nuevaSumaAsegurada(cobertura: Cobertura){
    this.getTotals();
  }


  
  sumarPlaza(cobertura: Cobertura){
    this.sumaDePlazas = 0;
    for(const con of this.coberturasSeleccionadas){
        if(cobertura.codigo == con.codigo){
          this.sumaDePlazas += parseInt(cobertura.plazas.toString());
        }else{
          this.sumaDePlazas += parseInt(con.plazas.toString());
        }
        
    }
    this.totals['suma_asegurada'] = 0;
    if(this.coberturasSeleccionadas.length > 0){
      
      for(let row of this.coberturasSeleccionadas){
        this.totals['suma_asegurada'] += row.sumaAsegurada;

      }  

    }
    if(this.sumaDePlazas > 0){
      this.totals['suma_asegurada'] = this.totals['suma_asegurada'] * this.sumaDePlazas; 
    }
  }

  llenarTipoAeronave(){
    let filters = { "cod_producto" :this.cotizarService.productosService.formGroup.controls['cod_producto'].value,
    "cod_riesgo" :this.cotizarService.productosService.formGroup.controls['cod_riesgo'].value
    }
    
    this.cotizarService.riesgosService.setTipoAeronave(filters);
  }

  llenarTablaCoberturas(){

   let data =  { ...this.cotizarService.datosProductorService.getRawData(),
      ...this.cotizarService.datosTomadorService.getRawData(),
      ...this.cotizarService.condicionesComercialesService.getRawData(),
      ...this.cotizarService.riesgosService.getRawData(),
      ...this.cotizarService.productosService.getRawData(),
      ...this.cotizarService.usosService.getRawData() };
 
      const filters = this.cotizarService.coberturasService.getCoberturaFilters(data);

    this.apiService.post('/cot_aero/PRIMA_COBERTURA', filters).subscribe( res => {
    // console.log('coberturas', coberturas);
    const coberturas = res['result'] || [];
      console.log("oro", res)
    if(coberturas.length > 0){
  
      for(const cob of coberturas){
        console.log("risego", this.cotizarService.riesgosService.getRawData())
        let plaza = "  ";
        if (cob['modifica_pasajeros'] == "S"){
          plaza = this.cotizarService.riesgosService.getRawData()["pasajeros"].toString()
        }
        if(cob['modifica_tripulantes'] == "S"){
          plaza= this.cotizarService.riesgosService.getRawData()["tripulantes"].toString()
        }
        if(cob["i_suma_max"]){
          this.sumaAseguradaMax = cob["i_suma_max"];
        }
        if(cob["i_suma_min"]){
          this.sumaAseguradaMin = cob["i_suma_min"];
        }
        //console.log("filters", this.cotizarService.datosTomadorService.getRawData())
      this.getPremioCoberturas(cob, filters).subscribe( (res: object[]) => {;
      let cobertura = {
        selected : cob['obligatoria'] == "S",
        codigo : cob['cod_cobertura'],
        descripcion : cob['desc_cobertura'],
        sumaAsegurada: cob['imp_suma_total'],
        obligatorio: cob['obligatoria'] == 'S', 
        porcTasa: cob['porc_tasa'],
        prima: cob['imp_prima'],
        premio: res['p_premio'],
        habilitarPazas: cob['modifica_pasajeros'] != "N" || cob['modifica_tripulantes'] != "N",
        plazas: plaza,
        maxPlazas: this.cotizarService.riesgosService.getRawData()['cant_plazas'],
        plazaValida: true,
        esDolar: this.cotizarService.condicionesComercialesService.getRawData()['cod_mon'] == 22 ,
        modificaSuma: cob['modifica_suma'] == 'S',
        inhabilita_a: cob['inhabilita_a'],
        obliga_a: cob['obliga_a'],
        sumaAseguradaPorAsiento: cob['modifica_pasajeros'] == "S" || cob['modifica_tripulantes'] == "S" ? this.cotizarService.riesgosService.getRawData()['suma_asegudada_por_asiento'] : cob['imp_suma_asegurada']? cob['imp_suma_asegurada'] : " ",
        argentino_oro: cob["i_suma_fija"]? cob["i_suma_fija"] : " "
      }
      this.listCoberturas.push(cobertura);

      if(cobertura.selected){

        this.coberturaAdded(cobertura);
      }

      }
        );}
    }  

    if(this.sumaAseguradaMax && this.sumaAseguradaMin){

      this.cotizarService.riesgosService.addRangosSumaAsegurada(this.sumaAseguradaMin, this.sumaAseguradaMax);

      if( this.cotizarService.riesgosService.getRawData()["suma_asegudada_por_asiento"] >= parseInt(this.sumaAseguradaMin) && this.cotizarService.riesgosService.getRawData()["suma_asegudada_por_asiento"] <= parseInt(this.sumaAseguradaMax)){

        this.mostrarTabla = true;
        this.mostrarErrorTabla = false;
      }else{
      this.mostrarTabla = false;
      this.mostrarErrorTabla = true;
      }

    }    
    
  });

  }

  compare( a, b ) {
    if ( a.codigo < b.codigo ){
      return -1;
    }
    if ( a.codigo > b.codigo ){
      return 1;
    }
    return 0;
  }

  get sumaDePlazasValida(){
    return this.sumaDePlazas > parseInt(this.cotizarService.riesgosService.getRawData()['cant_plazas']);
  }

  get plazasInvalidas(){
    let total = parseInt(this.cotizarService.riesgosService.getRawData()['pasajeros']) + parseInt(this.cotizarService.riesgosService.getRawData()['tripulantes']);
    return total > parseInt(this.cotizarService.riesgosService.getRawData()['cant_plazas']);
  }

  get tableIsEmpty(){
    return this.listCoberturas.length === 0;
  }

  get simboloMoneda(){

    if(this.cotizarService.condicionesComercialesService.getRawData()['cod_mon'] == 22 ){
      return 'us$';
    }

    return '$';
  }

  getPremioCoberturas(cobertura: Cobertura, cobFilters: object){

    let baseFilters = {
      "p_producto": cobFilters['p_producto'],
      "p_cod_mon": cobFilters['p_moneda'],
      "p_forma_pago": cobFilters['p_forma_pago'],
      "p_plan_pago":  cobFilters['p_plan_pago'],
      "p_cod_jur":  cobFilters['p_cod_jur'],
      "p_cod_suc":  cobFilters['p_cod_suc'],
      "p_cond_iva":  cobFilters['p_cod_iva'],
      "p_cod_prod":  cobFilters['p_cod_prod'],
      "p_pct_comis": cobFilters['p_pct_comis'],
      "p_cod_asegurado": cobFilters['p_cod_asegurado']? (cobFilters['p_cod_asegurado']["value"] ? cobFilters['p_cod_asegurado']["value"] : cobFilters['p_cod_asegurado']) : null,
      "p_cod_docum":cobFilters['p_tipo_doc'],
     // "p_documento":  cobFilters['p_documento']['value'] || cobFilters['p_documento']
    }

    let req = [];
    let itemFilter = {
            "p_cod_cobertura": cobertura["cod_cobertura"],
            "p_prima": cobertura["imp_prima"],
            "p_suma_asegurada": cobertura["imp_suma_asegurada"],
            "p_cant_pasajeros": cobFilters['p_cant_pasajeros'],
            "p_cant_tripulantes": cobFilters['p_cant_tripulantes']
    };

    let filtersData =  { ...baseFilters, ...itemFilter };
   // req.push(this.getPremio(filtersData));
      
    // todos los request
    return this.getPremio(filtersData);

  }

  getPremio(filters){
    return this.apiService.post('/cot_aero/PREMIO',filters, false);
  }

  validarMatricula(filters){
    return this.apiService.post('/cot_aero/VALIDA_MATRICULA',filters, false);

  }
  
  
  saveCotizacion(){
    return this.aeroService.saveCotizacion(this.getCotizacionData());
    
  }

  finalizar(){
    if(this.cotizarService.valid && !this.plazasError()){
      this.openCotizarActions();
    }
  }

  openCotizarActions(): void {
    const actions = this._bottomSheet.open(CotizarBottomActions, {
      panelClass: 'c-cotizar-bottom-actions-panel'
    });

    actions.afterDismissed().subscribe((action: 'Volver' | 'Guardar' | 'Finalizar') => {
     
        console.log('accion seleccionada', action);
        switch(action){
          case 'Guardar':
            this.guardar();
            break;
          case 'Finalizar':
            this.continuarEmitir(null);
            break;
        }

    });

    
    
  }

  guardar(){
    this.progressService.show();
    this.loading = true;
    this.saveCotizacion().subscribe( res => {

      this.progressService.hide();
      this.loading = false;
      if(res){

        this.nroCotizacion = res['p_o_cotizacion_n'];

        if(this.nroCotizacion){
          this.cotizacionEmitida = true;
        }

        const dialogRef = this.dialog.open(GuardarCotizacionDialog, {
          width: '45%',
          height: '30%',
          data: { cotizacionNr: res['p_o_cotizacion_n'] },
          panelClass: 'cotizacion-dialog'
        });
  
        dialogRef.afterClosed().subscribe( emitir => { 
          if(emitir === true){
            this.navService.navigateToPage({
              baseUrl: '/cotizaciones-propuestas',
              modulePath: '/aeronavegacion',
              pagePath: `/emitir/${this.nroCotizacion}`
            });

            //this.router.navigate([`/emitir/${this.nroCotizacion}`]);
          }
          
          if(emitir === 'imprimir-cotizacion'){
            // this.fileDownloader.downloadEmptyPDF(`Cotizacion#${this.nroCotizacion}`);
            if(res['p_link_pdf_cotizacion']){
              window.open(res['p_link_pdf_cotizacion'], '_blank');
            }
            
          }
          
          if(!emitir){
            // si no da emitir 
            //this.cotizarService.setAllPanelsStatus(false);
            //this.router.navigate([`/cotizaciones-propuestas/list`]);
            this.redirectToCotizacionesPropuesta();
          }
          
        
        });

      }else{
        this.toastService.show('Error al guardar. Por favor vuelva a intentar.', 'error');
      }
     
     
    }, 
    error => {
      this.progressService.hide();
      this.loading = false;
    });
   
  }


  continuarEmitir(event){
    
      this.toastService.show('Procesando Cotización', 'info');
      this.progressService.show();
      this.loading = true;
    
      let codAsegurado = this.cotizarService.datosTomadorService.codAsegurado;
      console.log("cod", codAsegurado)


          //console.log('asegurado', asegurado);         
  
          this.saveCotizacion().subscribe( res => {

            console.log('respuesta GUARDAR_COTIZACION', res);
            //console.log('Codigo Asegurado', codAsegurado);

            this.progressService.hide();
            this.loading = false;

            if(res){

              this.nroCotizacion = res['p_o_cotizacion_n'];

              if(this.nroCotizacion){
                this.cotizacionEmitida = true;
              }

              const dialogRef = this.dialog.open(GuardarCotizacionDialog, {
                width: '45%',
                height: '30%',
                data: { cotizacionNr: res['p_o_cotizacion_n'] },
                panelClass: 'cotizacion-dialog'
              });
        
              dialogRef.afterClosed().subscribe( emitir => {
    
                if(emitir === true){
                  this.navService.navigateToPage({
                    baseUrl: '/cotizaciones-propuestas',
                    modulePath: '/aeronavegacion',
                    pagePath: `/emitir/${this.nroCotizacion}`
                  });
      
                }
                
                if(emitir === 'imprimir-cotizacion'){
                  // this.fileDownloader.downloadEmptyPDF(`Cotizacion#${this.nroCotizacion}`);
                  // this.fileDownloader.downloadEmptyPDF(`Cotizacion#${this.nroCotizacion}`);
                  if(res['p_link_pdf_cotizacion']){
                    window.open(res['p_link_pdf_cotizacion'], '_blank');
                  }

                  this.redirectToCotizacionesPropuesta();
                 
        
                }
                
                if(!emitir){
                  // si no da emitir 
                  //his.cotizarService.setAllPanelsStatus(false);
                  // this.inactiveAllPanels();
                  //this.router.navigate([`/cotizaciones-propuestas/list`]);
                  this.redirectToCotizacionesPropuesta();
                }
                
                
                
              });
            }
           
           
          }, 
          error => {          
            this.toastService.show(error, 'error');
            this.progressService.hide();
            this.loading = false;
          });;
  

          
      
    
  }


  /// Crear cotizacion Service

  getCotizacionData(){

      let cotizacion = { 
        ...this.cotizarService.datosProductorService.getRawData(),
        ...this.cotizarService.datosTomadorService.getRawData(),
        ...this.cotizarService.condicionesComercialesService.getRawData(),
        ...this.cotizarService.riesgosService.getRawData(),
        ...this.cotizarService.productosService.getRawData(),
        ...this.cotizarService.usosService.getRawData(),
        ...this.generarCoberturasParaEmitir(),
       };

      console.log('cotizacion data', cotizacion)
      return cotizacion;
  }


  generarCoberturasParaEmitir(){

    const coberturas = [];
    let sec = 1
    for(const cob of this.coberturasSeleccionadas){

      let cobertura ={
        "cod_cobertura" : cob.codigo,
        "desc_cobertura": cob.descripcion,
        "imp_premio": cob.premio,
        "imp_suma_asegurada": cob.sumaAsegurada,
        "n_secuencia": sec,
        "imp_prima": cob.prima,
        "porc_tasa": cob.porcTasa,
        "required": false,
        "selected": true,
        "cant_plazas": cob.plazas
      }
      coberturas.push(cobertura);
      sec++;
    }

    return {cobertura: coberturas};
  }

  /******************************************************************
   * 
   *        PANELS ADMIN
   * 
   ******************************************************************/

  canEditPanel(panelName: string){

    let panelIndex = this.panelsId.indexOf(panelName);
    let activePanelIndex = this.panelsId.indexOf(this.activePanelName);

    if(panelIndex !== -1 && activePanelIndex !== -1){
      return panelIndex < activePanelIndex;
    }
    return false;
  }

  nextPanel(nextInstance: HTMLElement){
    const nextPanel = this.getNextPanelId();
    this.activePanel(nextPanel);
    this.passDataToPanel();
    this.scroll(nextInstance);
    
  }

  prevPanel(backInstance: HTMLElement){
    const prevPanel = this.getPrevPanelId();
    this.activePanel(prevPanel);
    this.scroll(backInstance);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  }
 
  getNextPanelId(){
    if(this.activePanelName){

      let panelPos = this.panelsId.indexOf(this.activePanelName);
      if(panelPos !== -1){
        let nextPanelPos = panelPos + 1;
        return nextPanelPos < this.panelsId.length ? this.panelsId[nextPanelPos] : this.panelsId[0];
      }

    }

    return null;

  }

  getPrevPanelId(){
    if(this.activePanelName){

      let panelPos = this.panelsId.indexOf(this.activePanelName);
      if(panelPos !== -1){
        let nextPanelPos = panelPos - 1;
        return nextPanelPos < this.panelsId.length ? this.panelsId[nextPanelPos] : this.panelsId[0];
      }

    }

    return null;
  }

  setPanelStatus(name: string, active: boolean){
    switch(name){
      case 'productor':
        this.cotizarService.datosProductorService.active = active;
        break;
      case 'tomador':
        this.cotizarService.datosTomadorService.active = active;
        break;
      case 'condiciones-comerciales':
        this.cotizarService.condicionesComercialesService.active = active;
        break;
      case 'tipo-riesgo':
        this.cotizarService.riesgosService.tipoRiesgo.active = active;
        break;
      case 'datos-riesgo':
        this.cotizarService.riesgosService.datosRiesgo.active = active;
        break;
      case 'productos':
        this.cotizarService.productosService.active = active;
        break;
      case 'usos':
        this.cotizarService.usosService.active = active;
        break;
      case 'coberturas':
        this.cotizarService.coberturasService.active = active;
        break;
    }
  } 

  inactiveAllPanels(){
    
    let active = false;
    //this.editable = false;
    this.cotizarService.datosProductorService.active = active;
    this.cotizarService.datosTomadorService.active = active;
    this.cotizarService.condicionesComercialesService.active = active;
    this.cotizarService.riesgosService.tipoRiesgo.active = active;
    this.cotizarService.riesgosService.datosRiesgo.active = active;
    this.cotizarService.productosService.active = active;
    this.cotizarService.usosService.active = active;
    this.cotizarService.coberturasService.active = active;

  }

  activePanel(name: string){
    
    if(this.panelsId.indexOf(name) !== -1){
      this.setPanelStatus(name, true);
      this.activePanelName = name;
      this.updateAllPanels();
    }

  }

  updateAllPanels(){
    for(let panelName of this.panelsId){

      if(panelName === this.activePanelName){
        this.setPanelStatus(panelName, true);
      }else{
        this.setPanelStatus(panelName, false);
      }
    }
  }

  editPanel(name: string){
    this.activePanel(name);
  }

  redirectToCotizacionesPropuesta(){
    
    this.navService.navigateToPage({
      baseUrl: '/cotizaciones-propuestas',
      modulePath: '/consultas',
      pagePath: `/cotizaciones-propuestas/list`
    });
    
  }
  

}

@Component({
  selector: 'guardar-cotizacion-dialog',
  templateUrl: 'guardar-cotizacion-dialog.component.html'
})
export class GuardarCotizacionDialog {

  cotizacionNr: number;

  constructor(
    public dialogRef: MatDialogRef<GuardarCotizacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) {

        this.cotizacionNr = data['cotizacionNr']

    }

  close(): void {
    this.dialogRef.close(false);
  }

  goEmitir(){
    this.dialogRef.close(true);
  }


  imprimirCotizacion(){
    this.dialogRef.close('imprimir-cotizacion');
  }

}


@Component({
  selector: 'estado-cotizador-dialog',
  templateUrl: 'estado-cotizador-dialog.component.html'
})
export class EstadoCotizadorDialog {

  constructor(
    public dialogRef: MatDialogRef<EstadoCotizadorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  close(): void {
    this.dialogRef.close();
  }


  
}



@Component({
  selector: 'cotizar-bottom-actions',
  templateUrl: 'cotizar-bottom-actions.component.html',
})
export class CotizarBottomActions {
  constructor(private _bottomSheetRef: MatBottomSheetRef<CotizarBottomActions>) {}

  openLink(actionName): void {
    this._bottomSheetRef.dismiss(actionName);
    event.preventDefault();
  }
}

