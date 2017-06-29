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
  socket: any;
  // jwt: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmVOdW1iZXIiOiI4OTIxNzQ1Njc4NyIsImlhdCI6MTQ5ODUwMjA0Nn0.IjbFxDIYGvBmYvyh29nGHmAwUZhs9_HCQf4nogiQIYA"
  //
  constructor(public rest:RestProvider, private auth:AuthProvider, private events:Events, private utils:UtilsProvider) {
    this.establishConnection();
  }

  establishConnection() {
    this.socket = io('http://52.164.255.166:5838',{'pingInterval':5000});
    this.auth.getUser().then(user => {
      this.socket.emit('authenticate', {token: user.token})
        .on('authenticated', (msg) => {
          console.info(msg)
        })
        .on('unauthorized', msg => {
          console.error(msg);
        })
        .on('message', message => {
          console.info('GOT MSG', message);
          if (message.message) {
            console.log('online message');
            this.events.publish('newOnlineMessage',{message})
            if (message.message.from != user.userId) {
              this.utils.sounds.newMessage.play(message.message);
            }
          }
          else {
            console.log('cash message');
            this.events.publish('newCashMessage',{message});
            if (message.from != user.userId) {
              this.utils.sounds.newMessage.play(message);
            }
          }

        })
        .on('responseConfirmMessage', message => {
          console.info('got confirmation', message);
          this.events.publish('responseConfirmMessage', message);
        })
        .on('disconnect', msg => {
          console.error(msg)
          this.establishConnection();
        })
    })

  }
  sendMessage(msg: Message) {
    this.socket.emit("sendMessage", msg);
    // this.events.publish('messageSent',{money:msg.money})
    this.utils.sounds.messageSent.play();
  }

  confirmCash(messageId:number) {
    this.socket.emit("requestConfirmMessage", {messageId, "answer": true})
  }

}
