import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction-cours',
  templateUrl: './transaction-cours.component.html',
  styleUrls: ['./transaction-cours.component.scss']
})
export class TransactionCoursComponent implements OnInit {

  userConnected;
  allTransaction =[];

  constructor(private transactionService:TransactionService) { }

  async ngOnInit() {
   await this.transactionService.getUserConnected().subscribe(
      res=>{
        this.userConnected = res;
        //console.log(this.userConnected);
      }
    )

    this.transactionService.getAllTransaction().subscribe(
      res=>{
        //this.compte = res['hydra:member'];
        console.log(res['hydra:member']);
        
        res['hydra:member'].forEach(element => {
          if (element.userDepot?.id == this.userConnected.agence.id || element.depotAdminAgence?.id == this.userConnected.agence.id) {
            this.allTransaction.push(element); 
          }
        });
        console.log(this.allTransaction);
        
      }
    );
  }

}
