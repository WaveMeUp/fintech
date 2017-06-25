import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController } from 'ionic-angular';


/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoaderProvider {

  constructor(public loadingCtrl: LoadingController, public toast:ToastController) {
    console.log('Hello LoaderProvider Provider');
  }

  presentLoading(msg) {
    let loader = this.loadingCtrl.create({
      content: msg,
      duration: 2000
    });
    loader.present();
  }

  presentToast(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
