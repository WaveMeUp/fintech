import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DialogsProvider } from '../../providers/dialogs/dialogs';

import { ChatPage } from '../chat/chat';
import { LoaderProvider } from '../../providers/loader/loader';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [DialogsProvider]
})
export class SearchPage implements OnInit{

  loadedDialogs: any;
  dialogs: any;
  search: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _dialogs:DialogsProvider, public loader:LoaderProvider) {

  }

  private loadDialogs() {
    this._dialogs.getAllDialogs()
      .then(data => {
        this.loadedDialogs = data;
        this.dialogs = data;
      })
  }

  startDialog(phone: string) {
    this.loader.presentLoading("Загрузка");
    this._dialogs.checkPhone(phone)
      .then(data => {
        console.log(data);
        if (data) {
          this._dialogs.createDialog(data.userId)
            .then(response => {
              this.loader.dissmissAllLoaders();
              console.log(response)
            })
        } else {
          this.loader.dissmissAllLoaders();
          this.loader.presentToast("Номер не найден");
        }
      })
  }
  resetDialogs() {
    this.dialogs = this.loadedDialogs;
  }

  ngOnInit() {
    this.loadDialogs();
  }

  openChat (user: any) {
    this.navCtrl.push(ChatPage, {user})
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
          (item.members[0].name ? item.members[0].name.toLowerCase().indexOf(val) > -1 : false) || (item.members[1].name ? item.members[1].name.toLowerCase().indexOf(val) > -1 : false) ||
        item.members[0].phoneNumber.indexOf(val) > -1 || item.members[0].phoneNumber.indexOf(val) > -1);
      })
    }
  }

}
