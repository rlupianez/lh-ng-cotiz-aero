import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = '/listas/LIST_DATOS_USER';
  productorPath: string = '/listas/LIST_PAS';
  headersOpts: object;

  constructor(private apiService: ApiService) { 
    this.headersOpts = this.apiService.getHttpOptions();
  }

  getUserLogged(){
    return this.apiService.post(this.path, {}, false).pipe( 
      map( (res: object) => {
        // devuelve los datos de usuario
        if(res && res['p_list_user']){
          return res['p_list_user'][0];
        }else {
          return {};
        }
      })
    );

  }

  getProductor(){

    return new Observable( obs => {
      this.getUserLogged().subscribe(
        res => {
          
          const user = res;

          // si es usuario tipo U, no tiene productor asociado
          if(user['tipo_user'] === 'U'){
            obs.next(null);
          }

          // si no posee codigo en el campo cod_prod 
          if(!user['cod_prod']){
            obs.next(null);
          }

          // si es de tipo P (Productor), busca el productor asociado
          if(user['tipo_user'] === 'P'){

            const body = {
              p_filtro: user['cod_prod']
            }
          
            // obtener datos de productor
            this.apiService.post(this.productorPath,body).subscribe(
              (res: any[]) => {
                if(res['result'] &&  res['result'].length > 0){
                  obs.next(res['result'][0]);
                }else{
                  obs.next(null);
                }
              }
            );

          }else {
            obs.next(null);  
          }

          
      });
    });
  }
}
