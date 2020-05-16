import React, { useState } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BackButton from '../components/BackButton';

import store from '../utils/StoreData';
import * as ColorTheme from '../utils/ColorTheme';

export default function Login({ navigation }) {
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        const user = await store.get(`user_${email}`);

        if(user) {
            if(user.email === email && user.password === password) {
                global.userIsLogged = true;
                global.user = user;

                setEmail('');
                setPassword('')

                const post = navigation.getParam('post');

                if(post) {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: 'MainStack',
                            action: NavigationActions.navigate({
                                routeName: 'Post',
                                params: { post }
                            })
                        })
                    )
                } else {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: 'MainStack',
                            action: NavigationActions.navigate({ routeName: 'Feed' })
                        })
                    )
                }
            } else {
                Alert.alert('Entrar', 'E-mail ou senha incorretos',
                    [ { text: 'Entendi' } ],
                    { cancelable: false }
                )
            }
        } else {
            Alert.alert('Entrar', 'Credenciais inexistentes',
                [ { text: 'Entendi' } ],
                { cancelable: false }
            )
        }
    }

    function handleRegister() {
        navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'LoginStack',
                action: NavigationActions.navigate({
                    routeName: 'Register'
                })
            })
        )
    }

    return (
        <>
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/news-bme.png')}
            />

            <TextInput
                value={email}
                removeClippedSubviews={false}
                onChangeText={setEmail}
                placeholder={'E-mail'}
                style={styles.input}
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={'Senha'}
                secureTextEntry={true}
                style={styles.input}
            />

            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.button, {justifyContent: 'space-evenly', flexDirection: 'row'}]}
                onPress={handleSubmit}
            >
                <Ionicons name='md-log-in' size={32} color='#fff' />
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.register} onPress={handleRegister}>
                <Text style={{ fontSize: 15 }}>Não tem uma conta? Cadastre-se aqui</Text>
            </TouchableOpacity>
        </View>

        <BackButton navDispatch={navigation.dispatch} backScreen={NavigationActions.back} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },

    logo: {
        width: 230,
        height: 230,
        marginBottom: 4
    },

    input: {
        width: '80%',
        height: 50,
        padding: 10,
        fontSize: 18,
        borderWidth: 1,
        borderColor: ColorTheme.Modes.DARK,
        marginBottom: 15,
        borderRadius: 10
    },

    button: {
        width: 140,
        height: 50,
        borderRadius: 10,
        backgroundColor: ColorTheme.Modes.DARK,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

    register: {
        marginTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: ColorTheme.Modes.DARK
    }
});