import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {

  cni;
  constructor() { }

  seeEmetteur;
  seeBeneficiaire;
  ngOnInit(): void {
    this.seeEmetteur= true;
  this.seeBeneficiaire= false;
  }
  clickEmetteur () {
    this.seeEmetteur= true;
  this.seeBeneficiaire= false;
  }
  clickBenef (){
    this.seeEmetteur= false;
  this.seeBeneficiaire= true;
  }

  onEvent (){

  }

}
