import React, { useState } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

import store from '../utils/store';

export default function Register({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        if(store.save('user', { name, email, password })) {
            global.userIsLogged = true;
            global.user = { name, email, password }

            navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'MainStack',
                    action: NavigationActions.navigate({
                        routeName: 'Feed'
                    })
                })
            )
        } else {
            Alert.alert('Cadastro', 'Ocorreu um erro no seu cadastro',
                [ { text: 'Entendi' } ],
                { cancelable: false }
            )
        }
    }

    return (
        <View style={styles.container}>
            <TextInput 
                value={name}
                onChangeText={setName}
                placeholder={'Seu nome'}
                style={styles.input}
            />

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={'Seu e-mail'}
                style={styles.input}
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={'Sua senha'}
                secureTextEntry={true}
                style={styles.input}
            />

            <Button
                title={'Cadastrar'}
                onPress={handleSubmit}
            />
        </View>
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
    }
});