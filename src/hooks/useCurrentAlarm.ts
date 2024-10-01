import {useRecoilState} from 'recoil';
import {allAlarmsSelector} from '../atoms';
import uuid from 'react-native-uuid';
import {Alarm} from '../types';
import {useContext, useEffect} from 'react';
import AlarmContext, {
  AlarmContextManage,
} from '../components/AlarmPageComponents/AlarmContext';

export const useCurrentAlarm = () => {
  const context = useContext(AlarmContextManage);
  if (context === undefined) {
    throw new Error('useAlarm must be used within an AlarmProvider');
  }
  return context;
};
