import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';
import {useAlarmManager} from '../../hooks/useAlarmManager';

type Props = {
  id?: string;
  closeModal: () => void;
};

const SaveAlarmButton = ({id, closeModal}: Props) => {
  const {current} = useCurrentAlarm();
  const alarmManager = useAlarmManager();

  const onClickSaveButton = () => {
    if (id) {
      alarmManager.updateAlarm(current);
    } else {
      alarmManager.saveAlarm(current);
    }
    closeModal();
  };
  return (
    <View>
      <Text onPress={onClickSaveButton}>저장하기</Text>
    </View>
  );
};

export default SaveAlarmButton;

const styles = StyleSheet.create({});
