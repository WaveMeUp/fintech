import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
})
export class SlidesPage {
  token: string;

  slides = [
    {
      title: "Добро пожаловать!",
      description: "<b>Fintech App</b> предназначено для систематизации финансовых взаиморасчетов между людьми.",
      image: "assets/img/slides/dialog.png",
    },
    {
      title: "Добавьте собеседника",
      description: "На экране поиска введите <b>номер абонента</b>.",
      image: "assets/img/slides/search.png",
    },
    {
      title: "Изначальный баланс",
      description: "Вы можете начать диалог с <b>любым</b> балансом, даже отрицательным.",
      image: "assets/img/slides/balance.png",
    },
    {
      title: "Тип транзакции",
      description: "Выберите тип рассчета, <b>наличый или безнал</b>. В случае наличного рассчета потребуется подтверждение от получателя.",
      image: "assets/img/slides/type.png",
    },
    {
      title: "Отправка",
      description: "Введите сумму, и, при необходимости, комментарий, и <b>всё готово к отправке!</b>",
      image: "assets/img/slides/send.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.token = navParams.get('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidesPage');
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage, {token: this.token});
  }

}
