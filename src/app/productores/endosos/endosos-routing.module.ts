import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndososDetailComponent } from './endosos-detail/endosos-detail.component';

const routes: Routes = [ 
  { path: ':poliza/:cod_sec/:endoso/:tipo_emi', component: EndososDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndososRoutingModule { }
