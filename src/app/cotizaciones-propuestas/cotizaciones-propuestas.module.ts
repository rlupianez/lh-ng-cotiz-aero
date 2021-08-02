import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CotizacionesPropuestasRoutingModule } from './cotizaciones-propuestas-routing.module';
import { CotizacionesPropuestasListComponent } from './cotizaciones-propuestas-list/cotizaciones-propuestas-list.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ImpresionesViewComponent } from '@shared/ui-components/impresiones-view/impresiones-view.component';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';

@NgModule({
  declarations: [
    CotizacionesPropuestasListComponent,  
  ],
  imports: [
    CommonModule, 
    SharedModule,
    LhCustomModule,
    CotizacionesPropuestasRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    ImpresionesViewComponent
  ]
})
export class CotizacionesPropuestasModule {}



