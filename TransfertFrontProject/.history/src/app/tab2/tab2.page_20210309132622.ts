import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tabTransactions;
  tabAllTransactions;

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tabTransactions= true;
  this.tabAllTransactions= false;
  }

  clickTransactions () {
    this.tabTransactions= true;
  this.tabAllTransactions= false;
  }
  clickAllTransactions (){
    this.tabTransactions= false;
  this.tabAllTransactions= true;
  }

}
