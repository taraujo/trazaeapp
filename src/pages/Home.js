import React, { useEffect, useState, useRef } from 'react';

import {
    KeyboardAvoidingView, Platform,
    View, Image, Text,
    StyleSheet, Dimensions, SafeAreaView
} from 'react-native';

import { Button } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Location from 'expo-location'
import MapView, { Marker } from "react-native-maps";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RBSheet from "react-native-raw-bottom-sheet";

export default function Home({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [destination, setDestination] = useState(null);

    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = 0.0421

    const refRBSheet = useRef();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
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

    function handleSelectedLocation(data, { geometry }) {
        const {
            location: { lat: latitude, lng: longitude }
        } = geometry;

        setDestination({
            latitude,
            longitude,
            title: data.structured_formatting.secondary_text
        })

        refRBSheet.current.open()
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

            {userLocation &&
                <GooglePlacesAutocomplete
                    placeholder="Para onde?"
                    placeholderTextColor="#333"
                    fetchDetails
                    onPress={handleSelectedLocation}
                    query={{
                        key: "AIzaSyBbPYad-_D5qniuqdbzwxfPvkSfHK0FBhU",
                        language: "pt-BR",
                        location: `${userLocation.coords.latitude},${userLocation.coords.longitude}`,
                        radius: 2000
                    }}
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
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginTop: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            borderRadius: 30,
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

            {
                destination &&
                <RBSheet
                    ref={refRBSheet}
                    openDuration={500}
                    closeOnDragDown
                    customStyles={{
                      container: {
                        ...styles.bottomView
                      }
                    }}
                >
                    <View style={styles.imageBottomView}>
                        <Image style={{ width: 80, height: 80 }} source={{ uri: 'https://cdn.iconscout.com/icon/free/png-512/avatar-367-456319.png' }} />
                    </View>
                    <View style={styles.destinationBottomViewName}>
                            <Text style={{ fontSize: 12, color: 'grey'}}>
                                {destination.title}
                            </Text>
                    </View>
                    
                    <View style={styles.bottomViewSubmitButton}>
                        <Button mode="contained" color="#303030">Confirmar</Button>
                    </View>

                </RBSheet>
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

    bottomView: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
    },

    imageBottomView: {
        alignSelf: 'center',
        marginVertical: 5
    },

    destinationBottomViewName: {
        alignItems: 'center',
        marginHorizontal: 20
    },

    bottomViewSubmitButton:{
        marginVertical: 50
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