import { Component, OnInit, Inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { UserService } from './core/services/user/user.service';
import { ProgressBarService } from '@core/services/progress-bar.service';
import { AuthService } from './core/services/auth/auth.service';

import * as routerAnimations from '@core/animations/router.animations';
import { routeAnimations } from './core/animations/route.animations';

import { DOCUMENT, PlatformLocation } from '@angular/common';
import { FilesService } from './core/services/utils/files.service';
import { ApiService } from '@core/services/http/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AuthService
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'extranet-laholando';
  showSearch: boolean = false;
  constructor(private cookieService: CookieService, 
              private apiService: ApiService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, 
              private router: Router, 
              private titleService: Title,
              private authService: AuthService,
              private userService: UserService,
              public progressBarService: ProgressBarService,
              private fileService: FilesService,
              private cdr : ChangeDetectorRef,
              @Inject(DOCUMENT) private document: Document){
    
    /**
     * Iconos svg personalizados
     */

    this.matIconRegistry.addSvgIcon(
      "notification",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/notification.svg")
    )

    this.matIconRegistry.addSvgIcon(
      "down_excel",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/DownExcel.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "down_group",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/DownGroup.svg")
    )
    this.matIconRegistry.addSvgIcon(
      "column_list",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/ColumnList.svg")
             )         
    this.matIconRegistry.addSvgIcon(
      "home_building",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/building.svg")
             )  
    this.matIconRegistry.addSvgIcon(
      "home_calculator",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/calculator.svg")
             )  
    this.matIconRegistry.addSvgIcon(
      "home_car",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/car.svg")
             )  
    this.matIconRegistry.addSvgIcon(
      "home_coin",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/coin.svg")
             )
    this.matIconRegistry.addSvgIcon(
      "home_factory",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/factory.svg")
             )
    this.matIconRegistry.addSvgIcon(
      "home_family",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/family.svg")
             )
    this.matIconRegistry.addSvgIcon(
      "home_shopping_bag",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/shopping-bag.svg")
             )
    this.matIconRegistry.addSvgIcon(
      "home_umbrella",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/umbrella.svg")
             )
    this.matIconRegistry.addSvgIcon(
      "home_document",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/document.svg")
             )
    this.matIconRegistry.addSvgIcon(
      "home_star",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/star.svg")
             )

    this.matIconRegistry.addSvgIcon(
    "asegurado",
    this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/life-insurance-1.svg")
            )
    
    this.matIconRegistry.addSvgIcon(
      "cobertura_poliza",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/cobertura.svg")
              )
    
    this.matIconRegistry.addSvgIcon(
      "detalle_bienes",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/clipboard.svg")
              )

    this.matIconRegistry.addSvgIcon(
      "pagos",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/hand.svg")
              )

    this.matIconRegistry.addSvgIcon(
      "files",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/files.svg")
              )

    this.matIconRegistry.addSvgIcon(
      "contract",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/contract.svg")
              )
    
    this.matIconRegistry.addSvgIcon(
      "group",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/group-3.svg")
              )

    this.matIconRegistry.addSvgIcon(
      "polizaactual",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/polizaactual.svg")
              )

    this.matIconRegistry.addSvgIcon(
      "alert",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/alert.svg")
              )

    this.matIconRegistry.addSvgIcon(
      "credit_card",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/credit-card.svg")
              )
    
    this.matIconRegistry.addSvgIcon(
      "siniestros",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/siniestros.svg")
              )

    this.matIconRegistry.addSvgIcon(
      "comisiones_poliza",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/comisiones.svg")
              )

    this.matIconRegistry.addSvgIcon(
      "poliza-cartera",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/poliza-cartera.svg")
              )

    this.matIconRegistry.addSvgIcon(
      "home_search",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/buscador.svg")
              )
    
    this.matIconRegistry.addSvgIcon(
      "search_asegurado",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/home-icons/search_asegurado.svg")
              )
    /**
     *  Seteo de session id, comentar al pasar a prod
     */

    // this.cookieService.set('sid', '9952591765');
  }

  ngOnInit(){
    document.cookie = "sid=6646308056";
    const session_id = this.cookieService.get('sid');
    console.log('cookie laholando', session_id);
    console.log('pathname', this.fileService.getCurrentBasePath());
    const basePath = this.fileService.getCurrentBasePath();


    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

    if (OSName == "Windows"){
      this.loadStyle( basePath + '/assets/css/styles-windows.css');
    }

    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if(isFirefox){
      this.loadStyle( basePath + '/assets/css/styles-firefox.css');
    }

    var isExplorer = navigator.userAgent.toLowerCase().indexOf('edge') > -1 || navigator.userAgent.toLowerCase().indexOf('explorer') > -1 ;
    if(isExplorer){
      this.loadStyle( basePath + '/assets/css/styles-explorer-edge.css');
    }


    
    // ver si es conveniente hacer esto o no
    /*if(session_id){
      this.authService.login();
      //this.authService.login(session_id).subscribe();
      // this.userService.getProductor().subscribe();
    }else{
      // usar store para identificarlo como no auth
      console.error('user no logueado')
    }*/
  

  

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(`La Holando Extranet | ${title}`);
      }
    });

    this.getSearchVisibility();
  }

  ngAfterViewInit(){
      this.cdr.detectChanges();
  }
  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    let data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
                
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }


  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

  onActivate(e, outlet){
    outlet.scrollTop = 0;
  }


  getSearchVisibility(){
    this.apiService.post('/holandonet/HOME',{ p_regxpag: 100 }, false).subscribe( res => {
      //console.log('res app', res);
      if(res['config']){
        const config = res['config'];
        config.filter( item => {
          if(item['objeto'] === 'BUSCADOR_INTEGRAL'){
            this.showSearch = item['mostrar'] === 'S' ? true : false;
          }
        })
      }
    });
  }
}
