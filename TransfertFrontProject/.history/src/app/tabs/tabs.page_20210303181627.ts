import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {
    console.log("cons");
    
  }
  vuTabs = true;

  ngOnInit(): void {
    console.log("ngo");
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (window.location.href.includes('depot')) {
      this.vuTabs = false;
    }
  }

}
