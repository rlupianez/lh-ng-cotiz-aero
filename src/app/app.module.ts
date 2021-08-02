import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

// cookie
import { CookieService } from 'ngx-cookie-service';

import { CoreModule } from './core/core.module';
import { LhCustomModule } from './shared/lh-custom/lh-custom.module';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from '@angular/material/progress-bar';


// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducers } from './store/app.reducer';
import { AuthInterceptorService } from './core/services/auth/auth-interceptor.service';
import { AuthService } from './core/services/auth/auth.service';


// locale
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
registerLocaleData(localeEs, 'es-AR');

// La función exportada para cargar configuracion antes que arranque la aplicacion
// tokens
/* export function initApp(authService: AuthService) {
  return (): Promise<any> => { 
    console.info('Init app');
    return new Promise((resolve, reject) => {
      authService.login().subscribe( logged => {
        //console.info('Init app finished');
        //setTimeout(() => {
          console.info('Init app finished');
          resolve();
        //}, 2000);
      })
    });
  }
} */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LhCustomModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MatIconModule,
    HttpClientModule, // .forRoot();
    MatProgressBarModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    CookieService,
    MatBottomSheet,
    /*{
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [AuthService]
    },*/
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
