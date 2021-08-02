import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThirdPartyClaimsPageComponent } from './third-party-claims-page/third-party-claims-page.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'reclamos', component: ThirdPartyClaimsPageComponent , data: { title: 'Siniestros Terceros' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiniestrosClaimsRoutingModule { }
