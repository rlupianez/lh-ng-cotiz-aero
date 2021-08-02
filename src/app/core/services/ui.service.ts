import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingTableData: BehaviorSubject<boolean>;
  dowloadingExcel: BehaviorSubject<boolean>;

  constructor() {
    this.loadingTableData = new BehaviorSubject(false);
    this.dowloadingExcel = new BehaviorSubject(false);
  }

  loadingDataTable(loaded: boolean) {
    this.loadingTableData.next(loaded);
  }

  loadingExcel(loaded: boolean){
    this.dowloadingExcel.next(loaded);
  }
}
