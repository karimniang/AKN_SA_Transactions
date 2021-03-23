import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogServiceService } from '../login/services/log-service.service';
import { TransactionService } from '../tab2/services/transaction.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name;
  montant = "150000";
  soldeVue = true;
  compte;

  userConnected;
  constructor(
    private router:Router,
    private logService:LogServiceService,
    private transactionService:TransactionService
    ) {
      // if (!this.logService.loggedIn()) {
      //   this.router.navigate(['/login']);
      // }
  
      // if (this.logService.isTokenExpired()) {
      //   this.disconnect();
      // }
      
      
    }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.name = "eye-outline";
    this.transactionService.getUserConnected().subscribe(
      (res)=>{
        this.userConnected = res;
        console.log(this.userConnected);
        
      }
    );
    this.getCompte();
   
  }

  getCompte (){
     console.log(
      this.transactionService.reloadCompte());
    this.compte = this.transactionService.compte;
    console.log(this.compte);
  }

  clickVue() {
    // document.getElementById("compteContainer").style.cssText = "-webkit-filter: blur(5px); filter: blur(5px); -moz-filter: blur(5px);-o-filter: blur(5px); -ms-filter: blur(5px);";
    //this.name = "eye-off-outline";
    this.soldeVue = !this.soldeVue;
    if (this.soldeVue) {
      this.name ="eye-outline";
      this.montant = "150000";
    } else {
      this.name = "eye-off-outline";
      //this.montant= "SOLDE";
    }

  }

  async disconnect() {
    await localStorage.clear();
    window.location.href="login";
    //this.router.navigate(['/login']);
  }

}
