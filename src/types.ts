export interface Alarm {
  id: string;
  title?: string;
  timer: Date;
  active: boolean;
  repeat: RepeatState;
  mission: {
    mode: MissionMode;
    id: MissionCareType;
  };
  setting: {
    isVibration: boolean;
    volume: number;
    interval: SettingTimeInterval;
  };
}

export type MissionMode = 'Strict' | 'Free';

export type SelectList = 'Alarm' | 'Mission';

export type SettingTimeInterval = '반복 없음' | 5 | 10 | 15 | 30;

export type MissionCareType =
  | 'Manage blood sugar'
  | 'Eat Medician'
  | 'Eat food'
  | undefined;

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
export type ReportCustomDuration = {
  startDay: Date;
  endDay: Date;
};

export type ReportDuration = 'Today' | 'Week' | 'Month' | ReportCustomDuration;

export type Report = {
  mission: MissionCareType;
  duration: ReportDuration;
};
