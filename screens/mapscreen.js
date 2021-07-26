import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image,TouchableHighlight } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const mapscreen = (props) => {
  const [pinYellow, setPinYellow] = useState(0);
  const [pinBlack, setPinBlack] = useState(0);
  const [pinGreen, setPinGreen] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);

  useEffect(() => {
    async function askPermissions() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 2 },
          (location) => {
            setCurrentLatitude(location.coords.latitude)
            setCurrentLongitude(location.coords.longitude);
          }
        );
      }
    }
    askPermissions();
  }, []);

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
      };
    return (
        <View style={{flex:1}}>
          <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 43.3,
                longitude: 5.4,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              >  
              <Marker key={"currentPos"}
              pinColor="red"
              title="Je suis ici"
              description="Ma position"
              coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
              onPress={toggleOverlay}
              />
              <Button title="Open Overlay" onPress={toggleOverlay} />
              
          </MapView>
        
  
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text style={styles.text}>Veux tu ajouter un nouveau bac ?</Text>
          <View style={styles.bloc}>
              <TouchableHighlight onPress={() => setPinYellow(pinYellow+1)}> 
                <Image source={require('./pin-jaune.png')} />
              </TouchableHighlight>
              <Text>Papier, plastique, carton</Text>
          </View>

          <View style={styles.bloc}>
              <TouchableHighlight onPress={() => setPinBlack(pinBlack+1)}>
                <Image source={require('./pin-noir.png')} />
              </TouchableHighlight>
              <Text>Tout venant</Text>
          </View>

          <View style={styles.bloc}>
              <TouchableHighlight onPress={() => setPinGreen(pinGreen+1)}>
                <Image source={require('./pin-vert.png')} />
              </TouchableHighlight>
              <Text>Verre</Text>
          </View>

          {console.log("PIN YELLOW", pinYellow)}
          {console.log("PIN BLACK", pinBlack)}
          {console.log("PIN GREEN", pinGreen)}
        
          <Button 
          title="Valider"
          />
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
    },
    text:{
      fontWeight:'bold',
      fontSize:20
    },
    bloc:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center'
    },
    image:{
      resizeMode:'contain',
      flex:1,
      width :100
    }

})


export default mapscreen;