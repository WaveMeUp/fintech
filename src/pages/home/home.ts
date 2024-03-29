import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, FabContainer, Events } from 'ionic-angular';

import { ChatPage } from '../chat/chat';
import { SearchPage } from '../search/search';
import { DialogsProvider } from '../../providers/dialogs/dialogs';
import {AuthPage} from "../auth/auth";
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/userModel';

import {SortDatePipe} from '../../pipes/sort';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FabContainer, DialogsProvider, SortDatePipe]
})
export class HomePage implements OnInit{
  temp: any;
  dialogs: any;
  isSearchOpen: boolean = true;
  token: string;
  user: User;

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              public fab:FabContainer,
              public _dialogs:DialogsProvider,
              private auth:AuthProvider,
              private events:Events,
              public sort:SortDatePipe) {
    auth.getUser().then(user => this.user = user);
    if (navParams.get('token')) this.token = navParams.get('token');
    events.subscribe('backToMain', () => {
      this.ngOnInit();
    });
    events.subscribe('newCashMessage', () => {
      this.ngOnInit();
    })
    events.subscribe('newOnlineMessage', () => {
      this.ngOnInit();
    })
    events.subscribe('responseConfirmMessage', () => {
      this.ngOnInit();
    })
  }

  ionViewDidLoad() {
    // console.log('home loaded');
  }
  ngOnInit(refresher?: any) {
    this._dialogs.getAllDialogs(this.token)
      .then(data => {
        this.dialogs = data;
        if (refresher) refresher.complete();
      })
      .catch(error => {
        if (error.status === 403) {
          this.auth.clearStorage();
          this.navCtrl.setRoot(AuthPage);
        }
      })
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

  openSearchPage() {
    this.navCtrl.push(SearchPage);
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }
}
