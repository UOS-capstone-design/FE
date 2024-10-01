/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomTab from './src/components/BottomTab';
import {RecoilRoot} from 'recoil';
import Initializer from './src/components/Initializer';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <RecoilRoot>
      <Initializer />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Bottom" component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
