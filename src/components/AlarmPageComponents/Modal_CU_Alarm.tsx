import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Alarm} from '../../types';
import Modal_CU_Header from './Modal_CU_Header';
import TimePicker from '../TimePicker';
import Modal_CU_CreateMission from './Modal_CU_CreateMission';
import Modal_CU_Setting from './Modal_CU_Setting';
import RepeatPicker from './RepeatPicker';
import AlarmContext from './AlarmContext';
import SaveAlarmButton from './SaveAlarmButton';

type Props = {
  closeModal: () => void;
  isVisibleModal: boolean;
  alarm?: Alarm;
};

const Modal_CU_Alarm = ({closeModal, isVisibleModal, alarm}: Props) => {
  return (
    <Modal
      visible={isVisibleModal}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={false}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.modalContainer}>
          <AlarmContext initial={alarm}>
            <Modal_CU_Header closeModal={closeModal} alarm={alarm} />
            <TimePicker />
            <RepeatPicker />
            <Modal_CU_CreateMission />
            <Modal_CU_Setting />
            <SaveAlarmButton id={alarm?.id} closeModal={closeModal} />
          </AlarmContext>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default Modal_CU_Alarm;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
});
