import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, 
    View, Image, 
    Text, TextInput, 
    TouchableOpacity,
    StyleSheet, AsyncStorage } from 'react-native';

import api from '../services/api';

import logo from '../../assets/custom/login.png';

export default function Login({ navigation }) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

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

                <TouchableOpacity style={styles.singUpButton} onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.singUpText}>Cadastrar-se</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    logo: {
        width: 260,
        height: 120
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
        fontStyle: 'italic',
        fontSize: 18
    },

    input: {
        borderWidth: 1,
        borderColor: '#31303a',
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#444',
        backgroundColor: '#ebedee',
        height: 35,
        marginBottom: 20,
        borderRadius: 3,
        fontStyle: 'italic'
    },

    submit: {
        height: 40,
        backgroundColor: '#31303a',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    submitText: {
        color: '#ebedee',
        fontWeight: 'bold',
        fontSize: 18,
        fontStyle: 'italic'
    },

    singUpButton: {
        height: 40,
        backgroundColor: '#777',
        justifyContent: 'center',
        alignItems: 'center'
    },

    singUpText: {
        color: '#ebedee',
        fontWeight: 'bold',
        fontSize: 18,
        fontStyle: 'italic'
    },
});