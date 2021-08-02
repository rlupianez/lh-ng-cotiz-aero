import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogContainer, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'modal-dialog',
  templateUrl: 'modal-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ModalDialog {

  title: string;
  text: string;
  hasError: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) {
    this.title = data['title'];
    this.text = data['text'];
    this.hasError = data['hasError'];
  }

  close(): void {
    this.dialogRef.close(false);
  }


}