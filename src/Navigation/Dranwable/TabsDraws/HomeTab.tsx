import React, {RefObject, useState} from 'react';

//importamos el AppRegister

import {
  SafeAreaView,
  Text,
  Image,
  View,
  AppRegistry,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  ViewPropsAndroid,
} from 'react-native';
import {} from 'react-native-animatable';
import {styles} from '../../../Stylos/Styles';

// import { ViroARSceneNavigator } from 'react-viro';

//importamos
//librerias para la conexion al servidor usando la api de grapql

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  useApolloClient,
} from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {OutlinedTextField, TextField} from 'rn-material-ui-textfield';
// import ARCORE from 'react-native-arcore';
import {useQuery, gql} from '@apollo/client';
import {
  ADD_PRODUCTO,
  GET_CATEGORIES,
  GET_PRODUCTO,
  LOAD_SESSIONS,
} from '../../../GraphQl/Queries';

// import Camera from 'react-native-camera'
import {RNCamera} from 'react-native-camera';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Item} from 'react-navigation-header-buttons';
import AwesomeButton, {
  AfterPressFn,
} from 'react-native-really-awesome-button-fixed';
import {categoria, publicacion} from '../../../GraphQl/TypesGrapql';
import auth from '@react-native-firebase/auth';
import {Easing} from 'react-native-reanimated';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {SubDrawerParamList} from '../../../TypeDefinitios/DefinitiosNavigateMain';
import {useNavigation} from '@react-navigation/native';

const styless = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    borderRadius: 30,
    backgroundColor: '#e67f1230',
    marginHorizontal: 10,
    marginTop: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 42,
  },
});

interface finalpubcategorias {
  category_name: string;
}

function HomeTab() {
  const [publicaciones, setPublicaciones] = React.useState([]);
  const [imagesCapture, setImagesCapture] = React.useState<String[]>([]);
  const [activecamera, setactivecamera] = React.useState<Boolean>(false);
  const [activeetiquetas, setactiveetiquetas] = React.useState<Boolean>(false);
  const client = useApolloClient();

  const {loading, error, data, refetch} = useQuery(GET_PRODUCTO);
  

  //Todo lo relacionado con el scrollView

  const PubCameraScroll = React.useRef<View>(null);

  //Cadenas de Texto para los inputs
  const Pubdescripcion = React.createRef<TextField>();
  const PubPrecio = React.createRef<TextField>();
  const PubNombre = React.createRef<TextField>();
  const PubMarca = React.createRef<TextField>();
  const PubCantidad = React.createRef<TextField>();

  //Funcion con la que funciona el parpadeo
  function despliege(value: boolean, animated: Animated.Value) {
    Animated.timing(animated, {
      toValue: value ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.elastic(),
    }).start(() => {
      if (value) {
        PubNombre.current?.focus();
      }
    });
  }

  //Cadenas de Animaciones:

  const animation = new Animated.Value(0);
  const animationpwdError = new Animated.Value(0);

  //Cadenas para saber si los objetos estan activos o no

  const [AVaddPub, setAVaddPub] = React.useState<boolean>(false);
  const [AVtagsPub, setAVtagsPub] = React.useState<boolean>(false);
  const [AVcameraPub, setAVcameraPub] = React.useState<boolean>(false);
  const [AVplusaddPub, setAVplusaddPub] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //     despliege(AVaddPub, animation)
  // }, [AVaddPub])

  React.useEffect(() => {
    if (data != undefined) {
      console.log(data);
      setPublicaciones(data['Products']);
    }
  }, [data]);

  const [categorias, setCategorias] = React.useState<categoria[]>([]);
  const [categoriasPublication, setCategoriasPublication] = React.useState<
    number[]
  >([]);

  // const [getCategorias] = useLazyQuery(GET_CATEGORIES, {
  //     onCompleted: data => console.log(data)
  // })

  // React.useEffect(() => {
  //     console.log(errorCategoria)
  //     if (DataCategoria != undefined) {
  //         console.log("Las categorias son !:" + data)
  //         // setCategorias(data["Categories"])
  //     }
  // }, [DataCategoria])
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  React.useEffect(() => {
    console.log(imagesCapture);
  }, [imagesCapture]);

  if (loading) {
    return (
      <SafeAreaView
        style={[
          {
            backgroundColor: '#e67f1250',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <Text style={{fontWeight: 'bold', fontSize: 60}}>
          Cargando.. <Icon size={60} name="sync" />
        </Text>
      </SafeAreaView>
    );
  } else if (error) {
    
    return (
      <SafeAreaView
        style={[
          {
            backgroundColor: '#e67f1250',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 50}}>
            Error al cargar <Icon size={55} name="plug" />
          </Text>
          <AwesomeButton
            backgroundShadow={'#fffb00'}
            backgroundColor={'#ff9900'}
            backgroundDarker={'#ff0000'}
            borderColor={'#fffb00'}
            width={300}
            borderRadius={30}
            textColor="black"
            borderWidth={1.5}
            onPress={ () => {
                refetch()
            }}>
            <Text style={{fontWeight: 'bold'}}>Recargar</Text>
          </AwesomeButton>
        </View>
      </SafeAreaView>
    );
  }

  const camare = React.createRef();
  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
    setImagesCapture(imagesCapture.concat(data.uri));
  };
  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Waiting</Text>
    </View>
  );
  const Drawer = createDrawerNavigator<SubDrawerParamList>();
  type ProfileScreenNavigationProp = DrawerNavigationProp<
    SubDrawerParamList,
    'Home'
  >;
  const nav = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={[{backgroundColor: '#e67f12', height: '100%'}]}>
      <ScrollView style={styless.scrollView}>
        {/* {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)} */}

        <View
          style={{
            height: 'auto',
            flex: 1,
            borderWidth: 3,
            borderRadius: 30,
            shadowRadius: 30,
            borderColor: '#4504FF50',
            backgroundColor: '#00000040',
            margin: 15,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                margin: 10,
                color: 'gray',
                fontWeight: '900',
                fontSize: 15,
                textAlign: 'left',
                textAlignVertical: 'center',
              }}>
              <Icon
                name="lightbulb"
                style={{color: AVaddPub ? 'yellow' : 'white'}}
                size={20}
              />{' '}
              Publica tu Producto..
            </Text>
            {/* {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)} */}
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#FFFFFF33"
              style={{
                marginRight: 20,
                paddingTop: 5,
                height: 45,
                width: 45,
                alignItems: 'center',
                borderRadius: 30,
                rotation: parseInt(`${AVaddPub ? 45 : 0}`),
              }}
              onPress={() => {
                // PubNombre.current?.focus()
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                setAVaddPub(!AVaddPub);
              }}>
              <View>
                <Icon
                  name="plus"
                  size={35}
                  color={`${AVaddPub ? '#ff403385' : 'red'}`}
                />
              </View>
            </TouchableHighlight>
          </View>

          {/* <View style={{ flex: 1, flexDirection: 'column',position: `${AVaddPub?'absolute':"relative"}`,}}> */}
          {AVaddPub && (
            <View style={{flex: 1, flexDirection: 'column'}}>
              <TextField
                ref={PubNombre}
                containerStyle={{
                  marginTop: 0,
                  shadowColor: '#00FFF233',
                  shadowOpacity: 0.5,
                  shadowRadius: 100,
                  marginLeft: 10,
                  marginRight: 10,
                  bottom: 10,
                }}
                labelOffset={{
                  y0: 10,
                  x0: 5,
                }}
                labelTextStyle={{
                  fontWeight: 'bold',
                  bottom: 10,
                  // marginTop: 20,
                  // paddingTop: 19,
                }}
                inputContainerStyle={
                  {
                    // marginTop: 20,
                    // paddingTop: 19,
                  }
                }
                titleTextStyle={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginLeft: 13,
                  marginRight: 10,
                  letterSpacing: 3,
                }}
                style={{
                  height: 42,
                  // marginTop:20,
                  paddingTop: 15,
                  // borderRadius: 15,
                  padding: 5,
                  fontWeight: 'bold',
                  backgroundColor: '#00000090',
                  paddingLeft: 10,
                  borderWidth: 1,
                  borderColor: 'aqua',
                  shadowColor: '#00FFF2',
                  shadowOpacity: 0.5,
                  shadowRadius: 100,
                }}
                textColor="#00FFF2"
                tintColor="#42F000"
                baseColor="white"
                fontSize={20}
                labelFontSize={18}
                // autoCapitalize="none"
                autoCorrect={false}
                // enablesReturnKeyAutomatically={true}
                clearTextOnFocus={false}
                returnKeyType="done"
                label="Nombre"
                // labelOffset={undefined}
                // title={"Nombre"}
                // maxLength={300}
                // characterRestriction={300}
              />

              <TextField
                ref={Pubdescripcion}
                multiline={true}
                numberOfLines={4}
                containerStyle={{
                  shadowColor: '#00FFF2',
                  shadowOpacity: 0.5,
                  shadowRadius: 100,
                  bottom: 30,
                }}
                labelTextStyle={{
                  fontWeight: 'bold',
                  // marginTop: 20,
                  // paddingTop: 19,
                }}
                inputContainerStyle={
                  {
                    // marginTop: 20,
                    // paddingTop: 19,
                  }
                }
                titleTextStyle={{
                  fontWeight: 'bold',
                  marginLeft: 13,
                  marginRight: 10,
                }}
                style={{
                  // marginTop:20,
                  paddingTop: 15,
                  borderRadius: 10,

                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  padding: 5,
                  fontWeight: 'bold',
                  backgroundColor: '#00000090',
                  paddingLeft: 10,
                  borderWidth: 1,
                  borderColor: 'aqua',
                  shadowColor: '#00FFF2',
                  shadowOpacity: 0.5,
                  shadowRadius: 100,
                }}
                textColor="#00FFF2"
                tintColor="#42F000"
                baseColor="white"
                fontSize={17}
                // labelFontSize={20}
                // autoCapitalize="none"
                autoCorrect={false}
                // enablesReturnKeyAutomatically={true}
                clearTextOnFocus={false}
                returnKeyType="done"
                // label="Descripccion..."
                title={'Descripccion...'}
                maxLength={300}
                characterRestriction={300}
              />

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  flexGrow: 20,
                }}>
                <View style={{width: 165}}>
                  <TextField
                    ref={PubMarca}
                    multiline={false}
                    containerStyle={{
                      marginTop: -40,
                      shadowColor: '#00FFF233',
                      shadowOpacity: 0.5,
                      shadowRadius: 100,
                      marginLeft: 20,
                      marginRight: 20,
                      bottom: 30,
                    }}
                    labelTextStyle={{
                      fontWeight: 'bold',
                      paddingTop: 19,
                    }}
                    inputContainerStyle={{
                      marginTop: 20,
                      paddingTop: 25,
                    }}
                    titleTextStyle={{
                      fontWeight: 'bold',
                      marginLeft: 13,
                      marginRight: 10,
                    }}
                    style={{
                      // marginTop:20,

                      // paddingTop: 15,
                      padding: 5,
                      fontWeight: 'bold',
                      backgroundColor: '#00000090',
                      paddingLeft: 10,
                      borderWidth: 1,
                      borderColor: 'aqua',
                      shadowColor: '#00FFF2',
                      shadowOpacity: 0.5,
                      shadowRadius: 100,
                    }}
                    textColor="#00FFF2"
                    tintColor="#42F000"
                    baseColor="white"
                    fontSize={20}
                    // labelFontSize={20}
                    // autoCapitalize="none"
                    autoCorrect={true}
                    // enablesReturnKeyAutomatically={true}
                    clearTextOnFocus={false}
                    returnKeyType="done"
                    title={'Marca(Opcional)'}
                  />
                </View>

                <View style={{width: 165}}>
                  <TextField
                    ref={PubCantidad}
                    multiline={false}
                    containerStyle={{
                      marginTop: -40,
                      shadowColor: '#00FFF233',
                      shadowOpacity: 0.5,
                      shadowRadius: 100,
                      marginLeft: 20,
                      marginRight: 20,
                      bottom: 30,
                    }}
                    labelTextStyle={{
                      fontWeight: 'bold',
                      paddingTop: 19,
                    }}
                    inputContainerStyle={{
                      marginTop: 20,
                      paddingTop: 25,
                    }}
                    titleTextStyle={{
                      fontWeight: 'bold',
                      marginLeft: 13,
                      marginRight: 10,
                    }}
                    style={{
                      // marginTop:20,
                      // paddingTop: 15,
                      padding: 5,
                      fontWeight: 'bold',
                      backgroundColor: '#00000090',
                      paddingLeft: 10,
                      borderWidth: 1,
                      borderColor: 'aqua',
                      shadowColor: '#00FFF2',
                      shadowOpacity: 0.5,
                      shadowRadius: 100,
                    }}
                    textColor="#00FFF2"
                    tintColor="#42F000"
                    keyboardType="numeric"
                    baseColor="white"
                    fontSize={20}
                    // labelFontSize={20}
                    // autoCapitalize="none"
                    autoCorrect={true}
                    // enablesReturnKeyAutomatically={true}
                    clearTextOnFocus={false}
                    returnKeyType="done"
                    title={'Cantidad(1)'}
                  />
                </View>
              </View>
              <View
                style={{
                  bottom: 30,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginLeft: 20,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                <Text
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.linear,
                    );
                    setactivecamera(!activecamera);

                    PubCameraScroll.current?.measure(
                      (fx, fy, width, height, px, py) => {
                        console.log('Component width is: ' + width);
                        console.log('Component height is: ' + height);
                        console.log('X offset to frame: ' + fx);
                        console.log('Y offset to frame: ' + fy);
                        console.log('X offset to page: ' + px);
                        console.log('Y offset to page: ' + py);
                      },
                    );
                  }}
                  style={{
                    textShadowRadius: 10,
                    fontWeight: 'bold',
                    shadowRadius: 10,
                    shadowColor: 'red',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                    color: `${activecamera ? 'orange' : 'red'}`,
                    marginRight: 10,
                  }}>
                  Insertar imagen <Icon size={20} name="image" />
                </Text>
                <Text
                  onPress={async () => {
                    const {data} = await client.query({
                      query: GET_CATEGORIES,
                    });

                    console.log(data);
                    setCategorias(data['Categories']);
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );
                    setactiveetiquetas(!activeetiquetas);
                  }}
                  style={{
                    textShadowRadius: 10,
                    fontWeight: 'bold',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                    color: `${activeetiquetas ? 'orange' : 'red'}`,
                    marginLeft: 10,
                  }}>
                  <Icon size={20} name="star" /> Insertar Etiquetas
                </Text>
              </View>
              <View
                style={{
                  bottom: 30,
                  flex: 1,
                  flexDirection: 'column',
                  backgroundColor: '#AFFFFF20',
                  borderRadius: 20,
                }}>
                {activeetiquetas ? (
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      flexDirection: 'row-reverse',
                    }}
                    horizontal={true}
                    style={{
                      width: '100%',
                      alignContent: 'flex-start',
                      alignSelf: 'flex-start',
                      height: 40,
                      padding: 5,
                      borderRadius: 20,
                      backgroundColor: '#AFFaaa70',
                      marginBottom: 20,
                      marginTop: 10,
                    }}>
                    {categorias.length != 0 ? (
                      categorias.map((item: categoria, dx) => {
                        return (
                          <View
                            style={{
                              borderWidth: 1,
                              marginRight: 5,
                              borderRadius: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingLeft: 10,
                              paddingRight: 10,
                              backgroundColor:
                                item.category_id in categoriasPublication
                                  ? '#17a476'
                                  : '#00eefb',
                            }}
                            key={item.category_id}>
                            <Text
                              style={{fontWeight: 'bold', fontSize: 15}}
                              onPress={() => {
                                console.log(categoriasPublication);
                                setCategoriasPublication(
                                  categoriasPublication.concat([dx]),
                                );
                              }}>
                              {item.category_name} <Icon name={'splotch'} />
                            </Text>
                          </View>
                        );
                      })
                    ) : (
                      <Text
                        style={{
                          color: 'orange',
                          fontWeight: 'bold',
                          fontSize: 25,
                          width: '100%',
                          textAlign: 'center',
                        }}>
                        No hay categorias <Icon size={25} name="tired" />{' '}
                      </Text>
                    )}
                  </ScrollView>
                ) : null}

                {activeetiquetas ? (
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      flexDirection: 'row-reverse',
                    }}
                    horizontal={true}
                    style={{
                      width: '100%',
                      alignContent: 'flex-start',
                      alignSelf: 'flex-start',
                      height: 40,
                      padding: 5,
                      borderRadius: 20,
                      backgroundColor: '#AFFaaa20',
                      marginBottom: 10,
                      marginTop: 0,
                    }}>
                    {categorias.length != 0 ? (
                      categoriasPublication.map((item, dx) => {
                        return (
                          <View
                            style={{
                              borderWidth: 1,
                              marginRight: 5,
                              borderRadius: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingLeft: 10,
                              paddingRight: 10,
                              backgroundColor: '#17a476',
                              flexWrap: 'nowrap',
                              alignContent: 'center',
                            }}
                            key={dx}>
                            <Text
                              style={{fontWeight: 'bold', fontSize: 15}}
                              onPress={() => {
                                console.log(categoriasPublication);
                                setCategoriasPublication(
                                  categoriasPublication.filter(function (pwd) {
                                    return pwd != item;
                                  }),
                                );
                              }}>
                              {categorias[item].category_name}{' '}
                              <Icon name={'puzzle-piece'} />
                            </Text>
                          </View>
                        );
                      })
                    ) : (
                      <Text
                        style={{
                          color: 'orange',
                          fontWeight: 'bold',
                          fontSize: 25,
                          width: '100%',
                          textAlign: 'center',
                        }}>
                        No hay categorias <Icon size={25} name="tired" />{' '}
                      </Text>
                    )}
                  </ScrollView>
                ) : null}
              </View>

              <View
                ref={PubCameraScroll}
                onLayout={() => {
                  PubCameraScroll.current?.measureInWindow((x, y, w, h) => {
                    console.log(x);
                    console.log(y);
                    console.log(w);
                    console.log(h);
                  });
                  PubCameraScroll.current?.measure(
                    (fx, fy, width, height, px, py) => {
                      console.log('Component width is: ' + width);
                      console.log('Component height is: ' + height);
                      console.log('X offset to frame: ' + fx);
                      console.log('Y offset to frame: ' + fy);
                      console.log('X offset to page: ' + px);
                      console.log('Y offset to page: ' + py);
                    },
                  );
                }}
                style={{bottom: 25}}>
                {activecamera || imagesCapture.length != 0 ? (
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      flexDirection: 'row-reverse',
                    }}
                    horizontal={true}
                    style={{
                      zIndex: 1,
                      position: `${activecamera ? 'absolute' : 'relative'}`,
                      bottom: 0,
                      paddingRight: 80,
                      width: '100%',
                      alignContent: 'flex-start',
                      alignSelf: 'flex-start',
                      height: 135,
                      padding: 5,
                      borderWidth: 1,
                      borderRadius: 30,
                      backgroundColor: '#22FF2210',
                    }}>
                    {imagesCapture.length != 0 ? (
                      imagesCapture.map((item, dx) => {
                        return (
                          // <View style={{ width: 100, height: 100, borderWidth: 5 }} key={"1"}>
                          <Image
                            key={dx}
                            style={{
                              width: 125,
                              height: 125,
                              borderRadius: 25,
                              marginRight: 7,
                            }}
                            source={{uri: item.toString()}}
                          />
                          // </View>
                        );
                      })
                    ) : (
                      <Text
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                          fontSize: 25,
                        }}>
                        !Tome Una foto!
                      </Text>
                    )}
                  </ScrollView>
                ) : null}
                {activecamera ? (
                  <View style={{flex: 1, width: '100%', height: 500}}>
                    <RNCamera
                      style={[
                        {
                          flex: 1,
                          zIndex: 0,
                          width: '100%',
                          overflow: 'hidden',
                          borderRadius: 30,
                        },
                      ]}
                      type={RNCamera.Constants.Type.back}
                      flashMode={RNCamera.Constants.FlashMode.on}
                      captureAudio={false}
                      androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                      }}>
                      {({camera, status, recordAudioPermissionStatus}) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                          <>
                            <View
                              style={{
                                zIndex: 2,
                                position: 'absolute',
                                top: 0,
                                left: '0%',
                              }}>
                              <TouchableOpacity
                                onPress={() => setactivecamera(false)}
                                style={{
                                  width: 80,
                                  height: 70,
                                  backgroundColor: '#FFFFFF00',
                                }}>
                                <Text style={{fontSize: 14}}>
                                  {' '}
                                  <Icon name="sort-up" size={70} />{' '}
                                </Text>
                              </TouchableOpacity>
                            </View>

                            <View
                              style={{
                                zIndex: 0,
                                flex: 0,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                position: 'absolute',
                                bottom: 150,
                                right: '5%',
                              }}>
                              <TouchableOpacity
                                onPress={() => takePicture(camera)}
                                style={{
                                  width: 80,
                                  height: 70,
                                  backgroundColor: '#FFFFFF00',
                                }}>
                                <Text style={{fontSize: 14}}>
                                  {' '}
                                  <Icon name="camera" size={70} />{' '}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </>
                        );
                      }}
                    </RNCamera>
                  </View>
                ) : null}
              </View>
              <OutlinedTextField
                ref={PubPrecio}
                containerStyle={{
                  marginTop: 0,
                  shadowColor: '#00FFF233',
                  shadowOpacity: 0.5,
                  shadowRadius: 100,
                  marginLeft: 40,
                  marginRight: 40,
                  bottom: 10,
                }}
                labelTextStyle={{
                  fontWeight: 'bold',
                  bottom: 19,
                }}
                labelOffset={{
                  x0: 78,
                  y0: 22,
                }}
                inputContainerStyle={{}}
                titleTextStyle={{
                  fontWeight: 'bold',
                  marginLeft: 13,
                  marginRight: 10,
                }}
                style={{
                  // marginTop:20,

                  paddingTop: 5,
                  padding: 5,
                  fontWeight: 'bold',
                  backgroundColor: '#00000090',
                  paddingLeft: 10,
                  borderWidth: 1,
                  borderColor: 'aqua',
                  shadowColor: '#00FFF2',
                  shadowOpacity: 0.5,
                  shadowRadius: 100,
                }}
                textColor="#00FFF2"
                tintColor="#42F000"
                baseColor="white"
                fontSize={27}
                // labelFontSize={20}
                // autoCapitalize="none"
                autoCorrect={false}
                // enablesReturnKeyAutomatically={true}
                clearTextOnFocus={false}
                returnKeyType="done"
                keyboardType="decimal-pad"
                keyboardAppearance="dark"
                lineType="dashed"
                label="Precio"
              />
              <AwesomeButton
                style={{marginTop: 20, width: '100%'}}
                progress
                springRelease
                backgroundDarker={'#36A382'}
                backgroundColor={'#36A382'}
                borderColor={'aqua'}
                width={330}
                height={40}
                borderRadius={30}
                textColor="black"
                borderWidth={1.5}
                onPress={(nextt?: AfterPressFn) => {
                  nextt!(async () => {
                    const generateCategories: finalpubcategorias[] = [];
                    categoriasPublication.forEach(e => {
                      console.log(e);
                      console.log(categorias);
                      generateCategories.push({
                        category_name:
                          categorias[e]['category_name'].toString(),
                      });
                    });
                    console.log(generateCategories);
                    console.log('Iniciando consulta');
                    
                    const {data, errors: final} = await client.mutate({
                      mutation: ADD_PRODUCTO,
                      variables: {
                        data: {
                          createproductSessionsMyval2: {
                            product_name: PubNombre.current?.value(),
                            description: Pubdescripcion.current?.value(),
                            price: parseFloat(
                              PubPrecio.current?.value().toString()!,
                            ),
                            old_price: parseFloat(
                              PubPrecio.current?.value().toString()!,
                            ),
                            quantity: parseInt(PubCantidad.current?.value()!),
                            brand: PubMarca.current?.value(),
                            category_products: generateCategories,
                          },
                        },
                        // createproductSessionsMyval2: {
                        //     brand: imagesCapture.length != 0 ? imagesCapture.toString() : 'null',
                        //     description: Pubdescripcion.current?.value(),
                        //     old_price: PubPrecio.current?.value() != "" ? parseFloat(PubPrecio.current?.value()!) : 0.0,
                        //     price: PubPrecio.current?.value() != "" ? parseFloat(PubPrecio.current?.value()!) : 0.0,
                        //     product_name: auth().currentUser?.displayName,
                        //     quantity: 1
                        // }
                      },
                    });

                    // console.log(errors)
                    if (data == undefined) {
                      console.log('No se agrego correctamente');
                    } else {
                      console.log('Se agrego correctamente!!');
                      await refetch();
                    }
                  });
                }}>
                <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 20}}>
                  Publicar <Icon color="#fff000" size={20} name="sign-in-alt" />
                </Text>
              </AwesomeButton>
            </View>
          )}
        </View>

        <View style={{flex: 1, flexDirection: 'column-reverse'}}>
          {publicaciones.map((item: publicacion, dx) => {
            console.log(item.brand);
            const pwd = new Date();
            return (
              <View
                key={item.product_id}
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderRadius: 30,
                  borderColor: 'orange',
                  margin: 15,
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    zIndex: 50,
                    position: 'absolute',
                    right: 10,
                    top: 10,
                  }}>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#FFFFFF33"
                    style={{
                      marginRight: 20,
                      paddingTop: 5,
                      height: 45,
                      width: 45,
                      alignItems: 'center',
                      borderRadius: 30,
                      rotation: parseInt(`${AVaddPub ? 45 : 0}`),
                    }}
                    onPress={() => {
                      nav.navigate('Preview');
                    }}>
                    <View>
                      <Icon name="eye" size={35} color="black" />
                    </View>
                  </TouchableHighlight>
                </View>
                <View
                  style={{
                    zIndex: 21,
                    borderRadius: 30,
                    bottom: 100,
                    position: 'absolute',
                    height: 200,
                    width: '100%',
                    borderWidth: 2,
                    backgroundColor: '#FFFFFF40',
                  }}>
                  <Text
                    style={{
                      borderStyle: 'solid',
                      textDecorationStyle: 'dashed',
                      fontFamily: 'Times New Roman',
                      fontWeight: 'bold',
                      shadowColor: 'red',
                      shadowOpacity: 20,
                      shadowRadius: 100,
                      color: '#71058b',
                      fontSize: 25,
                      width: '100%',
                      justifyContent: 'center',
                      textAlign: 'center',
                      borderBottomWidth: 4,
                    }}>
                    <Icon name="scroll" size={20} /> Descripccion:
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 20,
                      marginRight: 20,
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}>
                    {item.description}
                  </Text>
                </View>

                <View
                  style={{
                    zIndex: 20,
                    position: 'absolute',
                    width: 200,
                    height: 50,
                    borderWidth: 5,
                    borderRadius: 30,
                    borderColor: 'orange',
                    marginLeft: 0,
                    backgroundColor: '#e2572e',
                  }}>
                  <Text
                    style={{
                      zIndex: 100,
                      alignContent: 'center',
                      textAlign: 'center',
                      color: '#188000',
                      shadowColor: '#188000',
                      shadowRadius: 100,
                      fontWeight: 'bold',
                      fontSize: 30,
                    }}>
                    <Icon name="dollar-sign" size={30}></Icon>
                    {item.price}
                  </Text>
                </View>
                <View
                  style={{
                    zIndex: 25,
                    position: 'absolute',
                    bottom: 100,
                    right: 100,
                  }}>
                  <AwesomeButton
                    style={{zIndex: 30, position: 'absolute'}}
                    textLineHeight={20}
                    progress
                    springRelease
                    backgroundDarker={'red'}
                    backgroundColor={'orange'}
                    borderColor={'aqua'}
                    width={130}
                    height={40}
                    borderRadius={30}
                    textColor="black"
                    borderWidth={1.5}
                    onPress={(nextt?: AfterPressFn) => {}}>
                    <Text>!Comprar AHORA!</Text>
                  </AwesomeButton>
                </View>

                {item.brand != 'null' ? (
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      flexDirection: 'row-reverse',
                    }}
                    horizontal={true}
                    style={{
                      zIndex: 1,
                      bottom: 0,
                      paddingRight: 80,
                      width: '100%',
                      alignContent: 'flex-start',
                      alignSelf: 'flex-start',
                      height: 530,
                      padding: 5,
                      borderWidth: 1,
                      borderRadius: 30,
                      backgroundColor: '#e67f1210',
                    }}>
                    {item.brand
                      .split(',')
                      .map((publication: string, itemcount) => {
                        return (
                          <>
                            <Image
                              style={{
                                width: 350,
                                height: 530,
                                borderRadius: 30,
                              }}
                              source={{uri: publication}}
                            />
                          </>
                        );
                      })}
                  </ScrollView>
                ) : (
                  <Image
                    style={{width: 350, height: 530, borderRadius: 10}}
                    source={require('../TabsDraws/Icon/MyLogo.png')}
                  />
                )}

                <View
                  style={{
                    position: 'relative',
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#ffffff70',
                    marginBottom: 20,
                    borderRadius: 25,
                    marginLeft: 15,
                    marginRight: 15,
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 90,
                      padding: 10,
                      margin: 5,
                    }}
                    source={require('./ImagenTest/User.jpg')}
                  />
                  <View
                    style={{flex: 1, marginLeft: 5, flexDirection: 'column'}}>
                    <Text style={{fontSize: 21}}>{item.product_name}</Text>
                    <View
                      style={{flex: 1, marginLeft: 0, flexDirection: 'row'}}>
                      <Text style={{fontSize: 13}}>
                        {' '}
                        {auth().currentUser?.email}{' '}
                      </Text>
                      <Text style={{fontSize: 13, marginLeft: 20}}>
                        {pwd.getDay() +
                          '|H and M ' +
                          pwd.getUTCHours() +
                          ':' +
                          pwd.getMinutes()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeTab;
