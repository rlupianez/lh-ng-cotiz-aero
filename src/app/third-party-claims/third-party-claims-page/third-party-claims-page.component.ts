import { Component, OnInit } from '@angular/core';
import { SinisterFieldEnum } from '../components/sinister-data/sinister-data.interfaces';
import { WizardStep, ComponentName } from './services/third-party-claims-interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDialog } from '../modal/modal.component';
import { ThirdPartyClaimsService } from '../services/third-party-claims.service';
import { ValidatorService } from '../services/validator.service';
import { InjuredFieldEnum } from '../components/injured-claims/injured.interfaces';
import { DamageEnum } from '../components/damage/damage.interfaces';
import { map } from 'rxjs/operators';
import { ApiService } from '@core/services/http/api.service';
import { InjuredLinkFieldEnum } from '../components/injured-link/injured-link-data.interfaces';
import { PersonalFieldEnum } from '../components/personal-data/personal-data.interfaces';
import { AddressFieldEnum } from '../components/address/address.interfaces';
import { VehicleFieldEnum } from '../components/vehicle-claims/vehicle-claim.interfaces';
import { VehicleSinesterFieldEnum } from '../components/vehicle-sinester/vehicle-sinester.interfaces';
import { VehicleInspectionFieldEnum } from '../components/vehicle-inspection/vehicle-inspection.interfaces';
import { LesionSinisterFieldEnum } from '../components/sinister/sinister-claims.interfaces';
import { ModalSaveThirdPartyClaim } from '../modal-save/modal-save.component';
import { ThirdPartyClaimsRequestBuilder } from './model/request-builder';


@Component({
  selector: 'app-siniestros-claims-page',
  templateUrl: './third-party-claims-page.component.html',
  styleUrls: ['./third-party-claims-page.component.scss']
})
export class ThirdPartyClaimsPageComponent implements OnInit {
  showBtnInsuredPanel = false;
  panelFocus: string;

  panelStep: any[];
  claims: any;
  positionPanelDamage = -1
  btnPrimeryLabel = 'Siguiente';
  next = "Siguiente";
  finished = "Finalizar";

  filesVehicle = [
    { type: 'Certificado de Cobertura', files: [] },
    { type: 'Denuncia Administrativa', files: [] },
    { type: 'Registro del conductor', files: [] },
    { type: 'Cédula verde y/o título del automotor', files: [] },
    { type: 'Fotos del vehículo', files: [] }
  ];
  filesDamagePeogle = [
    { type: 'Documento Digital', files: [] },
    { type: 'DNI del lesionado', files: [] },
    { type: 'Certificado médico del lugar de asistencia', files: [] },
    { type: 'Constancia de denuncia policial, de haber intervino', files: [] }
  ];
  filesDamageToLocation = [{ type: 'Documento Digital', files: [] }];
  filesDamageToOtherBienes = [{ type: 'Documento Digital', files: [] }];


  constructor(public dialog: MatDialog,
    public apiService: ApiService,
    public thirdPartyClaimsService: ThirdPartyClaimsService,
    public validatorService: ValidatorService) {
    this.panelFocus = WizardStep.insured;
  }

  IsPanel(step) {
    return this.panelFocus !== step;
  }

  get WizardStepEnum() {
    return WizardStep
  }

  get ComponentNameEnum() {
    return ComponentName
  }

  get PanelStepAvailable() {
    if (this.panelStep) {
      var count = this.panelStep.length;
      return count > 0
    }
    return false;
  }

  showPanel(panelSelected) {
    const damage = this.thirdPartyClaimsService.damageService.formGroup.get(DamageEnum.links).value;
    return this.panelFocus === panelSelected && damage.includes(panelSelected);
  }

  goToInjuredStep() {
    const sinisterModel = this.thirdPartyClaimsService.sinisterService.formGroup;
    const plate = sinisterModel.get(SinisterFieldEnum.plateType)?.value;
    const policy = sinisterModel.get(SinisterFieldEnum.policy)?.value;

    this.validatorService.isValidPlateAndPolicy(plate, policy).subscribe((isValid) => {
      isValid = true; //TEMPORAL PARA NO VALIDAR Y PROBAR RAPIDO
      if (isValid) {
        this.panelFocus = WizardStep.injured;
        window.scroll(0, 0);
      } else {
        const params = {
          panelClass: 'card-border-primary',
          data: {
            "title": "Validación de datos del asegurado",
            "text": "El asegurado no pertenece a Holando Seguros",
            "patente": plate,
            "hasError": true
          },
        };
        this.dialog.open(ModalDialog, params);
      }
    })
  }

  goToInsuredStep() {
    this.positionPanelDamage--;
    this.panelFocus = WizardStep.insured;
    window.scroll(0, 0);
  }

  goToNextClaims() {
    this.positionPanelDamage++;
    if (!this.panelStep) return;
    const countStep = this.panelStep.length - 1;
    this.btnPrimeryLabel = (this.positionPanelDamage !== countStep) ? this.next : this.finished;
    if (this.positionPanelDamage > countStep) {
      this.validatorService.saveSinister(this.buildRequest()).subscribe((response) => {
        if (response) {
          this.goToSurveyStep();
        }
      });
    } else {
      this.panelFocus = this.panelStep[this.positionPanelDamage];
    }
    window.scroll(0, 0);
  }

  save() {

    var numeroDeReclamo = 1234;
    var data = this.claims;
    const dialogRef = this.dialog.open(ModalDialog, {
      panelClass: 'card-border-primary',
      data: {
        "title": "Reclamo de terceros",
        "text": "Se generado el reclamo exitosamente con el numero " + numeroDeReclamo,
        "hasError": true
      }
    });
  }

  goToBeforeClaims() {
    this.positionPanelDamage--;
    this.btnPrimeryLabel = "Siguiente";
    this.panelFocus = (this.positionPanelDamage < 0) ? WizardStep.injured : this.panelStep[this.positionPanelDamage];
    window.scroll(0, 0);
  }

  goToSurveyStep() {
    this.panelFocus = WizardStep.survey;
    window.scroll(0, 0);
  }

  handleFormChange(params) {
    if (params) {
      this.claims[params.key] = params.value;
    }
    this.panelStep = this.claims.damage?.sort();
  }

  damageChangeSubcription() {
    this.thirdPartyClaimsService.damageService.formGroup.controls[DamageEnum.links].valueChanges
      .subscribe(value => {
        this.panelStep = value?.sort();
      });
  }
  ngOnInit() {
    this.claims = new Object();
    this.damageChangeSubcription();
  }


  buildRequest(){
    debugger
    const request = new ThirdPartyClaimsRequestBuilder(this.thirdPartyClaimsService).builder();
    console.log('request', JSON.stringify(request));
  }



  confirmar() {
    const dialogRef = this.dialog.open(ModalSaveThirdPartyClaim, {
      width: '50%',
      height: '38%',
      data: {
        cotizacionNr: 232,
        polizaNr: 3232,
        endosoNr: 3232,
        polizaLink: 32323
      },
      panelClass: 'cotizacion-dialog'
    });

    dialogRef.afterClosed().subscribe(response => {

      if (response === 'print') { }
      if (response === 'Emitir') { }
      if (!response) { }
    });
  }


}
