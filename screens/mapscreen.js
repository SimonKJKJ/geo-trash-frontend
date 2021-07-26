import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Overlay } from 'react-native-elements';

const mapscreen = (props) => {
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
      };
    return (
        <View style={styles.container}>
        <Button title="Open Overlay" onPress={toggleOverlay} />
  
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>LA PETITE SIRENE</Text>
          <Image source={require('./mermaid-whatsapp.png')}/>
           <Text> DE WHISH</Text>
          <Image source={require('./mermaid-whatsapp.png')} />
        </Overlay>
      </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#606060'
    }


})


export default mapscreen;