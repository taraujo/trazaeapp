import React, {useEffect, useState, useRef, Fragment} from 'react';

import {
    TouchableOpacity, Platform,
    View, Text,
    StyleSheet, ActivityIndicator, SafeAreaView, Alert
} from 'react-native';

import {Button} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Location from 'expo-location'
import MapView, {Marker} from "react-native-maps";

import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import RBSheet from "react-native-raw-bottom-sheet";
import {FontAwesome5} from '@expo/vector-icons';
import {calculateFreight, confirm} from '../services/freight.service';

export default function Home({navigation}) {
    const formDataInitialState = {
        origem_latitude: null,
        origem_longitude: null,
        destino_latitude: null,
        destino_longitude: null,
        tipo_veiculo: null,
        distancia: null
    };
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [freightValue, setFreightValue] = useState(null)
    const [vehicleSubmit, setVehicleSubmit] = useState(false);
    const [confirmSubmit, setConfirmSubmit] = useState(false);
    const [formData, setFormData] = useState(
        formDataInitialState
    );

    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = 0.0421

    const refRBSheet = useRef();
    const refMarker = useRef();

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Oops', 'Permission to access location was denied');
                setLoading(false);
            } else {
                await getUserActualLocation();

                setLoading(false);
            }
        })()
    }, []);

    useEffect(() => {
        (async () => {
            if (vehicleSubmit) {
                await handleSubmitVehicleButton();
            }

        })()
    }, [vehicleSubmit]);


    useEffect(() => {
        (async () => {
            if (confirmSubmit) {
                await handleConfirmSubmitButton();
            }
        })()
    }, [confirmSubmit])

    async function getUserActualLocation() {
        let location = await Location.getCurrentPositionAsync({});
        handleFormDataState('origem_latitude', location.coords.latitude)
        handleFormDataState('origem_longitude', location.coords.longitude)

        setUserLocation(location)
    }

    async function handleConfirmSubmitButton() {
        const data = await confirm(formData);

        const {res} = data;

        if (res) {
            setConfirmSubmit(false);
            refRBSheet.current.close();
            Alert.alert("Sucesso", "O seu frete foi confirmado, um motorista irá analisa-lo e em breve enrtará em contato!")
            clearFormData();
        } else {
            setConfirmSubmit(false);
            Alert.alert("Erro", data['err']['data']['error'])
        }
    }

    async function handleSubmitVehicleButton() {
        const data = await calculateFreight(formData);

        const {res} = data;

        if (res) {
            setFreightValue(res.valor)
            setVehicleSubmit(false);
        } else {
            setVehicleSubmit(false);
            Alert.alert("Erro", data['err']['data']['error'])
        }
    }

    function clearFormData() {
        setFormData({...formDataInitialState});
        setFreightValue(null);
    }

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

    function handleSelectedLocation(data, {geometry}) {
        const {
            location: {lat: latitude, lng: longitude}
        } = geometry;

        handleFormDataState('origem_latitude', userLocation.coords.latitude);
        handleFormDataState('origem_longitude', userLocation.coords.longitude);

        handleFormDataState('destino_latitude', latitude);
        handleFormDataState('destino_longitude', longitude);

        setDestination({
            latitude,
            longitude,
            title: data.structured_formatting.secondary_text
        })

        refRBSheet.current.open();
    }

    function handleFormDataState(key, value) {
        return setFormData(previusValue => ({...previusValue, [key]: value}))
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
                        ref={refMarker}
                        coordinate={getInitialMarker()}
                    />

                    {
                        destination &&
                        <Fragment>
                            <MapViewDirections
                                origin={userLocation.coords}
                                strokeColor="#8099f2"
                                strokeWidth={4}
                                destination={destination}
                                onReady={result => {
                                    setFormData({...formData, distancia: result.distance})
                                }}
                                apikey="API_KEY"
                            />
                            <MapView.Marker
                                ref={refMarker}
                                pinColor="indigo"
                                coordinate={destination}
                            />
                        </Fragment>
                    }

                </MapView>
            }

            {userLocation &&
            <GooglePlacesAutocomplete
                placeholder="Para onde?"
                placeholderTextColor="#333"
                fetchDetails
                onPress={handleSelectedLocation}
                keyboardShouldPersistTaps="handled"
                query={{
                    key: "API_KEY",
                    language: "pt-BR",
                    location: `${userLocation.coords.latitude},${userLocation.coords.longitude}`,
                    radius: 2000
                }}
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        position: "absolute",
                        top: Platform.select({ios: 60, android: 40}),
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
                        shadowOffset: {x: 0, y: 0},
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
                        shadowOffset: {x: 0, y: 0},
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
                    onClose={()=> { clearFormData()}}
                    customStyles={{
                        container: {
                            ...styles.bottomView
                        }
                    }}
                >
                    <Text style={styles.textVehicle}>Qual veiculo melhor lhe atende?</Text>

                    <View style={styles.imageBottomView}>
                        <TouchableOpacity style={styles.roundedVehicle} onPress={() => {
                            handleFormDataState('tipo_veiculo', 3)
                            setVehicleSubmit(true);
                        }
                        }>
                            <FontAwesome5 name="truck-moving" size={30} color="black"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roundedVehicle} onPress={() => {
                            handleFormDataState('tipo_veiculo', 2)
                            setVehicleSubmit(true);
                        }
                        }>
                            <FontAwesome5 name="truck-pickup" size={33} color="black"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.roundedVehicle} onPress={() => {
                            handleFormDataState('tipo_veiculo', 1);
                            setVehicleSubmit(true);
                        }
                        }>
                            <FontAwesome5 name="motorcycle" size={33} color="black"/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.destinationBottomViewName}>
                        <Text style={{fontSize: 12, color: 'grey'}}>
                            {destination.title}
                        </Text>
                        {
                            vehicleSubmit &&
                            <ActivityIndicator size="small" color="#4287f5"/>
                        }

                        {
                            freightValue &&
                            <Text style={{fontSize: 25, color: 'grey'}}>
                                R${freightValue}
                            </Text>
                        }
                    </View>
                    {freightValue &&
                    <View style={styles.borderButtons}>
                        <Fragment>
                            <Button mode="contained" style={{marginHorizontal: 5}} loading={confirmSubmit}
                                    onPress={() => setConfirmSubmit(true)} color="#303030">Confirmar</Button>
                            {/*<Button mode="contained" style={{ marginHorizontal: 5 }} onPress={() => console.log('schedule')} color="#bf6262">Agendar</Button>*/}
                        </Fragment>
                    </View>
                    }
                </RBSheet>
            }
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    bottomView: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
    },

    imageBottomView: {
        flexDirection: "row",
        marginVertical: 10,
    },

    destinationBottomViewName: {
        alignItems: 'center',
        marginHorizontal: 20,
    },

    borderButtons: {
        flexDirection: 'row',
        marginVertical: 25,
        marginHorizontal: 35,
        justifyContent: 'space-between'
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

    textVehicle: {
        fontSize: 17,
        marginBottom: 5
    },

    roundedVehicle: {
        alignItems: 'center',
        backgroundColor: '#d7d4d4',
        borderRadius: 50,
        width: 55,
        height: 55,
        marginHorizontal: 6,
        justifyContent: 'center',
    },

    submitButton: {
        backgroundColor: '#4c4b4b',
        height: 55,

    },

    submitButtonStyle: {
        marginTop: 10,
        elevation: 3,
    },
});