import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Post({ navigation }) {
    const post = navigation.getParam('post');
    return <WebView source={{ uri: post.url}} style={{flex: 1}} />
}