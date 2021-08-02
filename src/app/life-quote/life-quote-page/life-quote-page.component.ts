import { Component, OnInit } from '@angular/core';
import { WizardStep, ComponentName } from './services/life-quote-interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fixedCapital as FixedCapital, variableCapital as VariableCapital, UniformCapitalTypeEnum } from '@shared//uniform-capital-data/services/uniform-capital-data.interfaces'
import { CoverageService } from '../coverage/coverage.service';
import { LifeQuoteService } from '../services/life-quote.service';
import { ModalSaveLifeQuote } from '../modal-save/modal-save.component';
import { InsuredTableService } from '../insured/insured-table.service';


@Component({
  selector: 'app-life-quote-page',
  templateUrl: './life-quote-page.component.html',
  styleUrls: ['./life-quote-page.component.scss']
})
export class LifeQuotePageComponent implements OnInit {
  panelFocus: String;
  quotes: any;
  fixedCapital = FixedCapital;
  variableCapital = VariableCapital;
  uniformCapitalTypeEnum = UniformCapitalTypeEnum;
  cotizacion = {
    prima: 111,
    sumaAsegurada: 222,
    premio: 333
  }

  constructor(
    public dialog: MatDialog,
    public coverageService: CoverageService,
    public insuredTableService: InsuredTableService,
    public lifeQuoteService: LifeQuoteService,
  ) {
    this.quotes = new Object();
    this.panelFocus = WizardStep.productor;
  }

  get WizardStepEnum() {
    return WizardStep
  }


  IsPanel(step) {
    return this.panelFocus !== step;
  }

  get ComponentNameEnum() {
    return ComponentName
  }

  confirmar() {
    console.log('hola logui')
    const dialogRef = this.dialog.open(ModalSaveLifeQuote, {
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

    dialogRef.afterClosed().subscribe( response => { 
            
      if( response === 'print' ){}
 
      
      if( response === 'Emitir'){}

      if(!response){}
      



  });

    
  }


  initService() {
  }

  ngOnInit() {
    this.quotes = new Array<any>();
    this.initService();
    this.insuredTableService.cotizacion.subscribe(value =>{
      this.cotizacion =value;
    })
  }


}
