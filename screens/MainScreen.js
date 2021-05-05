
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import * as Localization from 'expo-localization';
import LocalizationContext from '../LocalizationContext';

export default function MainScreen( {route,navigation} ) {
  
  const { t } = React.useContext(LocalizationContext);
 /* Get the param */
 const { dropdownSelectedLanguage } = route.params;
 console.log('dropdownSelectedLanguage ', dropdownSelectedLanguage)
  // Hooks
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [arrayholder, setArrayholder] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const isFocused = useIsFocused();
console.log('Localization.locales ', Localization.locale)
 
  useEffect(() => {
    fetchData();
  }, [route, isFocused]);
  
  
  const fetchData = async () => {
    const res = await fetch('https://newsapi.org/v2/top-headlines?country=' + `${dropdownSelectedLanguage}` + '&apiKey=27680766bb6749fabb17dd2bcb919552'); // use your own api key,this one have only 100 request per day
    const json = await res.json();
    setData(json.articles);
    // console.log('data', data);
    setLoading(false);
    setArrayholder(json.articles);
    // console.log(json.articles)

  };
  const searchFilterFunction = (text) => {
      const newData = arrayholder.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    
  };
  // Loading 
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <SearchBar
        placeholder={t('mainscreen.searchPlaceholder')}
        value={search}
        onChangeText={(text) => searchFilterFunction(text)}
      />
      
      <FlatList
        containerStyle={{ marginBottom: 50 }}
        data={data}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', margin: 10, borderWidth: 1, padding: 3 }}>
            <View style={{ width: '60%' }}>
              <Image
                resizeMode={'cover'}
                style={styles.imageStyle}
                source={{ uri: item.urlToImage }}
              />
            </View>
            <View style={{ width: '40%', }}>
              <Text style={styles.titleStyle}>{item.title}</Text>

            </View>
          </View>
        )}
        keyExtractor={item => item.title}
      />
      <Footer>
          <FooterTab>
            <Button active>
            <Icon active name="newspaper" />
              <Text>{t('mainscreen.leftTabNavigator')}</Text>
            </Button>
            <Button onPress={() => navigation.navigate('SettingsScreen', {
            dropdownSelectedLanguage: dropdownSelectedLanguage
          })}>
            <Icon active name="settings" />
              <Text>{t('mainscreen.rightTabNavigator')}</Text>
            </Button>
          </FooterTab>
        </Footer>
    </View>
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

