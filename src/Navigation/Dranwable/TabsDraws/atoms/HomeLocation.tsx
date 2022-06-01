import React, { Component } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'rn-material-ui-textfield';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import OTPInputView from 'react-native-otp-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../../../Stylos/Styles';
import MapboxGL from '@rnmapbox/maps';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeUbication } from '../../../../TypeDefinitios/DefinitiosNavigateMain';
import { Get_Producto_Products_gps_relation } from '../../../../GraphQl/Types';
export type HomeLocationProps = {
    Locations:  Get_Producto_Products_gps_relation[]|null;
    Name:string
};
type Props = NativeStackScreenProps<
    HomeUbication,
    'Location'>;
export function HomeLocation({ route, navigation }: Props) {
    const locations = route.params.Locations
    const name=route.params.Name
    const styler = StyleSheet.create({
        page: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF'
        },
        container: {
            height: 600,
            width: 300,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red'
        },
        map: {
            width: 410,
            flex: 1
        }
    });
    const stylera = StyleSheet.create({
        markerContainer: {
            alignItems: "center",
            width: 50,
            backgroundColor: "transparent",
            height: 50,
        },
        textContainer: {
            backgroundColor: "grey",
            borderRadius: 10,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
        },
        text: {
            textAlign: "center",
            paddingHorizontal: 5,
            flex: 1,
            color: "white",
        },
    })
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#ff7b00' }]}>

            <MapboxGL.MapView onPress={(b) => { console.log((b.geometry as any).coordinates) }} localizeLabels={true} logoEnabled={false} style={styler.map} >


                {/* <MapboxGL.PointAnnotation
    key={1}
    id={"2"}
    title="Pruevas"
    snippet='Sele'
    onSelected={
        () => {
            console.log("Primero")
        }
    }
    coordinate={CENTER_COORD}> */}

                {/* </MapboxGL.PointAnnotation> */}
                <MapboxGL.Camera animationMode='flyTo' animationDuration={1150} followUserLocation zoomLevel={13}>

                </MapboxGL.Camera>

                {
                        
                    locations?.map((h: Get_Producto_Products_gps_relation, index) => {
                        console.log("se llamo")
                        return (
                            <MapboxGL.MarkerView onSelected={() => {
                            }} id={index.toString()} coordinate={[parseFloat(h.latitud), parseFloat(h.longitud)]}>
                                <View>
                                    <View style={[stylera.markerContainer, { backgroundColor: 'yellow', borderRadius: 50, justifyContent: 'center', alignContent: 'center' }]}>
                                        <View style={{ position: 'absolute' }}>
                                            <Text style={{ textShadowColor: 'black', color: 'white', textShadowRadius: 5, fontWeight: 'bold', fontSize: 8, textAlign: 'center' }}> {name}</Text>
                                            {/* <Text style={{textShadowColor:'black',color:'yellow',textShadowRadius:5,fontWeight:'bold',fontSize:10,textAlign:'center'}}> {e.price_unity}</Text> */}
                                        </View>
                                    </View>
                                </View>
                            </MapboxGL.MarkerView>
                        )

                    })
                            
                    }

                <MapboxGL.UserLocation onUpdate={(location) => {

                }} androidRenderMode='gps' showsUserHeadingIndicator={true} >
                </MapboxGL.UserLocation>
                {/* 
    <MapboxGL.ShapeSource id='line1' shape={{ type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: { type: "LineString", coordinates: [CENTER_COORD, CENTER_COORD_S] } }] }}>
        <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'red' }} />
    </MapboxGL.ShapeSource> */}
            </MapboxGL.MapView>
        </SafeAreaView>
    );
}
