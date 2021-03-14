import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogServiceService } from 'src/app/login/services/log-service.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient:HttpClient,private logService:LogServiceService) { }
  urlApi = "https://127.0.0.1:8000/api/transaction/";

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.logService.getToken()
    })
  };

  public makeDepot(data){
    return this.httpClient.post(this.urlApi+"depot",data,this.httpOptions);
  }
}
