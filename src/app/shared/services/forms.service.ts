import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/***
 *  
 *  Servicio que se encarga del manejo de los formularios creados a traves de configuracion JSON
 * 
 *************************************************************************************************/
export class FormsService {

  constructor() { }


  orderFormItems(items: object, order: any[] ){
    let ordererItems = {}

    for(let field of order){

      if(items[field]){
        ordererItems[field] = items[field];
      }

    }

    return ordererItems;
  }

}
