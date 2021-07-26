import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const parcourchoix = () => {
    return (
    <View style={styles.container}>
        <Text>PARCOURS</Text>
    </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#61c'
    }


})

export default parcourchoix;