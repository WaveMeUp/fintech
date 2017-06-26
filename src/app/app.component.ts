import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AuthPage } from '../pages/auth/auth'
import { ChatPage } from '../pages/chat/chat';
import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public authProvider:AuthProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Диалоги', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Auth', component: AuthPage },
      { title: 'Chat', component: ChatPage}
    ];

  }
  ngOnInit() {
    this.authProvider.getUser()
      .then((user) => {
        if (!user) {
          console.log('no user data');
          this.nav.setRoot(AuthPage);
        } else {
          this.nav.setRoot(HomePage);
          console.log('success', user)
        }
      }, (error) => {
        console.log('error occurred', error);
      })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
