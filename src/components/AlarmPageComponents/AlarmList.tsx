import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {allAlarmsSelector} from '../../atoms';
import {Alarm} from '../../types';
import Modal_CU_Alarm from './Modal_CU_Alarm';
import AlarmItem from './AlarmItem';

const AlarmList = () => {
  const alarms = useRecoilValue(allAlarmsSelector);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [selectAlarm, setSelectAlarm] = useState<Alarm>();

  const onClickItem = (alarm: Alarm) => {
    setIsVisibleModal(true);
    setSelectAlarm(alarm);
  };

  return (
    <View style={styles.AlarmListContainer}>
      {alarms.map((alarm: Alarm) => {
        if (alarm && alarm.timer && alarm.timer instanceof Date) {
          return (
            <AlarmItem
              key={alarm.id}
              onPress={() => onClickItem(alarm)}
              alarm={alarm}
            />
          );
        }
        return null;
      })}
      <Modal_CU_Alarm
        isVisibleModal={isVisibleModal}
        closeModal={() => setIsVisibleModal(false)}
        alarm={selectAlarm}
      />
    </View>
  );
};

export default AlarmList;

const styles = StyleSheet.create({
  AlarmListContainer: {
    gap: 10,
  },
});
