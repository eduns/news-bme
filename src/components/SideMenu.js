import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { useSearchCategory } from '../context/SearchCategory';

import store from '../utils/StoreData';
import * as ColorTheme from '../utils/ColorTheme';
import categoryUtil from '../utils/Category';

export default function SideMenu({ navigation }) {
    const { setSearchCategory } = useSearchCategory();

    function goToScreen(screen, screenStack) {
        navigation.dispatch(
            NavigationActions.navigate({
                routeName: screenStack,
                action: NavigationActions.navigate({
                    routeName: screen
                }),
            })
        )
    }

    return (
        <>
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.sideMenuImgProfile}
                source={global.userIsLogged && global.user.imgProfile? {uri: global.user.imgProfile}: require('../assets/profile-placeholder.png')}
            />

            {global.userIsLogged? (
                <View style={[styles.menuItem, {justifyContent: 'center', backgroundColor: ColorTheme.Modes.DARK,
                marginTop: 5, borderBottomWidth: 0, height: 40}]}>
                    <Text style={{...styles.menuItemFont, fontWeight: 'bold', color: 'white' }}>{global.user.name}</Text>
                </View>
            ): null}

            <ScrollView contentContainerStyle={styles.sideMenuContainer}>
                <View style={styles.divider} />

                <View style={{ width: '100%' }}>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.menuItem}
                        key={'Login'}
                        onPress={() => {
                            if(global.userIsLogged) {
                                global.user = null;
                                global.userIsLogged = false;
                                navigation.toggleDrawer()
                            } else {
                                goToScreen('Login', 'LoginStack')
                            }
                        }}
                    >
                        <View style={styles.menuItemIcon}>
                            <Ionicons name={global.userIsLogged ? 'md-log-out' : 'md-log-in'} size={24} color={ColorTheme.Modes.MILD} />
                        </View>

                        <Text style={styles.menuItemFont}>
                           {global.userIsLogged? 'Sair': 'Entrar'}
                        </Text>
                    </TouchableOpacity>

                    {global.userIsLogged? (
                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.menuItem}
                        key={'Acesso'}
                        onPress={() => {
                            goToScreen('Chart', 'MainStack')
                        }}
                    >
                        <View style={styles.menuItemIcon}>
                            <Ionicons name='md-pie' size={24} />
                        </View>

                        <Text style={styles.menuItemFont}>
                            Gráfico de Acesso
                        </Text>
                    </TouchableOpacity>) : null}

                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.menuItem}
                        key={'Feed'}
                        onPress={() => {
                            navigation.toggleDrawer()
                            setSearchCategory('ALL')
                        }}
                        >
                        <View style={styles.menuItemIcon}>
                            <Ionicons name='md-paper' size={24} />
                        </View>

                        <Text style={styles.menuItemFont}>
                            Notícias
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.menuItem}
                        key={'TrendingTopics'}
                        onPress={() => {
                            goToScreen('TrendingTopics', 'MainStack')
                        }}
                        >
                        <View style={styles.menuItemIcon}>
                            <Ionicons name='md-trending-up' size={24} />
                        </View>

                        <Text style={styles.menuItemFont}>
                            Trending Topics
                        </Text>
                    </TouchableOpacity>

                    {categoryUtil.CATEGORIES.map(category => (
                        <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.menuItem}
                        key={category.name}
                        onPress={() => {
                            navigation.toggleDrawer()
                            setSearchCategory(category.name)
                        }}
                        >
                            <View style={styles.menuItemIcon}>
                                <Ionicons name={category.icon} size={24} />
                            </View>
                            <Text style={styles.menuItemFont}>
                                {categoryUtil.translate(category.name)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>

        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>News BME</Text>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    },

    divider: {
        width: '100%',
        height: 2,
        backgroundColor: '#e2e2e2'
    },

    menuItemFont: {
        fontSize: 18,
        color: 'black'
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 2,
        borderBottomColor: '#e2e2e2'
    },

    menuItemIcon: {
        marginRight: 10,
        marginLeft: 20
    },

    sideMenuContainer: {
        width: '100%',
        top: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 0
    },

    sideMenuImgProfile: {
        height: 200,
        width: 200,
        marginTop: 35,
        marginLeft: 40,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: ColorTheme.Modes.DARK
    },

    footerContainer: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey'
    },

    footerText: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 20
    }
});