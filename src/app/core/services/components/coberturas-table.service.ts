import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type CoberturaTableAction = 'addRow' | 'setAll' | 'clear' | 'loading';

export type ActionType = {
  action: CoberturaTableAction,
  data?: object | object[] | boolean
}

@Injectable({
  providedIn: 'root'
})
export class CoberturasTableService {

  private subject = new Subject<any>();
  loadingCoberturasSubject = new Subject<boolean>();
  loadingPremioSubject = new Subject<boolean>();

  premio = new Subject<any[]>();
  coberturas = new Subject<any[]>();

  constructor() { }

  getCoberturaTableService(){
    return this.subject.asObservable();
  }

  action(actionData: ActionType){
    this.subject.next(actionData);
  }

  loadingCoberturas(value){
    this.loadingCoberturasSubject.next(value);
  }


  loadingPremio(value){
    this.loadingPremioSubject.next(value);
  }

  setPremio(premio){
    this.premio.next(premio);
  }

  setCoberturas(premio){
    this.coberturas.next(premio);
  }
}
