

import React from 'react';
import * as Localization from 'expo-localization';
import { Button, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import i18n from './i18n/locales'
import LocalizationContext from './LocalizationContext.js';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      header='null'
      headerMode='none'
    >
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        initialParams={{ dropdownSelectedLanguage: 'us' }}
        // options={{
        //   headerTitle: () => (
        //     <Ionicons name="md-checkmark-circle" size={32} color="green" />
        //   ),
        //   headerTitleAlign: 'center',
        //   headerLeft: () => (
        //     <Ionicons name="md-checkmark-circle" size={32} color="green" />
        //   ),
        // }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        initialParams={{ dropdownSelectedLanguage: 'us' }}
      />
    </Stack.Navigator>
  );
}



export default function App() {
  const [locale, setLocale] = React.useState(Localization.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );
  if (locale === 'en-US') {
    setLocale('us')
  }
  return (
    <LocalizationContext.Provider value={localizationContext}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </LocalizationContext.Provider>
  );
}
