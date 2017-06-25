import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule  } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AuthPage } from '../pages/auth/auth';
import { ConfirmationPage } from '../pages/auth/confirmation/confirmation';
import { ChatPage } from '../pages/chat/chat';
import { FromAccountPage } from '../pages/chat/from-account/from-account';
import { FromCashPage } from '../pages/chat/from-cash/from-cash';
import { SearchPage } from '../pages/search/search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoaderProvider } from '../providers/loader/loader';
import { AuthProvider } from '../providers/auth/auth';
import { DialogsProvider } from '../providers/dialogs/dialogs';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AuthPage,
    ConfirmationPage,
    ChatPage,
    FromAccountPage,
    FromCashPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AuthPage,
    ConfirmationPage,
    ChatPage,
    FromAccountPage,
    FromCashPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoaderProvider,
    AuthProvider,
    DialogsProvider,
    RestProvider
  ]
})
export class AppModule {}
