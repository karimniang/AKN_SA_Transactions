import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionLoadingPageRoutingModule } from './transaction-loading-routing.module';

import { TransactionLoadingPage } from './transaction-loading.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionLoadingPageRoutingModule
  ],
  declarations: [TransactionLoadingPage]
})
export class TransactionLoadingPageModule {}
