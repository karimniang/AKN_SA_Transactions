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

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.popController.dismiss({
      'dismissed': true
    });
  }

}
