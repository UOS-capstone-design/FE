import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {Alarm, MissionCareType, MissionMode, RepeatState} from '../../types';
import uuid from 'react-native-uuid';

type Props = {
  children: ReactNode;
  initial?: Alarm;
};

interface AlarmContextType {
  current: Alarm;
  updateAlarm: (updates: Partial<Alarm>) => void;
  updateMission: (
    newSetting: Partial<{
      mode: MissionMode;
      id: MissionCareType;
    }>,
  ) => void;
}

export const AlarmContextManage = createContext<AlarmContextType | undefined>(
  undefined,
);

const defaultRepeat: RepeatState = {
  once: true,
  mon: false,
  thu: false,
  wed: false,
  tue: false,
  fri: false,
  sat: false,
  sun: false,
};

const defaultMission = {
  mode: 'Free' as MissionMode,
  id: undefined,
};

const AlarmContext = ({children, initial}: Props) => {
  const [current, setCurrentAlarm] = useState<Alarm>(
    initial
      ? {...initial}
      : {
          id: uuid.v4().toString(),
          timer: new Date(),
          active: false,
          repeat: defaultRepeat,
          mission: defaultMission,
          delay: false,
          delayTimes: 0,
          setting: {isVibration: false, volume: 50, interval: '반복 없음'},
        },
  );

  const updateAlarm = (updates: Partial<Alarm>) => {
    setCurrentAlarm(prev => ({...prev, ...updates}));
  };

  const updateMission = (
    newSetting: Partial<{
      id: MissionCareType;
      mode: MissionMode;
    }>,
  ) => {
    const updateSet = current.mission
      ? {...current.mission, ...newSetting}
      : {...defaultMission, ...newSetting};
    updateAlarm({mission: updateSet});
  };

  return (
    <AlarmContextManage.Provider value={{current, updateAlarm, updateMission}}>
      {children}
    </AlarmContextManage.Provider>
  );
};

export default AlarmContext;
