import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  onPressButton: () => void;
};

const AddMissionButton = ({onPressButton}: Props) => {
  return (
    <TouchableOpacity
      style={styles.AddMissionContainer}
      onPress={onPressButton}>
      <Entypo
        name="plus"
        style={styles.AddMissionText}
        size={24}
        color={'gray'}
      />
    </TouchableOpacity>
  );
};

export default AddMissionButton;

const styles = StyleSheet.create({
  AddMissionContainer: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 25,
  },
  AddMissionText: {
    textAlign: 'center',
  },
});
