import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type InsuredTableAction = 'addRow' | 'setAll' | 'clear' | 'loading';

export type ActionType = {
  action: InsuredTableAction,
  data?: object | object[] | boolean
}

@Injectable({
  providedIn: 'root'
})
export class InsuredTableService {

  _product: any;
  private subject = new Subject<any>();
  loadingInsuredSubject = new Subject<boolean>();

  insured = new Subject<any[]>();
  cotizacion = new Subject<any>()

  constructor() { }

  getInsuredTableService(){
    return this.subject.asObservable();
  }

  action(actionData: ActionType){
    this.subject.next(actionData);
  }

  loadingInsured(value){
    this.loadingInsuredSubject.next(value);
  }

  setInsured(premio){
    this.insured.next(premio);
  }

  setCotizacion(value){
    this.cotizacion.next(value);
  }
  getProduct(){
    return this._product;
  }

  setProduct(product: any){
    this._product = product;
  }

}
