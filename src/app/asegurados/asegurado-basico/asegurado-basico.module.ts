import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LhCustomModule  } from '@shared/lh-custom/lh-custom.module';

import { AseguradoBasicoRoutingModule } from './asegurado-basico-routing.module';
import { AseguradoBasicoListComponent } from './asegurado-basico-list/asegurado-basico-list.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AseguradoBasicoDetailComponent } from './asegurado-basico-detail/asegurado-basico-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { from } from 'rxjs';




@NgModule({
  declarations: [
    AseguradoBasicoListComponent,
    AseguradoBasicoDetailComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    LhCustomModule,
    AseguradoBasicoRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class AseguradoBasicoModule {}
