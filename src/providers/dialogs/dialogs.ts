import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { RestProvider } from "../rest/rest";
import { AuthProvider } from "../auth/auth";
import { AuthPage } from '../../pages/auth/auth';

import { MessagesProvider } from '../../providers/dialogs/messages';


@Injectable()
export class DialogsProvider {

  dialogs: any = [
    {
      name: 'Папа',
      lastMessage: 'Деньги за холодильник',
      balance: '3850Р',
      imgUrl: './assets/img/dad.png',
      phone: "+79216538821"
    },
    {
      name: 'Даша',
      lastMessage: 'Деньги за холодильник',
      balance: '3850Р',
      imgUrl: './assets/img/dasha.png',
      phone: '+79111234567'
    },
    {
      name: 'Слава',
      lastMessage: 'Деньги за холодильник',
      balance: '3850Р',
      imgUrl: './assets/img/slava.jpg',
      phone: '+79218678737'
    }
  ];

  constructor(public rest:RestProvider, public auth:AuthProvider, private messages:MessagesProvider) {
    console.log('Hello DialogsProvider Provider');
  }

  /*getAllDialogs() {
    return Promise.resolve(this.dialogs);
  }*/


  getAllDialogs(token?: string) {
    return new Promise((resolve, reject) => {
      this.rest.getDialogs(token)
        .subscribe(res => {
          resolve (res)
        }, error => {
          reject (error)
        })
    })
  }

  createDialog(secondId:number, balance: number):any {
    return new Promise((resolve, reject) => {
      this.auth.getUser()
        .then(user => {
          this.rest.createDialog(user.userId,secondId, balance).subscribe(res => {
            resolve(res);
          })
        })
    })
  }

  checkPhone(phone:string):any {
    return new Promise((resolve, reject) => {
      this.rest.checkPhone(phone).subscribe(res => {
        resolve(res)
      }, error => {
        reject(error);
      })
    })
  }

}
