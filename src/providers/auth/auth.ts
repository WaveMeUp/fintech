import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AppSettings } from '../../appSettings';

import { RestProvider } from '../rest/rest';

import { User } from '../../models/userModel';

@Injectable()
export class AuthProvider {
  public userToken:string;

  constructor(private storage:Storage, private rest:RestProvider) {
    console.log('Hello AuthProvider Provider');
    // storage.clear();
  }

  getUser():Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('user')
        .then((data) => {
          resolve (data)
        }, (error) => {
          reject (error);
        })
    })
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
   * @returns {Promise<T>}
   */
  sendMessage(phone: string):Promise<string> {
    return new Promise((resolve, reject) => {
      this.rest.sendSms(phone).subscribe(res => {
        resolve(res.userId);
      })
    })
  }

  logout() {

  }

}
