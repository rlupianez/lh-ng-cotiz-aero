import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosRubOpeCobListComponent } from './libros-rub-ope-cob-list/libros-rub-ope-cob-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: LibrosRubOpeCobListComponent, data: { title: 'Libros Rubricados Operaciones y Cobranzas'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRubOpeCobRoutingModule { }
