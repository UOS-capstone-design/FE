import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm.ts';
import CheckBox from '@react-native-community/checkbox';
import {Button} from 'react-native';
import {RepeatState, DayKey} from '../../types'; // 타입을 정의한 파일에서 import

const days: [DayKey, string][] = [
  ['once', '반복 없음'],
  ['mon', '월'],
  ['tue', '화'],
  ['wed', '수'],
  ['thu', '목'],
  ['fri', '금'],
  ['sat', '토'],
  ['sun', '일'],
];

const RepeatDatePicker = ({onClose}: {onClose: () => void}) => {
  const initialRepeatState: RepeatState = {
    once: true,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  };

  const [selectedDays, setSelectedDays] =
    useState<RepeatState>(initialRepeatState);
  const {updateAlarm} = useCurrentAlarm();
  const isToggleSelectDayButton = useRef({
    holiday: false,
    weekend: false,
    everyday: false,
  });

  const toggleCheckBox = (key: DayKey) => {
    if (key === 'once') {
      setSelectedDays(initialRepeatState);
    } else {
      setSelectedDays(prev => ({
        ...prev,
        once: false,
        [key]: !prev[key],
      }));
    }
  };

  const onChangeToggleButton = (key: 'holiday' | 'weekend' | 'everyday') => {
    const entries = Object.entries(isToggleSelectDayButton.current);
    const newObj = entries.map(([k, v]) => [k, k === key ? !v : false]);
    isToggleSelectDayButton.current = Object.fromEntries(newObj);
  };

  const toggleWeekendButton = () => {
    onChangeToggleButton('weekend');
    if (isToggleSelectDayButton.current.weekend) {
      return setSelectedDays({
        ...initialRepeatState,
        once: false,
        sat: true,
        sun: true,
      });
    } else if (!isToggleSelectDayButton.current.weekend) {
      return setSelectedDays({
        ...initialRepeatState,
        once: false,
        sat: false,
        sun: false,
      });
    }
  };

  const toggleHolidayButton = () => {
    onChangeToggleButton('holiday');
    if (isToggleSelectDayButton.current.holiday) {
      setSelectedDays({
        ...initialRepeatState,
        once: false,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
      });
    } else if (!isToggleSelectDayButton.current.holiday) {
      setSelectedDays({
        ...initialRepeatState,
        once: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
      });
    }
  };

  const toggleEveryDayButton = () => {
    onChangeToggleButton('everyday');
    if (isToggleSelectDayButton.current.everyday) {
      setSelectedDays(prev => {
        const entries = Object.entries(prev) as [DayKey, boolean][];
        const newEntries = entries.map(([key, value]) => [
          key,
          key === 'once' ? false : true,
        ]);
        return Object.fromEntries(newEntries) as RepeatState;
      });
    } else if (!isToggleSelectDayButton.current.everyday) {
      setSelectedDays(prev => {
        const entries = Object.entries(prev) as [DayKey, boolean][];
        const newEntries = entries.map(([key, value]) => [
          key,
          key === 'once' ? false : false,
        ]);
        return Object.fromEntries(newEntries) as RepeatState;
      });
    }
  };

  const onClickSaveButton = () => {
    updateAlarm({repeat: selectedDays});
    onClose();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.ButtonInviContainer}>
          <Text style={styles.ButtonInviText} onPress={toggleHolidayButton}>
            평일
          </Text>
        </View>
        <View style={styles.ButtonInviContainer}>
          <Text style={styles.ButtonInviText} onPress={toggleWeekendButton}>
            주말
          </Text>
        </View>
        <View style={styles.ButtonInviContainer}>
          <Text style={styles.ButtonInviText} onPress={toggleEveryDayButton}>
            매일
          </Text>
        </View>
      </View>
      {days.map(([key, label]) => (
        <View key={key} style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={selectedDays[key]}
            onValueChange={() => toggleCheckBox(key)}
            animationDuration={0.1}
            boxType={'circle'}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}
      <View style={styles.SaveButtonContainer}>
        <Text style={styles.SaveButtonText} onPress={onClickSaveButton}>
          추가하기
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RepeatDatePicker;

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'semibold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 10,
  },
  ButtonInviContainer: {
    backgroundColor: 'black',
    borderRadius: 5,
    marginVertical: 10,
  },
  ButtonInviText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  SaveButtonContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginVertical: 10,
  },
  SaveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 15,
  },
});
