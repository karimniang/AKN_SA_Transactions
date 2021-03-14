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

  name="eye-outline";
  montant = "150000";
  soldeVue = false;

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
    this.transactionService.getUserConnected().subscribe(
      (res)=>{
        this.userConnected = res;
      }
    )
   
    
  }

  clickVue() {
    this.soldeVue = !this.soldeVue;
    if (this.soldeVue) {
      this.name ="eye-outline";
      this.montant = "150000";
    } else {
      this.name = "eye-off-outline";
      //this.montant= "SOLDE";
    }

  }

  disconnect() {
    localStorage.clear();
    //window.location.href="login";
    this.router.navigate(['/login']);
  }

}
