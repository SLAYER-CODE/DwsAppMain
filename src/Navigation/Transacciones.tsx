import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {styles} from '../Stylos/Styles';

function Transacciones() {
  return (
    <SafeAreaView
      style={[styles.containerAbsolute, {backgroundColor: '#ff8000'}]}>
      <Text>Perfil</Text>
    </SafeAreaView>
  );
}

export default Transacciones;
