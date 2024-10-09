import {NativeModules, Platform} from 'react-native';

const {AndroidAlarmModule} = NativeModules;

console.log('AndroidAlarmModule:', AndroidAlarmModule);

const requestAlarmPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    const hasPermission = await AndroidAlarmModule.requestAlarmPermission();
    return hasPermission;
  }
  return true;
};

export default {
  setAlarm: async (
    alarmId: string,
    timestamp: number,
    isVibrate: boolean,
    soundVolume: number,
    soundUri: string,
  ) => {
    const hasPermission = await requestAlarmPermission();
    if (hasPermission) {
      try {
        await AndroidAlarmModule.setAlarm(
          alarmId,
          timestamp,
          isVibrate,
          soundVolume,
          soundUri,
        );
        console.log('Alarm set successfully');
      } catch (error) {
        console.error('Failed to set alarm:', error);
      }
    } else {
      console.log('Alarm permission not granted');
    }
  },

  updateAlarm: async (
    alarmId: string,
    newTimestamp: number,
    active: boolean,
    repeatInterval: number,
    delayTimes: number,
    isVibrate: boolean,
    repeatTrigger: boolean,
    soundVolume: number,
    soundUri: string,
  ) => {
    const hasPermission = await requestAlarmPermission();
    if (hasPermission) {
      try {
        await AndroidAlarmModule.updateAlarm(
          alarmId,
          newTimestamp,
          active,
          repeatInterval,
          delayTimes,
          isVibrate,
          repeatTrigger,
          soundVolume,
          soundUri,
        );
        console.log('Alarm update successfully');
      } catch (error) {
        console.error('Failed to set alarm:', error);
      }
    } else {
      console.log('Alarm permission not granted');
    }
  },
  cancelAlarm: (alarmId: string) => {
    AndroidAlarmModule.cancelAlarm(alarmId);
  },
};
