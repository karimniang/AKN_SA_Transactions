import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogServiceService } from 'src/app/login/services/log-service.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {

  formTransaction: FormGroup;
  seeEmetteur;
  seeBeneficiaire;
  regexNumber= /^7[05678][0-9]{3}([0-9]{2}){2}/gm;

  constructor(private fb: FormBuilder,private router:Router, private logService:LogServiceService) { }

  ngOnInit(): void {
    // if (this.logService.isTokenExpired()) {
    //   console.log("expire");
      
    //   localStorage.clear();
    //   this.router.navigate(['/login']);
    // }
    this.seeEmetteur = true;
    this.seeBeneficiaire = false;

    this.formTransaction = this.fb.group({
      cni:[],
      nom:[],
      prenom:[],
      telephone:['',[Validators.required,Validators.pattern(this.regexNumber)]],
      montant:[],
      nomBeneficiaire:[],
      prenomBeneficiaire:[],
      telephoneBeneficiaire:['',[Validators.required,Validators.pattern(this.regexNumber)]],

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
