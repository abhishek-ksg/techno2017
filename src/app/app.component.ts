import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { Ballots } from '../pages/ballots/ballots';
import { Standings } from '../pages/standings/standings';
import { Teams } from '../pages/teams/teams';

import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyDu-WmQdeiYnNfvNyJ3kQpAVQrFOS0Wns4",
    authDomain: "technophilia-2017.firebaseapp.com",
    databaseURL: "https://technophilia-2017.firebaseio.com",
    projectId: "technophilia-2017",
    storageBucket: "technophilia-2017.appspot.com",
    messagingSenderId: "658775562957"
});

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //Root Page of the Application
  rootPage: any = Teams;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Ballots', component: Ballots },
      { title: 'Standings', component: Standings },
      { title: 'Teams', component: Teams },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
