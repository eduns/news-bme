import React, { useState } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import BackButton from '../components/BackButton';

import store from '../utils/StoreData';
import * as ColorTheme from '../utils/ColorTheme';

export default function Register({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imgProfile, setImgProfile] = useState(null);

    function handleSubmit() {
        if(password !== confirmPassword) {
            Alert.alert('Cadastro', 'As senhas não são iguais',
                [ { text: 'Entendi' } ],
                { cancelable: false }
            )
            return;
        }

        if(store.save(`user_${email}`, { name, email, password, imgProfile })) {
            global.userIsLogged = true;
            global.user = { name, email, password, imgProfile }

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

    async function handlePickImage() {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if(!result.cancelled) {
               setImgProfile(result.uri)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleTakePhoto() {
        try {
            const permission = await ImagePicker.getCameraPermissionsAsync();

            if(!permission.granted) {
                Alert.alert('Permissão da Câmera', 'Habilite a permissão para usar a câmera',
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        {
                            text: 'Entendi',
                            onPress: async () => await ImagePicker.requestCameraPermissionsAsync()
                        }
                    ]
                )
            } else {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1
                });

                if(!result.cancelled) {
                    setImgProfile(result.uri)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.profile}
                source={imgProfile? {uri: imgProfile}:require('../assets/profile-placeholder.png')}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={() => handlePickImage()}
                >
                    <Ionicons name='md-images' size={32} color='#fff' />
                    <Text style={styles.buttonText}>Galeria</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={() => handleTakePhoto()}
                >
                    <Ionicons name='md-camera' size={32} color='#fff' />
                    <Text style={styles.buttonText}>Tirar foto</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                value={name}
                onChangeText={setName}
                placeholder={'Insira seu nome'}
                style={styles.input}
            />

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={'Insira seu e-mail'}
                style={styles.input}
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={'Insira sua senha'}
                secureTextEntry={true}
                style={styles.input}
            />

            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder={'Confirme sua senha'}
                secureTextEntry={true}
                style={styles.input}
            />

            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={() => handleSubmit()}
            >
                <Ionicons name='md-log-in' size={32} color='#fff' />
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <BackButton navDispatch={navigation.dispatch} backScreen={NavigationActions.back} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
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
        width: 160,
        height: 50,
        borderRadius: 10,
        backgroundColor: ColorTheme.Modes.DARK,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

    profile: {
        width: 200,
        height: 200,
        marginBottom: 5,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: ColorTheme.Modes.DARK
    },

    buttonContainer: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    }
});