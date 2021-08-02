import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, Route, ActivatedRoute } from '@angular/router';

import { DatosProductorService, DatosTomadorEmitirService, RiesgosService, CondicionesComercialesService, VigenciaService, ProductosService, UsosService, CoberturasService, CondicionesComercialesEmitirService } from '../models/panels/_index';

import * as _moment from 'moment';
import { AeronavegacionService } from '../aeronavegacion.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { ToasterService } from '@core/services/toaster.service';
import { EmitirService } from './emitir.service'
import { CoberturasTableService } from '@core/services/components/coberturas-table.service';
import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { NavigationService } from '@core/services/navigation.service';
import { DatosTomadorDataSet, DatoTomador} from '../row/datos-tomador/models/dato-tomador'
import { DatoProductor} from '../row/datos-tomador/models/dato-productor'
import { DatoCondicionesComerciales} from '../row/datos-tomador/models/dato-condiciones-comerciales'
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { emit } from 'process';


const moment = _moment;


@Component({
  selector: 'app-emitir',
  templateUrl: './emitir.component.html',
  styleUrls: ['./emitir.component.css'],
  animations: [ 
    trigger('fadeIn', animations.SkeletonfadeIn()), 
    animations.slideInTopAnimation],
  providers: [ 
    ProgressBarService,
    EmitirService, 
    AeronavegacionService, 
    DatosProductorService,
    VigenciaService,
    DatosTomadorEmitirService,
    CondicionesComercialesEmitirService,
    RiesgosService,
    ProductosService,
    UsosService,
    CoberturasService,
    CoberturasTableService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
   ]
})
export class EmitirComponent implements OnInit, OnDestroy, AfterViewInit {
 
  @ViewChild('tomadorForm') tomadorForm: NgForm;
  @ViewChild('productorForm') productorForm: NgForm;
  @ViewChild('cod_postal') codigoPostal: NgForm;
  @ViewChild('condicionesForm') condicionesForm: NgForm;
  loading: boolean;
  loaded: boolean = false;
  allData: object;
  // panels managment -- luego delegar en otro componente o servicio
  activePanelName: string;
  panelsId: any[] = [
    //'productor',
    'tomador',
    'condiciones-comerciales',
    //'tipo-riesgo',
    //'datos-riesgo',
    //'productos',
    //'usos',
    //'coberturas'
  ]

  /// Cotizador Service
  nroCotizacion: string = '';
  nroPropuesta: string = '';
  codAsegurado: string = '';
  editable: boolean = false;
  isViewComponent: boolean = null;
  tieneFecha: boolean = false;
  fechaFinal: string = '';
  datosTomador: DatoTomador;
  datosProductor: DatoProductor;
  datosCondiciones: DatoCondicionesComerciales;
  esTarjeta: boolean = false;
  esCBU: boolean = false;
  esCuponera: boolean = false;
  listaActividades: any = [];
  listaSexos: any =[];
  listaNacionalidades: any = [];
  listaProvincias: any = [];
  listaLocalidades: any = [];
  listaMediosDePagos: any = [];
  fechaNacimiento: FormControl;
  modificaDatos: boolean = true;
  esCodIvaF: boolean = true;
  timeoutId: any = null;
  itemsToAdd: any = [];
  fechaNacimientoFinal: _moment.Moment;
  tipoDocumento: string;
  p_o_consulta_nosis: number;
  mostrarCotizacion: boolean = false;

  constructor(
    public aeroService: AeronavegacionService,
    public emitirService: EmitirService,
    private cdref: ChangeDetectorRef,
    private progressService: ProgressBarService,
    public dialog: MatDialog,
    public toastService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private navService: NavigationService) { 
       this.loading = true;
  }

  

  ngOnInit() {

    this.route.queryParams.subscribe( params => {

      if(params["cotizacion"]){
          this.mostrarCotizacion = true
      }

    })

    this.route.params.subscribe( params => { 
      
      // Params de url -- id
      if(params.id){

        console.log("param",params)
        // si es para generar una nueva propuesta
        const isPropuesta = this.router.url.indexOf('/propuesta/') !== -1;
        // si es solo para visualizar una propuesta ya generada
        this.isViewComponent = this.router.url.indexOf('/propuesta/view') !== -1;

        let emitirParams = {}
        // Parametros para obtener los datos de la propuesta 
        // Puede ser una propuesta
        if(isPropuesta){
          this.editable = false;
          emitirParams = {
            p_o_propuesta: params.id,
            p_tipo_operacion: 'P',
          }
        }else{
          // Es una cotizacion en la que se genera una propuesta por primera vez
          this.editable = true;
          emitirParams = {
            p_o_cotizacion: params.id,
            p_o_propuesta: '',
            p_tipo_operacion: 'C'
          }
        }

        if(this.mostrarCotizacion){
          this.editable = false;
          emitirParams = {
            p_o_cotizacion: params.id,
            p_o_propuesta: '',
            p_tipo_operacion: 'C'
          }
        }


        this.aeroService.getActividades().subscribe((val) => {
         this.listaActividades = val["p_list_actividades"] 
        })

        this.aeroService.getSexos().subscribe((val) =>{

          this.listaSexos = val["p_list_sexos"]
        })

        this.aeroService.getNacionalidades().subscribe((val) => {

          this.listaNacionalidades = val["p_list_nacionalidades"]
        })

        this.aeroService.getProvincias().subscribe((val) => {

          this.listaProvincias = val["p_list_provincias"]
        })

        this.progressService.show();
        this.loading = true;
        /**
         * Obtener datos de la propuesta 
         */
        this.emitirService.get(emitirParams).subscribe( res => {
          console.log('get propuesta', res);
          
          if(res){
            this.aeroService.getProductor(res["cod_prod"]).subscribe((val) =>{

              let productor = {
                cod_productor: val["p_list_pas"][0]["codpas"],
                desc_productor: val["p_list_pas"][0]["codpas"] +' - '+ val["p_list_pas"][0]["nombre"]
              }

              this.tipoDocumento = res["cod_tipo_doc"];
              this.datosProductor = productor
              console.log("prod", val)
            })


            this.emitirService.getPorpuestaNosis(res).subscribe((val) => {

              console.log("val", val)
              this.modificaDatos = val["p_modificar_datos"] == "S";
              this.p_o_consulta_nosis = val["p_datos_aseg"][0]["o_consulta"];
              let tomador = {
                desc_iva : res["desc_iva"],
                nro_documento : val["p_datos_aseg"][0]["nro_docum"] || res["nro_documento"],
                cuit: val["p_datos_aseg"][0]["cuit"],
                razon_social: val["p_datos_aseg"][0]["razon_social"],
                nombre: val["p_datos_aseg"][0]["nombre"],
                apellido: val["p_datos_aseg"][0]["apellido"],
                cod_actividad: res["cod_actividad"], 
                fec_nacimiento: res["fec_nacimiento"],
                cod_sexo: val["p_datos_aseg"][0]["sexo"],
                cod_nacionalidad: res["cod_nacionalidad"] || "ARGENTINA",
                domicilio: val["p_datos_aseg"][0]["domicilio"],
                nro_puerta: val["p_datos_aseg"][0]["nro_domicilio"],
                nro_piso: res["nro_piso"] || val["p_datos_aseg"][0]["piso_domicilio"],
                depto: res["depto"],
                cod_provincia: res["cod_provincia"] || val["p_datos_aseg"][0]["cod_provincia"],
                cod_localidad:res["cod_postal"] || val["p_datos_aseg"][0]["cod_postal"],
                cod_postal:res["cod_postal"] || val["p_datos_aseg"][0]["cod_postal"],
                telefono: val["p_datos_aseg"][0]["telefono"] || res["telefono"],
                email: res["email"],
                telefonoValido: res["telefono"] != null? res["telefono"].length >= 8 : false

              };

              if(tomador.cod_provincia){
                this.aeroService.getLocalidades(tomador.cod_provincia).subscribe((val) => {

                  this.listaLocalidades = val["p_list_localidades"]
                })
              }

              if(res["cod_iva"] != "F"){
                  this.esCodIvaF = false;
              }
              
              this.fechaNacimiento = new FormControl(moment(val["p_datos_aseg"][0]["fec_nacimiento"], "DD/MM/YYYY"));
              this.fechaNacimientoFinal = moment(val["p_datos_aseg"][0]["fec_nacimiento"], "DD/MM/YYYY");
              console.log("fecha", val["p_datos_aseg"][0]["fec_nacimiento"])
              this.datosTomador = tomador;

            
            
            this.nroCotizacion = res['nro_cotizacion'];
            this.nroPropuesta = res['nro_propuesta'];
            this.codAsegurado = res['cod_asegurado'];

            if(this.isViewComponent){
              this.editable = false;
              this.emitirService.vigenciaService.disableGroup()
            }else{
              this.editable = true;
            }
            //this.editable = this.emitirService.canEditForm(this.nroCotizacion, this.nroPropuesta);
            this.initService();
            this.allData = res;
           
            this.emitirService.setDataInForm(res);

            this.emitirService.getRiesgos(res['nro_cotizacion'], res['nro_propuesta']).subscribe( res => {
              this.aeroService.getMediosDePagos(res.cod_producto).subscribe(val => {
                console.log("res", val["p_list_medios_pago"])
                this.listaMediosDePagos = val["p_list_medios_pago"]
              })
            })
            
            
          }, error =>{
            this.modificaDatos = true;
            let tomador = {
              desc_iva : res["desc_iva"],
              nro_documento : null,
              cuit: null,
              razon_social: res["razon_social"],
              nombre: res["nombre"],
              apellido: res["apellido"],
              cod_actividad: res["cod_actividad"], 
              fec_nacimiento: res["fec_nacimiento"],
              cod_sexo: res["cod_sexo"],
              cod_nacionalidad: res["cod_nacionalidad"] || "ARGENTINA",
              domicilio: res["domicilio_ase"],
              nro_puerta: res["nro_puerta"],
              nro_piso: res["nro_piso"],
              depto: res["depto"],
              cod_provincia: res["cod_provincia"],
              cod_localidad: res["cod_postal"],
              cod_postal: res["cod_postal"],
              telefono: res["telefono"],
              email: res["email"],
              telefonoValido: res["telefono"] != null? res["telefono"].length >= 8 : false

            };

            if(tomador.cod_provincia){
              this.aeroService.getLocalidades(tomador.cod_provincia).subscribe((val) => {

                this.listaLocalidades = val["p_list_localidades"]
              })
            }

            if(res["cod_iva"] != "F"){
                this.esCodIvaF = false;
            }
            
            this.fechaNacimiento = new FormControl(moment("DD/MM/YYYY"));
            this.fechaNacimientoFinal = moment("DD/MM/YYYY");

            this.datosTomador = tomador;

          
          
          this.nroCotizacion = res['nro_cotizacion'];
          this.nroPropuesta = res['nro_propuesta'];
          this.codAsegurado = res['cod_asegurado'];

          if(this.isViewComponent){
            this.editable = false;
            this.emitirService.vigenciaService.disableGroup()
          }else{
            this.editable = true;
          }
          //this.editable = this.emitirService.canEditForm(this.nroCotizacion, this.nroPropuesta);
          this.initService();
          this.allData = res;
         
          this.emitirService.setDataInForm(res);

          this.emitirService.getRiesgos(res['nro_cotizacion'], res['nro_propuesta']).subscribe( res => {
            this.aeroService.getMediosDePagos(res.cod_producto).subscribe(val => {
              console.log("res", val["p_list_medios_pago"])
              this.listaMediosDePagos = val["p_list_medios_pago"]
            })
          })
          })

          switch(res["cod_forma_pago"]){
            case "T":
              this.esTarjeta = true;
              break;
            case "U":
              this.esCBU = true;
              break;
            case "P":
              this.esCuponera = true;
              break;
          }

          let condiciones = {
            desc_moneda: res["desc_moneda"],
            cod_forma_pago : res["cod_forma_pago"],
            desc_forma_pago: res["desc_forma_pago"],
            desc_plan_pagos: res["desc_plan_pagos"],
            porc_comision: res["porc_comision"],
            cbu: res["cbu"],
            titular_cbu: res["titular_cbu"],
            asegurado_tarjeta: res["asegurado_tarjeta"],
            titular_tarjeta: res["titular_tarjeta"],
            cbuValido : false
          }
          this.datosCondiciones = condiciones;

          }  
          this.loading = false;
          this.progressService.hide();
        },
        error => {
          this.loading = false;
          this.editable = false;
          this.progressService.hide();
        })
      }else{
        this.initService();
        this.editable = false;
      }

    },
   );
    
  }

  onDate(event){
    this.fechaNacimientoFinal = event.value
    console.log("esta fecha", this.fechaNacimientoFinal)
  }

  validarDNI(event){
    let params = {
      "nro_documento": event.target.value,
      "cod_tipo_doc": this.tipoDocumento
    }
    this.emitirService.getPorpuestaNosis(params).subscribe(val => {
      console.log("respuesta nosis", val)
      let tomador = val["p_datos_aseg"][0]
      this.modificaDatos = true
      if(tomador["cod_provincia"]){
        this.aeroService.getLocalidades(tomador["cod_provincia"]).subscribe((val) => {

          this.listaLocalidades = val["p_list_localidades"]
        })
      }
      if(tomador["cod_docum"]== "4"){
        this.datosTomador.cuit = null
      }else{
        this.datosTomador.nro_documento = null
      }
      this.p_o_consulta_nosis = tomador["o_consulta"];
      this.datosTomador.nombre = tomador["nombre"]
      this.datosTomador.apellido = tomador["apellido"]
      this.datosTomador.razon_social = tomador["razon_social"]
      this.datosTomador.cod_sexo = tomador["sexo"]
      this.datosTomador.domicilio = tomador["domicilio"]
      this.datosTomador.nro_piso = tomador["piso_domicilio"]
      this.datosTomador.cod_provincia = tomador["cod_provincia"]
      this.datosTomador.cod_postal = tomador["cod_postal"]
      this.datosTomador.cod_localidad = tomador["cod_postal"]
      this.datosTomador.telefonoValido = tomador["telefono"]

      this.fechaNacimiento = new FormControl(moment(tomador["fec_nacimiento"], "DD/MM/YYYY"));
      this.fechaNacimientoFinal = moment(tomador["fec_nacimiento"], "DD/MM/YYYY");

    }, error => {
      this.modificaDatos = true
      this.datosTomador.nro_documento = null;
      this.datosTomador.cuit = null;
    })
    
  }
  /**
   * 
   * Inicializar los paneles del cotizador (Emitir)
   */
  initService(){
    this.loaded = false;
    this.activePanel('tomador');
    
    this.emitirService.datosProductorService.initPanel(false)
    this.emitirService.vigenciaService.initPanel(true);
    this.emitirService.datosTomadorEmitirService.initPanel(this.editable);
    this.emitirService.condicionesComercialesEmitirService.initPanel(this.editable);
    this.emitirService.condicionesComercialesEmitirService.setAsegurado(this.codAsegurado || null);
    this.emitirService.riesgosService.initPanel(false);
    this.emitirService.productosService.initPanel(false);
    this.emitirService.coberturasService.editable = false;
    this.emitirService.coberturasService.setStatus('Emitir');
    this.emitirService.usosService.isEditable(false);

    this.loaded = true;

    this.emitirService.vigenciaService.formGroup.get('vigencia_desde').valueChanges.subscribe((val) =>{
      console.log("fecha aca", val);
      if(val && val.isValid()){
      this.fechaFinal = '';
      this.emitirService.vigenciaService.formGroup.get('hora_inicio').setValue("00:00 hs");
      this.emitirService.vigenciaService.formGroup.get('hora_inicio').updateValueAndValidity();
      console.log("hora" ,this.emitirService.vigenciaService.formGroup.get('hora_inicio').value)
      let inicio = moment(val);
      this.fechaFinal = moment(inicio).add(12, 'M').subtract(1,'days').calendar();
      this.tieneFecha = true;
      
      }

    })
  }

  cambioDeProvincia(event){

    this.listaLocalidades = [];
    this.aeroService.getLocalidades(event.value).subscribe((val) => {

      this.listaLocalidades = val["p_list_localidades"]
    })
  }

  cambioMedioDePago(forma_pago){

    if(forma_pago.value == "U"){
    this.emitirService.condicionesComercialesEmitirService.showCreditCardForm = false;
    }else{
      this.emitirService.condicionesComercialesEmitirService.showCreditCardForm = true;
    }
    console.log("forma de pago seleccionada", forma_pago)
  }

  ngOnDestroy(){
    this.loaded = false;
  }

  ngAfterViewInit(){
    
  }

  /**
   * Pasaje de parametros de un panel a otro
   */
  passDataToPanel(){

    let currentPanel = this.activePanelName;
    switch(currentPanel){
      case 'condiciones-comerciales':
        this.passDataToCondicionesComerciales();
      case 'usos':
        this.passDataToUsosPanel();
        break;
      case 'coberturas':
        this.passDataToCoberturas();
    }

  }

  passDataToCondicionesComerciales(){
    // se le debe enviar el codigo de asegurado al panel de Condiciones Comerciales
    // para que pueda obtener los datos de la tarjeta del asegurado
    this.emitirService.condicionesComercialesEmitirService.setAsegurado(this.codAsegurado);
  }

  passDataToUsosPanel(){
    let data = this.emitirService.productosService.formGroup.getRawValue();
    if(data.producto){
      this.emitirService.usosService.setProducto(data.producto);
    }
  }

  passDataToCoberturas(){
    let data =  { 
      ...this.emitirService.datosProductorService.getRawData(),
      ...this.emitirService.datosTomadorEmitirService.getRawData(),
      ...this.emitirService.condicionesComercialesEmitirService.getRawData(),
      ...this.emitirService.riesgosService.getRawData(),
      ...this.emitirService.productosService.getRawData(),
      ...this.emitirService.usosService.getRawData() 
    };

    this.emitirService.coberturasService.getFiltersData(data);
  }
  
  ///////////////////////////////////////////////////////////////////////////////


  finalizar(){
      this.openCotizarActions();
  }

  openCotizarActions(): void {
    const actions = this._bottomSheet.open(EmitirBottomActions, {
      panelClass: 'c-cotizar-bottom-actions-panel'
    });

    actions.afterDismissed().subscribe((action: 'Volver' | 'Guardar' | 'Finalizar') => {
     
        console.log('accion seleccionada', action);
        switch(action){
          case 'Guardar':
            this.guardarPropuesta();
            break;
          case 'Finalizar':
            this.emitirCotizacion();
            break;
        }

    });
    
  }

  /// Crear cotizacion Service

  getCotizacionData(){

      let cotizacion = { 
        ...this.allData,
        ...this.emitirService.datosProductorService.getRawData(),
        ...this.emitirService.datosTomadorEmitirService.getRawData(),
        ...this.emitirService.condicionesComercialesEmitirService.getRawData(),
        ...this.emitirService.riesgosService.getRawData(),
        ...this.emitirService.productosService.getRawData(),
        ...this.emitirService.usosService.getRawData(),
        ...this.emitirService.coberturasService.getRawData(),
       };

      console.log('cotizacion data', cotizacion)
      return cotizacion;
  }

  emitirCotizacion(){
    let emitirData = { ...this.emitirService.getData(),
      ...this.tomadorForm.form.getRawValue(),
      fecha_nacimiento: this.fechaNacimientoFinal};
    console.log('condiciones', this.condicionesForm.form.value);
    emitirData.cod_asegurado = this.codAsegurado;
    emitirData.o_cotizacion = this.nroCotizacion;
    emitirData.o_propuesta = this.nroPropuesta;
    emitirData.cod_forma_pago = this.condicionesForm.form.value.desc_forma_pago;
    emitirData.cbu = emitirData.cbu;
    emitirData.cuit_cbu = this.emitirService.getData()["cuit"];
    emitirData.p_o_consulta_nosis = this.p_o_consulta_nosis;
    emitirData.cod_sexo = this.tomadorForm.form.value.sexo;
    console.log('datos propuesta', this.emitirService.getData());
    this.setPropuesta(emitirData);
    
  }

  guardarPropuesta(){
    let emitirData ={ ...this.emitirService.getData(),
    ...this.tomadorForm.form.getRawValue(),
  fecha_nacimiento: this.fechaNacimientoFinal}
    emitirData.cod_asegurado = this.codAsegurado;
    emitirData.o_cotizacion = this.nroCotizacion;
    emitirData.o_propuesta = this.nroPropuesta;
    emitirData.cod_forma_pago = this.condicionesForm.form.value.desc_forma_pago;
    emitirData.cuit_cbu = this.emitirService.getData()["cuit"];
    emitirData.cbu = emitirData.cbu;
    emitirData.cod_sexo = this.tomadorForm.form.value.sexo;
    emitirData.p_o_consulta_nosis = this.p_o_consulta_nosis;
    console.log('datos guardar propuesta', emitirData);
    this.savePropuesta(emitirData);
  }

  setPropuesta(params){
    this.toastService.show('Procesando Propuesta', 'info');
    this.progressService.show();
    // chequear si es emitir, p_emitir = 'S'
    // si es solo guardar p_emitir = 'N'
    this.aeroService.generarPropuesta(params).subscribe(
      res => {
        
        if(res && !res['p_error']){

          const dialogRef = this.dialog.open(GuardarPropuestaDialog, {
            width: '50%',
            height: '38%',
            data: { 
              cotizacionNr: res['p_solicitud'],
              polizaNr: res['p_poliza'],
              endosoNr: res['p_endoso'],
              polizaLink: res['link_impresiones_pol']
            },
            panelClass: 'cotizacion-dialog'
          });

          dialogRef.afterClosed().subscribe( response => { 
            
              if( response === 'link-poliza' ){
                if(res['link_impresiones_pol']){
                  window.open(res['link_impresiones_pol']);
                  //this.router.navigate([`/cotizaciones-propuestas/list`]);
                  this.redirectToCotizacionesPropuesta();
                }
              }

              if( response === 'ver-poliza'){
                if(res['p_poliza']){
                  //this.router.navigate([`/reportes-productores/poliza-cartera/${res['p_poliza']}/14/0/0`]);
                  this.navService.navigateToPage({
                    baseUrl: '/reportes',
                    modulePath: '/reportes-productores',
                    pagePath: `/poliza-cartera/${res['p_poliza']}/14/0/0`
                  });
                }
              }
              
              
              if( response === 'ver-propuesta'){
                if(res['p_solicitud']){
                  //this.router.navigate([`/propuesta/view/${res['p_solicitud']}`]);
                  this.navService.navigateToPage({
                    baseUrl: '/cotizaciones-propuestas',
                    modulePath: '/aeronavegacion',
                    pagePath: `/propuesta/view/${res['p_solicitud']}`
                  });
                }
              }

              if(!response){
                //this.router.navigate([`/cotizaciones-propuestas/list`]);
                this.redirectToCotizacionesPropuesta();
              }
              



          });

        }else{

        }
          this.progressService.hide();
          //this.loading = false;
        
      },
      error => {
        this.toastService.show(error, 'error');
        this.progressService.hide();
        //this.loading = false;
      }
    )
  }

  get formValido(){

    let condicionesValidas = (this.condicionesForm && this.condicionesForm.valid) || (this.condicionesForm && this.condicionesForm.disabled);
    if(!this.modificaDatos){
        return this.emitirService.vigenciaService.formGroup.valid && condicionesValidas;
    }
   return  this.tomadorForm && this.tomadorForm.valid &&  this.emitirService.vigenciaService.formGroup.valid && condicionesValidas;
  }

  get formCondicionesValido(){

    //console.log("vigencia", this.emitirService.vigenciaService.formGroup.valid)
   return  this.condicionesForm && this.condicionesForm.valid;
  }


  savePropuesta(params){

    // chequear si es emitir, p_emitir = 'S'
    // si es solo guardar p_emitir = 'N'
    this.toastService.show('Guardando Propuesta', 'info');
    this.progressService.show();
    console.log("params", params["vigencia_desde"].format("DD/MM/YYYY"))
    this.aeroService.guardarPropuesta(params).subscribe(
      res => {
        
        if(res && !res['p_error']){

          const dialogRef = this.dialog.open(GuardarPropuestaDialog, {
            width: '50%',
            height: '38%',
            data: { 
              cotizacionNr: res['p_solicitud'],
              polizaNr: res['p_poliza'],
              endosoNr: res['p_endoso'],
              polizaLink: res['link_impresiones_pol']
              
            },
            panelClass: 'cotizacion-dialog'
          });

          dialogRef.afterClosed().subscribe( response => { 
            
              //this.router.navigate([`/aeronavegacion/propuesta/${res['p_solicitud']}`]);
              if(!response){
                //this.router.navigate([`/cotizaciones-propuestas/list`]);
                this.redirectToCotizacionesPropuesta();
              }

              if( response === 'ver-propuesta'){
                if(res['p_solicitud']){
                  //this.router.navigate([`/propuesta/view/${res['p_solicitud']}`]);
                  this.navService.navigateToPage({
                    baseUrl: '/cotizaciones-propuestas',
                    modulePath: '/aeronavegacion',
                    pagePath: `/propuesta/view/${res['p_solicitud']}`
                  });
                }
              }
            
          });

        }else{

        }
          this.progressService.hide();
          //this.loading = false;
        
      },
      error => {
        this.toastService.show(error, 'error');
        this.progressService.hide();
        //this.loading = false;
      }
    )

  }

  /******************************************************************
   * 
   *        PANELS ADMIN
   * 
   ******************************************************************/

   goToFinalizar(footer: HTMLElement){
    this.scroll(footer);
   }

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
        this.emitirService.datosProductorService.active = active;
        break;
      case 'vigencia':
        this.emitirService.vigenciaService.active = active;
        break;
      case 'tomador':
        this.emitirService.datosTomadorEmitirService.active = active;
        break;
      case 'condiciones-comerciales':
        this.emitirService.condicionesComercialesEmitirService.active = active;
        break;
      case 'tipo-riesgo':
        this.emitirService.riesgosService.tipoRiesgo.active = active;
        break;
      case 'datos-riesgo':
        this.emitirService.riesgosService.datosRiesgo.active = active;
        break;
      case 'productos':
        this.emitirService.productosService.active = active;
        break;
      case 'usos':
        this.emitirService.usosService.active = active;
        break;
      case 'coberturas':
        this.emitirService.coberturasService.active = active;
        break;
    }
  } 

  inactiveAllPanels(){
    
    let active = false;
    //this.editable = false;
    this.emitirService.datosProductorService.active = active;
    this.emitirService.vigenciaService.active = active;
    this.emitirService.datosTomadorEmitirService.active = active;
    this.emitirService.condicionesComercialesEmitirService.active = active;
    this.emitirService.riesgosService.tipoRiesgo.active = active;
    this.emitirService.riesgosService.datosRiesgo.active = active;
    this.emitirService.productosService.active = active;
    this.emitirService.usosService.active = active;
    this.emitirService.coberturasService.active = active;

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
  selector: 'guardar-propuesta-dialog',
  templateUrl: 'guardar-propuesta-dialog.component.html'
})

export class GuardarPropuestaDialog {

  cotizacionNr: number;
  polizaNr: number;
  endosoNr: number;
  linkPoliza: string;

  constructor(
    public dialogRef: MatDialogRef<GuardarPropuestaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) {

        this.cotizacionNr = data['cotizacionNr'];
        this.polizaNr = data['polizaNr'];
        this.endosoNr = data['endosoNr'];
        this.linkPoliza = data['link_impresiones_pol']
    }

  close(): void {
    this.dialogRef.close(false);
  }

  verPoliza(){
    this.dialogRef.close('ver-poliza');
  }

  imprimirPoliza(){
    this.dialogRef.close('link-poliza');
  }

  verPropuesta(){
    this.dialogRef.close('ver-propuesta');
  }

  
}

@Component({
  selector: 'emitir-bottom-actions',
  templateUrl: 'emitir-bottom-actions.component.html',
})
export class EmitirBottomActions {
  constructor(private _bottomSheetRef: MatBottomSheetRef<EmitirBottomActions>) {}

  openLink(actionName): void {
    this._bottomSheetRef.dismiss(actionName);
    event.preventDefault();
  }
}
