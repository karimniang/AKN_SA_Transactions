import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogServiceService } from 'src/app/login/services/log-service.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient:HttpClient,private logService:LogServiceService) { }
  urlApi = "https://127.0.0.1:8000/api/transactions/";
  compte = 444;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.logService.getToken()
    })
  };

  public makeDepot(data){
    return this.httpClient.post(this.urlApi+"depot",data,this.httpOptions);
  }
  public makeRetrait(data){
    return this.httpClient.post(this.urlApi+"retrait",data,this.httpOptions);
  }
  public getAllTransaction() {
    return this.httpClient.get(this.urlApi,this.httpOptions);
  }

  public changeStatut(statut,id) {
    return this.httpClient.put(this.urlApi+id,{'statut':statut},this.httpOptions);
  }

  public getTransactionByCode(code){
    return this.httpClient.get(this.urlApi+"bycode/"+code,this.httpOptions);
  }

  public getUserConnected(){
    return this.httpClient.get("https://127.0.0.1:8000/api/users/connected",this.httpOptions);
  }

  public reloadCompte() {
    this.getUserConnected().subscribe(
      (res)=>{
        this.compte = res['agence']['compte'];
        console.log(this.compte);
        
      }
    );
  }
}
