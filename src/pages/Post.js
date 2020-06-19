import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Post({ navigation }) {
    const post = navigation.getParam('post');
    const isTrendingTopic = navigation.getParam('isTrendingTopic');
    return <WebView source={{ uri: isTrendingTopic? post.webSearchUrl : post.url }} style={{flex: 1}} />
}