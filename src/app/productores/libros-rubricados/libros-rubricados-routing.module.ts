import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosRubricadosListComponent } from './libros-rubricados-list/libros-rubricados-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: LibrosRubricadosListComponent, data: { title: 'Libros Rubricados'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRubricadosRoutingModule { }
