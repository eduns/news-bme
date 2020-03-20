import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import News from '../components/News';
import BackButton from '../components/BackButton';

export default function Post({ navigation }) {
    const post = navigation.getParam('post');
    return (
        <>
        <ScrollView>
            <News data={post} isPreview={false} />
        </ScrollView>

        <BackButton navDispatch={navigation.dispatch} backScreen={NavigationActions.back} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})