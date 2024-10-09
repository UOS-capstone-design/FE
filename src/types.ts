export interface SignUpInfo {
  email: string;
  password: string;
  validPassword: string;
  notificationNumber: string;
  nickName: string;
  phoneNumber: string;
  guardianPhoneNumber: string | undefined;
}

export type Step = {
  [key in StepKey]: boolean;
};

export type StepKey = 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'step6';

export interface Alarm {
  id: string;
  title?: string;
  timer: Date;
  active: boolean;
  repeat: RepeatState;
  delay: boolean;
  delayTimes: number;
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

export type SettingTimeInterval = '반복 없음' | 1 | 10 | 15 | 30;

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
