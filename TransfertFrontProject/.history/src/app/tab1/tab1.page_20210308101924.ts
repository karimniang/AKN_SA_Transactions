import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name="eye-outline";
  montant = "150000";
  soldeVue = false;
  constructor(private router:Router) {}

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
