import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';

import { LibrosRubricadosRoutingModule } from './libros-rubricados-routing.module';
import { LibrosRubricadosListComponent } from './libros-rubricados-list/libros-rubricados-list.component';
import { SharedModule } from '@shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [LibrosRubricadosListComponent],
  imports: [
    CommonModule,
    SharedModule,
    LhCustomModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    LibrosRubricadosRoutingModule
  ]
})
export class LibrosRubricadosModule { }
