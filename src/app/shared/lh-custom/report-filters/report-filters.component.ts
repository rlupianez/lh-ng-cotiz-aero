import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { config } from '@core/config/app-config';
import { FilterToolbarService } from '@core/services/components/filter-toolbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss']
})
export class ReportFiltersComponent implements OnInit, OnDestroy {

  panelExpanded: boolean = true;
  loadingFilters: boolean = true;  
  @Input() expanded: boolean;
  @Input() title?: string = 'Filtros';
  toolbarSubscription: Subscription = new Subscription();

  constructor(private filterToolbarService: FilterToolbarService) {

    this.loadingFilters = true;

    if(!this.filterToolbarService.isLoaded){
      this.toolbarSubscription = this.filterToolbarService.getToolbarServiceNotifications().subscribe(
        res => {
          console.log('toolbar service', res);
          this.loadingFilters = false;
        },
        error => {
          console.log('toolbar service', error);
          this.loadingFilters = false;
        }
      )
    }else{
      this.loadingFilters = false;
    }
    
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.toolbarSubscription.unsubscribe();
  }

  get skeletonLoading(){
    return this.loadingFilters && config.ux.skeletonLoadingEnable;
  }

}
