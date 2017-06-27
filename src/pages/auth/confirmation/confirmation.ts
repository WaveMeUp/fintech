import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { LoaderProvider } from '../../../providers/loader/loader';
import { AuthProvider } from '../../../providers/auth/auth';

import { User } from '../../../models/userModel';

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  phone: string;
  userId: string;
  code: number = 5673;

  constructor(public navCtrl: NavController, private navParams: NavParams, private loader:LoaderProvider, private auth:AuthProvider) {
    this.phone = navParams.get('phone');
    this.userId = navParams.get('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthConfirmPage');
  }

  confirmCode(code:number) {
    this.loader.presentLoading("Проверка кода");
    this.auth.confirmCode(this.userId, code)
      .then(token => {
        this.loader.dissmissAllLoaders();
        let user = new User(this.userId,this.phone,token);
        this.auth.setUser(user);
        this.navCtrl.setRoot(HomePage,{token});
        console.log('got token', token, typeof(token));
      })
    /*setTimeout(() => {
      this.authProvider.setUser(data);
      this.navCtrl.setRoot(HomePage);
    }, 2000);*/
  }
}
