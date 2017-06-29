import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { SlidesPage } from '../../slides/slides';
import { LoaderProvider } from '../../../providers/loader/loader';
import { AuthProvider } from '../../../providers/auth/auth';

import { User } from '../../../models/userModel';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  phone: string;
  userId: string;
  name: string;
  code: number = 5673;

  constructor(public navCtrl: NavController, private navParams: NavParams, private loader:LoaderProvider, private auth:AuthProvider, private events:Events) {
    this.phone = navParams.get('phone');
    this.userId = navParams.get('userId');
    this.name = navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthConfirmPage');
  }

  confirmCode(code:number) {
    this.loader.presentLoading("Проверка кода");
    this.auth.confirmCode(this.userId, code)
      .then(token => {
        let user = new User(this.userId,this.phone,token,this.name);
        this.auth.setUser(user);
        setTimeout(() => {
          this.loader.dissmissAllLoaders();
          this.navCtrl.setRoot(SlidesPage,{token});
          this.events.publish('userSet', {});
        }, 2000);
        console.log('got token', token, typeof(token));
      })
    /*setTimeout(() => {
      this.authProvider.setUser(data);
      this.navCtrl.setRoot(HomePage);
    }, 2000);*/
  }
}
