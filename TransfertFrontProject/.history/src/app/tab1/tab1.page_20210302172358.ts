import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name="eye-outline";
  constructor() {}

  clickVue() {
    this.name = "eye-outline"?this.name="eye-off-outline":this.name="eye-off-outline";
  }

}