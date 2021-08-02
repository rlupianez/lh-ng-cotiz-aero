import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndososRoutingModule } from './endosos-routing.module';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { EndososDetailComponent, DialogFormViewerComponent } from './endosos-detail/endosos-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@shared/shared.module';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';
import { ImpresionesViewComponent } from '@shared/ui-components/impresiones-view/impresiones-view.component';

@NgModule({
  declarations: [
    EndososDetailComponent, 
    DialogFormViewerComponent],
  imports: [
    CommonModule,
    SharedModule,
    LhCustomModule,
    EndososRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    DialogFormViewerComponent,
    ImpresionesViewComponent
  ]
})
export class EndososModule { }
