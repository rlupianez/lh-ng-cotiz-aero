import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    /*
    const currentRole = this.authService.currentUserValue['role'];

    if (next['data'].role === currentRole) {
      return true;
    }

    this.router.navigate(['/404']);

    return false;
    */

    return true;
  }
}
