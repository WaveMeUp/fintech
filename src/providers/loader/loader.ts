import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class LoaderProvider {

  loader:any;

  constructor(public loadingCtrl: LoadingController, public toast:ToastController) {
  }

  /**
   * Показываем лоадер с заданным сообщением
   * @param msg
   */
  presentLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }

  dissmissAllLoaders() {
    this.loader.dismiss();
  }

  /**
   * Показываем уведомление с заданным сообщением
   * @param msg
   */
  presentToast(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
