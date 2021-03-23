import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  allTransaction =[];
  compte;
  i=0;

  constructor(private TransactionService:TransactionService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.route.snapshot.paramMap.get('only'));
    
    this.tabTransactions= false;
    this.tabAllTransactions= true;

    this.TransactionService.getUserConnected().subscribe(
      res=>{
        this.userConnected = res;
        console.log(this.userConnected);
        
      }
    )

    this.TransactionService.getAllTransaction().subscribe(
      res=>{
        //this.compte = res['hydra:member'];
        //console.log(res['hydra:member']);
        
        res['hydra:member'].forEach(element => {
          if (element.compteTransaction.id == this.userConnected.agence.id) {
            this.allTransaction.push(element); 
          }else if (element.compteRetrait && (element.compteRetrait.id == this.userConnected.agence.id)) {
            this.allTransaction.push(element);
          }
        });
        console.log(this.allTransaction);
        this.sort();
        
      }
    );
    
    
    
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
    this.sortKey = key;
    this.sortDirection++;
    this.sort();
  }

  sort (){
    if (this.sortDirection == 1) {
      this.allTransaction = this.allTransaction.sort((a,b)=>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.toString().localeCompare(valB);
      })
    }else if (this.sortDirection == 2) {
      this.allTransaction = this.allTransaction.sort((a,b)=>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.toString().localeCompare(valA);
      })
    } else {
      this.sortDirection = 0;
      this.sortKey = null;
    }
  }

}
