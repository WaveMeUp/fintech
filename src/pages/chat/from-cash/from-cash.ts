import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { TransactionModel } from '../../../models/transaction-model';

@IonicPage()
@Component({
  selector: 'page-from-cash',
  templateUrl: 'from-cash.html',
})
export class FromCashPage {

  user: any = this.navParams.get('user');
  transaction: TransactionModel = new TransactionModel('cash');

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FromCashPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
