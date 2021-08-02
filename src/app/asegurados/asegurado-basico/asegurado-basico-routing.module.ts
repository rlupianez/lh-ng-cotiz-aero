import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AseguradoBasicoListComponent } from './asegurado-basico-list/asegurado-basico-list.component';
import { AseguradoBasicoDetailComponent } from './asegurado-basico-detail/asegurado-basico-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: AseguradoBasicoListComponent, data: { title: 'Asegurado Básico'}},
      { path: ':id', component: AseguradoBasicoDetailComponent, data: { title: 'Detalle Asegurado Básico'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AseguradoBasicoRoutingModule {}
