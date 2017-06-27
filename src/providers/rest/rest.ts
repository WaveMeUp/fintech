import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../appSettings';
import {Observable} from "rxjs/Observable";
import { Storage } from '@ionic/storage';



@Injectable()
export class RestProvider {

  constructor(private http: Http, private storage: Storage) {
  }

  /**
   * HTTP запрос на отправку смс
   * @param phoneNumber
   * @returns {Observable<R>}
   */
  sendSms(phoneNumber:string) {
    return this.http.post("auth/sendSms", {phoneNumber})
      .map(res => res.json())
  }

  /**
   * HTTP запрос на подтверждение кода
   * @param userId
   * @param smsCode
   * @returns {Observable<R>}
   */
  confirmCode(userId: string, smsCode: number) {
    return this.http.post("auth/confirmUserAccount", {userId, smsCode})
      .map(res => res.json())
  }


  getDialogs(token?: string) {
    let options = new RequestOptions();
    options.headers = new Headers();
    if (token) options.headers.set('x-access-token', token);
    return this.http.get("dialog", options)
      .map(res => res.json())
  }

  getMessages(dialogId:number) {

  }

  checkPhone(phoneNumber:string) {
    return this.http.post("user/getByPhoneNumber", {phoneNumber})
      .map(res => res.json())
  }

  createDialog(userId:number, secondId:number) {
    let options = new RequestOptions();
    options.headers = new Headers();
    options.headers.set('Content-Type', 'application/json');
    return this.http.post("dialog",JSON.stringify({members:[userId,secondId]}), options)
      .map(res => res)
  }

}
