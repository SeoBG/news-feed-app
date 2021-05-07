import React from 'react';
import * as Localization from 'expo-localization';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import ArticleScreen from './screens/ArticleScreen';
import i18n from './i18n/locales';
import LocalizationContext from './LocalizationContext.js';

// App.js
import Constants from 'expo-constants';
console.log('Constants.manifest.extra.fact ', Constants.manifest.extra.apiKey)

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
    >
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        initialParams={{ dropdownSelectedLanguage: 'us', apiKey:Constants.manifest.extra.apiKey }}
        
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        initialParams={{ dropdownSelectedLanguage: 'us' }}
        options={{
          title:'Settings',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={({ route }) => ({ title: route.params.sourceName,headerTitleAlign: 'center', })}
        
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
