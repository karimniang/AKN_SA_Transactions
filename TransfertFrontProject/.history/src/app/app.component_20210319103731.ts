import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogServiceService } from './login/services/log-service.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router, private logService:LogServiceService, private spls:SplashScreen) {
    // if (!this.logService.loggedIn()) {
      
    //   this.router.navigate(['/login']);
    // }
    //console.log(this.logService.isTokenExpired());
    
    //console.log(window.location.href.includes('login'))

    //  if (this.logService.isTokenExpired()) {
    //    //console.log("expire");
      
    //    localStorage.clear();
    //    this.router.navigate(['/login']);
    //  }

  }
  
}
