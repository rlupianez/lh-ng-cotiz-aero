import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  private subject = new Subject<any>();

  constructor() { }

  getDynamicFormNotificacions(){
    return this.subject.asObservable();
  }

  setFormData(formData: object){
    this.subject.next(formData);
  }

  clearFormGroup(){ 
  }


}
