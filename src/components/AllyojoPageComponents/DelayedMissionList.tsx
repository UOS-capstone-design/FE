import {
  Animated,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useHandleAlldAlarm} from '../../hooks/useHandleAllAlarm';
import DelayedMissionItem from './DelayedMissionItem';
import Entypo from 'react-native-vector-icons/Entypo';

const DelayedMissionList = () => {
  const {findAlarmDelayFromAll} = useHandleAlldAlarm();
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const maxHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500], // 최대 높이를 조절하세요
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.headerContainer}>
        <Text style={styles.headerText}>미션을 수행해주세요</Text>
        <Entypo name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} />
      </TouchableOpacity>
      <Animated.View style={[styles.contentContainer, {maxHeight}]}>
        {findAlarmDelayFromAll &&
          findAlarmDelayFromAll.map(alarm => (
            <DelayedMissionItem key={alarm.id} delayedAlarm={alarm} />
          ))}
      </Animated.View>
    </View>
  );
};

export default DelayedMissionList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    overflow: 'hidden',
  },
  //   headerContainer: {
  //     paddingVertical: 15,
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#ddd',
  //     justifyContent: 'space-between',
  //     flexDirection: 'row',
  //   },
  //   headerText: {
  //     fontSize: 18,
  //     color: 'black',
  //     fontWeight: 'bold',
  //   },
  headerContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  contentContainer: {
    overflow: 'hidden',
  },
});
