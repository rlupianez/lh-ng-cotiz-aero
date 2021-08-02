import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/http/api.service';
import { CookieService } from 'ngx-cookie-service';
import { of, Observable, forkJoin, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private apiService: ApiService, private cookieService: CookieService) { }

  getAlert(){
    return  this.apiService.post('/listas/LIST_ALERTAS_PANEL',{ p_regxpag: 100 }, false);
   }

   getIndicadores(){
    return  this.apiService.post('/listas/LIST_INDICADORES',{ p_regxpag: 100 }, false);
   }

  getHomeData(){
    return  this.apiService.post('/holandonet/HOME',{ p_regxpag: 100 }, false);
  }

  getFavoritos(){
    return  this.apiService.post('/holandonet/FAVORITOS_DISPONIBLES',{ p_regxpag: 100 }, false);
  }

  addFavorito(id){
    if(id){
      return this.apiService.post('/holandonet/AGREGAR_FAVORITO',
        { p_o_menu: id }, false);
    }
    return of([]);
  }

  removeFavorito(id){
    if(id){
      return this.apiService.post('/holandonet/QUITAR_FAVORITO',
        { p_o_favorito: id }, false);
    }
    return of([]);
  }

  getRamos(){
    return  this.apiService.post('/holandonet/SELECTOR',{ p_regxpag: 100 }, false);
  }

  getAllData(){

    return new Observable( obs => { 
      let requests = [];
      requests.push(this.getHomeData());
      requests.push(this.getIndicadores());
      requests.push(this.getAlert());

      combineLatest(requests).subscribe( (res: object[]) => {
        console.log('detail', res);
        if(res){
          obs.next({ ...res[0], ...res[1], ...res[2] });
        }else{
          obs.next({ });
        }
      });

    });


  }

  updateFavoritos(adds, removes){

    let req = [];

    for(let id of removes){
      req.push(this.removeFavorito(id));
    }

    /*for(let id of adds){
      req.push(this.addFavorito(id));
    }*/

    return combineLatest(req); /*.subscribe( res => {
      console.log('response favoritos', res);
    });*/
  }


  removeFavoritos(ids): Observable<object>{
    let req = [];

    for(let id of ids){
      req.push(this.removeFavorito(id));
    }

    if(req.length > 0){
      return combineLatest(req).pipe(
        map(( data: any[]) => {
          return data;
        })
      );
    }else{
      return of({ p_respuesta: 'ok' });
    }
    

  }

  addFavoritos(ids): Observable<object>{
    let req = [];

    for(let id of ids){
      req.push(this.addFavorito(id));
    }

    if(req.length > 0){
      return combineLatest(req).pipe(
        map(( data: any[]) => {
          return data;
        })
      );
    }else{
      return of({ p_respuesta: 'ok' });
    }
  }
  
}