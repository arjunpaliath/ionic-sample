This is a sample [Ionic](http://ionicframework.com/docs/) app with Hotline SDK.

## How to use this app

Once you have have set up Ionic,

 1. Clone or download this project.

 2. Add the required platform to it using the following code
 ```bash
	ionic cordova platform add ios
	ionic cordova run ios
```
 3. Add the hotline plugin to this project using the following snippet:
```
ionic cordova plugin add hotline
```
 4. Add the modified Hotline Push Plugin to this project.
```
cordova plugin add https://github.com/freshdesk/phonegap-plugin-push.git
```
 5. Replace ```<Your App Id>``` and ```<Your App Key>``` in app.component.ts with your Hotline account's App ID and App Key.

 6. Replace the ```<Sender ID>``` with your FCM Project's Sender ID.

 7. Then, to run it, cd into `ionic-sample` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.
