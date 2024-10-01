export interface Alarm {
  id: string;
  title?: string;
  timer: Date;
  repeat?: RepeatState;
  mission?: {
    strict: boolean;
    type: MissionType;
  };
  setting: {
    isVibration: boolean;
    volume: number;
    interval: SettingTimeInterval;
  };
}

export type SettingTimeInterval = '반복 없음' | 5 | 10 | 15 | 30;

export type MissionType = 'Medical';

export type DayKey =
  | 'once'
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'sun';

export type RepeatState = {
  [key in DayKey]: boolean;
};
