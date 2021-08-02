import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type EditableTableAction = 'addRow' | 'setAll' | 'clear' | 'loading';

export type ActionType = {
  action: EditableTableAction,
  data?: object | object[] | boolean
}

@Injectable({
  providedIn: 'root'
})
export class EditableTableService {

  private subject = new Subject<any>();
  loadingEditableSubject = new Subject<boolean>();

  Editable = new Subject<any[]>();

  constructor() { }

  getEditableableService(){
    return this.subject.asObservable();
  }

  action(actionData: ActionType){
    this.subject.next(actionData);
  }

  loadingRoster(value){
    this.loadingEditableSubject.next(value);
  }

  setEditable(premio){
    this.Editable.next(premio);
  }
}
