import React, { useState } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text, Alert } from 'react-native';

import BackButton from '../components/BackButton';

import store from '../utils/store';

export default function Login({ navigation }) {
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {

        if(store.get('user')) {
            global.userIsLogged = true;
            global.user = user;

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
            <TextInput
                value={email}
                autoCompleteType={'off'}
                onChangeText={setEmail}
                placeholder={'E-mail'}
                style={styles.input}
            />

            <TextInput
                value={password}
                autoCompleteType={'off'}
                onChangeText={setPassword}
                placeholder={'Senha'}
                secureTextEntry={true}
                style={styles.input}
            />

            <Button
                title={'Entrar'}
                onPress={handleSubmit}
            />

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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    input: {
        width: '77%',
        height: 44,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#006fa6',
        marginBottom: 30
    },
    register: {
        marginTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#006fa6'
    }
});