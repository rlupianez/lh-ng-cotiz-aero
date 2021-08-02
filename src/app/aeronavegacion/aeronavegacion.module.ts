import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LhCustomModule } from '@shared/lh-custom/lh-custom.module';
import { AeronavegacionRoutingModule } from './aeronavegacion-routing.module';
import { CotizarComponent, EstadoCotizadorDialog, GuardarCotizacionDialog, CotizarBottomActions } from './cotizar/cotizar.component';
import { EmitirComponent, GuardarPropuestaDialog, EmitirBottomActions } from './emitir/emitir.component';
import {CoberturaSeleccionadaComponent} from './row/cobertura-seleccionada/cobertura-seleccionada.component'

import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PlazaValidatorDirective } from '@core/directives/validators/plaza.validator.directive';
import { TelefonoValidatorDirective } from '@core/directives/validators/telefono.validator.directive';
import { CbuValidatorDirective } from '@core/directives/validators/cbu.validator.directive';

import { NgxMaskModule, IConfig } from 'ngx-mask'


import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CotizarComponent,
    EmitirComponent,
    GuardarPropuestaDialog,
    GuardarCotizacionDialog,
    EstadoCotizadorDialog,
    CotizarBottomActions,
    EmitirBottomActions,
    CoberturaSeleccionadaComponent,
    PlazaValidatorDirective,
    TelefonoValidatorDirective,
    CbuValidatorDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatBottomSheetModule,
    SharedModule,
    AeronavegacionRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule,
    LhCustomModule,
    NgxMaskModule.forRoot()
  ]
})
export class AeronavegacionModule { }
