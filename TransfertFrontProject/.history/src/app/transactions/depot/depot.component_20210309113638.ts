import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { range } from 'rxjs';
import { LogServiceService } from 'src/app/login/services/log-service.service';

@Component({
  selector: 'app-depot',
  templateUrl: 'depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {

  formTransaction: FormGroup;
  seeEmetteur;
  seeBeneficiaire;
  regexNumber = /^7[05678][0-9]{3}([0-9]{2}){2}/gm;
  //frais;
  total;
  tax;

  constructor(private fb: FormBuilder, private router: Router, private logService: LogServiceService,public alertController:AlertController) { }

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
      cni: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(this.regexNumber)]],
      montant: ['', Validators.required],
      nomBeneficiaire: ['', Validators.required],
      prenomBeneficiaire: ['', Validators.required],
      telephoneBeneficiaire: ['', [Validators.required, Validators.pattern(this.regexNumber)]],
      frais: [],
      total: []

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
    var frais: number;
    const montant = +event.target.value;
    if (montant > 0 && montant <= 5000) {
      frais = 425;
    }
    if (montant > 5000 && montant <= 10000) {
      frais = 850;
    }
    if (montant > 10000 && montant <= 15000) {
      frais = 1270;
    }
    if (montant > 15000 && montant <= 20000) {
      frais = 1695;
    }
    if (montant > 20000 && montant <= 50000) {
      frais = 2500;
    }
    if (montant > 50000 && montant <= 60000) {
      frais = 3000;
    }
    if (montant > 60000 && montant <= 75000) {
      frais = 4000;
    }
    if (montant > 75000 && montant <= 120000) {
      frais = 5000;
    }
    if (montant > 120000 && montant <= 150000) {
      frais = 6000;
    }
    if (montant > 150000 && montant <= 200000) {
      frais = 7000;
    }
    if (montant > 200000 && montant <= 250000) {
      frais = 8000;
    }
    if (montant > 250000 && montant <= 300000) {
      frais = 9000;
    }
    if (montant > 300000 && montant <= 400000) {
      frais = 12000;
    }
    if (montant > 400000 && montant <= 750000) {
      frais = 15000;
    }
    if (montant > 750000 && montant <= 900000) {
      frais = 22000;
    }
    if (montant > 900000 && montant <= 1000000) {
      frais = 25000;
    }
    if (montant > 1000000 && montant <= 1125000) {
      frais = 27000;
    }
    if (montant > 1125000 && montant <= 2000000) {
      frais = 30000;
    }
    if (montant > 2000000) {
      frais = ((2/100)*montant);
    }
    
    this.tax = frais;
    this.total = montant + frais;
  }


  sendDepot() {
    console.log(this.formTransaction.value);
    this.alertController.create(
      {
        cssClass: 'basic-alert',
        header: 'Confirmation',
        message: 'This is an alert message.',
        inputs: [
          {
            label: 'Nom',
            type: 'text',
            value: this.formTransaction.value.nom,
            disabled:true,
            
          },
        ],
        buttons: ['OK','Open Modal']
      }
    ).then(res => {

      res.present();

    });
  }
}
