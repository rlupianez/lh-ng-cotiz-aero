import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'asegurado-basico', loadChildren: () => import('./asegurado-basico/asegurado-basico.module').then(m => m.AseguradoBasicoModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AseguradosRoutingModule { }
