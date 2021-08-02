import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

    apiRootUrl: string;

    constructor(private http: HttpClient) {
        this.apiRootUrl = 'http://localhost:5000';
    }

    public post(path: string, body: object): Observable<any> {
        const apiUrl = `${this.apiRootUrl}${path}`;

        return this.http.post(apiUrl, body);

    }
}
