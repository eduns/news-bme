import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import store from '../utils/StoreData';

export default function Post({ navigation }) {
    const post = navigation.getParam('post');
    store.saveAccess(`user_${global.user.email}`, post)
    const isTrendingTopic = navigation.getParam('isTrendingTopic');
    return <WebView style={{flex: 1}} source={{ uri: isTrendingTopic? post.webSearchUrl : post.url }} />
}