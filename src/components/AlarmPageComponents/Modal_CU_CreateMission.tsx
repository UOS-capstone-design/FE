import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';

const Modal_CU_CreateMission = () => {
  return (
    <View>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderTitle}>미션 추가</Text>
        <View style={styles.HeaderModeSelectContariner}>
          <Text style={styles.HeaderModeText}>엄격 모드</Text>
          <Switch />
        </View>
      </View>
    </View>
  );
};

export default Modal_CU_CreateMission;

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    borderColor: 'gray',
  },
  HeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  HeaderModeSelectContariner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  HeaderModeText: {
    color: 'black',
  },
});
