import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { DialogsProvider } from '../../providers/dialogs/dialogs';

import { ChatPage } from '../chat/chat';
import { LoaderProvider } from '../../providers/loader/loader';
import { AuthProvider } from '../../providers/auth/auth';

import { User } from '../../models/userModel';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [DialogsProvider]
})
export class SearchPage implements OnInit{

  loadedDialogs: any;
  dialogs: any;
  search: string;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _dialogs:DialogsProvider, public loader:LoaderProvider, public alert:AlertController, private auth:AuthProvider) {
    auth.getUser().then(user => this.user = user);
  }

  private loadDialogs() {
    this._dialogs.getAllDialogs()
      .then(data => {
        this.loadedDialogs = data;
        this.dialogs = data;
      })
  }

  checkPhone(phone: string) {
    this.loader.presentLoading("Загрузка");
    this._dialogs.checkPhone(phone)
      .then(data => {
        console.log(data);
        if (data)
          this.showPrompt(data, phone)
      })
      .catch(error => {
        // console.log(error.status);
        this.loader.dissmissAllLoaders();
        this.loader.presentToast("Номер не найден");
      })
  }

  private createDialog(data: any, phone: string, balance: string) {
    this._dialogs.createDialog(data.userId, parseInt(balance))
      .then(response => {
        this.loader.dissmissAllLoaders();
        console.log(response);
        this.openChat(response, this.getPartner(response.users));
      })
  }

  resetDialogs() {
    this.dialogs = this.loadedDialogs;
  }

  ngOnInit() {
    this.loadDialogs();
  }

  openChat (dialog: any, partner: any) {
    this.navCtrl.push(ChatPage, {dialog, partner})
  }

  getPartner(users: Array<any>) {
    return users.filter(user => user.id != this.user.userId)[0]
  }

  getBalance(balances: Array<any>) {
    return balances.filter(balance => balance.userId === this.user.userId)[0]
  }

  private showPrompt(data: any, phone: string) {
    this.loader.dissmissAllLoaders();
    let prompt = this.alert.create({
      title: 'Новый диалог',
      message: "Сколько Вам должен собеседник?",
      inputs: [
        {
          name: 'sum',
          placeholder: 'Сумма',
          value: "0"
        },
      ],
      buttons: [
        {
          text: 'Отмена',
          handler: data => {
            console.log('Cancel clicked', data);
            // this.loader.dissmissAllLoaders();
          }
        },
        {
          text: 'Создать',
          handler: _data => {
            this.createDialog(data, phone, _data.sum)
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.resetDialogs();

    // set val to the value of the ev target
    var val = ev.target.value.toLowerCase();
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '' && this.dialogs.length > 0) {
      this.dialogs = this.dialogs.filter((item) => {
        return (
          (item.users[0].name ? item.users[0].name.toLowerCase().indexOf(val) > -1 : false) || (item.users[1].name ? item.users[1].name.toLowerCase().indexOf(val) > -1 : false) ||
        item.users[0].phoneNumber.indexOf(val) > -1 || item.users[0].phoneNumber.indexOf(val) > -1);
      })
    }
  }

}
