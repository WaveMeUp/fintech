import {Component, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController, Content, Events, Navbar } from 'ionic-angular';

import { FromCashPage } from '../chat/from-cash/from-cash';
import { FromAccountPage } from '../chat/from-account/from-account';

import { AuthProvider } from '../../providers/auth/auth';
import { MessagesProvider } from '../../providers/dialogs/messages';

import { User } from '../../models/userModel';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  queries: {
    content: new ViewChild('content')
  },
  providers: [Navbar]
})
export class ChatPage{
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navBar: Navbar;
  dialog: any;
  partner: object;
  user: User;
  messages: any;
  balance: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public view:ViewController,
              private auth:AuthProvider,
              public events:Events,
              private messagesProvider:MessagesProvider) {
    auth.getUser().then(user => this.user = user);
    this.dialog = this.navParams.get('dialog');
    this.partner = this.navParams.get('partner');
    this.messages = this.dialog.messages;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.updateBalance();
    this.navBar.backButtonClick = (e:UIEvent) => {
      this.back();
      this.navCtrl.pop();
    };

    this.events.subscribe('newOnlineMessage', (data) => {
      this.updateBalance();
      console.log(data.message);
      this.messages.push(data.message.message);
      this.balance = data.message.balance.money;
      // this.balance = this.balance - parseInt(data.message.money);
      setTimeout(() => {
        if(this.content._scroll) this.content.scrollToBottom(100);
      }, 10)
    });

    this.events.subscribe('newCashMessage', (data) => {
      console.log(data.message);
      this.messages.push(data.message);
      // this.balance = this.balance - parseInt(data.message.money);
      setTimeout(() => {
        if(this.content._scroll) this.content.scrollToBottom(100);
      }, 10)
    });
    this.events.subscribe('messageSent', (data) => {
      // this.updateBalance();
      // this.balance = this.balance + parseInt(data.money);
    })

    this.events.subscribe('responseConfirmMessage', (data) => {
      this.balance = data.balance.money;
      this.messages.filter(msg => {
        return msg.id === data.messageId
      })[0].isConfirmed = true;
    })
  }

  confirmCash(message) {
    if (message.isConfirmed || message.from === this.user.userId) return false;
    message.isConfirmed = true;
    this.messagesProvider.confirmCash(message.id);
  }

  updateBalance() {
    this.balance = this.getBalance(this.dialog.balances).money;
  }
  getBalance(balances: Array<any>) {
    return balances.filter(balance => balance.userId === this.user.userId)[0]
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(0);
    }, 1)

  }

  back() {
    this.events.publish('backToMain');
  }

  presentModal(page) {
    let modal = this.modalCtrl.create(page,{user: this.user, dialog: this.dialog, balance: this.balance});
    modal.present();
  }
  sendMoney(type: string) {
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
