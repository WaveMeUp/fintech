/**
 * Created by Viacheslav Osadchiy on 28.06.2017.
 */

import { Injectable, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthPage } from '../pages/auth/auth';

import { NativeAudio } from '@ionic-native/native-audio';

import { User } from '../models/userModel';

@Injectable()
export class UtilsProvider {

  sounds: any = {
    newMessage: { play: null },
    messageSent: { play: null }
  };
  user: User;
  constructor(protected injector:Injector, private storage:Storage, private nativeAudio:NativeAudio) {
    this.nativeAudio.preloadSimple("newMessage", "assets/sounds/newMessage.wav")
      .then(success => console.log('new message loaded', success), error => console.log(error));
    this.nativeAudio.preloadSimple("messageSent", "assets/sounds/messageSent.wav")
      .then(success => console.log('message sent loaded', success), error => console.log(error));
    this.sounds.newMessage.play = (message) => {
      storage.get('user').then(user => {
        this.user = user;
        if (message.from != this.user.userId) this.playSound("newMessage")
      })

    };
    this.sounds.messageSent.play = () => {
      this.playSound("messageSent")
    }
  }

  get navCtrl(): NavController {
    return this.injector.get(NavController);
  }
  clearStorage() {
    this.storage.clear();
    this.navCtrl.setRoot(AuthPage);
  }

  playSound(id: string) {
    this.nativeAudio.play(id)
  }
}

