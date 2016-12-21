/**
 * FCM Settings (Firebase Cloud Messaging
 */

module.exports.notification = {

  /***************************************************************************
   *                                                                         *
   * FCM Key                                                                 *
   ***************************************************************************/

  fcmKey: process.env.FCM_KEY, //fcm  key here

  /***************************************************************************
   *                                                                         *
   * Default message data                                                    *
   ***************************************************************************/
  defaultMessage: {
    content_available: true,
    notification: {
      title: 'Please be ready',
      body: 'Your queue is about to come',
      click_action: 'NOTIF',
      priority: 'high',
      lights: 'true',
      sound: 'thrown.mp3',
      vibrate: 300,
      icon: 'ic_notification',
      show_in_foreground: true
    },
    data: {
      priority: 'high',
      lights: 'true',
      sound: 'thrown.mp3',
      vibrate: 300,
      icon: 'ic_notification',
      show_in_foreground: true
    },
    to: '',
    priority: 'high'
  }
};
