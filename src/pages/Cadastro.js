import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, 
    View, Image, 
    Text, TextInput, 
    TouchableOpacity,
    StyleSheet, AsyncStorage } from 'react-native';

import logo from '../../assets/custom/login.png';

export default function Cadastro({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

      useEffect(() => {
        // AsyncStorage.getItem('user').then(user => {
        //     if (user) {
        //         navigation.navigate('Home');
        //     }
        // })
    }, []);

    async function handleSubmit() {
        // Logar na Api

        // await AsyncStorage.setItem('user', {
        //     id: 1,
        //     email: email
        // });

        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView  enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
            <Image style={styles.logo} source={logo}/>

            <View>
              <Text style={styles.text}>Cadastro de Usuário</Text>
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
                    value={password2}
                    onChangeText={setPassword2}                
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
        marginBottom: 8
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
    },
    text: {
      fontWeight: 'bold',
      color: '#ebedee',
      marginBottom: 8,
      fontSize: 20,
      fontStyle: 'italic',
      justifyContent: 'center'
    }
});