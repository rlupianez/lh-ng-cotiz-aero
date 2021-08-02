import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AseguradoDetail, DatosGeneralesConsumidorFinal, DatosGeneralesNOConsumidorFinal } from './asegura-basico-detail.config';
import { AseguradoBasicoService } from '../asegurado-basico.service';
import { Location } from '@angular/common';

import * as animations from '@core/animations/router.animations';
import { trigger } from '@angular/animations';
import { NavigationService } from '@core/services/navigation.service';
import { UserService } from '@core/services/user/user.service';


@Component({
  selector: 'app-asegurado-basico-detail',
  templateUrl: './asegurado-basico-detail.component.html',
  styleUrls: ['./asegurado-basico-detail.component.scss'],
  animations: [ trigger('fadeIn', animations.SkeletonfadeIn() )]
})
export class AseguradoBasicoDetailComponent implements OnInit {

  currentAsegurado: string;
  data: object = {};
  id: string = null;
  detailConfig = AseguradoDetail;
  datosConsumidorFinal = DatosGeneralesConsumidorFinal;
  datosNoConsumidorFinal = DatosGeneralesNOConsumidorFinal;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private navService: NavigationService,
    private aseguradoService: AseguradoBasicoService,
    private location: Location,
    private userService: UserService) {
    this.route.params.subscribe( params => {
      
      this.id = params['cod_asegu'];
      
      const state = this.router.getCurrentNavigation().extras.state;

      if(state && state.data){
        
        this.loading = true;
        this.data = state.data;
        this.currentAsegurado = this.data['cod_asegurado'];
        this.setDatosGenerales();
        this.loading = false;

      }else if(params.id){
        this.loading = true;
        this.aseguradoService.getAsegurado(params.id).subscribe( data => {
          console.log('Datos Asegurado', data);
          if(data && data['p_list_aseg'].length > 0){
            this.data = data['p_list_aseg'][0];
            this.currentAsegurado = this.data['cod_asegurado'];

            this.setDatosGenerales();
            this.loading = false;
          }
          
        },
        error => {
          this.loading = false;
        });
      }
    });

  }

  ngOnInit() {
  }

  backRoute(){
    this.location.back();
  }

  setDatosGenerales(){
    if(this.data['desc_condicion_fiscal'] === 'CONS. FINAL'){
      this.detailConfig['datos_generales'] = { ...this.datosConsumidorFinal } as any;
    }else{
      this.detailConfig['datos_generales'] = { ...this.datosNoConsumidorFinal } as any;
    }
  }

  get initialLoading(){
    return this.loading && true;
  }

  redirectToPoliza(){
    
    //this.userService.getProductor().subscribe( data => {
      //console.log('value', data);

      this.navService.navigateToPage({
        baseUrl: '/reportes',
        modulePath: '/reportes-productores',
        //pagePath: `/poliza-cartera/list?cod_asegurado=${this.currentAsegurado}`
        pagePath: `/poliza-cartera/list`,
        queryParams: {
          p_cod_asegu: JSON.stringify({ 
            cod_asegurado: this.currentAsegurado,
            list_val_aseg: this.data['desc_asegurado'].toUpperCase()
          }),
          //p_cod_asegu: this.currentAsegurado,
          //p_cod_prod: data['codpas']
        }
      })
    //});
    
  }
}
