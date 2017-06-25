import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import { LoaderProvider } from '../../../providers/loader/loader';
import { TransactionModel } from '../../../models/transaction-model';

@IonicPage()
@Component({
  selector: 'page-from-account',
  templateUrl: 'from-account.html',
})
export class FromAccountPage {

  user: any = this.navParams.get('user');
  transaction: TransactionModel = new TransactionModel('account');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public loader:LoaderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FromAccountPage');
    console.log(this.user);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendMoney() {
    this.loader.presentLoading("Отправка");
    this.dismiss();
    setTimeout(() => {
      this.loader.presentToast("Средства успешно отправлены");
    }, 2000)
  }

}
