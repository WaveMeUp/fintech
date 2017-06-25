import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


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

  constructor() {
    console.log('Hello DialogsProvider Provider');
  }

  getAllDialogs() {
    return Promise.resolve(this.dialogs);
  }

}
