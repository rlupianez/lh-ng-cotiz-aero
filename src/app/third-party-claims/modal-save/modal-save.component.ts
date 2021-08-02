import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'life-quote-modal-save',
    templateUrl: 'modal-save.component.html'
  })
  
  export class ModalSaveThirdPartyClaim {
  
    cotizacionNr: number;
    polizaNr: number;
    endosoNr: number;
    linkPoliza: string;
  
    constructor(
      public dialogRef: MatDialogRef<ModalSaveThirdPartyClaim>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private router: Router) {
  
          this.cotizacionNr = data['cotizacionNr'];
          this.polizaNr = data['polizaNr'];
          this.endosoNr = data['endosoNr'];
          this.linkPoliza = data['link_impresiones_pol']
      }
  
    close(): void {
      this.dialogRef.close(false);
    }
  
    print(){
      this.dialogRef.close('print');
    }
  
    emit(){
      this.dialogRef.close('Emitir');
    }
  
    
  }