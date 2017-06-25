import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FromCashPage } from './from-cash';

@NgModule({
  declarations: [
    FromCashPage,
  ],
  imports: [
    IonicPageModule.forChild(FromCashPage),
  ],
  exports: [
    FromCashPage
  ]
})
export class FromCashPageModule {}
