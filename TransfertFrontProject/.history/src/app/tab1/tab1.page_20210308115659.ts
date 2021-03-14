import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogServiceService } from '../login/services/log-service.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name="eye-outline";
  montant = "150000";
  soldeVue = false;
  constructor(
    private router:Router,
    private logService:LogServiceService,
    private splScreen:SplashScreen
    ) {
      if (!this.logService.loggedIn()) {
        this.router.navigate(['/login']);
      }
  
      if (this.logService.isTokenExpired()) {
        this.disconnect();
      }
      this.splScreen.show()
    }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

   
    
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
    this.router.navigate(['/login']);
  }

}
