import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoaderProvider } from '../../providers/loader/loader';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the AuthConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auth-confirm',
  templateUrl: 'auth-confirm.html',
})
export class AuthConfirmPage {
  phone: string = this.navParams.get('phone');

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader:LoaderProvider, public authProvider:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthConfirmPage');
  }

  confirmCode() {
    this.loader.presentLoading("Проверка кода");
    let data = {
      phone: this.phone
    }
    setTimeout(() => {
      this.authProvider.setUser(data);
      this.navCtrl.setRoot(HomePage);
    }, 2000);
  }
}
