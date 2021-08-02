import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiComponentsModule } from './ui-components/ui-components.module';
import { FormComponentsModule } from './form-components/form-components.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { PipesModule } from './pipes/pipes.module';
import { UxComponentsModule } from './ux-components/ux-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipesModule,
    UiComponentsModule,
    FormComponentsModule,
    DynamicFormModule,
    UxComponentsModule,
  ],
  exports: [
    PipesModule,
    UiComponentsModule,
    FormComponentsModule,
    DynamicFormModule,
    UxComponentsModule
  ]
})
export class SharedModule { }
