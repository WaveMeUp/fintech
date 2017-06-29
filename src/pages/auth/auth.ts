import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfirmationPage } from './confirmation/confirmation';
import { LoaderProvider } from '../../providers/loader/loader';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  phone: string;
  name: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, private loader:LoaderProvider, private auth:AuthProvider) {
  }

  sendMessage(phone: string, name: string) {
    this.loader.presentLoading('Отправка СМС');
    this.auth.sendMessage(phone, name)
      .then(userId => {
        console.log('got userid', userId);
        this.loader.dissmissAllLoaders();
        this.navCtrl.push(ConfirmationPage, {phone, userId, name})
      })
    // this.navCtrl.setRoot(AuthConfirmPage);
  }

  ionViewDidLoad() {
    this.auth.clearStorage();
    console.log('ionViewDidLoad AuthPage');
  }

}
