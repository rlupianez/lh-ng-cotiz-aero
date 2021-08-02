import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { ReportComponent } from './report/report.component';



@NgModule({
  declarations: [ViewComponent, ReportComponent],
  imports: [
    CommonModule
  ]
})
export class EntityComponentsModule { }
