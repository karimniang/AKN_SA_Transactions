import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LogServiceService {

  constructor(private httpClient:HttpClient) { }

  public localStorage = window.localStorage;
  public myToken;
  urlApi = "https://127.0.0.1:8000/api/login_check";
  //urlApi = "http://192.168.1.20:8000/api/login_check"

  httpOptns = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  login(username, password) {
    var httpOptions;
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');

        httpOptions.headers.append(

            'Access-Control-Allow-Methods',

            'GET, POST, OPTIONS, PUT, PATCH, DELETE',

        );

        httpOptions.headers.append(

            'Access-Control-Allow-Headers',

            'X-Requested-With,content-type',

        );

        httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.httpClient.post(this.urlApi, { username, password },httpOptions).toPromise();
  }

  async saveToken(username,password) {
    const result: any = await this.login(username,password);
    localStorage.clear();
    this.myToken = result.token;
    this.localStorage.setItem('token_brut', this.myToken)
  }

  public getToken(): string {
    return this.localStorage.getItem('token_brut');
  }

  public loggedIn(): boolean {
    return localStorage.getItem('token_brut') !== null;
  }

  public getTokenExpirationDate(token): Date {
    const decoded = jwt_decode(token);

    if (decoded['exp'] === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded['exp']);
    return date;
  }

  public isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

 
}
