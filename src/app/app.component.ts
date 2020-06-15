import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Student',
      url: '/student',
      icon: 'man'
    },
    {
      title: 'Classes',
      url: '/class',
      icon: 'card'
    },
    {
      title: 'Class Reservation',
      url: '/class-reservation',
      icon: 'calendar'
    },
    {
      title: 'File Storage',
      url: '/storage',
      icon: 'photos'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }


}
