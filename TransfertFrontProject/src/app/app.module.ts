import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepotComponent } from './transactions/depot/depot.component';
import { RetraitComponent } from './transactions/retrait/retrait.component';
import { HeaderTransactionsComponent } from "../app/transactions/header-transactions/header-transactions.component";
import { CalculFraisComponent } from './transactions/calcul-frais/calcul-frais.component';
import { LoginComponentModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { DepotModalComponent } from './modal/depot-modal/depot-modal.component';
import { RetraitModalComponent } from './modal/retrait-modal/retrait-modal.component';

@NgModule({
  declarations: [AppComponent, DepotComponent, RetraitComponent, HeaderTransactionsComponent, CalculFraisComponent, DepotModalComponent, RetraitModalComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, LoginComponentModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
