import React from 'react';
import { WebView } from 'react-native-webview';

import store from '../utils/StoreData';

export default function Post({ navigation }) {
    const post = navigation.getParam('post');
    const isTrendingTopic = navigation.getParam('isTrendingTopic');
    if(!isTrendingTopic) store.saveAccess(`user_${global.user.email}`, post);
    return <WebView style={{flex: 1}} source={{ uri: isTrendingTopic? post.webSearchUrl : post.url }} />
}