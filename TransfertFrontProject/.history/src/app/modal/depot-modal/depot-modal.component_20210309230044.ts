import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-depot-modal',
  templateUrl: './depot-modal.component.html',
  styleUrls: ['./depot-modal.component.scss']
})
export class DepotModalComponent implements OnInit {

  constructor(private modalCtrl:PopoverController) { }

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
    //this.type='erreur';
    //alert('ok')
    // Swal.fire(
    //   'non ok',
    //   'success'
    // )
    
    // const modal = await this.modalCtrl.create({
    //   component: DepotModalComponent,
    //   componentProps: {
    //     'firstName': 'Douglas',
    //     'lastName': 'Adams',
    //     'middleInitial': 'N'
    //   },
    //   cssClass:"mainAlert"
    // });
    // //modal.style.cssText = '--min-width: 250px; --max-width: 460px;';
    // return await modal.present();
  }

}
