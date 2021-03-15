import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../tab2/services/transaction.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {

  allTransaction =[];
  userConnected;
  constructor(private transactionService:TransactionService) { }

  async ngOnInit() {

    await this.transactionService.getUserConnected().subscribe(
      res=>{
        this.userConnected = res;
        console.log(this.userConnected);
        
      }
    )

    this.transactionService.getAllTransaction().subscribe(
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
        
      }
    );
  }

}
