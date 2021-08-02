import { Injectable } from '@angular/core';
import { AppState } from 'src/app/store/app.reducer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SetAuthAction, SetAuthFailureAction, SetAuthSuccessAction } from 'src/app/store/auth/auth.actions';
import { CookieService } from 'ngx-cookie-service';
import { zip, Observable, pipe, combineLatest, forkJoin, Subscription, throwError, of} from 'rxjs';
import { merge } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToasterService } from '../toaster.service';
import { FilesService } from '../utils/files.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  contentHeaders: HttpHeaders;
  authData: any;
  authStoreSubscription: Subscription = new Subscription();

  constructor(
    public http: HttpClient, 
    private cookie: CookieService,
    public store: Store<AppState>,
    public fileService: FilesService,
    private toastService: ToasterService) {
      this.contentHeaders = new HttpHeaders();
      // contentHeaders.append('Authorization', 'Your token used in app'); 
      this.contentHeaders.append('Content-Type', 'application/json'); 
      this.contentHeaders.append('Access-Control-Allow-Origin', '*');
      this.contentHeaders.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');


      this.authStoreSubscription = this.store.select('auth').subscribe( authData => {
        this.authData = authData;
      });

  }

  getToken(aud: string){
    // comparar session id con el guardado en el store
    const pathname = this.fileService.getCurrentBasePath();
    const session_id = this.cookie.get('sid');

    return this.http.post(`${API_URL}/${aud}/login`, 
      { p_o_sesion: session_id }, 
      { headers: this.contentHeaders }).pipe(
      map(res => {
        // console.log('auth res', res);
        // si tiene error
        if(res['payload'].p_error){

          return { error: res['payload'].p_error };

        }else{

          return {

            token: res['token'],
            exp: res['exp'],
            aud: res['aud']
            
          }
            
        }
      })
    );
        

  }

  isAuthenthicated(){

  }

  tokensHasExpired(){
    const tokens = this.authData.tokens;

    if(!tokens){
      return true;
    }

    let hasExpired = false;

    for(let aud in tokens){
      if(tokens[aud]){
        if (Date.now() >= tokens[aud] * 1000) {
          return true
        }

      }

    }

    return hasExpired;
  }

  tokenExpired(aud){

    let token = this.getTokenByAud(aud);
    if(!token){
      return true;
    }

    if (Date.now() >= token[aud] * 1000) {
      return true
    }

  }

  login(): Observable<boolean> {
    
    // comparar session id con el guardado en el store
    const pathname = this.fileService.getCurrentBasePath();
    const session_id = this.cookie.get('sid');
    this.store.dispatch( new SetAuthAction );

    return new Observable( obs => { 
      
      if(this.tokensHasExpired()){

        this.getTokens().subscribe( (res:any) => {
            //console.error('res',res);
            if(res['error']){
              // set error to store
              console.log('error login: ', res['error']);
              this.toastService.show(`ERROR: ${res['error']}`, 'info');
              // redirect to page unauthorized error 401
              this.cookie.delete('sid');
              this.store.dispatch( new SetAuthFailureAction(res));

              return throwError(res);
            }else{
              // save tokens
              const tokenData : any = {
                tokens: res,
                p_o_sesion: session_id
              };
              
              this.store.dispatch( new SetAuthSuccessAction(tokenData));
              obs.next(true);
            }
        });

      }else{
        obs.next(true);
      }

    });
    
    
  }


  getTokens(){
    const auds = [ 'listados', 'listas','cot_aero', 'holandonet', 'cot_transp' ];

    let tokens = []

    return new Observable( obs => {

      for(let aud of auds){
        // console.log('for auds', aud);
        tokens.push(this.getToken(aud));
      }

      forkJoin(tokens).subscribe( (res: []) => {
        const resHasErros = this.responseHasErrors(res);

        // si tiene errores
        if(resHasErros){
          obs.next(resHasErros);
        }else{ 
          // devuelve el objeto de tokens
          let oTokens = {}
          for(let token of res){

            if(token['aud']){
              const aud = token['aud'] as string;
              oTokens[aud] = {
                token: token['token'],
                exp: token['exp']
              }
            }

          }

          obs.next(oTokens);

        }

      });

    })

  }

  getTokenAuth(aud) {

    // comparar session id con el guardado en el store
    const pathname = this.fileService.getCurrentBasePath();
    const session_id = this.cookie.get('sid');

    let token =  this.getTokenByAud(aud);
    
    return  new Observable( obs => { 

      

    });
  }

  getAud(path){
    let keys = path.split('/');
    //console.log('path', keys);
    for(let i of keys){
        if(i){
            return i;
        }
    }
  }

  getAndStoreToken(aud): Observable<any>{

     // comparar session id con el guardado en el store
     const pathname = this.fileService.getCurrentBasePath();
     const session_id = this.cookie.get('sid');

     let token =  this.getTokenByAud(aud);
     if(!token || this.tokenExpired(aud)){
          return this.http.post(`${API_URL}/${aud}/login`, 
          { p_o_sesion: session_id }, 
          { headers: this.contentHeaders }).pipe(
          map(res => {
            // console.log('auth res', res);
            // si tiene error
            if(res['payload'].p_error){

              this.store.dispatch( new SetAuthFailureAction(res));
              return { error: res['payload'].p_error };

            }else{

              let currentToken = {};

              currentToken[res['aud']] = {
                token: res['token'],
                exp: res['exp']
              }
              
              
              const tokenData  : any  = {
                tokens: currentToken,
                p_o_sesion: session_id
              };
              
              this.store.dispatch( new SetAuthSuccessAction(tokenData));
              //this.store.dispatch( new SetAuthSuccessAction(tokenData));

              return {

                token: res['token'],
                exp: res['exp'],
                aud: res['aud']
                
              }
                
            }
          })
        )
     }else{

      return of(token);
     }
 
     
  }


  responseHasErrors(responses: []){
    let hasErrors = false;
    
    for(let res of responses){
      
      if(res['error']){
        return res;
      }

    }
    return hasErrors;
  }

  getTokenByAud(aud: string){
    return this.authData['tokens'] && this.authData['tokens'][aud] ?  this.authData['tokens'][aud]['token'] : null;
  }


  ngOnDestroy(){
    this.authStoreSubscription.unsubscribe();
  }

}
