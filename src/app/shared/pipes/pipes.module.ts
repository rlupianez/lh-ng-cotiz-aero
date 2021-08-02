import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectKeysPipe } from './object-keys.pipe';
import { SearchPipe } from './search.pipe';
import { FilterTablePipe } from './filter-table.pipe';
import { OrderByPipe } from './order-by.pipe';
import { FormViewerColumnsPipe } from './form-viewer-columns.pipe';
import { MonedaPipe } from './moneda.pipe';
import { LogPipe } from './log.pipe';

@NgModule({
  declarations: [
      ObjectKeysPipe,
      SearchPipe,
      FilterTablePipe,
      OrderByPipe,
      MonedaPipe,
      FormViewerColumnsPipe,
      FormViewerColumnsPipe,
      LogPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
      ObjectKeysPipe,
      SearchPipe,
      FilterTablePipe,
      OrderByPipe,
      MonedaPipe,
      FormViewerColumnsPipe,
      LogPipe,
  ],
  providers: [
    
  ]
})
export class PipesModule { }
