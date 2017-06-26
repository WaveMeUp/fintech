import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../appSettings';
import {Observable} from "rxjs/Observable";


@Injectable()
export class RestProvider {

  constructor(private http: Http) {
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


  getDialogs() {
    return this.http.get("dialog")
      .map(res => res.json())
  }

  getMessages(dialogId:number) {

  }


}
