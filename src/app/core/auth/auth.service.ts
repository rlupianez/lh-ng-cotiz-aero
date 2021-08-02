import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientService } from '../services/http/http-client.service';
import { ToasterService } from '../services/toaster.service';

export interface TokenResponse {
  success: boolean;
  result: object | [];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // guarda la url para redireccion luego de logear
  redirectUrl: string;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private jwtService: JwtHelperService, private toastService: ToasterService) {

    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      return currentUser;
    }
  }

  private decodeToken(token) {
    return this.jwtService.decodeToken(token);
  }

  checkIsAuthenticated() {
    if (this.currentUserValue && !this.jwtService.isTokenExpired()) {
      return true;
    }
    return false;
  }

  login(userData: object): Observable<boolean> {
    /*
    return this.http.post('/auth/login', userData).pipe( map( res => {
    console.log('login', res);
    return res;
    }));
    */

    return this.http.post('http://localhost:5000/auth/login', userData).pipe(
      map(res => {
        console.log('res', res);
        if (res['success'] && res['result'].token) {
          const token = res['result'].token;
          let decodeToken;

          if (token !== 'Fake Token') {
            decodeToken = this.decodeToken(token);
          } else {
            decodeToken = {
              id: 1,
              role: 'admin'
            };
          }

          const currentUser = {
            id: decodeToken.id,
            username: userData['username'],
            token: token,
            role: decodeToken.role
          };

          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
          return true;
        } else {
          this.currentUserSubject.next(null);
          return false;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
