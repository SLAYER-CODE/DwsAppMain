import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { styles } from '../Stylos/Styles'
import Preview from './Preview'

function Categorias() {
    return (
        <SafeAreaView style={[styles.containerAbsolute, { backgroundColor: '#004B63' }]}>
            <Text>
                Perfil
            </Text>
            <Preview/>
        </SafeAreaView>
    )
}

export default Categorias
