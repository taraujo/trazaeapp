import React, { Component } from 'react';

import { StyleSheet, SafeAreaView, Image, Text } from 'react-native';

import logo from '../../assets/custom/header.png';

export default class Header extends Component {
  render() {
      
    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo}/>

            <Text>Testo</Text>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#ebedee'
    },
});