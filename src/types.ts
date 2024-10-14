export interface SignUpInfo {
  email: string;
  password: string;
  validPassword: string;
  notificationNumber: string;
  nickName: string;
  phoneNumber: string;
  guardianPhoneNumber: string | undefined;
}

export interface User {
  id: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
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

// ** Todo와 Alarm의 타입에서 timer라는 속성은 동일하게 가지고 있어야한다.
// TimePicker 컴포넌트에서 value에 참조하는값이 .timer이므로 동일해야함
export interface Todo {
  id: string;
  title: string;
  description: string;
  timer: Date;
  day?: string; // day 혹은 repeat 중 하나는 무조건 존재해야 알려줘 페이지에 등록됨
  repeat?: Omit<RepeatState, 'once'>;
  mission?: MissionCareType;
  active: boolean;
}
