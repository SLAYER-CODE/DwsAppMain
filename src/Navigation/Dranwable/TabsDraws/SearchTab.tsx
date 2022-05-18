import React from 'react'
import { Text,SafeAreaView } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../../../Stylos/Styles'

function SearchTab() {
    return (
        <SafeAreaView style={[styles.containerAbsolute, { backgroundColor: '#e67f1250' }]}>
            <Text>
                Busqueda de Productos
            </Text>
        </SafeAreaView>
    )
}

export default SearchTab
