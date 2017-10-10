import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Ballots } from '../pages/ballots/ballots';
import { Standings } from '../pages/standings/standings';
import { Teams } from '../pages/teams/teams';
import { Judgestandings } from '../pages/judgestandings/judgestandings';

import { TechService } from '../shared/techService';

import { StatusBar } from '@ionic-native/status-bar'; 
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Ballots,
    Standings,
    Teams,
    Judgestandings
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp), 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Ballots,
    Standings,
    Teams,
    Judgestandings
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TechService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
