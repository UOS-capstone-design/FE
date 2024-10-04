import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal_Repeat_Alarm from './Modal_Repeat_Alarm.tsx';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm.ts';
import {RepeatState} from '../../types.ts';
import Entypo from 'react-native-vector-icons/Entypo';

interface LabelItem {
  [key: string]: string;
}

export function ViewCurrentSelectedRepeatDays(repeat: RepeatState) {
  const label: LabelItem[] = [
    {once: '반복 없음'},
    {mon: '월'},
    {tue: '화'},
    {wed: '수'},
    {thu: '목'},
    {fri: '금'},
    {sat: '토'},
    {sun: '일'},
  ];

  const ChangeForm = Object.entries(repeat)
    .filter(([_, value]) => value === true)
    .map(([key, _]) => {
      const found = label.find(item => key in item);
      return found ? found[key] : '';
    })
    .filter(item => item !== '');

  return ChangeForm.length === 7
    ? '매일'
    : ChangeForm.length === 2 &&
      ChangeForm.includes('토') &&
      ChangeForm.includes('일')
    ? '주말'
    : ChangeForm.length === 5 &&
      ChangeForm.includes('월') &&
      ChangeForm.includes('화') &&
      ChangeForm.includes('수') &&
      ChangeForm.includes('목') &&
      ChangeForm.includes('금')
    ? '평일'
    : ChangeForm.includes('반복 없음') && ChangeForm.length === 1
    ? ChangeForm
    : ChangeForm.join(', ');
}

const Modal_CU_RepeatPicker = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const {current} = useCurrentAlarm();

  return (
    <View style={styles.repeatContainer}>
      <Text style={styles.title}>반복 설정</Text>
      <TouchableOpacity
        onPress={() => {
          setIsVisibleModal(true);
        }}>
        <View style={styles.repeatTextContainer}>
          <Text style={styles.repeatText}>
            {ViewCurrentSelectedRepeatDays(current.repeat)}
            <Entypo name="chevron-small-right" size={16} />
          </Text>
        </View>
      </TouchableOpacity>
      <Modal_Repeat_Alarm
        onCloseModal={() => {
          setIsVisibleModal(false);
        }}
        isVisibleModal={isVisibleModal}
      />
    </View>
  );
};

export default Modal_CU_RepeatPicker;

const styles = StyleSheet.create({
  repeatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  repeatTextContainer: {
    flexDirection: 'row',
    alignItems: 'center', // 수직 중앙 정렬
    justifyContent: 'center',
  },
  repeatText: {
    color: 'black',
    fontWeight: 'semibold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
