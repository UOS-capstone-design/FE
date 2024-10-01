import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {Alarm} from '../../types';
import uuid from 'react-native-uuid';

type Props = {
  children: ReactNode;
  initial?: Alarm;
};

interface AlarmContextType {
  current: Alarm;
  updateAlarm: (updates: Partial<Alarm>) => void;
}

export const AlarmContextManage = createContext<AlarmContextType | undefined>(
  undefined,
);

const AlarmContext = ({children, initial}: Props) => {
  const [current, setCurrentAlarm] = useState<Alarm>(
    initial
      ? {...initial}
      : {
          id: uuid.v4().toString(),
          timer: new Date(),
          setting: {isVibration: false, volume: 50, interval: 5},
        },
  );

  useEffect(() => {
    console.log('CURRENT :', current);
  }, [current]);

  // useEffect(() => {
  //   console.log('아니 왜 업데이트가 안돼지? : ', initial);
  // }, [initial]);

  const updateAlarm = (updates: Partial<Alarm>) => {
    setCurrentAlarm(prev => ({...prev, ...updates}));
  };

  return (
    <AlarmContextManage.Provider value={{current, updateAlarm}}>
      {children}
    </AlarmContextManage.Provider>
  );
};

export default AlarmContext;
