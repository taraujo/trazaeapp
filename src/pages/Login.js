import React, { useState } from 'react';
import {
    AsyncStorage,
    KeyboardAvoidingView, Platform,
    View, Image,
    Text, TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Keyboard
} from 'react-native';

import { signIn } from '../services/auth.service';

import { Button, Card } from 'react-native-paper';

import { FontAwesome } from '@expo/vector-icons';

import logo from '../../assets/custom/white-logo.png';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {

        Keyboard.dismiss();
        setLoading(true);
        // navigation.navigate('Home');
        const data = await signIn(email, password);
        const {res} = data;

        if (res) {
            const {
                access_token,
                token_type,
                user
            } = res;

            const { name } = user;

            AsyncStorage.setItem("access_token", access_token);
            AsyncStorage.setItem("token_type", token_type);
            AsyncStorage.setItem("user_name", name);

            navigation.navigate('Home', {
                name
            });
        } else {
            setLoading(false);
            Alert.alert("Erro", data['err']['data']['error'])
        }
    }


    return (
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
            <Image style={styles.logo} source={logo}/>

            <Card style={styles.cardView}>
                <View style={styles.form}>
                    <View style={styles.formView}>
                        <FontAwesome style={styles.iconForm} name="user" size={24}/>
                        <TextInput style={styles.input}
                                   placeholder="Seu e-mail"
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
                </View>
                <Button loading={loading} contentStyle={styles.submitButton} style={styles.submitButtonStyle} color="#fff"
                        onPress={handleSubmit}>
                    Entrar
                </Button>
            </Card>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.singUpText}>Novo por aqui? Cadastre-se agora!</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    logo: {
        width: 280,
        height: 60,
        alignSelf: 'center'
    },

    container: {
        flex: 1,
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
        left: 0,
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