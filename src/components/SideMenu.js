import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import store from '../utils/store';

export default function SideMenu({ navigation }) {

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
            <Ionicons name='md-person' size={210} style={styles.sideMenuProfileIcon} />
            
            {global.userIsLogged? (
                <View style={{...styles.menuItem,
                    justifyContent: 'center',
                    backgroundColor: '#006fa6'}}>
                    <Text style={{...styles.menuItemFont, fontWeight: 'bold', color: 'white' }}>{global.user.name}</Text>
                </View>
            ): null}

            <View style={styles.sideMenuContainer}>
                <View style={styles.divider} />

                <View style={{ width: '100%' }}>
                    <View style={styles.menuItem} key={'Login'}>
                        <View style={styles.menuItemIcon}>
                            <Ionicons name={global.userIsLogged? 'md-log-out' : 'md-log-in'} size={20} />
                        </View>

                        <Text style={styles.menuItemFont} onPress={() => {
                            if(global.userIsLogged) {

                                if(store.delete('user')) {
                                    global.userIsLogged = false;
                                    global.user = null;
                                    goToScreen('Feed', 'MainStack')
                                } else {
                                    Alert.alert('Sair', 'Ocorreu um erro ao encerrar sua sessão',
                                        [ { text: 'Entendi' } ],
                                        { cancelable: false }
                                    )
                                }

                            } else {
                                goToScreen('Login', 'LoginStack')
                            }
                        }}>
                           {global.userIsLogged? 'Sair': 'Entrar'}
                        </Text>
                    </View>

                    <View style={styles.menuItem} key={'Feed'}>
                        <View style={styles.menuItemIcon}>
                            <Ionicons name='md-paper' size={20} />
                        </View>

                        <Text style={styles.menuItemFont} onPress={() => goToScreen('Feed', 'MainStack')}>
                            Notícias
                        </Text>
                    </View>

                    {/* Categorias das notícias nested aqui */}
                </View>
            </View>
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
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#e2e2e2',
        marginTop: 15,
        marginBottom: 4
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
        backgroundColor: '#ffffff'
    },
    menuItemIcon: {
        marginRight: 10,
        marginLeft: 20
    },
    sideMenuContainer: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 0,
    },
    sideMenuProfileIcon: {
        marginTop: 10,
        marginLeft: 50,
        borderRadius: 150 / 2,
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    },
    footerText: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 15
    }
});