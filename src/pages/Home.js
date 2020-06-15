import React, { useEffect, useState } from 'react';

import { KeyboardAvoidingView, Platform,
    View, Image, Text,
    StyleSheet, Dimensions, SafeAreaView } from 'react-native';

import { Button, Card } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Location from 'expo-location'
import MapView, {Marker} from "react-native-maps";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Home({ navigation }) {
    const { name } = navigation.state.params;
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = 0.0421

    useEffect(() => {
       (async () => {
           let {status} = await Location.requestPermissionsAsync();
           if (status !== 'granted') {
               Alert.alert('Oops', 'Permission to access location was denied');
               setLoading(false);
           } else {
               let location = await Location.getCurrentPositionAsync({});
               setUserLocation(location);
               setLoading(false);
           }
       })()
    });

    function getInitialRegion() {
        return {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
    }

    function getInitialMarker() {
        return {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Carregando...'}
            />
            {
                userLocation &&
                <MapView
                    style={styles.mapStyle}
                    initialRegion={getInitialRegion()}
                >
                    <MapView.Marker.Animated
                        ref={marker => {
                            marker = marker
                        }}
                        coordinate={getInitialMarker()}
                    />

                </MapView>
            }

            { userLocation   &&
                <GooglePlacesAutocomplete
                    placeholder="Para onde?"
                    placeholderTextColor="#333"
                    query={{
                        key: "AIzaSyBZefWupNjMj2l450xuOf7Wsa1PBkJbdFs",
                        language: "pt-BR",
                        location:`${userLocation.coords.latitude},${userLocation.coords.longitude}`,
                        radius: 2000
                    }}
                    fetchDetails
                    enablePoweredByContainer={false}
                    styles={{
                        container: {
                            position: "absolute",
                            top: Platform.select({ ios: 60, android: 40 }),
                            width: "100%"
                        },
                        textInputContainer: {
                            flex: 1,
                            backgroundColor: "transparent",
                            height: 54,
                            marginHorizontal: 20,
                            borderTopWidth: 0,
                            borderBottomWidth: 0
                        },
                        textInput: {
                            height: 54,
                            margin: 0,
                            borderRadius: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginTop: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            elevation: 5,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowOffset: { x: 0, y: 0 },
                            shadowRadius: 15,
                            borderWidth: 1,
                            borderColor: "#DDD",
                            fontSize: 18
                        },
                        listView: {
                            borderWidth: 1,
                            borderColor: "#DDD",
                            backgroundColor: "#FFF",
                            elevation: 5,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowOffset: { x: 0, y: 0 },
                            shadowRadius: 15,
                            marginTop: 10
                        },
                        description: {
                            fontSize: 16
                        },
                        row: {
                            padding: 20,
                            height: 58
                        }
                    }}
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 250,
        height: 60,
        alignSelf: 'center'
    },

    container: {
        flex: 1,
    },

    cardView: {
        marginVertical: 20,
        marginHorizontal: 18
    },

    form: {
        marginTop: 5,
        paddingHorizontal: 20
    },

    mapStyle: {
        flex: 1,
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