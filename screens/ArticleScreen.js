
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import * as Localization from 'expo-localization';
import { Pressable } from 'react-native';

export default function ArticleScreen({ route, navigation }) {

    /* Get the param */
    const { itemTitle, itemContent, urlToImage, url, sourceName } = route.params;

    console.log('source ', sourceName)
    console.log('Localization.locales ', Localization.locale)

    const handleClick = () => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Image
                resizeMode={'cover'}
                style={styles.imageStyle}
                source={{ uri: urlToImage }}
            />
            <Text style={styles.titleStyle}>{itemTitle}</Text>
            <Text style={styles.contentStyle}>{itemContent}</Text>
            <Pressable style={styles.buttonStyle} onPress={handleClick}><Text style={styles.urlTextStyle}>Check full article</Text></Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5
    },
    imageStyle: {
        height: 200,
    },
    contentStyle: {
        fontSize: 14,
        padding: 5
    },
    urlTextStyle: {
        color: 'red',
        textAlign: 'center'
    },
    buttonStyle: {
        borderWidth: 1,
        padding: 5,
        borderColor: 'orange',
        backgroundColor: 'orange'
    }
});

