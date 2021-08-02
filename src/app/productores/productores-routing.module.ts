import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  children: [
    { path: 'poliza-cartera', loadChildren: () => import('./poliza-en-cartera/poliza-en-cartera.module').then(m => m.PolizaEnCarteraModule) },
    { path: 'endosos', loadChildren: () => import('./endosos/endosos.module').then(m => m.EndososModule) },
    { path: 'libros-rubricados', loadChildren: () => import('./libros-rubricados/libros-rubricados.module').then(m => m.LibrosRubricadosModule) },
    { path: 'libros-rub-ope-cob', loadChildren: () => import('./libros-rub-ope-cob/libros-rub-ope-cob.module').then(m => m.LibrosRubOpeCobModule) },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoresRoutingModule { }
