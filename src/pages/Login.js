import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, 
    View, Image, 
    Text, TextInput, 
    TouchableOpacity,
    StyleSheet, AsyncStorage } from 'react-native';

import api from '../services/api';

import logo from '../../assets/custom/login.png';

export default function Login({ navigation }) {
    const [ email, setEmail] = useState('thasso.araujo@a.unileste.edu.br');
    const [ password, setPassword] = useState('senha');

    useEffect(() => {
        // AsyncStorage.getItem('user').then(user => {
        //     if (user) {
        //         navigation.navigate('Home');
        //     }
        // })
    }, []);

    async function handleSubmit() {
        // Logar na Api
        // const usuario = api.post('/auth', {
        //     email,
        //     password
        // });

        // const { _id, nome } = usuario;

        // await AsyncStorage.setItem('user', {
        //     _id,
        //     nome
        // });

        // console.log("Olá " + nome);
        navigation.navigate('Cadastro');
    }

    return (
        <KeyboardAvoidingView  enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
            <Image style={styles.logo} source={logo}/>

            <View style={styles.form}>
                
                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input}
                    placeholder="Digite sua Senha"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 100
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#ff5353'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#ebedee',
        marginBottom: 8,
        fontStyle: 'italic'
    },

    input: {
        borderWidth: 1,
        borderColor: '#31303a',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        backgroundColor: '#ebedee',
        height: 30,
        marginBottom: 20,
        borderRadius: 3,
        fontStyle: 'italic'
    },

    submit: {
        height: 42,
        backgroundColor: '#31303a',
        justifyContent: 'center',
        alignItems: 'center'
    },

    submitText: {
        color: '#ebedee',
        fontWeight: 'bold',
        fontSize: 16,
        fontStyle: 'italic'
    }
});