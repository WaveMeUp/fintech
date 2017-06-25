import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FromAccountPage } from './from-account';

@NgModule({
  declarations: [
    FromAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(FromAccountPage),
  ],
  exports: [
    FromAccountPage
  ]
})
export class FromAccountPageModule {}
