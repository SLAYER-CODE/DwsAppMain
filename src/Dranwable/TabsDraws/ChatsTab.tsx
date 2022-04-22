import React from 'react'
import { Text,SafeAreaView } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../../Stylos/Styles'

function ChatsTab() {
    return (
        <SafeAreaView style={[styles.containerAbsolute, { backgroundColor: '#004B63' }]}>
            <Text>
                Perfil
            </Text>
        </SafeAreaView>
    )
}

export default ChatsTab
