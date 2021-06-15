import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {appConfig} from '../app.config';
import { Observable } from 'rxjs/Observable';
import * as CryptoJS from 'crypto-js';
import { User } from '../_models/data.model';

@Injectable()
export class HttpRestClient {
  private apiEndpoint: String;
  authenticated = false;
  credentials:User=new User();

  constructor(private http: HttpClient) { 
    this.apiEndpoint = appConfig.API_END_POINT;
  }
  url="users";

  createBasicAuthorizationHeader(credentials) {
    return new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    }: {'Content-Type': 'application/json'});
  }

  getApiUrl(route: String): string {
    return this.apiEndpoint + "" + route;
  }

  getCredentials(){
    this.credentials.username=CryptoJS.AES.decrypt(sessionStorage.getItem("username"), appConfig.privateKey).toString(CryptoJS.enc.Utf8);
    this.credentials.password=CryptoJS.AES.decrypt(sessionStorage.getItem("password"), appConfig.privateKey).toString(CryptoJS.enc.Utf8);
  return this.credentials;
  }

  getLoginData(url: string, credentials): Observable<any> {
   const authHeaders = this.createBasicAuthorizationHeader(credentials);
    return this.http.get(this.getApiUrl(url), {headers: authHeaders})
  }

  getData(url: string): Observable<any> {
    this.getCredentials();
    const authHeaders = this.createBasicAuthorizationHeader(this.credentials);
     return this.http.get(this.getApiUrl(url), {headers: authHeaders})
   }

  postData(url: string,data): Observable<any> {
    this.getCredentials();
    const authHeaders = this.createBasicAuthorizationHeader(this.credentials);
     return this.http.post(this.getApiUrl(url),data,{headers: authHeaders})
   }

   putData(url: string,data): Observable<any> {
    this.getCredentials();
    const authHeaders = this.createBasicAuthorizationHeader(this.credentials);
     return this.http.put(this.getApiUrl(url),data,{headers: authHeaders})
   }

   deleteData(url: string,data): Observable<any> {
    this.getCredentials();
    const authHeaders = this.createBasicAuthorizationHeader(this.credentials);
     return this.http.post(this.getApiUrl(url),data,{headers: authHeaders})
   }

}
