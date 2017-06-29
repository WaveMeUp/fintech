/**
 * Created by Viacheslav Osadchiy on 28.06.2017.
 */

import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import io from "socket.io-client";

import { RestProvider } from "../rest/rest";
import { AuthProvider } from '../auth/auth';
import { UtilsProvider } from '../utils';

import { Message } from '../../models/messageModel';

@Injectable()
export class MessagesProvider {
  socket: any = io('http://52.164.255.166:5838');
  // jwt: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmVOdW1iZXIiOiI4OTIxNzQ1Njc4NyIsImlhdCI6MTQ5ODUwMjA0Nn0.IjbFxDIYGvBmYvyh29nGHmAwUZhs9_HCQf4nogiQIYA"
  //
  constructor(public rest:RestProvider, private auth:AuthProvider, private events:Events, private utils:UtilsProvider) {
    auth.getUser().then(user => {
      this.socket.emit('authenticate', {token: user.token})
        .on('authenticated', (msg) => {
          console.log('auth success', msg)
        })
        .on('unauthorized', msg => {
          console.log('not auth', msg);
        })
        .on('message', message => {
          console.log('GOT MSG', message);
          events.publish('newMessage',{message})
          utils.sounds.newMessage.play(message);
        })
        .on('responseConfirmMessage', message => {
          console.log('got confirmation', message);
          events.publish('responseConfirmMessage', message);
        })
    })
  }

  sendMessage(msg: Message) {
    console.log('sending msg', msg);
    this.socket.emit("sendMessage", msg);
    this.events.publish('messageSent',{money:msg.money})
    this.utils.sounds.messageSent.play();
  }

  confirmCash(messageId:number) {
    this.socket.emit("requestConfirmMessage", {messageId, "answer": true})
  }

}
