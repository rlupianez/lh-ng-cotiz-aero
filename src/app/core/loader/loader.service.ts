import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from './loader.model';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    console.log('show');
    this.loaderSubject.next(<LoaderState>{show: true});
  }

  hide() {
    console.log('hide');
    this.loaderSubject.next(<LoaderState>{show: false});
  }

}


