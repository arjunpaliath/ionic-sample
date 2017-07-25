import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

declare var window: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  hotline: any;
  pushNotification: any;
  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    var self = this;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      self.initHotline();
      self.initPushNotifications();
    });
  }

  initHotline() {
    console.log('Init Hotline');
    console.log(window);
    this.hotline  = window.Hotline;
    var self = this;
    self.hotline.init({
        appId: "<Your App Id>",
        appKey: "<Your App Key>",
        agentAvatarEnabled : true,
        cameraCaptureEnabled : false,
        voiceMessagingEnabled : false,
        pictureMessagingEnabled : true
    },
    function(success){
    console.log("Hotline successfully intialized");
    self.initPushNotifications();
    self.hotline.updateUser({
        "name" : "John Doe",
        "email" : "john@doe.com",
        "countryCode" : "+91",
        "externalId" : "john.doe",
        "phoneNumber" : "8000080000"
      });
    });
  }

  initPushNotifications() {
    console.log("Init Push Notifications");

    var push = window.PushNotification;
    this.pushNotification = push.init({
        android: {
            senderID: "<Sender ID>"
          },
          ios: {
            alert: "true",
            badge: false,
            sound: "true",
            "clearBadge": "true"
          },
          windows: {}
    }, function() {
        console.log("push Notification sucessfully instialized");
    });

    var self = this;
    this.pushNotification.on('registration',function(data) {
        console.log("updating deviceID"); // This console is getting executed
        // self.hotline.updatePushNotificationToken(self.deviceID);
        self.hotline.updatePushNotificationToken(data.registrationId);
    });

    this.pushNotification.on('notification',function(data) {
    // The below code block is not executing when I closed my app
    // And sending messages from web.hotline.io
    console.log("Notification came");
    self.hotline.isHotlinePushNotification(data.additionalData, function(success, isHotlineNotif) {
      console.log("push notification yet to success");
        if( success && isHotlineNotif ) {
            console.log("push notifiction success");
            self.hotline.handlePushNotification(data.additionalData);
        }
      });
    });
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
