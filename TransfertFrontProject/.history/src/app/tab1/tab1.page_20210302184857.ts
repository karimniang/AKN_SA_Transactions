import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name="eye-outline";
  montant = "150000";
  soldeVue = false;
  constructor() {}

  clickVue() {
    this.soldeVue = !this.soldeVue;
    if (this.soldeVue) {
      this.name ="eye-outline";
      this.montant = "150000000";
    } else {
      this.name = "eye-off-outline";
      //this.montant= "SOLDE";
    }

  }

}
