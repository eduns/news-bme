import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import News from '../components/News';
import Loader from '../components/Loader';

import api from '../services/api';

import * as ColorTheme from '../utils/ColorTheme';

export default function TrendingTopics({ navigation }) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchTopics() {
        const params = { mkt: 'en-us' }

        try {
            setLoading(true)

            const response = await api.get('/trendingtopics', { params })

            setNews(response.data.value)

            setLoading(false)
        } catch (error) {
            console.error('ERRO TRENDING', error)
        }
    }

    useEffect(() => {
        fetchTopics()
    }, [])

    return (
        <>
        <Loader loading={loading} />

        {news.length > 0?
        (<View style={styles.newsCounterHeader}>
            <Text style={styles.newsCounterHeaderText}>{news.length} resultados</Text>
        </View>) : null}

        <FlatList
            data={news}
            keyExtractor={item => item.newsSearchUrl}
            renderItem={({ item }) => (
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        if (!global.userIsLogged) {
                            navigation.dispatch(
                                NavigationActions.navigate({
                                    routeName: 'LoginStack',
                                    action: NavigationActions.navigate({
                                        routeName: 'Login',
                                        params: { post: item, isTrendingTopic: true }
                                    })
                                })
                            )
                        } else {
                            navigation.navigate('Post', { post: item, isTrendingTopic: true })
                        }
                    }}
                >
                    <News data={item} isTrendingTopic={true} />
                </TouchableOpacity>
            )}
        />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },

    newsCounterHeader: {
        width: 115,
        height: 30,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        right: 0,
        backgroundColor: ColorTheme.Modes.MILD
    },

    newsCounterHeaderText: {
        fontWeight: 'bold',
        color: '#fff'
    }
});