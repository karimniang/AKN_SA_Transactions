import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogServiceService } from './login/services/log-service.service';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SplashScreenOriginal } from '@ionic-native/splash-screen';
//const { SplashScreen } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router, private logService:LogServiceService, private platform:Platform, private spls:SplashScreenOriginal ) {
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
    
    //SplashScreen.show();
  }
  
}
