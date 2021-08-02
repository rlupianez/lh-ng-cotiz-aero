import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientService } from './http/http-client.service';
import { ApiService } from './http/api.service';
import { ToasterService } from './toaster.service';
import { FormsFactoryService } from './forms/forms-factory.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    HttpClientService,
    ApiService,
    ToasterService,
    FormsFactoryService
  ],
  exports: [
  ]
})
export class ServicesModule { }
