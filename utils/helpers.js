import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = 'MobileFlash:notifications';

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
          .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export const createNotification = () => {
  return {
      title: 'Study time!',
      body: 'Hey, you should study a little.',
      ios: {
        sound: true,
      }
  }
};

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if(data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({ status }) => {
        if(status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(21);
          tomorrow.setMinutes(46);

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day',
            }
          )

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
        }
      })
    }
    else {
      console.log('NOT NULL!')
    }
  })
}