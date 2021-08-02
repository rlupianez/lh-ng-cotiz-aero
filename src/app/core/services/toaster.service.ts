import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';




@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toaster: MatSnackBar) { }

  public show(message: string, action: 'success' | 'info' | 'error') {

    let panelCss = ['bg-primary','text-white']
    
    switch(action){
      case 'success': 
        panelCss = ['bg-success','text-white'];
        break;
      case 'info': 
        panelCss = ['bg-info','text-white'];
        break;
      case 'error': 
        panelCss = ['bg-danger','text-white'];
        break;
      
      
    }

    this.toaster.open(message, '', {
      duration: 4000,
      panelClass: panelCss,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });

  }
}
