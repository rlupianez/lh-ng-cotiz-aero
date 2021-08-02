import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type CoverageTableAction = 'addRow' | 'setAll' | 'clear' | 'loading';

export type ActionType = {
  action: CoverageTableAction,
  data?: object | object[] | boolean
}

@Injectable({
  providedIn: 'root'
})
export class CoverageTableService {

  private subject = new Subject<any>();
  loadingCoverageSubject = new Subject<boolean>();

  coverage = new Subject<any[]>();

  constructor() { }

  getCoverageTableService(){
    return this.subject.asObservable();
  }

  action(actionData: ActionType){
    this.subject.next(actionData);
  }

  loadingCoverage(value){
    this.loadingCoverageSubject.next(value);
  }

  setCoverage(premio){
    this.coverage.next(premio);
  }
}
