import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {

  loading: boolean = false;
  nextStepSubscription: BehaviorSubject<any>;

  constructor() { 
    this.nextStepSubscription = new BehaviorSubject(null);
  }


  isLoading(value: boolean){
    this.loading = value;
  }

  triggerNextStep(){
    this.nextStepSubscription.next(true);
  }

}
