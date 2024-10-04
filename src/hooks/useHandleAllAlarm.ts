import {useRecoilState} from 'recoil';
import {allAlarmsSelector} from '../atoms';
import {Alarm} from '../types';
import {useEffect} from 'react';

export const useHandleAlldAlarm = () => {
  const [allAlarms, setAllAlarms] = useRecoilState(allAlarmsSelector);

  useEffect(() => {
    console.log('ALL ALARMS : ', allAlarms);
  }, [allAlarms]);

  const findAlarmUsingId = (id: string) => {
    const find = allAlarms.find(a => a.id === id);
    if (find) return find;
    else console.log('NO ITEM');
  };

  const updateTargetAlarm = ({
    alarm,
    updates,
  }: {
    alarm: Alarm;
    updates: Partial<Alarm>;
  }) => {
    setAllAlarms(prev =>
      prev.map(item => (item.id === alarm.id ? {...alarm, ...updates} : item)),
    );
  };

  return {
    findAlarmUsingId,
    updateTargetAlarm,
  };
};
