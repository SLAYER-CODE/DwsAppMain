import React, { RefObject, useEffect, useState } from 'react'
import { Alert, Animated } from 'react-native'

import { View, Image, TouchableHighlight, StatusBar, Button, StyleSheet, ImageBackground } from 'react-native'
import { Text } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../Stylos/Styles'
import RadialGradient from 'react-native-radial-gradient';
// import { call, } from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import AwesomeButton, { AfterPressFn, AwesomeButtonProps } from "react-native-really-awesome-button-fixed";


// import {BlurView} from 'react-native-blurry'

// import BlurOverlay, { closeOverlay, openOverlay } from 'react-native-blur-overlay';

// import { BlurView } from '@react-native-community/blur'
import { TextField, FilledTextField, OutlinedTextField } from 'rn-material-ui-textfield'


import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CardStyleInterpolators, createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import RootStackParamList, { RootMain } from '../TypeDefinitios/DefinitiosNavigateMain'
import { useNavigation, CommonActions } from '@react-navigation/native'
import ReguisterScreen from './ReguisterScreen'
import RecuperateScreen from './RecuperateScreen'
import ScrennMain from './ScrennMain'
import { horizontalAnimation, horizontalAnimationInvert, verticalAnimation } from '../utils/HorizontalMoveScreen'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Nueso from 'react-native-vector-icons/AntDesign'

import {
    HeaderButton,
    Item,
    HiddenItem,
    OverflowMenu,
    HeaderButtons,
} from 'react-navigation-header-buttons';
import { navigationRef } from './RootReference'
import { BlurView } from '@react-native-community/blur'

// import BlurOverlay, { closeOverlay, openOverlay } from 'react-native-blur-overlay';


import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { storagemkv } from '../../App'
import { ADD_USER, COMPROBATION_SESSIONS, GET_CATEGORIES } from '../GraphQl/Queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { appclient } from '../apollo/client'
// import {initUserAuth} from '../Globals/Globals'



type ProfileScreenHomeNavigation = NativeStackNavigationProp<RootMain, 'Auth'>;

type InitNavigationDelete = NativeStackNavigationProp<RootStackParamList, 'Main'>
const IoniconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton IconComponent={Icon} iconSize={23} {...props} />
);


//Configuracion de inicio de session con firebase



// Configure Function para firebase 
GoogleSignin.configure({
    webClientId: '10005006310-dcsd6e73cgg04hutg88b2h2hdfichgfd.apps.googleusercontent.com',
});





async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}


// Configuracion para inicio de session dentro de facebook 

async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
        throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential)
}

async function onInitSession(email: RefObject<TextField>, pwd: RefObject<TextField>): Promise<String> {
    return await auth().signInWithEmailAndPassword(email.current?.value()!.trim()!, pwd.current?.value()!).then(() => {
        console.log("Se inicio session")
        return 'true';
    }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('Este emali ya existe');
        } else if (error.code === 'auth/invalid-email') {
            console.log('Este correo no existe Inicie denuevo');
            return 'invalided';
        } else if (error.code === 'auth/user-not-found') {
            email.current?.focus()
            console.log('Usuario no existe')
            return 'exist';
        } else if (error.code === 'auth/wrong-password') {
            Alert.alert(
                '   Error ',
                '¡Contraseña incorrecta!',
                [{
                    text: 'Aceptar',
                    onPress: () => {
                        pwd.current?.focus()
                    }
                },]
            )
            return 'pwderror'
            console.log("Contraseña Incorrecta")
        } else {
            console.log('Ubo un error code ' + error.code);
        }
        return 'false';
    }).finally(() => {
        return 'false';
    })
}
function showAlert(title: string, subtitle: string, button: string, dat: Function) {
    Alert.alert(
        title,
        subtitle,
        [{
            text: button,
            onPress: () => dat
        },]
    )
}

function Autenticate() {
    const [token, setoken] = React.useState<String | undefined>()
    const [uid, setuid] = React.useState<String>()



    const [comprobation, { loading, data }] = useLazyQuery(COMPROBATION_SESSIONS)

    const [addUser, { loading: loadadd, data: dataadd }] = useMutation(ADD_USER)
    console.log("SE INICIO!!!!")
    React.useEffect(() => {
        if (dataadd != undefined) {
            console.log(dataadd)
        }
    }, [dataadd])

    React.useEffect(() => {
        console.log("Valor de resultado"+data)
        if (data != undefined) {
            if (data["comprobationUser"] == true) {
                console.log("Es Verdadero")
                AuthStack.reset({
                    index: 1, routes: [{ name: 'MainInit' }],
                })
            } else {
                console.log(data)
                console.log("Es falso")
                console.log("Creando cuenta")
                addUser({
                    variables: {
                        createSessionsMyval: {
                            email: auth().currentUser?.email?.toString(),
                            lastname: auth().currentUser?.displayName?.toString(),
                            name: auth().currentUser?.displayName?.toString(),
                            password: (auth().currentUser?.uid),
                            birthday: (new Date()).toString(),
                            random_code: (Math.floor(Math.random() * (99999 - 11111)) + 11111).toString(),
                            picture: (auth().currentUser?.photoURL?.toString()),
                            username: (auth().currentUser?.displayName?.toString())
                        }
                    }
                })
                storagemkv.set('autentication', true)
                // AuthStack.navigate("MainInit")
                AuthStack.reset({
                    index: 1, routes: [{ name: 'MainInit' }],
                })

            }
        }
    }, [data])

    // const {data,refetch,loading} = useQuery("token",{})
    // React.useEffect(() => {
    //     if (token != undefined) {
    //         const { loading, data } = useQuery(COMPROBATION_SESSIONS, {
    //             variables: { token },
    //         });
    //         React.useEffect(()=>{
    //             if(data["comprobationUser"]!=undefined){
    //                if(data["comprobationUser"]=="false"){
    //                    console.log("Es falso")
    //                }else{
    //                    console.log("Es Verdadero")
    //                }
    //             }
    //         },[data])
    //     }
    // }, [token])


    function initUserAuth(AuthStack: ProfileScreenHomeNavigation) {
        // auth().currentUser?.getIdToken().then((token) => {
        //     console.log(token)
        // })
        // console.log(auth().onIdTokenChanged.toString())
        auth().currentUser?.getIdTokenResult().then((pwd)=>{
            console.log(pwd.token)
            console.log(pwd.signInProvider)
            console.log(pwd.issuedAtTime)
            console.log(pwd.expirationTime)
            console.log(pwd.claims)
            console.log(pwd.authTime)
        })
        appclient.query({query:GET_CATEGORIES}).then(result => {
            console.log(result.errors)
            console.log(result.data)
            
        })
        storagemkv.set('autentication', true)
        AuthStack.reset({
            index: 1, routes: [{ name: 'MainInit' }],
        })
        // comprobation({ variables: { token: auth().currentUser?.uid.toString() } })
    }


    const AuthStack = useNavigation<ProfileScreenHomeNavigation>();

    const animation = new Animated.Value(0);
    const animationpwdError = new Animated.Value(0)

    const email = React.createRef<TextField>()
    const pwd = React.createRef<TextField>()


    const textRegister = React.createRef<Text>()

    const DeleteStack = useNavigation<InitNavigationDelete>();

    const [error, seterror] = React.useState(false)
    const [pwderror, setpwderror] = React.useState(false)


    function parpadeo(value: boolean, animated: Animated.Value, repet: boolean) {
        Animated.timing(animated, {
            toValue: value ? 1 : 0,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => { repet ? parpadeo(!value, animated, repet) : null })
    }

    React.useEffect(() => {
        if (error) {
            parpadeo(error, animation, error)
        } else {
            parpadeo(error, animationpwdError, false)
        }
        if (pwderror) {
            parpadeo(pwderror, animationpwdError, pwderror)
        } else {
            parpadeo(pwderror, animationpwdError, false)
        }
    }, [error, pwderror])


    // useEffect(() => {
    //     DeleteStack.reset({index:0, routes: [{ name:  }]});
    //     return () => {

    //     }
    // }, [])



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
        instructions2: {
            textAlign: 'center',
            color: 'white',
            marginBottom: 5,
        },
    });


    return (
        <>
            <SafeAreaView style={[styles.container, { backgroundColor: '#004B63' }]}>


                <StatusBar hidden={true} showHideTransition={'fade'} />

                <View style={{ position: 'absolute', top: 40, right: 5, alignItems: 'center' }}>
                    <View style={{ position: 'absolute', zIndex: 0, width: 470, height: 470, top: 250, right: 49 }}>
                        <RadialGradient style={{ width: 500, height: 500, justifyContent: 'center', alignItems: 'center' }} colors={['aqua', '#182B3730', 'transparent']}
                            stops={[0.2, 0.2, 0.2, 0.2]}
                            center={[250, 250]}
                            radius={350}>

                            <Image blurRadius={2}
                                style={{ zIndex: 0, transform: [{ scaleX: -1 }, { rotateY: '25deg' }, { rotate: '-20deg' }], width: 500, height: 500, position: 'absolute', }} source={require('../Screens/ImagenAuth/Auto.png')} />
                        </RadialGradient>
                    </View>
                    <Image style={{ width: 380, height: 320 }} source={require('../Screens/ImagenAuth/Productos.png')} />
                </View>
                <View style={{
                    zIndex: 2,
                    top: 40,
                    shadowOffset: {
                        width: 10,
                        height: 200,
                    },
                    width: 380, height: 500, borderRadius: 10, borderWidth: 0, borderTopEndRadius: 90, borderTopStartRadius: 90,
                    shadowColor: '#00FFF2',
                    shadowOpacity: 0.5,
                    shadowRadius: 100,
                    elevation: 46
                }}>


                    <RadialGradient style={{ position: 'absolute', width: 380, height: 500, justifyContent: 'center', alignItems: 'center' }} colors={['#3BFFF533', '#182B3733', 'transparent']}
                        stops={[0.5, 0.2, 0.2, 0.2]}
                        center={[190, 250]}
                        radius={350}>

                    </RadialGradient>

                    <View style={{ top: 10, position: 'absolute', backgroundColor: '#04878750', borderRadius: 20, padding: 5 }}>
                        <Text style={{ fontFamily: 'Modak', fontWeight: 'bold', fontSize: 20, color: '#C1FFE1' }}>
                            Bienbenido De Nuevo
                        </Text>
                    </View>

                    <View style={{ width: 280, height: 400, marginLeft: 50, paddingRight: 20, paddingLeft: 10, marginTop: 60 }}>
                        <TextField ref={email}
                            containerStyle={{
                                shadowColor: '#00FFF2',
                                shadowOpacity: 0.5,
                                shadowRadius: 100,
                                elevation: 70

                            }}
                            inputContainerStyle={{

                            }}
                            labelTextStyle={{
                                fontWeight: 'bold',
                                paddingLeft: 90,
                            }}
                            titleTextStyle={{
                                fontWeight: 'bold',
                            }}
                            style={{

                                fontWeight: 'bold',
                                borderWidth: 1,
                                paddingTop: 6,
                                paddingLeft: 10,
                                backgroundColor: '#00000090',
                                borderColor: 'aqua',
                                borderRadius: 20,
                                shadowColor: '#00FFF2',
                                shadowOpacity: 0.5,
                                shadowRadius: 100,
                                elevation: 30
                            }}

                            textColor='#00FFF2'
                            tintColor='#42F000'

                            baseColor='white'
                            fontSize={20}
                            labelFontSize={20}
                            secureTextEntry={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={false}
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            returnKeyType="done"
                            label="Usuario:"
                            title="Inserte su Correo o Usuario"
                            maxLength={30}
                            characterRestriction={30}
                        />

                        <TextField
                            ref={pwd}
                            containerStyle={{
                                shadowColor: '#00FFF233',
                                shadowOpacity: 0.5,
                                shadowRadius: 100,
                                elevation: 70
                            }}
                            labelTextStyle={{
                                fontWeight: 'bold',
                                paddingLeft: 80,
                            }}
                            titleTextStyle={{
                                fontWeight: 'bold',
                            }}
                            style={{
                                fontWeight: 'bold',
                                backgroundColor: '#00000090',
                                paddingTop: 5,
                                paddingLeft: 10,
                                borderWidth: 1,
                                borderColor: 'aqua',
                                borderRadius: 20,
                                shadowColor: '#00FFF2',
                                shadowOpacity: 0.5,
                                shadowRadius: 100,
                                elevation: 30
                            }} textColor='#00FFF2'
                            tintColor='#42F000'

                            baseColor='white'
                            fontSize={20}
                            labelFontSize={20}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={false}
                            returnKeyType="done"
                            label="Password:"
                            title="Inserte su contraseña"
                            maxLength={30}
                            characterRestriction={20}
                        />

                        {error == true ?
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'red', textShadowColor: 'red', textShadowRadius: 20 }}>
                                    Este usuario no existe
                                </Text>
                            </View>
                            : null}

                        <View style={{ zIndex: 3, flex: 4, flexDirection: 'column', position: 'relative' }}>
                            <View style={{ flex: 1 }}>
                                <Text onPress={() => { AuthStack.navigate('Reguister') }} style={{ height: 30, top: 15, textShadowColor: animation.interpolate({ inputRange: [0, 1], outputRange: ["#42FF00", "red"] }) as any, color: animation.interpolate({ inputRange: [0, 1], outputRange: ["#42FF00", "red"] }) as any, textShadowRadius: 10, fontWeight: 'bold', fontSize: 15, textDecorationLine: 'underline' }}>
                                    Registrate Aqui!
                                </Text>
                                <Text onPress={() => { AuthStack.navigate('CountOldRecuperate') }} style={{ height: 30, top: 10, textShadowColor: animationpwdError.interpolate({ inputRange: [0, 1], outputRange: ["#42FF00", "red"] }) as any, color: animationpwdError.interpolate({ inputRange: [0, 1], outputRange: ["#42FF00", "red"] }) as any, textShadowRadius: 10, fontWeight: 'bold', fontSize: 15, textDecorationLine: 'underline' }}>
                                    Olvidaste Tu contraseña?
                                </Text>

                                <AwesomeButton progress springRelease style={{ height: 40 }} backgroundDarker={'#36A382'} borderColor={'aqua'} width={150} height={40} borderRadius={30} textColor='black' borderWidth={1.5} onPress={(nextt?: AfterPressFn) => {
                                    nextt!(async () => {
                                        console.log("Se inicio session")
                                        console.log(email.current?.value().toString(), pwd.current?.value().toString())
                                        if (email.current?.value().trim() == "" || pwd.current?.value().trim() == "") {
                                            if (email.current?.value() == "") {
                                                setpwderror(false)
                                                seterror(false)
                                                showAlert('Error', '¡ Inserte su correo !', 'Aceptar', () => {
                                                    email.current?.focus()
                                                    email.current?.forceUpdate()
                                                })
                                            } else {
                                                setpwderror(false)
                                                seterror(false)
                                                showAlert('Error', '!Inserte su Contraseña¡', 'Aceptar', () => {
                                                    pwd.current?.focus()
                                                })
                                            }
                                        } else {
                                            if (email.current?.value() == null || pwd.current?.value() == null) {
                                                setpwderror(false)
                                                seterror(false)
                                                showAlert('Error', '!Intente reiniciar la aplicacion!', 'Aceptar', () => {
                                                    email.current?.focus()
                                                })
                                            }
                                            else {
                                                const resdat = await onInitSession(email, pwd)
                                                if (resdat != "false") {
                                                    if (resdat != "true") {
                                                        if (resdat == "pwderror") {
                                                            seterror(false)
                                                            setpwderror(true)
                                                        } else if (resdat == "exist") {
                                                            seterror(true)
                                                            setpwderror(false)
                                                        } else if (resdat == "invalided") {

                                                        }
                                                    } else {
                                                        initUserAuth(AuthStack)
                                                    }
                                                }
                                            }
                                        }
                                    })

                                    // setTimeout(() => {


                                    // }, 1200)

                                }} backgroundColor={'#00FFE560'} backgroundShadow={'#4C63D2'}>
                                    Iniciar Session

                                </AwesomeButton>
                                <AwesomeButton style={{ alignItems: 'flex-start', height: 40 }} backgroundShadow={'#4C63D2'} backgroundColor={'#00FFE560'} backgroundDarker={'#36A382'} borderColor={'aqua'} width={200} height={40} borderRadius={30} textColor='black' borderWidth={1.5} onPress={() => onFacebookButtonPress().then(() => {
                                    initUserAuth(AuthStack)
                                    console.log('Signed in with Facebook!')
                                }
                                )}>
                                    <Text style={{ alignContent: 'flex-start', fontWeight: 'bold', }} > <Nueso name={'facebook-square'} size={20} color='blue' /> Iniciar Con Facebook  </Text>
                                </AwesomeButton>

                                <AwesomeButton style={{ alignContent: 'flex-start', height: 40 }} backgroundShadow={'#4C63D2'} backgroundColor={'#00FFE560'} springRelease backgroundDarker={'#36A382'} borderColor={'aqua'} width={200} height={40} borderRadius={30} textColor='black' borderWidth={1.5} onPress={() => onGoogleButtonPress().then(() => {
                                    initUserAuth(AuthStack)
                                    console.log('Signed in with Google!')
                                })}>
                                    <Text style={{ alignContent: 'flex-start', fontWeight: 'bold', }} > <Nueso name={'google'} size={20} color='red' /> Iniciar con Google </Text>
                                </AwesomeButton>

                            </View>

                        </View>
                        {/* <View style={{ flex: 1, flexDirection: 'column' }}> */}

                        {/* </View> */}
                        {/* <View style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0}}>
                    <BlurView style={{position: 'relative',top: 0,left: 0,bottom: 0,right: 0}}
                        reducedTransparencyFallbackColor="gray"
                        blurType="dark"
                        blurAmount={15}
                        />
                        </View> */}
                    </View>


                    {/* <BlurView blurType='dark' blurAmount={2} >
                    <Text>Hi, I am a tiny menu item</Text>
                </BlurView> */}
                    {/* <Image style={{backgroundColor:'#F2FFF233'}} blurRadius={10} source={require('./ImagenAuth/FondLogin.png')}/> */}


                </View>


            </SafeAreaView>

        </>
    )

}

const Root = createStackNavigator<RootMain>();
type RootNavigation = StackNavigationProp<RootMain, 'Reguister'>;

function Auth() {
    const navigation = useNavigation<RootNavigation>();
    const valueauth = storagemkv.getBoolean('autentication')
    console.log("Se fue a logout " + valueauth)
    return (
        !valueauth ?
            <Root.Navigator initialRouteName={'Auth'} screenOptions={{
                headerTintColor: 'white', headerTransparent: true, headerBackground: () => (
                    <RadialGradient colors={['#06FF0090', '#00FFB690', '#00F2FF80', '#00B6FF70', '#182B3730',]} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} stops={[0.1, 0.1, 0.1, 0.1, 0.1]}
                        center={[220, 0]}
                        radius={190} />
                )
            }}>
                <Root.Screen name='Auth' options={{
                    headerShown: false, gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }} component={Autenticate} />
                <Root.Screen name='Reguister' options={{
                    headerLeft: () => (<></>),
                    headerRight: () => (
                        <View style={{ marginRight: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableHighlight style={{ width: 50, height: 50, borderRadius: 200 }} activeOpacity={0.2} underlayColor="#00F2FF80" onPress={() => { navigation.navigate('Auth') }}>
                                <View style={{ justifyContent: 'space-evenly', height: 80, width: 110, flex: 0, flexDirection: 'row' }}>
                                    <Icon name={'arrow-right'} style={{ bottom: 25 }} size={100} color='aqua' />
                                    <Icon name={'arrow-right'} style={{ right: 55, bottom: 15 }} size={80} color='#00F2FF80' />
                                </View>

                            </TouchableHighlight>
                        </View>
                    ),
                    gestureDirection: 'horizontal-inverted',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerTitleStyle: {
                        fontWeight: 'bold',

                    },
                    title: 'Reguistrate'
                }} component={ReguisterScreen} />
                <Root.Screen name='CountOldRecuperate' options={{
                    headerLeft: () => (
                        <View style={{}}>
                            <TouchableHighlight style={{ width: 50, height: 50, borderRadius: 200 }} activeOpacity={0.2} underlayColor="#00F2FF80" onPress={() => { navigation.navigate('Auth') }}>
                                <View style={{ justifyContent: 'space-evenly', height: 80, width: 110, flex: 0, flexDirection: 'row' }}>
                                    <Icon name={'arrow-left'} style={{ bottom: 25 }} size={100} color='aqua' />
                                    <Icon name={'arrow-left'} style={{ right: 55, bottom: 15 }} size={80} color='#00F2FF80' />
                                </View>

                            </TouchableHighlight>
                        </View>
                    ),
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, title: 'Recupere su cuenta'
                }} component={RecuperateScreen} />

                <Root.Screen name='MainInit' options={{
                    gestureDirection: 'horizontal-inverted',
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    title: 'Pantalla principal', headerShown: false
                }} component={ScrennMain} />

            </Root.Navigator >
            :
            <Root.Navigator initialRouteName={'MainInit'} screenOptions={{
                headerTintColor: 'white', headerTransparent: true, headerBackground: () => (
                    <RadialGradient colors={['#06FF0090', '#00FFB690', '#00F2FF80', '#00B6FF70', '#182B3730',]} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} stops={[0.1, 0.1, 0.1, 0.1, 0.1]}
                        center={[220, 0]}
                        radius={190} />
                )
            }}>
                <Root.Screen name='MainInit' options={{
                    gestureDirection: 'horizontal-inverted',
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    title: 'Pantalla principal', headerShown: false
                }} component={ScrennMain} />
            </Root.Navigator>
    )
}
export default Auth;