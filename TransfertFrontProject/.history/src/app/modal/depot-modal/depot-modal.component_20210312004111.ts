import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { TransactionService } from 'src/app/tab2/services/transaction.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-depot-modal',
  templateUrl: './depot-modal.component.html',
  styleUrls: ['./depot-modal.component.scss']
})
export class DepotModalComponent implements OnInit {

  constructor(private modalCtrl:PopoverController, private TransactionService:TransactionService,private router:Router) { }

  succes;
  error;
  ngOnInit(): void {
  }
  @Input() type: string;
  @Input() data

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async confirm(){
    this.TransactionService.makeDepot(this.data).subscribe(
      res=>{
        console.log(res);
        this.succes = res;
        this.type = "reussi"
      },
      error=>{
        console.log(error);
        this.error = error;
        this.type ="erreur"; 
      }
    )
  }

  redirect(){
    console.log("ok");
    location.reload;
    this.router.navigate(['transaction/depot']);
  }

}
