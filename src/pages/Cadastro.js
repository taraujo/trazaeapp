import React, { useState } from 'react';

import { KeyboardAvoidingView, Platform, 
    View, Image, TextInput,
    StyleSheet, Alert } from 'react-native';

import { Button, Card } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons';

import api from '../services/api';

import logo from '../../assets/custom/white-logo.png';

export default function Cadastro({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [samePassword, setSamePassword] = useState('');

    async function handleSubmit() {
        if (password != samePassword) {
            alert("As senhas não coincidem!");
            Alert.alert("As senhas não coincidem!");
            return;
        }

        if (name.length == 0) {
            alert("Seu Nome é obrigatório!");
            Alert.alert("Seu Nome é obrigatório!");
            return;
        }

        if (email.length == 0) {
            alert("Seu E-mail é obrigatório!");
            Alert.alert("Seu E-mail é obrigatório!");
            return;
        }

        if (password.length == 0) {
            alert("Sua Senha é obrigatória!");
            Alert.alert("Sua Senha é obrigatória!");
            return;
        }

        await api.post('/usuarios', {
            email,
            name,
            password,
            samePassword
        }).then(function (response) {
            alert("Cadastro Efetuado com sucesso!");
            navigation.navigate('Login');
          })
          .catch(function (error) {
            console.log(error);
            alert("Não foi possível concluir o cadastro!");
            Alert.alert("Não foi possível concluir o cadastro!");
          })
    }

    return (
        <KeyboardAvoidingView  enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
            <Image style={styles.logo} source={logo}/>

            <Card style={styles.cardView}>
                <View style={styles.form}>
                    <View style={styles.formView}>
                        <FontAwesome style={styles.iconForm} name="user" size={24}/>
                        <TextInput style={styles.input}
                                   placeholder="Seu Nome"
                                   placeholderTextColor="#999"
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   value={name}
                                   onChangeText={setName}
                        />
                    </View>

                    <View style={styles.formView}>
                        <FontAwesome style={styles.iconForm} name="envelope" size={24}/>
                        <TextInput style={styles.input}
                                   placeholder="Seu E-mail"
                                   placeholderTextColor="#999"
                                   keyboardType='email-address'
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   value={email}
                                   onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.formView}>
                        <FontAwesome style={styles.iconForm} name="lock" size={24}/>
                        <TextInput style={styles.input}
                                   placeholder="Digite sua Senha"
                                   placeholderTextColor="#999"
                                   secureTextEntry={true}
                                   autoCorrect={false}
                                   value={password}
                                   onChangeText={setPassword}
                        />
                    </View>

                    <View style={styles.formView}>
                        <FontAwesome style={styles.iconForm} name="lock" size={24}/>
                        <TextInput style={styles.input}
                                   placeholder="Confirme sua Senha"
                                   placeholderTextColor="#999"
                                   secureTextEntry={true}
                                   autoCorrect={false}
                                   value={samePassword}
                                   onChangeText={setSamePassword}
                        />
                    </View>
                </View>
                <Button contentStyle={styles.submitButton} style={styles.submitButtonStyle} color="#fff"
                        onPress={handleSubmit}>
                    Confirmar
                </Button>
            </Card>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    logo: {
        width: 250,
        height: 60
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D25C5A'
    },

    cardView: {
        marginVertical: 20,
        marginHorizontal: 18
    },

    form: {
        marginTop: 5,
        paddingHorizontal: 20
    },

    formView: {
        justifyContent: 'center',
        height: 55,
        borderBottomWidth: 0.18,
        borderBottomColor: '#727272'
    },

    input: {
        marginVertical: 10,
        marginHorizontal: 30,
        color: '#000',
    },

    buttonView: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    submitButton: {
        backgroundColor: '#4c4b4b',
        height: 55,

    },

    submitButtonStyle: {
        marginTop: 10,
        elevation: 3,
    },

    iconForm: {
        position: 'absolute',
        right: 5,
        color: '#727272'
    },

    singUpText: {
        marginVertical: 40,
        color: '#ebedee',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});