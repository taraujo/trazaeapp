import React from 'react';

import { KeyboardAvoidingView, Platform, 
    View, Image,
    StyleSheet, Text } from 'react-native';

import { Button, Card } from 'react-native-paper';

import logo from '../../assets/custom/white-logo.png';

export default function Home({ navigation }) {
    const { name } = navigation.state.params;
    
    return (
        <KeyboardAvoidingView  enabled={Platform.OS == 'ios'} behavior="padding" style={styles.container}>
            <Image style={styles.logo} source={logo}/>

            <Card style={styles.cardView}>
                <View style={styles.form}>
                    <View style={styles.formView}>
                        <Text style={styles.username}>Olá {name}!</Text>
                    </View>
                </View>
                <Button contentStyle={styles.submitButton} style={styles.submitButtonStyle} color="#fff"
                        onPress={() => navigation.navigate('Login')}>
                    Voltar
                </Button>
            </Card>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logo: {
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

    username: {
        fontSize: 20,
    },
});