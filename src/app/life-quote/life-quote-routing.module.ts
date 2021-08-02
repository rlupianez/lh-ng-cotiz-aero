import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LifeQuotePageComponent as LifeQuotePageComponent } from './life-quote-page/life-quote-page.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LifeQuotePageComponent , data: { title: 'Vida Colectivo - Cotizador' } },
      { path: 'Emit', component: LifeQuotePageComponent , data: { title: 'Vida Colectivo - Cotizador - Emitir' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeQuoteRoutingModule { }
