import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type RosterTableAction = 'addRow' | 'setAll' | 'clear' | 'loading';

export type ActionType = {
  action: RosterTableAction,
  data?: object | object[] | boolean
}

@Injectable({
  providedIn: 'root'
})
export class RosterTableService {

  private subject = new Subject<any>();
  loadingRosterSubject = new Subject<boolean>();

  Roster = new Subject<any[]>();

  constructor() { }

  getRosterTableService(){
    return this.subject.asObservable();
  }

  action(actionData: ActionType){
    this.subject.next(actionData);
  }

  loadingRoster(value){
    this.loadingRosterSubject.next(value);
  }

  setRoster(premio){
    this.Roster.next(premio);
  }
}
