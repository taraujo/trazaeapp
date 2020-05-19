import React from 'react';

import { SafeAreaView, View,
    StyleSheet, Image, Text } from 'react-native';

import logo from '../../assets/custom/header.png';

export default function Home({ navigation }) {
    const { name } = navigation.state.params;
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={logo}/>
            </View>

            <View style={styles.content}>
                <Text style={styles.nome}>Olá {name}!</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        width: 140,
        height: 50
    },

    container: {
        flex: 1,
        backgroundColor: '#f4f5f5'
    },

    header: {
        zIndex: 0,
        backgroundColor: '#ebedee',
        justifyContent: 'center',
        alignItems: "center",
        height: 60
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },

    nome: {
        fontSize: 20,
    },
});