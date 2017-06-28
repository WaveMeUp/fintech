import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import { LoaderProvider } from '../../../providers/loader/loader';
import { TransactionModel } from '../../../models/transaction-model';

import { AuthProvider } from '../../../providers/auth/auth';
import { User } from '../../../models/userModel';
import { MessagesProvider } from '../../../providers/dialogs/messages';
import { Message } from '../../../models/messageModel';


@Component({
  selector: 'page-from-account',
  templateUrl: 'from-account.html',
})
export class FromAccountPage {

  user: User;
  dialog: any;
  transaction: TransactionModel = new TransactionModel('account');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public loader:LoaderProvider,
              private auth:AuthProvider,
              private messages:MessagesProvider) {
    auth.getUser().then(user => this.user = user);
    this.dialog = navParams.get('dialog');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FromAccountPage');
    console.log(this.user);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getPartner(users: Array<any>) {
    return users.filter(user => user.id != this.user.userId)[0]
  }

  getBalance(balances: Array<any>) {
    return balances.filter(balance => balance.userId === this.user.userId)[0]
  }

  sendMoney(amount: string, description: string) {
    // this.loader.presentLoading("Отправка");
    let msg = new Message(this.getPartner(this.dialog.users).id,parseFloat(amount),this.dialog.id,description,"online");
    this.messages.sendMessage(msg);
    this.dismiss();
    /*setTimeout(() => {
      this.loader.presentToast("Средства успешно отправлены");
    }, 2000)*/
  }

}
