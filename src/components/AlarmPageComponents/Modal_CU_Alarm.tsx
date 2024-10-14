import {Modal, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Alarm} from '../../types';
import Modal_CU_Header from './Modal_CU_Header';
import TimePicker from '../TimePicker';
import Modal_CU_CreateMission from './Modal_CU_CreateMission';
import Modal_CU_Setting from './Modal_CU_Setting';
import RepeatPicker from './Modal_CU_RepeatPicker';
import AlarmContext from './AlarmContext';
import SaveAlarmButton from './SaveAlarmButton';
import Modal_CU_Content from './Modal_CU_Content';

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
          <AlarmContext initial={alarm || undefined}>
            <Modal_CU_Header closeModal={closeModal} alarm={alarm} />
            <ScrollView>
              <Modal_CU_Content />
              <SaveAlarmButton id={alarm?.id} closeModal={closeModal} />
            </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});
