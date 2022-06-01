import { useQuery } from '@apollo/client';
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Image } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler'
import PagerView from 'react-native-pager-view';
import { GET_PRODUCTO_PROFILE } from '../GraphQl/Queries';
import { Get_Producto_Products_image_realation, Get_Producto_Profile, Get_Producto_Profile_ProductsProfile, Get_Producto_Profile_ProductsProfile_image_realation } from '../GraphQl/Types';
import { styles } from '../Stylos/Styles'



function Productos() {
    const { loading, error, data, refetch } = useQuery<Get_Producto_Profile>(GET_PRODUCTO_PROFILE);

    return (
        <SafeAreaView style={[{ width: "100%", height: "100%", paddingTop: 50, alignContent: 'center', backgroundColor: '#ff8000' }]}>
            <View style={{ position: 'absolute', top: 50, zIndex: 1, width: 90, borderRadius: 20, padding: 5, borderColor: "white", justifyContent: 'center', alignContent: 'center', alignItems: "center", backgroundColor: "white" }}>
                <Text style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 15 }}>Recientes</Text>
            </View>
            <View style={{ backgroundColor: "#ffffff60", marginTop: 20, flexGrow: 1 }}>
                <ScrollView style={{ marginTop: 20 }} horizontal={true}>
                    {data?.ProductsProfile
                        .map((product, i) => {
                            return <View style={{
                                position: 'relative', margin: 5, marginLeft: 10, borderBottomColor: "black"
                                , borderRadius: 20, borderWidth: 1, flex: 0, height: 200, width: 150
                            }}>
                                {console.warn(product.image_realation)}
                                {product.image_realation != undefined && product.image_realation.length != 0 ? (
                                    <PagerView

                                        transitionStyle='scroll'
                                        initialPage={0}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}>
                                        {product.image_realation
                                            .map((publication: Get_Producto_Profile_ProductsProfile_image_realation, itemcount) => {
                                                console.log(product)
                                                return (

                                                    <View key={itemcount} style={{
                                                        borderRadius: 30,

                                                    }}>
                                                        <Image
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                borderRadius: 20,
                                                            }}
                                                            source={{ uri: publication.image_name?.toString() }}
                                                        />
                                                    </View>
                                                );
                                            })}
                                    </PagerView>
                                ) : (
                                    <Image
                                        style={{ width: '100%', height: "100%", backgroundColor: 'red', borderRadius: 20 }}
                                        source={require('../Navigation/Dranwable/TabsDraws/Icon/MyLogo.png')}
                                    />
                                )}


                                <View style={{ width: "100%", height: 80, position: 'absolute', borderRadius: 20, backgroundColor: "#ffffff60", bottom: 0, flex: 1 }}>
                                    <Text style={{ paddingLeft: 10, paddingRight: 10, top: 0, fontWeight: 'bold', fontSize: 14 }}>
                                        {product.product_name}

                                    </Text>
                                    <Text style={{ paddingLeft: 10, paddingRight: 10, borderRadius: 20, bottom: 0, fontSize: 10, fontStyle: 'italic' }}>
                                        {product.description}
                                    </Text>
                                </View>
                                <Text style={{ paddingLeft: 10, paddingRight: 10, position: 'absolute', right: 0, borderBottomRightRadius: 30, backgroundColor: "white", bottom: 0 }}>
                                    {product.price_unity}
                                </Text>
                            </View>;
                        })}
                </ScrollView>
            </View>
            <View style={{ position: 'absolute', top: "49%", zIndex: 1, width: 160, left: "60%", borderColor: "white", borderRadius: 20, padding: 6, justifyContent: 'center', alignContent: 'center', alignItems: "center", backgroundColor: "white", flexShrink: 2, flexWrap: "wrap" }}>
                <Text style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 15 }}>Todos los Servicios</Text>
            </View>
            <View style={{ backgroundColor: "#12312350", margin: 9, borderRadius: 20, height: '54%' }}>
                <ScrollView horizontal={false}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: "wrap", justifyContent: 'space-between'
                    }}>
                        {data?.ProductsProfile
                            .map((product, i) => {
                                return <View style={{
                                    margin: 9, borderBottomColor: "black"
                                    , borderRadius: 20, borderWidth: 2, height: 110, width: 110
                                }}>
                                    <View style={{ width: "100%", height: 80, position: 'absolute', borderRadius: 20, backgroundColor: "#ffffff60", bottom: 0, flex: 1 }}>

                                        <Text style={{ fontSize: 11, fontWeight: 'bold', padding: 10,  borderRadius: 20}}>
                                            {product.product_name}
                                        </Text>
                                        <Text style={{ fontSize: 8, fontWeight: 'normal', padding: 10,  borderRadius: 20,textAlign:'center'}}>
                                            {product.description}
                                        </Text>
                                    </View>
                                </View>;
                            })}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Productos
