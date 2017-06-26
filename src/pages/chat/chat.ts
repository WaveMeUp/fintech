import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController, Content } from 'ionic-angular';

import { FromCashPage } from '../chat/from-cash/from-cash';
import { FromAccountPage } from '../chat/from-account/from-account';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  queries: {
    content: new ViewChild('content')
  }
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  user: object = this.navParams.get('user');
  messages: any = [
    {
      description: "За холодильник",
      amount: "14800Р",
      from: 0, // 0 - пользователь, 1 - собеседник,
      type: 0 //0 - cash, 1 - account
    },
    {
      description: "За суппорта",
      amount: "5340Р",
      from: 1,
      type: 1
    },
    {
      description: "На еду и алкоголь",
      amount: "3500Р",
      from: 0,
      type: 1
    },
    {
      description: "За холодильник",
      amount: "14800Р",
      from: 0, // 0 - пользователь, 1 - собеседник,
      type: 0 //0 - cash, 1 - account
    },
    {
      description: "За суппорта",
      amount: "5340Р",
      from: 1,
      type: 1
    },
    {
      description: "На еду и алкоголь",
      amount: "3500Р",
      from: 0,
      type: 1
    },
    {
      description: "За холодильник",
      amount: "14800Р",
      from: 0, // 0 - пользователь, 1 - собеседник,
      type: 0 //0 - cash, 1 - account
    },
    {
      description: "За суппорта",
      amount: "5340Р",
      from: 1,
      type: 1
    },
    {
      description: "На еду и алкоголь",
      amount: "3500Р",
      from: 0,
      type: 1
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public view:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  callFunction() {
    // this.content.scrollToBottom(0);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(0);
    }, 1)

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
