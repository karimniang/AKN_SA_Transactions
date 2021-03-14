import { Component } from '@angular/core';
import { TransactionService } from '../tab2/services/transaction.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  userConnected;
  constructor(private transactionService:TransactionService) {
    
  }
  vuTabs = true;

  ngOnInit(): void {
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // if (window.location.href.includes('home/depot')) {
    //   this.vuTabs = false;
    // }
    this.transactionService.getUserConnected().subscribe(
      (res)=>{
        this.userConnected = res;
        console.log(this.userConnected);
      }
    )
  }

}
