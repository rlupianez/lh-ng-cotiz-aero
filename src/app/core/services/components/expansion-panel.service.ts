import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpansionPanelService {

  private subject = new Subject<any>();

  constructor() { }

  getExpansionPanelNotifications(){
    return this.subject.asObservable();
  }

  setPanelItem(panelName: string){
    this.subject.next(panelName);
  }

}
