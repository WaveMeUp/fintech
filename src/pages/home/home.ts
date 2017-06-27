import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, FabContainer } from 'ionic-angular';

import { ChatPage } from '../chat/chat';
import { SearchPage } from '../search/search';
import { DialogsProvider } from '../../providers/dialogs/dialogs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FabContainer, DialogsProvider]
})
export class HomePage implements OnInit{
  temp: any;
  dialogs: any;
  isSearchOpen: boolean = true;
  token: string;

  constructor(public navCtrl: NavController, public navParams:NavParams, public fab:FabContainer, public _dialogs:DialogsProvider) {
    if (navParams.get('token')) this.token = navParams.get('token');
  }

  ngOnInit() {
    this._dialogs.getAllDialogs(this.token)
      .then(data => {
        this.dialogs = data;
        console.log(this.dialogs);
      })
  }
  openChat (user: any) {
    this.navCtrl.push(ChatPage, {user})
  }

  openSearchPage() {
    this.navCtrl.push(SearchPage);
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }
}
