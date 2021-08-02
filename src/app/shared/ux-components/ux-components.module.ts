import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlSkeletonLoaderComponent } from './form-control-skeleton-loader/form-control-skeleton-loader.component';



@NgModule({
  declarations: [FormControlSkeletonLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FormControlSkeletonLoaderComponent
  ]
})
export class UxComponentsModule { }
