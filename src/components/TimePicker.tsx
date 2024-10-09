import React, {useEffect, useState} from 'react';
import {View, Platform, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useCurrentAlarm} from '../hooks/useCurrentAlarm';

const TimePicker = () => {
  const [show, setShow] = useState(false);
  const {current, updateAlarm} = useCurrentAlarm();

  const onChangeInternal = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || current.timer;
    setShow(Platform.OS === 'ios');
    updateAlarm({timer: currentDate});
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View>
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={current.timer}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeInternal}
        />
      ) : (
        <View>
          <View>
            <Text>시간 포맷 설정</Text>
          </View>
          <TouchableOpacity style={styles.AndroidSelectTimeButtonContainer}>
            <Text style={styles.AndroidSelectTimeText} onPress={showTimepicker}>
              시간 선택
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={current.timer}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeInternal}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  AndroidSelectTimeButtonContainer: {
    backgroundColor: '#007AFF', // iOS 블루 색상 사용
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  AndroidSelectTimeText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
