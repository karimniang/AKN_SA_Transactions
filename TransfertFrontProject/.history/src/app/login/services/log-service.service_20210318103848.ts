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
  urlApi = "http://127.0.0.1:8000/api/login_check";
  //urlApi = "http://192.168.1.20:8000/api/login_check"

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'access-control-allow-origin' :'*'  })
  };

  login(username, password) {
    return this.httpClient.post(this.urlApi, { username, password }).toPromise();
  }

  async saveToken(username,password) {
    const result: any = await this.login(username,password);
    console.log(result);
    
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
