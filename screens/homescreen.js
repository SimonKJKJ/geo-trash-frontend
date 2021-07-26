import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const homescreen = () => {
    return (
        <View style={styles.container}>
            <Text>HOMESCREEN</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ff0f'
    }


})

export default homescreen;