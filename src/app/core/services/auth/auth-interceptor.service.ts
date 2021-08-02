import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, switchMap, filter, take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public audPath: string = null;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.audPath = null;

    // hacer algo generico
    if(request.url.includes('listas')){
      this.audPath = 'listas';
    }

    if(request.url.includes('listados')){
      this.audPath = 'listados';
    }

    if(request.url.includes('cot_aero')){
      this.audPath = 'cot_aero';
    }

    if(request.url.includes('holandonet')){
      this.audPath = 'holandonet';
    }

    if(request.url.includes('cot_transp')){
      this.audPath = 'cot_transp';
    }
    ///////////////////////////////////////////


    return next.handle(
      this.addToken(request, this.authService.getTokenByAud(this.audPath))).pipe(
        catchError((error, caught) => {
      // intercept the respons error and displace it to the console
      // console.log(error);
      if (error instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>error).status) {
            case 400:
                // return this.handle400Error(error);
                return throwError(error);
            case 401:
                return this.handle401Error(request, next);
            default:
                return throwError(error);
        }
      } else {
        return throwError(error);
      }
    }) as any);

    
    
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'X-Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // console.log('handle error request');
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.login().pipe(
        switchMap((logged: any) => {
          this.isRefreshing = false;
          const token = this.authService.getTokenByAud(this.audPath);
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
