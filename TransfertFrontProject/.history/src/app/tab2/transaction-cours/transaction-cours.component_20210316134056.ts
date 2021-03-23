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

  ngOnInit(): void {

  }

}
