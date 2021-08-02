import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


export type ModuleDataType = {
  title?: string;
  type?: 'ANGULAR' | 'JQM';
  o_menu?: string;
  url: string;
  help?: string;
}

export type AngularUrl = {
  baseUrl?: string;
  modulePath?: string;
  pagePath: string;
  queryParams?: object;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  get isLocal(){
    return location.hostname === "localhost" || location.hostname === "127.0.0.1";
  }

  isProd(){
    return false;
  }

  /**
   * Funcion para navegar entre paginas de angular.
   * Algunas veces se podra usar el navigate nativo de angular (al estar dentro de la misma app).
   * Pero otras veces no, ya que son aplicaciones diferentes.
   */
  navigateToPage(data: AngularUrl){
  
      // navegacion local si 
      if(this.isLocal){
          let oWindow = window;
       
          let url = this.getUrlPath(data);
          // si existe la ruta dentro de la misma aplicacion
          // si posee parametros se los envia
          this.router.navigate([url], { queryParams: data.queryParams || null }).then()
          .catch( error => {

            //console.log('no existe la url');
            let url = this.getUrlPath(data);
            console.log('no existe url', url);
          });
       
        
      }else{

        this.redirectFrameTo(data)
        //this.navigateModule({ url: data. })
      }
    
  }

  getUrlPath(urlData: AngularUrl, addParams?: boolean){
    if(this.isLocal){
      let url = `${urlData.modulePath}${urlData.pagePath}`;
      if(addParams && urlData.queryParams){
        let params = this.parseQueryParamsToString(urlData.queryParams);
        return url + `?${params}`;
      }else{
        return url
      }
      
    }else{
      let url = `/app${urlData.baseUrl}${urlData.modulePath}/#${urlData.pagePath}`;
      if(urlData.queryParams){
        let params = this.parseQueryParamsToString(urlData.queryParams);
        return url + `?${params}`;
      }else{
        return url;
      }
      // se le agrega el prefijo /app y el # luego del nombre del modulo
      return `/app${urlData.baseUrl}${urlData.modulePath}/#${urlData.pagePath}`;
    }
  }

  parseQueryParamsToString(params){
    const keys = Object.keys(params);
    let sParams = '';
    for(let i=0; i < keys.length; i++){
      let keyName = keys[i];
      sParams += `${keyName}=${params[keyName]}`;
      if(i+1 < keys.length){
        sParams += '&';
      }
    }

    return sParams;
  }

  redirectFrameTo(urlData: AngularUrl){
    // referencia al iFrame en donde se carga las paginas de angular
    var iframe = parent.document.getElementById("myIFrame");

    if(iframe){
      var url = this.getUrlPath(urlData);
      iframe['src'] = window.location.origin + url;
    }

  }

  navigateModule(data: ModuleDataType){
    let ldData = {
      title: data.title || '',
      type : data.type || 'ANGULAR',
      o_menu: data.o_menu || null,
      url : data.url,
      help : data.help || ''
    };

    //console.log('open link mi lista item = DATA load Module', JSON.stringify(ldData) );

    (<any>parent).loadModule(ldData);
  }
}
