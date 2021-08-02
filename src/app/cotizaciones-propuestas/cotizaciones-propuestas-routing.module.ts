import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotizacionesPropuestasListComponent } from './cotizaciones-propuestas-list/cotizaciones-propuestas-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: CotizacionesPropuestasListComponent, data: { title: 'Cotizaciones Propuestas' } }
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesPropuestasRoutingModule { }
