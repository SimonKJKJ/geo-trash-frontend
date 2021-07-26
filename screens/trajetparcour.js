import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const trajetparcour = () => {
    return (
        <View style={styles.container}>
            <Text>TRAJET</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcd895'
    }
})

export default trajetparcour;