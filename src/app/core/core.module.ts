import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthModule } from './auth/auth.module';
import { LoaderModule } from './loader/loader.module';
import { IconBadgetDirective } from './directives/icon-badget.directive';

@NgModule({
  declarations: [
    IconBadgetDirective
  ],
  providers: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    AuthModule,
    LoaderModule
  ],
  exports: [
    LoaderModule,
    IconBadgetDirective
  ]
})

export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }

}
