import React, { useState, useEffect } from 'react';
import { Text, AsyncStorage } from 'react-native';

import { SafeAreaView } from 'react-native';

export default function Home() {
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
            }
        })
    }, []);

    return (
        <SafeAreaView>
            <Text></Text>
        </SafeAreaView>
    );
}