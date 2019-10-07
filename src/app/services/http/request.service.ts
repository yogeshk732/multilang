import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { Response } from '@services/http/response.model';

function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=; expires = Thu, 01 Jan 1970 00: 00: 00 GMT';
  }
}

@Injectable({
  providedIn: 'root'
})


export class RequestService {

  constructor(private http: HttpClient, private httpClient: HttpClient
  ) { }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,

      console.error(
        `Backend returned code ${error.status}, `, error);
    }


    // return an observable with a user-facing error message
    return throwError(error.error);
  }





  GET(URL, data) {
    URL = `${environment.api_path}${URL}`;
    let request, req = [];
    if (data) {
      const keys = Object.keys(data);
      if (keys && keys.length > 0) {
        req = keys.map(e => `${e}=${data[e]}`);
      }
      request = `${URL}?${req.join('&')}`;
    }
    return this.http.get<Response>(request)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }
  POST(URL, request) {
    URL = `${environment.api_path}${URL}`;
    return this.http.post<Response>(URL, request).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  PUT(URL, request) {
    URL = `${environment.api_path}${URL}`;
    return this.http.put<Response>(URL, request).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  DELETE(URL, data) {

    URL = `${environment.api_path}${URL}`;
    let request, req = [];
    if (data) {
      const keys = Object.keys(data);

      if (keys && keys.length > 0) {
        req = keys.map((e) => {
          if (_.isArray(data[e])) {
            data[e] = JSON.stringify(data[e]);
          }
          return `${e}=${data[e]}`;

        });
      }

      request = `${URL}?${req.join('&')}`;
    }
    return this.http.delete<Response>(request)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

}
