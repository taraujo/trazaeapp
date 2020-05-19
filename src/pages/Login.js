import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, 
    View, Image, 
    Text, TextInput, 
    TouchableOpacity,
    StyleSheet, AsyncStorage } from 'react-native';

import api from '../services/api';

import { Button, TextInput } from 'react-native-paper'

import logo from '../../assets/custom/header.png';

export default function Login({ navigation }) {
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    async function handleSubmit() {
        const response = await api.post('/auth', {
            email,
            password
        });

        const { _id, name } = response.data;

        await AsyncStorage.setItem('user', {
            _id,
            name
        });

        navigation.navigate('Home', {
            name
        });
    }


    return (
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
            <Image style={styles.logo} source={logo}/>

            <View style={styles.form}>
                <TextInput
                    label="Seu e-mail"
                    keyboardType='email-address'
                    autoCapitalize="none"
                    mode="flat"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    underlineColor="transparent"
                />

                <TextInput
                    label="Digite sua Senha"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    mode="flat"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    underlineColor="transparent"
                />

                <Button contentStyle={styles.submitButton} style={styles.submitButtonStyle} color="#fff" onPress={handleSubmit}>
                    Entrar
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.singUpText}>Novo por aqui? Cadastre-se agora!</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        height: 60
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#754AA7'
    },

    form: {
        marginTop: 5,
        paddingHorizontal: 20
    },

    label: {
        fontWeight: 'bold',
        color: '#ebedee',
        marginBottom: 8,
        fontStyle: 'italic',
        fontSize: 18
    },

    input: {
        marginVertical: 10,
        height: 55
    },

    submitButton: {
        backgroundColor: '#D952FF',
        height: 77,
    },

    submitButtonStyle: {
        marginBottom: 10,
        borderRadius: 35,
        elevation: 3
    },

    singUpButton: {
        height: 40,
        backgroundColor: '#777',
        justifyContent: 'center',
        alignItems: 'center'
    },

    singUpText: {
        paddingTop: 15,
        color: '#ebedee',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});