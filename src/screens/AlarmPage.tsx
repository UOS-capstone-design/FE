import {ScrollView, SectionList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';
import AddAlarmButton from '../components/AlarmPageComponents/AddAlarmButton';
import AlarmList from '../components/AlarmPageComponents/AlarmList';
import AlarmListHeader from '../components/AlarmPageComponents/AlarmListHeader';
import {SelectList} from '../types';

const AlarmPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text="알람 관리" />
      <ScrollView style={styles.content}>
        <AlarmList />
      </ScrollView>
      <AddAlarmButton />
    </SafeAreaView>
  );
};

export default AlarmPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  content: {
    flex: 1,
  },
});
