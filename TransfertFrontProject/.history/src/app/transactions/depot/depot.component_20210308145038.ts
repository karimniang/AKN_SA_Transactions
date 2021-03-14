import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {

  formTransaction: FormGroup;
  seeEmetteur;
  seeBeneficiaire;
  regexNumber= /^[0-9][9]/;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.seeEmetteur = true;
    this.seeBeneficiaire = false;

    this.formTransaction = this.fb.group({
      cni:[],
      nom:[],
      prenom:[],
      telephone:[],
      montant:[],
      nomBeneficiaire:[],
      prenomBeneficiaire:[],
      telephoneBeneficiaire:[],

    })
  }
  clickEmetteur() {
    this.seeEmetteur = true;
    this.seeBeneficiaire = false;
  }
  clickBenef() {
    this.seeEmetteur = false;
    this.seeBeneficiaire = true;
  }

  // clickEvent (event){
  //   alert('ok,');
  //   console.log(this.cni);

  // }

  sendDepot() {
    console.log(this.formTransaction.value);
    
  }
}
