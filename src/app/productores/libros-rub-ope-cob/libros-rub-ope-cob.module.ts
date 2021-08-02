import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';

import { LibrosRubOpeCobRoutingModule } from './libros-rub-ope-cob-routing.module';
import { LibrosRubOpeCobListComponent } from './libros-rub-ope-cob-list/libros-rub-ope-cob-list.component';
import { SharedModule } from '@shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [LibrosRubOpeCobListComponent],
  imports: [
    CommonModule,
    SharedModule,
    LhCustomModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    LibrosRubOpeCobRoutingModule
  ]
})
export class LibrosRubOpeCobModule { }
