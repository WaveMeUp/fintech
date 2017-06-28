/**
 * Created by Viacheslav Osadchiy on 28.06.2017.
 */

import { Injectable, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthPage } from '../pages/auth/auth';

@Injectable()
export class UtilsProvider {

  constructor(protected injector:Injector, private storage:Storage) {
  }

  get navCtrl(): NavController {
    return this.injector.get(NavController);
  }
  clearStorage() {
    this.storage.clear();
    this.navCtrl.setRoot(AuthPage);
  }
}

