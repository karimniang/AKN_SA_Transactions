import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.scss']
})
export class RetraitComponent implements OnInit {

  constructor() { }

  seeEmetteur;
  seeBeneficiaire;
  codeRetrait;
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
    if (event.target.value.length!=10) {
      return;
    }
    console.log(event.target.value[10]);
    
    // if (event.target.value.length>10) {
    //   event.target.value[11]="";
    //   return;
    // }
    // console.log(event.target.value.slice(0,3));
    // console.log(event.target.value.slice(3,7));
    // console.log(event.target.value.slice(7,10));
    // this.codeRetrait = await event.target.value.slice(0,3)+"-"+event.target.value.slice(3,7)+"-"+event.target.value.slice(7,10);
    // event.target.value="";
    //this.codeRetrait="";
    //this.codeRetrait = code;
    

  }
}
