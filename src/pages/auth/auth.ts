import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfirmationPage } from './confirmation/confirmation';
import { LoaderProvider } from '../../providers/loader/loader';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  phone: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader:LoaderProvider, public authProvider:AuthProvider) {
  }

  sendMessage() {
    // this.navCtrl.setRoot(AuthConfirmPage);
    this.loader.presentLoading('Отправка СМС');
    setTimeout(() => {
      this.navCtrl.push(ConfirmationPage, {phone: this.phone});
    }, 2000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

}
