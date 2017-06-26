import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { RestProvider } from '../rest/rest';

@Injectable()
export class AuthProvider {

  constructor(private storage:Storage) {
    console.log('Hello AuthProvider Provider');
    // storage.clear();
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.storage.get('user')
        .then((data) => {
          resolve (data)
        }, (error) => {
          reject (error);
        })
    })

  }

  setUser(data: any) {
    console.log('setting user', data);
    this.storage.set('user', data);
  }

  sendMessage(data: any) {

  }

  logout() {

  }

}
