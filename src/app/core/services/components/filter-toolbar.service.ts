import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, forkJoin, Subscription, of, combineLatest } from 'rxjs';
import { filter, map, finalize } from 'rxjs/operators';
import { ApiService } from '../http/api.service';
import { UserService } from '../user/user.service';


import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromReport from 'src/app/store/report/report.actions';

import * as moment from 'moment';

export type DefaultFilters = {
  period: object,
  prod: object
}

@Injectable({
  providedIn: 'root'
})
export class FilterToolbarService implements OnDestroy{

  /**
   * Subject para informar si fue obtenida la configuracion inicial de los filtros
   */
  private subject = new Subject<any>();
  private subscription = new Subscription();
  private defaultFilters: DefaultFilters = {
    period: null,
    prod: null
  };

  loaded: boolean = false;
  reportData: any;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private apiService: ApiService,
    private userService: UserService,
    private store: Store<AppState> ) {

      this.initToolbar();
    
  }

  initToolbar(){
    this.route.queryParams.subscribe(params => {
      // console.log('query params url in service', params);
        this.sendParams(params);
    });


    this.subscription = this.store.select('report').subscribe( data => {
      this.reportData = data;
    });
    
    if(!this.loaded){
      this.getCurrentProductor().subscribe( (res:object) => {
        this.defaultFilters.prod = res;
  
        this.getPeriodsFilters().subscribe( (res:object) => {
          this.defaultFilters.period = res;
  
          this.loaded = true;
          this.subject.next( this.defaultFilters );
        });
      
      })
    }else{
      this.subject.next( this.defaultFilters );
    }

  }

  ngOnDestroy(){
    console.log('service destroyed');
    this.subscription.unsubscribe();
  }
  /****
   * 
   *  Geters and seters
   * 
   */
  get productor(){
    return this.defaultFilters.prod;
  }

  get period(){
    return this.defaultFilters.period;
  }


  getToolbarServiceNotifications(){
    return this.subject.asObservable();
  }

  getQueryParamsChanges(){
    return this.subject.asObservable();
  }

  sendParams(params: object){
    this.subject.next(params);
  }

  syncUrlParams(params: object){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.removeEmptyParams(params)
    });
  }

  removeEmptyParams(params){
    let filters = {};
    let keys = Object.keys(params);

    for(let field of keys){

      if(params[field]){
        filters[field] = params[field];
      }

    }
    return filters;
  }

  getRouteParams(){
    return this.route.snapshot.queryParams;
  }

  getCurrentState(){
    return this.router.getCurrentNavigation().extras.state;
  }


  getPeriodsFilters(){
    /*return this.apiService.getRangeOptions('', '/listas/LIST_PERIODOS').pipe(
      map( data => {
        // console.log('period data', data);
        if(data.length > 0){
          // se obtiene los periodos desde la api
          return data[0];
        }else{
          // si no se obtiene los periodos desde la api
          return {
            fecha: "07/2019",
            cantper: 84
          } 
        }
        
      })
    );*/

    return of({
      fecha: moment().endOf('month').subtract(1,'month').format('MM/YYYY'),
      cantper: 84
    })
    
  }


  getCurrentProductor(){
    return this.userService.getProductor();
  }


  loadDefaultFiltersConfig(){
    return new Observable( obs => { 
      let services = [];
      services.push(this.getPeriodsFilters());
      services.push(this.getCurrentProductor());

      combineLatest(services).subscribe( (res: object[]) => {
        // console.log('detail', res);
        if(res){
          obs.next({ ...res[0], ...res[1] });
        }else{
          obs.next({ });
        }
      });

    });
  }

  get isLoaded(){
    return this.loaded;
  }

  get filtersConfigData(){
    return this.defaultFilters;
  }


  ////////////////////////////////////////////////////////////
  //// State managment
  ////////////////////////////////////////////////////////////

  saveLastAppliedFilters(filterData, filterApiModel, apiPath){
    this.store.dispatch( new fromReport.AddLastAppliedFilters(filterData, filterApiModel, apiPath, this.router.url)); 
  }

  saveReportResults(results){
    this.store.dispatch( new fromReport.AddReportResults(results));
  }

  getFiltersData(){
    if(this.router.url === this.reportData.route){
      return this.reportData;
    }else{
      return {};
    }
    
  }

  hasStoredFilters(){

    return 
  }

}
