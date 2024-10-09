import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import DelayedMissionList from '../components/AllyojoPageComponents/DelayedMissionList';
import PageHeader from '../components/PageHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

const MonitoringPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text={'알려줘'} />
      <DelayedMissionList />
    </SafeAreaView>
  );
};

export default MonitoringPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
});
