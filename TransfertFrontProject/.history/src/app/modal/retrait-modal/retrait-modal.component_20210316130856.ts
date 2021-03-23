import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TransactionService } from 'src/app/tab2/services/transaction.service';

@Component({
  selector: 'app-retrait-modal',
  templateUrl: './retrait-modal.component.html',
  styleUrls: ['./retrait-modal.component.scss']
})
export class RetraitModalComponent implements OnInit {

  constructor(private transactionService:TransactionService, private popController:PopoverController) { }

  succes;
  error;
  ngOnInit(): void {
  }
  @Input() type: string;
  @Input() data
  @Input() transaction

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popController.dismiss({
      'dismissed': true
    });
  }

  async confirm(){
    this.transactionService.makeRetrait(this.data).subscribe(
      res=>{
        //console.log(res);
        this.succes = res;
        this.type = "reussi"
      },
      error=>{
        //console.log(error);
        this.error = error;
        this.type ="erreur"; 
      }
    )
  }

  async redirect(){
    //console.log("ok");
    await this.dismiss();
    window.location.href="/transaction/retrait";
  }

}
