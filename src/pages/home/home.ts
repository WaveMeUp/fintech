import { Component, OnInit } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public fab:FabContainer, public _dialogs:DialogsProvider) {

  }

  ngOnInit() {
    this._dialogs.getAllDialogs()
      .then(data => {
        this.dialogs = data;
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
