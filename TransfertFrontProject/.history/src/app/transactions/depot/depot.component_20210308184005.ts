import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { range } from 'rxjs';
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
  //frais;
  total;

  constructor(private fb: FormBuilder,private router:Router, private logService:LogServiceService) { }

  ngOnInit(): void {
    
    //console.log(Array.from(Array(10000).keys()));
    
    // if (!this.logService.isTokenExpired()) {
    //   //console.log("expire");
      
    //   localStorage.clear();
    //   this.router.navigate(['/login']);
    // }
    
    this.seeEmetteur = true;
    this.seeBeneficiaire = false;

    this.formTransaction = this.fb.group({
      cni:['',Validators.required],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      telephone:['',[Validators.required,Validators.pattern(this.regexNumber)]],
      montant:['',Validators.required],
      nomBeneficiaire:['',Validators.required],
      prenomBeneficiaire:['',Validators.required],
      telephoneBeneficiaire:['',[Validators.required,Validators.pattern(this.regexNumber)]],
      frais:[],
      total:[]

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

  clickFrais(event) {
    var frais:number;
    const mont = +event.target.value;
    if (mont>0 && mont<5000) {
      frais = 425;
    }
    this.total = mont + frais;
  }
  

  sendDepot() {
    console.log(this.formTransaction.value);
    
  }
}
