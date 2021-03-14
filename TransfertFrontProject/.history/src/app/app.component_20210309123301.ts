import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogServiceService } from './login/services/log-service.service';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router, private logService:LogServiceService) {
    if (!this.logService.loggedIn()) {
      this.router.navigate(['/login']);
    }

    // if (!this.logService.isTokenExpired()) {
    //   //console.log("expire");
      
    //   localStorage.clear();
    //   this.router.navigate(['/login']);
    // }
    
    // SplashScreen.show({
    //   showDuration: 4000,
    //   autoHide: true
    // });
  }
  
}
