import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import AddAlarmButton from '../components/AlarmPageComponents/AddAlarmButton';
import AlarmList from '../components/AlarmPageComponents/AlarmList';

const AlarmPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text="알람 리스트" />
      <AddAlarmButton />
      <AlarmList />
    </SafeAreaView>
  );
};

export default AlarmPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
