import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthConfirmPage } from './auth-confirm';

@NgModule({
  declarations: [
    AuthConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthConfirmPage),
  ],
  exports: [
    AuthConfirmPage
  ]
})
export class AuthConfirmPageModule {}
