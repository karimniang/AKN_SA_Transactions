import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-depot-modal',
  templateUrl: './depot-modal.component.html',
  styleUrls: ['./depot-modal.component.scss']
})
export class DepotModalComponent implements OnInit {

  constructor(private modalCtrl:PopoverController) { }

  ngOnInit(): void {
  }
  type = "confirmation";
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
