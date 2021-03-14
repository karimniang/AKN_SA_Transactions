import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {

  constructor() { }

  seeEmetteur;
  seeBeneficiaire;
  ngOnInit(): void {
    this.seeEmetteur= true;
  this.seeBeneficiaire= false;
  }

}
