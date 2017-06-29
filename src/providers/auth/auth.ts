import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AppSettings } from '../../appSettings';
// import { AuthPage } from '../../pages/auth/auth';

import { RestProvider } from '../rest/rest';

import { User } from '../../models/userModel';

@Injectable()
export class AuthProvider {
  public userToken:string;
  user: User;

  constructor(private storage:Storage, private rest:RestProvider) {
    console.log('Hello AuthProvider Provider');
/*    storage.clear();
    storage.get('token').then(token => console.log(token));*/
  }

  getUser():Promise<any> {
    if (this.user) return Promise.resolve(this.user);
    return new Promise((resolve, reject) => {
      this.storage.get('user')
        .then((data) => {
          this.user = data;
          resolve (data)
        }, (error) => {
          reject (error);
        })
    })
  }

  clearStorage() {
    this.storage.remove('token');
    this.storage.remove('user');
    this.storage.clear();

  }
  /**
   * Сохраняем данные пользователя
   * @param data
   */
  setUser(user:User) {
    console.log('setting user', user);
    this.storage.set('user', user);
  }


  getToken() {
    this.storage.get('token');
  }

  /**
   * Отправляем запрос на подтверждения кода из смс
   * @param userId
   * @param code
   * @returns {Promise<T>}
   */
  confirmCode(userId:string, code: number):Promise<string> {
    return new Promise((resolve, reject) => {
      this.rest.confirmCode(userId, code).subscribe(res => {
        resolve(res.token)
      })
    })
  }

  /**
   * Отправляем сообщение на введенный телефон
   * @param phone
   * @param name
   * @returns {Promise<T>}
   */
  sendMessage(phone: string, name?: string):Promise<string> {
    this.clearStorage();
    return new Promise((resolve, reject) => {
      this.rest.sendSms(phone, name).subscribe(res => {
        resolve(res.userId);
      })
    })
  }

  logout() {

  }

}
