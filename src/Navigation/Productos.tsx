import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { styles } from '../Stylos/Styles'

function Productos() {
    return (
        <SafeAreaView style={[{ width: "100%", height: "100%", paddingTop: 50, alignContent: 'center', backgroundColor: '#ff8000' }]}>
            <View style={{ position:'absolute',top:50,zIndex:1,width: 90, borderColor: "white", borderRadius: 20, padding: 10, justifyContent: 'center', alignContent: 'center', alignItems: "center", backgroundColor: "white", flexShrink: 2, flexWrap: "wrap" }}>
                <Text style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 15 }}>Recientes</Text>
            </View>
            <View style={{ height: 220, width: "100%", backgroundColor: "#ffffff60", marginTop: 20 }}>
                <ScrollView style={{ flexDirection: 'column', flex: 0 }} horizontal={true}>
                    {Array(20)
                        .fill(1)
                        .map((_, i) => {
                            return <View style={{
                                position: 'relative', margin: 5, marginLeft: 10, borderBottomColor: "black"
                                , borderRadius: 20, borderWidth: 2, flex: 0, height: 200, width: 150
                            }}>
                                <Text style={{ position: 'absolute', width: "100%", height: 80, borderRadius: 20, backgroundColor: "#ffffff60", bottom: 0 }}>

                                </Text>
                            </View>;
                        })}
                </ScrollView>
            </View>
            <View style={{ position:'absolute',top:"49%",zIndex:1,width: 160,left:"60%", borderColor: "white", borderRadius: 20, padding: 6, justifyContent: 'center', alignContent: 'center', alignItems: "center", backgroundColor: "white", flexShrink: 2, flexWrap: "wrap" }}>
                <Text style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 15 }}>Todos los Servicios</Text>
            </View>
            <View style={{ marginTop:30,flex: 1, backgroundColor: "#12312350", margin: 9,borderRadius:20 }}>
                <ScrollView horizontal={false}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: "wrap",justifyContent:'space-between'
                    }}>
                        {Array(20)
                            .fill(1)
                            .map((_, i) => {
                                return <View style={{
                                    margin: 9, borderBottomColor: "black"
                                    , borderRadius: 20, borderWidth: 2, height: 110, width: 110
                                }}>
                                    <Text style={{ position: 'absolute', width: "100%", height: 80, borderRadius: 20, backgroundColor: "#ffffff60", bottom: 0 }}>

                                    </Text>
                                </View>;
                            })}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Productos
