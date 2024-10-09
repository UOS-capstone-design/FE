import {useRecoilState, useRecoilValue} from 'recoil';
import {allAlarmsSelector} from '../atoms';

export const useHandleAlldAlarm = () => {
  const allAlarms = useRecoilValue(allAlarmsSelector);

  const findAlarmUsingId = (id: string) => {
    const find = allAlarms.find(a => a.id === id);
    if (find) return find;
    else console.log('NO ITEM');
  };

  const findAlarmDelayFromAll = allAlarms.filter(alarm => alarm.delay);

  return {
    findAlarmUsingId,
    findAlarmDelayFromAll,
  };
};
