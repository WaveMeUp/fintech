import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';

import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FabContainer]
})
export class HomePage {

  dialogs: any = [
    {
      name: 'Папа',
      lastMessage: 'Деньги за холодильник',
      balance: '3850Р',
      imgUrl: './assets/img/dad.png'
    },
    {
      name: 'Даша',
      lastMessage: 'Деньги за холодильник',
      balance: '3850Р',
      imgUrl: './assets/img/dasha.png'
    },
    {
      name: 'Слава',
      lastMessage: 'Деньги за холодильник',
      balance: '3850Р',
      imgUrl: './assets/img/slava.jpg'
    }
  ]

  constructor(public navCtrl: NavController, public fab:FabContainer) {

  }

  openChat (user: any) {
    this.navCtrl.push(ChatPage, {user})
  }

  openSearchBar() {
    console.log(this.fab);
  }
}
