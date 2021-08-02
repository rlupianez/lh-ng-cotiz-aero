import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
// import { RoleGuard } from './role-guard.service';

export function getToken() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:5000']
        // blacklistedRoutes: ['localhost:5000/auth/login']
      }    })
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule { }
