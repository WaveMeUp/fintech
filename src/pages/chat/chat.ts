import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { FromCashPage } from '../chat/from-cash/from-cash';
import { FromAccountPage } from '../chat/from-account/from-account';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user: object = this.navParams.get('user');
  messages: any = [
    {
      description: "За холодильник",
      amount: "14800Р",
      from: 0 // 0 - пользователь, 1 - собеседник
    },
    {
      description: "За суппорта",
      amount: "5340Р",
      from: 1
    },
    {
      description: "На еду и алкоголь",
      amount: "3500Р",
      from: 0
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  presentModal(page) {
    let modal = this.modalCtrl.create(page,{user: this.user});
    modal.present();
  }
  sendMoney(type: string) {
    console.log('sending ', type);
    switch (type) {
      case 'cash':
        this.presentModal(FromCashPage);
        break;
      case 'account':
        this.presentModal(FromAccountPage);
        break;
    }
  }

}
