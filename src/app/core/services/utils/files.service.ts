import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private router: Router, private platformLocation: PlatformLocation,) { }


  getCurrentBasePath(){
    const pathname = this.platformLocation.pathname;;

    return pathname === '/' ? '' : pathname;
  }

  getCurrentUrl(){
    return this.platformLocation['location'].origin;
  }
}
