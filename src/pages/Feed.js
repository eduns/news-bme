import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ModalDropDown from 'react-native-modal-dropdown';

import { useSearchCategory } from '../context/SearchCategory';

import News from '../components/News';
import Loader from '../components/Loader';

import api from '../services/api';

import categoryUtil from '../utils/Category';
import * as ColorTheme from '../utils/ColorTheme';

export default function Feed({ navigation }) {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [provider, setProvider] = useState('');
    const { searchCategory } = useSearchCategory();

    async function fetchNews() {
        let params = { q: '', mkt: 'pt-br' };

        try {
            params = (searchCategory === 'ALL')? params : {...params, category: searchCategory };

            setLoading(true);

            const response = await api.get('/', { params });

            let providersNames = response.data.value.map(article => {
                return article.provider[0].name
            }).filter((name, index, names) => {
                return names.indexOf(name) == index
            });

            let categoriesNames = response.data.value.map(article => {
                return categoryUtil.translate(article.category)
            }).filter((name, index, names) => {
                return names.indexOf(name) == index
            })

            setProviders(providersNames);
            setCategories(categoriesNames);
            setNews(response.data.value);
            setFilteredNews(response.data.value);
            setLoading(false)
        } catch(error) {
            console.log('ERRO FEED', error)
        }
    }

    function filterNews() {
        setFilteredNews(
            news.filter(article => {
                return category !== ''? article['category'] === category : true
            })
            .filter(article => {
                return provider !== ''? article['provider'][0]['name'] === provider : true
            })
        )
    }

    useEffect(() => {
        fetchNews()
    }, [searchCategory]);

    useEffect(() => {
        filterNews()
    }, [provider, category])

    return (
        <>
        <Loader loading={loading} />

        <View style={styles.newsCounterHeader}>
          <Text style={styles.newsCounterHeaderText}>{filteredNews.length} {filteredNews.length == 1? 'resultado' : 'resultados'}</Text>
        </View>

        <View style={styles.filterBar}>
            <ModalDropDown
                style={styles.dropDown}
                textStyle={{ fontSize: 20 }}
                dropdownStyle={{ width: 200, borderColor: ColorTheme.Modes.MILD, borderWidth: 2 }}
                dropdownTextStyle={{ fontSize: 20 }}
                dropdownTextHighlightStyle={{ fontWeight: 'bold', color: ColorTheme.Modes.DARK }}
                defaultValue={'Escolha o veículo'}
                options={providers}
                onSelect={(_, option) => {
                    setProvider(option)
                }}
            />
            <ModalDropDown
                style={styles.dropDown}
                textStyle={{ fontSize: 20 }}
                dropdownStyle={{ width: 200, borderColor: ColorTheme.Modes.MILD, borderWidth: 2 }}
                dropdownTextStyle={{ fontSize: 20 }}
                dropdownTextHighlightStyle={{ fontWeight: 'bold', color: ColorTheme.Modes.DARK }}
                defaultValue={'Escolha a categoria'}
                options={categories}
                onSelect={(_, option) => {
                    setCategory(categoryUtil.category(option))
                }}
            />
        </View>

        <FlatList
            data={filteredNews}
            keyExtractor={item => item.url}
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
                                        params: { post: item }
                                    })
                                })
                            )
                        } else {
                            navigation.navigate('Post', { post: item })
                        }
                    }}
                >
                    <News data={item} />
                </TouchableOpacity>
            )}
        />
      </>
    );
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
    },

    filterBar: {
        height: 90
    },

    dropDown: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: ColorTheme.Modes.MILD,
        backgroundColor: '#fff'
    }
});