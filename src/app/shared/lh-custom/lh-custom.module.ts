import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductorFormcontrolComponent } from './productor-formcontrol/productor-formcontrol.component';
import { FavoritosManagerComponent } from './favoritos-manager/favoritos-manager.component';

// Material
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconBadgetDirective } from './icon-badget.directive';
import { CotizadoresSelectorComponent } from './cotizadores-selector/cotizadores-selector.component';
import { PipesModule } from '../pipes/pipes.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { UxComponentsModule } from '../ux-components/ux-components.module';
import { ReportFiltersComponent } from './report-filters/report-filters.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { AccionesNavComponent } from './acciones-nav/acciones-nav.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
// import { HeaderComponent } from './header/header.component';
import { AddCoberturasDialogComponent } from './add-coberturas-dialog/add-coberturas-dialog.component';
import { DirectivesModule } from '../directives/directives.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    ProductorFormcontrolComponent, 
    FavoritosManagerComponent,
    IconBadgetDirective,
    CotizadoresSelectorComponent,
    ReportFiltersComponent,
    AccionesNavComponent, 
    HeaderNavComponent,
    AddCoberturasDialogComponent
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    UxComponentsModule,
    DynamicFormModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatExpansionModule,
    MatChipsModule,
    DirectivesModule,
    MatToolbarModule
  ],
  exports: [
    FavoritosManagerComponent,
    CotizadoresSelectorComponent,
    ReportFiltersComponent,
    AccionesNavComponent,
    HeaderNavComponent,
    ProductorFormcontrolComponent
  ]
})
export class LhCustomModule { }
