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
  userConnected;

  sortKey=null;
  sortDirection=0;

  allTransaction;
  compte;
  i=0;

  constructor(private TransactionService:TransactionService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tabTransactions= false;
    this.tabAllTransactions= true;
    this.TransactionService.getAllTransaction().subscribe(
      res=>{
        this.compte = res['hydra:member'];
        console.log(this.compte);
        
      }
    );
    this.TransactionService.getUserConnected().subscribe(
      res=>{
        this.userConnected = res;
        console.log(this.userConnected);
        
      }
    )
    console.log(document.getElementById("1"));
    
    
  }

  getAllRow(){
   console.log( document.getElementById("1"));
   
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
    this.sortKey =key;
    this.sortDirection++;
    this.sort();
  }

  sort (){
    if (this.sortDirection == 1) {
      
    }else if (this.sortDirection == 2) {
      
    } else {

    }
  }

}
