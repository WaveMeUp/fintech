import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthConfirmPage } from '../auth-confirm/auth-confirm';
import { LoaderProvider } from '../../providers/loader/loader';


/**
 * Generated class for the AuthPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  phone: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader:LoaderProvider) {
  }

  sendMessage() {
    // this.navCtrl.setRoot(AuthConfirmPage);
    this.loader.presentLoading('Отправка СМС');
    setTimeout(() => {
      this.navCtrl.push(AuthConfirmPage, {phone: this.phone});
    }, 2000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

}
