import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {allAlarmsSelector} from '../../atoms';
import {Alarm} from '../../types';
import Modal_CU_Alarm from './Modal_CU_Alarm';

const AlarmList = () => {
  const alarms = useRecoilValue(allAlarmsSelector);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [selectAlarm, setSelectAlarm] = useState<Alarm>();

  const onClickItem = (alarm: Alarm) => {
    setIsVisibleModal(true);
    setSelectAlarm(alarm);
  };

  return (
    <View>
      {alarms.map((alarm: Alarm) => (
        <View key={alarm.id}>
          <Text onPress={() => onClickItem(alarm)}>{alarm.id}</Text>
        </View>
      ))}
      <Modal_CU_Alarm
        isVisibleModal={isVisibleModal}
        closeModal={() => setIsVisibleModal(false)}
        alarm={selectAlarm}
      />
    </View>
  );
};

export default AlarmList;

const styles = StyleSheet.create({});
