import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, 
    View, Image, 
    Text, TextInput, 
    TouchableOpacity,
    StyleSheet, Alert } from 'react-native';

import api from '../services/api';

import logo from '../../assets/custom/login.png';

export default function Cadastro({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [samePassword, setSamePassword] = useState('');

    async function handleSubmit() {
        if (password != samePassword) {
            console.log("As senhas não coincidem!");
            Alert.alert("As senhas não coincidem!");
            return;
        }

        await api.post('/usuarios', {
            email,
            name,
            password,
            samePassword
        }).then(function (response) {
            console.log("Cadastro Efetuado com sucesso!");
            
            navigation.navigate('Login');
          })
          .catch(function (error) {
            console.log(error);
            console.log("Não foi possível concluir o cadastro!");
            Alert.alert("Não foi possível concluir o cadastro!");
          })
    }

    return (
        <KeyboardAvoidingView  enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
            <Image style={styles.logo} source={logo}/>

            <View>
              <Text style={styles.text}>Olá, preencha os dados...</Text>
            </View>

            <View style={styles.form}>
                
                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#999"
                    autoCorrect={false}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.input}
                    placeholder="Preencha seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style ={styles.label}>Senha</Text>
                <TextInput style={styles.input}
                    placeholder="Digite sua Senha"
                    placeholderTextColor="#999"
                    keyboardType="password"
                    secureTextEntry={true}
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}                
                />

                <Text style ={styles.label}>Confirme sua Senha</Text>
                <TextInput style={styles.input}
                    placeholder="Repita sua Senha"
                    placeholderTextColor="#999"
                    keyboardType="password"
                    secureTextEntry={true}
                    autoCorrect={false}
                    value={samePassword}
                    onChangeText={setSamePassword}                
                />


                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Enviar</Text>
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

    text: {
        fontWeight: 'bold',
        color: '#ebedee',
        marginBottom: 8,
        fontSize: 20,
        fontStyle: 'italic',
        justifyContent: 'flex-start'
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