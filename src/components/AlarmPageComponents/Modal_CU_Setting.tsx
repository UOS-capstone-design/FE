import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import {useCurrentAlarm} from '../../hooks/useCurrentAlarm.ts';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';
import {SettingTimeInterval} from '../../types';
import Modal_CU_Setting_Interval from './Modal_CU_Setting_Interval';

const Modal_CU_Setting = () => {
  const {current, updateAlarm} = useCurrentAlarm();
  const [isVibration, setIsVibration] = useState(false);
  const [volume, setVolume] = useState(50);
  const [interval, setInterval] = useState<SettingTimeInterval>('반복 없음');
  const [isVisibleSettingIntervalModal, setIsVisibleSettingIntervalModal] =
    useState<boolean>(false);

  // const updateSettings = (
  //   newSettings: Partial<{
  //     isVibration: boolean;
  //     volume: number;
  //     interval: SettingTimeInterval;
  //   }>,
  // ) => {
  //   const updatedSettings = {

  //     ...newSettings,
  //   };
  //   updateAlarm({setting: updatedSettings});
  // };

  const updateSettings = useCallback(
    (
      newSettings: Partial<{
        isVibration: boolean;
        volume: number;
        interval: SettingTimeInterval;
      }>,
    ) => {
      const updatedSettings = {
        isVibration,
        volume,
        interval,
        ...newSettings,
      };
      updateAlarm({setting: updatedSettings});
    },
    [current],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>알람 설정</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>진동 사용</Text>
        <Switch
          value={current.setting.isVibration}
          onValueChange={value => {
            setIsVibration(value);
            updateSettings({isVibration: value});
          }}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>알람 볼륨</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={current.setting.volume}
            onValueChange={value => {
              setVolume(value);
              updateSettings({volume: value});
            }}
          />
          <Text style={styles.volumeText}>
            {current.setting.volume.toFixed(0)}
          </Text>
        </View>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>반복 간격</Text>
        <TouchableOpacity
          onPress={() => setIsVisibleSettingIntervalModal(true)}>
          <Text>{current.setting.interval}</Text>
        </TouchableOpacity>
      </View>
      <Modal_CU_Setting_Interval
        currentInterval={interval}
        isVisibleSettingIntervalModal={isVisibleSettingIntervalModal}
        onCloseModal={() => setIsVisibleSettingIntervalModal(false)}
        setInterval={setInterval}
        updateSettings={updateSettings}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: 'black',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  slider: {
    flex: 1,
  },
  volumeText: {
    marginLeft: 10,
    width: 30,
    textAlign: 'right',
  },
});

export default Modal_CU_Setting;
