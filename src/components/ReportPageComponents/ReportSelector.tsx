import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useReportManager} from '../../hooks/useReportManager';

const ReportSelector = () => {
  const {updateCurrentDuration} = useReportManager();
  return (
    <View style={styles.Container}>
      <View style={styles.SelectContainer}>
        <TouchableOpacity onPress={() => updateCurrentDuration('Today')}>
          <Text>오늘</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateCurrentDuration('Week')}>
          <Text>이번주</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateCurrentDuration('Month')}>
          <Text>이번달</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.CalenderContainer}>
        <Text>날짜 선택</Text>
        <Text>달력 사진</Text>
      </View>
    </View>
  );
};

export default ReportSelector;

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  SelectContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  CalenderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
