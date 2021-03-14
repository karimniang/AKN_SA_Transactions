import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [ CommonModule, IonicModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginComponentModule {}
