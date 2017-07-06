import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

declare var window: any;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})

export class HelloIonicPage {
  hotline: any;
  constructor(public platform: Platform) {
    platform.ready().then(() => {
     console.log('loaded');
     console.log(window);
     this.hotline = window.Hotline;
    });
  }
  openSupport() {
    console.log("Opening Support Conversation");
    this.hotline.showConversations();
  }
  openFAQs() {
    console.log("Opening Support Conversation");
    this.hotline.showFAQs();
  }
}
