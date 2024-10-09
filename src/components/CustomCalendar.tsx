import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';

LocaleConfig.locales['fr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['월', '화', '수', '목', '금', '토', '일'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'fr';

interface Period {
  recentPick: string;
  lastPick: string;
}

type Props = {
  isPeriod: boolean;
};

const CustomCalendar = ({isPeriod}: Props) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>({
    recentPick: '',
    lastPick: '',
  });
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const date = new Date();
  const minDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
  const maxDate = `${date.getFullYear() + 1}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const onDayPress = (day: {dateString: string}) => {
    const current = day.dateString;
    if (!selectedPeriod.recentPick) {
      setSelectedPeriod({recentPick: current, lastPick: ''});
    } else {
      setSelectedPeriod({
        recentPick: current,
        lastPick: selectedPeriod.recentPick,
      });
    }
  };

  useEffect(() => {
    const markedDatesObj: MarkedDates = {};
    if (
      !selectedPeriod.lastPick ||
      selectedPeriod.recentPick === selectedPeriod.lastPick
    ) {
      // 하나의 날짜만 선택된 경우
      markedDatesObj[selectedPeriod.recentPick] = {
        selected: true,
        selectedColor: '#50cebb',
      };
    } else if (selectedPeriod.recentPick && selectedPeriod.lastPick) {
      // 두 개의 날짜가 선택된 경우
      const sortedDates = [
        selectedPeriod.recentPick,
        selectedPeriod.lastPick,
      ].sort();
      const startDate = new Date(sortedDates[0]);
      const endDate = new Date(sortedDates[1]);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const dateString = d.toISOString().split('T')[0];
        if (dateString === sortedDates[0]) {
          markedDatesObj[dateString] = {startingDay: true, color: '#50cebb'};
        } else if (dateString === sortedDates[1]) {
          markedDatesObj[dateString] = {endingDay: true, color: '#50cebb'};
        } else {
          markedDatesObj[dateString] = {color: '#70d7c7', textColor: 'white'};
        }
      }
    }
    setMarkedDates(markedDatesObj);
  }, [selectedPeriod]);

  useEffect(() => {
    console.log(selectedPeriod);
  }, [selectedPeriod]);

  return (
    <View>
      <Calendar
        theme={{
          'stylesheet.calendar.header': {
            dayTextAtIndex5: {color: 'blue'},
            dayTextAtIndex6: {color: 'red'},
            dayTextAtIndex0: {color: 'black'},
            dayTextAtIndex1: {color: 'black'},
            dayTextAtIndex2: {color: 'black'},
            dayTextAtIndex3: {color: 'black'},
            dayTextAtIndex4: {color: 'black'},
          },
        }}
        minDate={minDate}
        maxDate={maxDate}
        monthFormat={'yyyy년 MM월'}
        onDayPress={
          isPeriod
            ? onDayPress
            : (day: {dateString: string}) =>
                setSelectedPeriod({recentPick: day.dateString, lastPick: ''})
        }
        markingType={selectedPeriod.lastPick ? 'period' : 'custom'}
        markedDates={markedDates}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default CustomCalendar;
