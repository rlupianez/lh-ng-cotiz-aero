import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogFormService {

  private subject = new Subject<any>();

  constructor() { }

  getDialogFormActions(){
    return this.subject.asObservable();
  }

  submitForm(data: object){
    this.subject.next(data);
  }

}
