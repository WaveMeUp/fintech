import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private storage:Storage) {
    console.log('Hello AuthProvider Provider');
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

  logout() {

  }

}
