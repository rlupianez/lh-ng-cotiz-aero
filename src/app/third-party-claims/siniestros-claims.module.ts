import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiniestrosClaimsRoutingModule } from './siniestros-claims-routing.module';
import { SharedModule } from '@shared/shared.module';
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
import { ReactiveFormsModule } from '@angular/forms';
import { ThirdPartyClaimsPageComponent } from './third-party-claims-page/third-party-claims-page.component';
import { ModalDialog } from './modal/modal.component';
import { QuestionDataComponent } from './question-data/question-data.component';
import { UploadFilesClaimsComponent } from './upload-files-claims/upload-files-claims.component'
import { ModalSaveThirdPartyClaim } from './modal-save/modal-save.component';
@NgModule({
  declarations: [
    ThirdPartyClaimsPageComponent,
    QuestionDataComponent,
    ModalDialog,
    UploadFilesClaimsComponent,
    ModalSaveThirdPartyClaim
  ],
  imports: [
    CommonModule,
    SharedModule,
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
    MatBottomSheetModule,
    SiniestrosClaimsRoutingModule
  ],
  entryComponents: [
  ]
})
export class SiniestrosClaimsModule {

}
