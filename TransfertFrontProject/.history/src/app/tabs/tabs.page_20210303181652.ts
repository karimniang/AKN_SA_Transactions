import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {
    console.log("cons");
    if (window.location.href.includes('depot')) {
      this.vuTabs = false;
    }
  }
  vuTabs = true;

  ngOnInit(): void {
    console.log("ngo");
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

}
