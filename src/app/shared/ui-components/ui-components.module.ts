import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { FiltersToolbarComponent } from './filters-toolbar/filters-toolbar.component';
import { MaterialTableComponent } from './material-table/material-table.component';

import { FormComponentsModule } from '../form-components/form-components.module';
import { PipesModule } from '../pipes/pipes.module';
import { LhCustomModule } from '../lh-custom/lh-custom.module';

import {MatRippleModule} from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorDirective } from './material-table/custom-paginator.directive';
import { CoberturasTableComponent } from './coberturas-table/coberturas-table.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { SearchInputComponent } from './search-input/search-input.component';
// import { TableComponent } from '../form-components/table/table.component';
// import { FormControlSkeletonLoaderComponent } from '../ux-components/form-control-skeleton-loader/form-control-skeleton-loader.component';
import { UxComponentsModule } from '../ux-components/ux-components.module';
import { AccordionFiltersbarComponent } from './accordion-filtersbar/accordion-filtersbar.component';
import { NavActionsComponent } from './nav-actions/nav-actions.component';
import { ImpresionesViewComponent } from './impresiones-view/impresiones-view.component';
import { AccordionFormComponent } from './accordion-form/accordion-form.component';
import { HomeSearchInputComponent } from './home-search-input/home-search-input.component';
import { PanelFormComponent } from './panel-form/panel-form.component';
import { SubPanelFormComponent } from './sub-panel-form/sub-panel-form.component';
import { MatCardModule } from '@angular/material/card';
@Injectable()
export class MatPaginatorIntlES extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items';
  nextPageLabel     = 'Siguiente';
  previousPageLabel = 'Anterior';

  constructor(){
    super();
  }

  

  getRangeLabel = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    // return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
    return endIndex + ' de ' + length;
  }

}


@NgModule({
  declarations: [
    FiltersToolbarComponent,
    MaterialTableComponent,
    CustomPaginatorDirective,
    CoberturasTableComponent,
    DetailViewComponent,
    SearchInputComponent,
    AccordionFiltersbarComponent,
    NavActionsComponent,
    ImpresionesViewComponent,
    AccordionFormComponent,
    HomeSearchInputComponent,
    PanelFormComponent,
    SubPanelFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DynamicFormModule,
    MatAutocompleteModule,
    MatRippleModule,
    NgxPaginationModule,
    FormComponentsModule,
    UxComponentsModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatListModule,
    MatSidenavModule,
    MatChipsModule,
    MatProgressBarModule,
    MatCardModule
  ],
  exports: [
    FiltersToolbarComponent,
    MaterialTableComponent,
    CoberturasTableComponent,
    DetailViewComponent,
    SearchInputComponent,
    ImpresionesViewComponent,
    AccordionFormComponent,
    PanelFormComponent,
    SubPanelFormComponent
    // PrimaPremioBarComponent
  ],
  entryComponents: [
    HomeSearchInputComponent
   
    // FormControlSkeletonLoaderComponent
    // TableComponent
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlES}]
})
export class UiComponentsModule { }
