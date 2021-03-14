import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/tab2/services/transaction.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.scss']
})
export class RetraitComponent implements OnInit {

  constructor(private transactionService:TransactionService) { }

  seeEmetteur;
  seeBeneficiaire;
  codeRetrait;
  transaction;

  ngOnInit(): void {
    this.seeEmetteur= false;
    this.seeBeneficiaire= true;
  }
  clickEmetteur () {
    this.seeEmetteur= true;
  this.seeBeneficiaire= false;
  }
  clickBenef (){
    this.seeEmetteur= false;
  this.seeBeneficiaire= true;
  }

  async clickCode(event){
    //console.log(event.detail.data == null);
    if (event.detail.data == null && this.codeRetrait.includes("-")) {
      //event.target.value="";
      this.codeRetrait="";
    }
    if (event.target.value.length==10 && !this.codeRetrait.includes("-")) {
      console.log(event.target.value[9]);
      this.codeRetrait = await event.target.value.slice(0,3)+"-"+event.target.value.slice(3,7)+"-"+event.target.value.slice(7,10);
      
    }else{
      return;
    }

  }

  getTransactionCode(code) {
    return 
  }
}
