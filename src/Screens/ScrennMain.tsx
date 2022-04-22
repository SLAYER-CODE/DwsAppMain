import { createDrawerNavigator, DrawerContentComponentProps, DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CardStyleInterpolators, StackNavigationProp } from '@react-navigation/stack';
import React, { Fragment, useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient';
import Home from '../Dranwable/Home';
import Perfil from '../Dranwable/Perfil';
import { RootMain, SubDrawerParamList } from '../TypeDefinitios/DefinitiosNavigateMain'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ripple from 'react-native-material-ripple';
import Categorias from '../Dranwable/Categorias';
import Productos from '../Dranwable/Productos';
import Ventas from '../Dranwable/Ventas';
import Transacciones from '../Dranwable/Transacciones';
import CarritoDeCompras from '../Dranwable/CarritoDeCompras';
import Configuracion from '../Dranwable/Configuracion';
import { storagemkv } from '../../App';
import Auth from './Auth';
import AppIndex from '../Component';
import Preview from '../Dranwable/Preview';


// type ProfileScreenHomeNavigation = StackNavigationProp<RootMain, 'Main'>;
const Drawer = createDrawerNavigator<SubDrawerParamList>();
type ProfileScreenNavigationProp = DrawerNavigationProp<SubDrawerParamList, 'Home'>;


type DrawMenuProps = {
    IconName: string,
    Name: string,
    callNavigate: (keyof SubDrawerParamList),
    colore: (keyof SubDrawerParamList),
    changeColor: Function
}
function DrawerMenu({ IconName, Name, callNavigate, colore, changeColor }: DrawMenuProps) {

    const nav = useNavigation<ProfileScreenNavigationProp>();
    useEffect(() => {
        return () => {

        }
    })
    return (
        <View style={{ backgroundColor: colore == callNavigate ? 'aqua' : 'transparent' }}>
            <Ripple rippleColor={'black'} onPress={() => { colore != callNavigate ? nav.navigate(callNavigate) : ''; changeColor(callNavigate) }}>
                <View style={{

                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginLeft: 10, marginVertical: 15,
                }}>

                    <View style={{ flex: 8.5, justifyContent: 'center' }}>
                        <Text style={{ color:colore == callNavigate ? 'black' :'#22FF95', fontWeight: 'bold', fontSize: 20 }}>  <Icon name={IconName} size={17} /> {Name}</Text>
                    </View>
                </View>
            </Ripple>
        </View>
    )
}

const House = <Icon style={{ position: 'absolute', left: 7, bottom: -5, fontWeight: '300' }} name="paper-plane" size={45} color="orange" />;


const Menu: React.FC<{ propiedades: DrawerContentComponentProps }> = ({ propiedades }) => {

    const [stateItem, setstate] = useState<(keyof SubDrawerParamList)>('Home')

    return (
            
            <LinearGradient style={{ flex: 1 ,borderTopRightRadius:50}} colors={['#00000050','#2AEBC580','#2A32A290','#182B37']}>
                <View>
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#A0A0A0', paddingBottom: 20 }}>
                        <TouchableOpacity >
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                                <Image style={{ height: 90, width: 90, borderRadius: 50, borderWidth: 2, borderColor: 'orange' }} source={require('../Dranwable/MyLogo.png')} />
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {House}
                                </View>
                            </View>

                        </TouchableOpacity>
                    </View>
                    <DrawerMenu IconName='house-user' Name='Home' callNavigate='Home' colore={stateItem} changeColor={setstate} />
                    <DrawerMenu IconName='user' Name=' Perfil' callNavigate='Perfil' colore={stateItem} changeColor={setstate} />
                    <DrawerMenu IconName='th-list' Name='Categorias' callNavigate='Categorias' colore={stateItem} changeColor={setstate} />
                    <DrawerMenu IconName='store-alt' Name='Mis Productos' callNavigate='Productos' colore={stateItem} changeColor={setstate} />
                    <DrawerMenu IconName='business-time' Name='Mis Ventas' callNavigate='Ventas' colore={stateItem} changeColor={setstate} />
                    <DrawerMenu IconName='shopping-cart' Name='Mi Carrito' callNavigate='CarritoDeCompras' colore={stateItem} changeColor={setstate} />
                    <DrawerMenu IconName='sitemap' Name='Mis Transacciones' callNavigate='Transacciones' colore={stateItem} changeColor={setstate} />
                    <DrawerMenu IconName='wrench' Name=' Configuracion' callNavigate='Configuracion' colore={stateItem} changeColor={setstate} />

                    {/* <DrawerMenu IconName='home' Name='Home' callNavigate='Main' colore={stateItem} changeColor={setstate} /> */}
                </View>
            </LinearGradient>
    )
}

function ScrennMain() {

    useEffect(() => {
        console.log("Se vuelve setear")
    }, [])
    return (
        <Drawer.Navigator  screenOptions={{headerTransparent: true, headerTintColor: 'aqua',drawerStyle: {width:310, backgroundColor: 'transparent', borderTopRightRadius: 80, borderColor: '#2AEBC580', borderRightWidth: 20 } }} drawerContent={(props: DrawerContentComponentProps) => <Menu propiedades={props} />} >
            <Drawer.Screen name="Home" component={Home} options={{title:'Casa'  }} />
            <Drawer.Screen name="Perfil" component={Perfil} options={{title:'Mi Perfil'  }}/>
            <Drawer.Screen name="Categorias" component={Categorias} options={{title:'Categorias'  }} />
            <Drawer.Screen name="Productos" component={Productos} options={{title:'Almacen de Productos'  }}/>
            <Drawer.Screen name="Ventas" component={Ventas} options={{title:'Mis Ventas'  }}/>
            <Drawer.Screen name="Transacciones" component={Transacciones} options={{title:'Mis Transacciones'  }} />
            <Drawer.Screen name="CarritoDeCompras" component={CarritoDeCompras}  options={{title:'Mi Carrito de Compras'  }}/>
            <Drawer.Screen name="Configuracion" component={Configuracion} options={{title:'Configracion'  }}/>
            <Drawer.Screen name="Preview" component={Preview}  options={{
                    title:"Preview",
                    headerShown: false,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },drawerStatusBarAnimation:"fade",
                }}/>
            {/* <Drawer.Screen name="Unlogin" component={Auth} options={{title:'Logout   '}}/> */}
            
        </Drawer.Navigator>
    )
}

export default ScrennMain
