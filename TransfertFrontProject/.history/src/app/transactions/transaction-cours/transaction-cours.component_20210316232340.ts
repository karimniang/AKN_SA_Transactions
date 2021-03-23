import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TransactionService } from '../../tab2/services/transaction.service';

@Component({
  selector: 'app-transaction-cours',
  templateUrl: './transaction-cours.component.html',
  styleUrls: ['./transaction-cours.component.scss']
})
export class TransactionCoursComponent implements OnInit {

  userConnected;
  allTransaction =[];

  constructor(private transactionService:TransactionService,private alertCtrl:AlertController) { }

  async ngOnInit() {
   await this.transactionService.getUserConnected().subscribe(
      res=>{
        this.userConnected = res;
        console.log(this.userConnected);
      }
    )
    this.loadAll();
  }

  loadAll() {
    this.transactionService.getAllTransaction().subscribe(
      res=>{
        //this.compte = res['hydra:member'];
        console.log(res['hydra:member']);
        
        res['hydra:member'].forEach(element => {
          if ((element.statut == "loading" || element.statut == "cancel") && (element.userDepot?.id == this.userConnected.id || element.depotAdminAgence?.id == this.userConnected.id)) {
            this.allTransaction.push(element); 
          }
        });
        console.log(this.allTransaction);
        
      }
    );
  }

  async setStatut(transaction){
    let alert = await this.alertCtrl.create({
      'header':'Confirmation',
      'message':'Voulez vous annuler ce depot ??',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confir',
          handler: () => {
            //console.log('Buy clicked');
            if (transaction.statut=="loading") {
              console.log(transaction.statut);
            } else if (transaction.statut=="cancel") {
              console.log(transaction.statut);
            }
          }
        }
      ]
    });
    alert.present();
  }

}
