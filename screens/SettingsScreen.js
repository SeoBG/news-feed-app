
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Icon, Footer, FooterTab, Button, Picker } from "native-base";
import LocalizationContext from '../LocalizationContext';


export default function SettingsScreen({route,navigation}) {
  const { t, locale, setLocale } = React.useContext(LocalizationContext);
  console.log(locale)
  // Hooks
  const [loading, setLoading] = useState(false);
  /* Get the param */
  const { dropdownSelectedLanguage } = route.params;

  // Loading 
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const onValueChange = (value) => {
   
    setLocale(value)
    console.log('value ', value)
    navigation.setParams({
      dropdownSelectedLanguage: value,
    })
    
  }
  console.log('dropdownSelectedLanguage ', dropdownSelectedLanguage)
  return (

    <Container>
      <StatusBar hidden />
      <ListItem bottomDivider>
        <Ionicons
          name={'language'}
        />
        <ListItem.Content>
          <ListItem.Title>{t('settingsscreen.language')}</ListItem.Title>
        </ListItem.Content>
        <Picker
          mode="dropdown"
          iosHeader="Language"
          iosIcon={<Icon name="arrow-down" />}
          style={{ width: undefined }}
          selectedValue={dropdownSelectedLanguage}
          onValueChange={onValueChange.bind(this)}
        >
          <Picker.Item label="English" value="us" />
          <Picker.Item label="Български" value="bg" />
        </Picker>
        {/* {locale === 'en-US' ? (
        <Button onPress={() => setLocale('bg')}>
            <Text>Switch to Bulgarian</Text>
          </Button>
      ) : (
        <Button onPress={() => setLocale('en-US')}>
            <Text>Switch to English</Text>
          </Button>
      )} */}
      </ListItem>
      <Content />
      <Footer>
        <FooterTab>
        <Button 
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('MainScreen', {
            dropdownSelectedLanguage: dropdownSelectedLanguage
          });
        }}
        >
            <Icon active name="newspaper" />
            <Text>{t('mainscreen.leftTabNavigator')}</Text>
          </Button>
          <Button active>
            <Icon active name="settings" />
            <Text>{t('mainscreen.rightTabNavigator')}</Text>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageStyle: {

    height: 200,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5
  },
  contentStyle: {
    fontSize: 14,
    padding: 5
  }
});

