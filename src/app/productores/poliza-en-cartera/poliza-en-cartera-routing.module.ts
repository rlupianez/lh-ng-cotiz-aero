import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolizaEnCarteraListComponent } from './poliza-en-cartera-list/poliza-en-cartera-list.component';
import { PolizaEnCarteraDetailComponent } from './poliza-en-cartera-detail/poliza-en-cartera-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: PolizaEnCarteraListComponent, data: { title: 'Póliza en Cartera' } },
      { path: ':poliza/:cod_sec/:endoso/:tipo_emi', component: PolizaEnCarteraDetailComponent, data: { title: 'Detalle Póliza en Cartera' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolizaEnCarteraRoutingModule {}
