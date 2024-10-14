import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import DelayedMissionList from '../components/AllyojoPageComponents/DelayedMissionList';
import PageHeader from '../components/PageHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddTodoButton from '../components/AllyojoPageComponents/AddTodoButton';

const AllyojoPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader text={'알려줘'} />
      <DelayedMissionList />
      <ScrollView style={styles.todoContainer}></ScrollView>
      <AddTodoButton />
    </SafeAreaView>
  );
};

export default AllyojoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  todoContainer: {
    flex: 1,
  },
});
