import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthResolverService } from './core/services/auth/auth-resolver.service';

import { CotizarComponent } from './aeronavegacion/cotizar/cotizar.component';
import { EmitirComponent } from './aeronavegacion/emitir/emitir.component';

import { AseguradoBasicoListComponent } from './asegurados/asegurado-basico/asegurado-basico-list/asegurado-basico-list.component';
import { AseguradoBasicoDetailComponent } from './asegurados/asegurado-basico/asegurado-basico-detail/asegurado-basico-detail.component';

const routes: Routes = [
  { path: 'cotizaciones-propuestas', loadChildren: () => import('./cotizaciones-propuestas/cotizaciones-propuestas.module').then(m => m.CotizacionesPropuestasModule) },
  { path: './', loadChildren: () => import('./aeronavegacion/aeronavegacion.module').then(m => m.AeronavegacionModule) },
  { path: 'cotizar', children: [
                    { path: '', component: CotizarComponent, data: { title: 'Cotizador' } },
                    { path: 'copy/:id', component: CotizarComponent, data: { title: 'Cotizador' } },
                    { path: ':id', component: CotizarComponent, data: { title: 'Cotizador' } }
                ]
            },
            { path: 'emitir', children: [
                    { path: ':id', component: EmitirComponent, data: { title: 'Cotizador' } }
                ] 
            },
            { 
                path: 'propuesta', children: [
                    { path: ':id', component: EmitirComponent, data: { title: 'Cotizador' } },
                    { path: 'view/:id', component: EmitirComponent, data: { title: 'Cotizador' } }
                ] 
            }, 
  { path: 'reclamos', loadChildren: () => import('./third-party-claims/siniestros-claims.module').then(m => m.SiniestrosClaimsModule) },
  ///Se modifican routings para el correcto Deploy en el ambiente de externos
  { path: 'poliza-cartera', loadChildren: () => import('./productores/poliza-en-cartera/poliza-en-cartera.module').then(m => m.PolizaEnCarteraModule) },
  { path: 'endosos', loadChildren: () => import('./productores/endosos/endosos.module').then(m => m.EndososModule) },
  { path: 'libros-rubricados', loadChildren: () => import('./productores/libros-rubricados/libros-rubricados.module').then(m => m.LibrosRubricadosModule) },
  { path: 'libros-rub-ope-cob', loadChildren: () => import('./productores/libros-rub-ope-cob/libros-rub-ope-cob.module').then(m => m.LibrosRubOpeCobModule) },
  
  { path: 'asegurados', loadChildren: () => import('./asegurados/asegurados.module').then(m => m.AseguradosModule) },
  { path: 'asegurado-basico', loadChildren: () => import('./asegurados/asegurado-basico/asegurado-basico.module').then(m => m.AseguradoBasicoModule) },
  {
    path: 'asegurados/asegurado-basico',
    children: [
      { path: 'list', component: AseguradoBasicoListComponent, data: { title: 'Asegurado Básico'}},
      { path: ':id', component: AseguradoBasicoDetailComponent, data: { title: 'Detalle Asegurado Básico'}}
    ]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      useHash: true,
      onSameUrlNavigation: 'reload'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
