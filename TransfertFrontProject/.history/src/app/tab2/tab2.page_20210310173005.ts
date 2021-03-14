import { Component } from '@angular/core';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tabTransactions;
  tabAllTransactions;

  sortKey=null;
  sortDirection=0;

  allTransaction;
  compte;

  constructor(private TransactionService:TransactionService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tabTransactions= false;
    this.tabAllTransactions= true;
    this.TransactionService.getAllTransaction().subscribe(
      res=>{
        this.compte = res;
        console.log(this.compte);
        
      }
    )
    
  }

  clickTransactions () {
    this.tabTransactions= true;
  this.tabAllTransactions= false;
  }
  clickAllTransactions (){
    this.tabTransactions= false;
  this.tabAllTransactions= true;
  }

  sortBy(key){

  }

}
