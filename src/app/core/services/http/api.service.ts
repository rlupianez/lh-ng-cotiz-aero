import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, catchError, finalize, retry, shareReplay, share } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { LoaderService } from '@core/loader/loader.service';
import { delay } from 'q';
import { CookieService } from 'ngx-cookie-service';
import { ToasterService } from '../toaster.service';
import { AuthService } from '@core/services/auth/auth.service';

let API_URL: any = environment.apiUrl;

/*
    delete (url, options): perform a DELETE request
    get(url, options): perform a GET request
    head(url, options): perform a HEAD request
    options(url, options): perform an OPTIONS request
    patch(url, body, options): perform a PATCH request
    post(url, body, options): perform a POST request
    put(url, body, options): perform a PUT request.
*/

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    cookieSession: string = this.cookieService.get('sid');
    username: string = 'rwspu';
    password: string = 'restws';
    httpOptions: object;
    retryRequestQty: number = 1;
    cacheListOptionsData: any[] = [];

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private loaderService: LoaderService,
        private cookieService: CookieService,
        private toasterService: ToasterService) {
        if (environment.production) {
            const getUrl = window.location;
            API_URL = getUrl.protocol + '//' + getUrl.host + '/rws';
        }

        console.log('base url for api', API_URL);
        /*
        if(getUrl.pathname) {
            API_URL = API_URL + '/' + getUrl.pathname.split('/')[1];
        }
        */

        this.httpOptions = this.getHttpOptions();
    }

    getBaseUrl() {
        return window.location.protocol + '//' + window.location.host;
    }

    getApiUrl() {
        return API_URL;
    }

    getCookieSessionId() {
        return this.cookieSession;
    }

    /**
     * 
     * Devuelve los headers necesarios para comunicarse con la api
     * 
     */
    getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
            }),
            withCredentials: true
        };
    }

    /*
        Genera la url de la api en base a los datos y la especificacion de filtros 
    */
    generateStringFilter(data: object, filtersInfo: object) {
        const fields = Object.keys(data);
        let filterString = '?';

        const filters = filtersInfo;

        for (let i = 0; i < fields.length; i++) {
            const fieldname = fields[i];

            if (data[fieldname] === '') {
                continue;
            }

            if (i !== 0) {
                filterString = filterString + '&';
            }

            switch (filters[fieldname].control.type) {
                case 'date-range':
                case 'monthyear-range':
                    const range = Object.keys(data[fieldname]);
                    const start = range[0];
                    const end = range[1];
                    filterString = filterString +
                        `${fieldname}_gte=${data[fieldname][start].format('01/MM/YYYY')}&${fieldname}_
                    lte=${data[fieldname][end].format('01/MM/YYYY')}`;
                    break;
                case 'select':
                    if (filters[fieldname].control.multiselect) {
                        if (data[fieldname].length > 1) {
                            filterString = filterString + this.multiselectFilterNotEq(data[fieldname], filters[fieldname].control, fieldname);
                            /*let allItems = '';
                            for(const index in data[fieldname]){
                                const item = data[fieldname][index]
                                allItems = allItems + `${fieldname}=${item}`;
                                if(parseInt(index) < data[fieldname].length - 1){
                                    allItems = allItems + `&`;
                                }
                            }
                            filterString = filterString + allItems;*/
                        } else if (data[fieldname].length === 1) {
                            filterString = filterString + `${fieldname}=${data[fieldname]}`;
                        }
                    } else {
                        filterString = filterString + `${fieldname}=${data[fieldname]}`;
                    }
                    break;
                case 'datepicker':
                    filterString = filterString + `${fieldname}=${data[fieldname].format('01/MM/YYYY')}`;
                    break;
                case 'typeahead':
                    filterString = filterString + `${fieldname}=${data[fieldname][filters[fieldname]['control']['options']['key']]}`;
                    break;
                default:
                    filterString = filterString + `${fieldname}=${data[fieldname]}`;
            }

        }

        console.log('filter string', filterString);
        return filterString;
    }

    get(path: string, query?: object | string): Observable<object> {

        if (!path) {
            console.error('Path debe ser definido');
            return;
        }

        // this.loaderService.show();
        return this.http.get(API_URL + path)
            .pipe(
                retry(this.retryRequestQty),
                catchError(err => {
                    return throwError(err);
                }),
                finalize(
                    () => {
                        // this.loaderService.hide();
                        // this.hideLoader();
                    }
                ),
                map(
                    response => {
                        return response;
                    }
                ));
    }

    getAud(path) {
        let keys = path.split('/');
        //console.log('path', keys);
        for (let i of keys) {
            if (i) {
                return i;
            }
        }
    }

    /**
     * 
     * @param path 
     * @param query
     * @param parseResponse : Indica si se va a procesar la respuesta. Si es true preprocesa el response de la api devolviendo
     * 
     */
    post(path: string, query?: object | string, parseResponse: boolean = true): Observable<object> {
        const pageSize = query['p_regxpag'] ? query['p_regxpag'] : 30;
        // obtiene la session de la cookie
        query['p_o_sesion'] = this.cookieService.get('sid');

        if (!path) {
            console.error('Path debe ser definido');
            return;
        }

        let aud = this.getAud(path);

        return new Observable(obs => {

            this.authService.getAndStoreToken(aud).subscribe(res => {
                if (res) {
                    this.http.post(API_URL + path, query, this.httpOptions).subscribe(
                        response => {
                            if (response['p_x_error']) {
                                this.toasterService.show(response['p_x_error'], 'error');
                                console.error(`reponse api method post --> p_error = ${response['p_error']}`);
                                return obs.error(response['p_x_error']);
                            }
                        

                            return parseResponse ? obs.next(this.getResultsFromResponse(response, pageSize)) : obs.next(response);
                        },
                        error => {
                            console.log('catch error', error);
                            return obs.error(error);
                        }
                    );
                }
            }, error => {
                return obs.error(error);
            })
        });
    }

    /**
     * 
     * @param path 
     * @param query
     * @param parseResponse : Indica si se va a procesar la respuesta. Si es true preprocesa el response de la api devolviendo
     */

    /*post(path: string, query?: object | string, parseResponse: boolean = true): Observable<object> {
        const pageSize = query['p_regxpag'] ? query['p_regxpag'] : 30;
        // obtiene la session de la cookie
        query['p_o_sesion'] = this.cookieService.get('sid');

        if(!path){
            console.error('Path debe ser definido');
            return;
        }

        return this.http.post(API_URL + path, query, this.httpOptions )
            .pipe(
                retry(this.retryRequestQty),
                catchError( err => {
                    return throwError(err);
                }),
                finalize (
                    () => {
                        // this.loaderService.hide();
                        // this.hideLoader();
                    }
                ),
                map(
                    response => { 
                        // console.log('post response', response);
                        if(!response['p_error']){

                            
                            return parseResponse ? this.getResultsFromResponse(response, pageSize): response;
                            
                        }else{

                            this.toasterService.show(response['p_error'], 'error');
                            console.error(`reponse api method post --> p_error = ${response['p_error']}`);
                            return null;
                        }
                        
                    }
                ));
    }
    */

    postPDF(path: string, query?: object | string): Observable<object> {
        const pageSize = query['p_regxpag'];
        // obtiene la session de la cookie
        query['p_o_sesion'] = this.cookieService.get('sid');

        if (!path) {
            console.error('Path debe ser definido');
            return;
        }

        console.log('post download pdf', query);

        return this.http.post(API_URL + path, query, this.httpOptions)
            .pipe(
                retry(this.retryRequestQty),
                catchError(err => {
                    return throwError(err);
                }),
                finalize(
                    () => {
                        // this.loaderService.hide();
                        // this.hideLoader();
                    }
                ),
                map(
                    response => {
                        // console.log('post response', response);
                        if (!response['p_error']) {

                            return response;

                        } else {
                            console.error(`reponse api method post --> p_error = ${response['p_error']}`);
                            return throwError(new Error(response['p_error']));
                        }

                    }
                ));
    }

    /**
     * 
     * Se encarga  de procesar la respuesta del servicio y devolverla con el formato 
     *  { pagination, result, p_lkn_excel }
     * 
     * @param response : Response del servicio
     * @param page 
     */
    getResultsFromResponse(response, page?) {
        const resProp = Object.keys(response).filter((prop) => {
            return prop.indexOf('p_list') === 0;
        });

        if (resProp.length === 0) {
            return [];
        }

        if (response.hasOwnProperty(resProp[0])) {
            const resultProp = resProp[0];

            if (page) {
                return {
                    pagination: {
                        pageSize: page,
                        totalItems: parseInt(response['p_cant_reg'], 10) || 0,
                        lastPage: parseInt((response['p_cant_reg'] / page).toFixed(0), 0)
                    },
                    result: response[resultProp] || [],
                    p_lnk_excel: response['p_lnk_excel'] ? `${this.getBaseUrl()}/eextranet/${response['p_lnk_excel']}` : null
                };
            } else {
                return response[resultProp] || [];
            }

        }

        return [];
    }

    getRangeOptions(type, path) {
        return this.post(path, { data: '' }).pipe(
            retry(this.retryRequestQty),
            catchError(error => {
                return of(error);
            })
        );
    }

    /**
     * Este metodo ejecuta el select component para cargar los select.
     * 
     * @param path url
     * @param body parametros de busqueda
     * @param cache Si quiere hacer la request solo una vez
     */
    getListOptions(path: string, body?, cache?: boolean) {
        if (cache) {
            var indexCacheData = this.findIndexCache(path, body);

            if (indexCacheData !== null && this.cacheListOptionsData[indexCacheData].result
                && this.cacheListOptionsData[indexCacheData].result.length) {
                return of(this.cacheListOptionsData[indexCacheData].result);
            }

            let indexCacheObservable = this.findIndexCache(path, body);
            if (indexCacheObservable !== null) {
                return this.cacheListOptionsData[indexCacheObservable].observ;
            }
        }

        var observ = this.post(path, body).pipe(
            retry(this.retryRequestQty),
            catchError(error => {
                return of(error);
            }),
            share(),
            map(response => {
                if (response.result) {
                    if (cache)
                        this.setCacheListOptionData(path, body, response.result);

                    return response.result;
                }

                return [];
            })
        );
        if (cache)
            this.setCacheListOptionsObservable(path, body, observ);

        return observ;
    }

    /**
     * Busca el index que coincida con path y body
     * Comparar contra null con tres iguales (===), porque puede ser 0
     * 
     * @param path La url
     * @param body Los parametros del body
     */
    findIndexCache(path: string, body: any) {
        // borro esto porque se setea despues de hacer el post (OJO)
        var copyBody = JSON.parse(JSON.stringify(body));
        delete copyBody.p_o_sesion;

        let indexCache = this.cacheListOptionsData.findIndex((element, index) => {
            if (element.path == path) {
                // borro esto porque se setea despues de hacer el post (OJO)
                var copyBodyElement = JSON.parse(JSON.stringify(element.body));
                delete copyBodyElement.p_o_sesion;

                if (JSON.stringify(copyBodyElement) == JSON.stringify(copyBody))
                    return true;
            }
        });

        if (indexCache != -1) {
            return indexCache;
        }
        return null;
    }

    /**
     * Setea el observador a buscar en la cache
     * 
     * @param path url
     * @param body parametros
     * @param observ el que mira la request
     */
    setCacheListOptionsObservable(path: any, body: any, observ: Observable<any>) {
        let indexCache = this.findIndexCache(path, body);

        if (indexCache !== null) {
            this.cacheListOptionsData[indexCache].observ = observ;
            return;
        }

        this.cacheListOptionsData.push({
            path: path,
            body: body,
            result: new Array(),
            observ: observ
        });
    }

    /**
     * Setea los datos resultados para guardarlos en cache
     * 
     * @param path url
     * @param body los parametros
     * @param result el resultado del observer
     */
    setCacheListOptionData(path: string, body: any, result: any) {

        let indexCache = this.findIndexCache(path, body);

        if (indexCache !== null) {
            this.cacheListOptionsData[indexCache].result = result;
        } else {
            this.cacheListOptionsData.push({
                path: path,
                body: body,
                result: result,
                observ: {}
            });
        }

    }

    getDataTable(path: string, body: object): Observable<object[]> {

        body['p_o_sesion'] = this.cookieService.get('sid');

        return this.http.post(API_URL + path, body, this.httpOptions)
            .pipe(
                catchError(err => {
                    return throwError(err);
                }),
                finalize(
                    () => {
                        // this.loaderService.hide();
                        // this.hideLoader();
                    }
                ),
                map(
                    response => {
                        // console.log('post response', response);
                        if (!response['p_error']) {
                            // se obtiene el nombre de la propiedad que contiene el array con el resultado
                            return this.getResultsFromResponse(response);

                        } else {
                            return [];
                        }

                    }
                ));
    }

    getDataAutocomplete(path: string, body: object) {

        body['p_o_sesion'] = this.cookieService.get('sid');

        return this.http.post(API_URL + path, body, this.httpOptions)
            .pipe(
                catchError(err => {
                    return throwError(err);
                }),
                finalize(
                    () => {
                        // this.loaderService.hide();
                        // this.hideLoader();
                    }
                ),
                map(
                    response => {
                        // console.log('post response', response);
                        if (!response['p_error']) {
                            // se obtiene el nombre de la propiedad que contiene el array con el resultado
                            return this.getResultsFromResponse(response);

                        } else {
                            return [];
                        }

                    }
                ));

    }

    multiselectFilterNotEq(data, control, fieldname) {
        let string = '';
        for (let i = 0; i < control.options.length; i++) {
            const item = control.options[i];
            if (data.indexOf(item.value) === -1) {
                if (string !== '') {
                    string = string + '&';
                }
                string = string + `${fieldname}_ne=${item.value}`;
            }
        }

        return string;
    }

    genericPost(path: string, body?: object, options?: object) {

        body['p_o_sesion'] = this.cookieService.get('sid');

        return this.http.post(API_URL + path, body, options)
            .pipe(
                catchError(err => {
                    return throwError(err);
                }),
                finalize(
                    () => {
                        // this.loaderService.hide();
                        // this.hideLoader();
                    }
                ),
                map(
                    response => {
                        // console.log('post response', response);
                        if (!response['p_error']) {
                            // se obtiene el nombre de la propiedad que contiene el array con el resultado
                            return this.getResultsFromResponse(response);

                        } else {
                            this.toasterService.show(response['p_error'], 'error');
                            console.error(`reponse api method post --> p_error = ${response['p_error']}`);
                            return [];
                        }

                    }
                ));

    }

}
