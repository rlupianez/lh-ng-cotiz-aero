import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizarComponent } from './cotizar/cotizar.component';
import { EmitirComponent } from './emitir/emitir.component';


const routes: Routes = [
    {
        path: '',
        children: [
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
            }
        ]   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AeronavegacionRoutingModule {}