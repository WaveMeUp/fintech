import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { LoaderProvider } from '../../../providers/loader/loader';
import { AuthProvider } from '../../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  phone: string = this.navParams.get('phone');
  code: string = '5673';

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