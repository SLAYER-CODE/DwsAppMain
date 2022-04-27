import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { styles } from '../Stylos/Styles'

function Productos() {
    return (
        <SafeAreaView style={[styles.containerAbsolute, { backgroundColor: '#ff8000' }]}>
            <Text>
                Perfil
            </Text>
        </SafeAreaView>
    )
}

export default Productos
