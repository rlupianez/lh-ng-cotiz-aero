import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const url: string = state.url;
      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    if (this.authService.checkIsAuthenticated()) {
      return true;
    }
    // guardar la url
    this.authService.redirectUrl = url;
    // enviar a login
    this.router.navigate(['/login']);

    return false;
  }

}
