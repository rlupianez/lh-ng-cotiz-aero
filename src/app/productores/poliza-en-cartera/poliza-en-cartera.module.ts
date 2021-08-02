import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { PolizaEnCarteraRoutingModule } from './poliza-en-cartera-routing.module';
import { PolizaEnCarteraListComponent } from './poliza-en-cartera-list/poliza-en-cartera-list.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { PolizaEnCarteraDetailComponent, DialogFormViewerComponent } from './poliza-en-cartera-detail/poliza-en-cartera-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ImpresionesViewComponent } from '@shared/ui-components/impresiones-view/impresiones-view.component';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';

@NgModule({
  declarations: [
    PolizaEnCarteraListComponent,
    PolizaEnCarteraDetailComponent,
    DialogFormViewerComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    LhCustomModule,
    PolizaEnCarteraRoutingModule,
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
    DialogFormViewerComponent,
    ImpresionesViewComponent
  ]
})
export class PolizaEnCarteraModule {}
