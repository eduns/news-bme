import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Login({ navigation }) {
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        navigation.navigate('Feed')
    }

    function handleRegister() {

    }

    return (
        <View style={styles.container}>

            <TextInput
                value={email}
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

            <Button
                title={'Entrar'}
                onPress={handleSubmit}
            />

            <TouchableOpacity style={styles.register} onPress={handleRegister}>
                <Text>Sou novo aqui. Quero me cadastrar</Text>
            </TouchableOpacity>
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
    },
    register: {

    }
});