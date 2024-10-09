import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm';
import {useAlarmManager} from '../../hooks/useAlarmManager';

type Props = {
  id?: string;
  closeModal: () => void;
};

const SaveAlarmButton = ({id, closeModal}: Props) => {
  const {current, updateAlarm} = useCurrentAlarm();
  const alarmManager = useAlarmManager();
  const onClickSaveButton = () => {
    if (
      current.mission.mode === 'Strict' &&
      current.setting.interval === '반복 없음'
    ) {
      Alert.alert(
        '주의',
        '엄격 모드를 사용할 경우, 알람 반복 간격을 선택해야 합니다.',
        [
          {
            text: '확인',
            style: 'cancel',
          },
        ],
      );
      return null;
    }
    if (current.mission.id === undefined) {
      Alert.alert('확인', '미션을 선택해주셔야 합니다'),
        [
          {
            text: '확인',
            styles: 'cancel',
          },
        ];
      return null;
    }

    if (id) {
      alarmManager.updateAlarm({alarm: current});
    } else {
      const updatedAlarm = {...current, active: true};
      alarmManager.saveAlarm(updatedAlarm);
      updateAlarm(updatedAlarm);
    }
    closeModal();
  };
  return (
    <View style={styles.ButtonContainer}>
      <Text style={styles.ButtonText} onPress={onClickSaveButton}>
        저장하기
      </Text>
    </View>
  );
};

export default SaveAlarmButton;

const styles = StyleSheet.create({
  ButtonContainer: {
    marginTop: 15,
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
