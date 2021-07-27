import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image,TouchableHighlight } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapViewDirections from 'react-native-maps-directions';

const mapscreen = (props) => {
  const [pinYellow, setPinYellow] = useState(0);
  const [pinBlack, setPinBlack] = useState(0);
  const [pinGreen, setPinGreen] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visibleInfo,setVisibleInfo] = useState(false);

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

    
    const toggleOverlay = () => {
        setVisible(!visible);
      };
    const toggleInfo =() => {
      setVisibleInfo(!visible)
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
    
    function getDistance(lat1, lon1, lat2, lon2) {
      var R = 6371;
      var dLat = deg2rad(lat2-lat1);
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = Math.round((R * c)*1000)   //distance en mètre
      return d;
    }
    

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

               <Marker pinColor="green"
                coordinate={{ latitude: 43.29, longitude: 5.37 }}
                onPress={toggleInfo}
              />
               
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

{/* ///OVERLAY INFO PARCOURS//// */}

        <Overlay style={styles.overl} isVisible={visibleInfo} onBackdropPress={toggleInfo}>
            <Text style={styles.text}>
              Courage ! Tu es à seulement {getDistance(currentLatitude, currentLongitude, 43.325783, 5.366766)} mètres !
            </Text>
            <MapView
              style={styles.overl}
              initialRegion={{
                latitude: currentLatitude,
                longitude: currentLongitude,
                latitudeDelta: 0.0092,
                longitudeDelta: 0.0092,
              }}
              >  
              <Marker key={"currentPos"}
                pinColor="red"
                title="Je suis ici"
                description="Ma position"
                coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
                onPress={toggleOverlay}
              />
              {/* ///////ajouter ici le markeur de la benne/////// */}
            </MapView>
            <Button style={styles.button}
               
              onPress={() => setVisibleInfo(false)}
              title="Retour"
            />
        </Overlay>
{/* ///FIN OVERLAY PARCOURS///// */}

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
      fontSize:20,
      margin:30,
      alignItems :'center'
    },
    bloc:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    image:{
      resizeMode:'contain',
      flex:1,
      width :100
    },
    overl:{
      display:'flex',
      flex :1,
      width : 300,
      margin:10,
      alignItems:'center',
      justifyContent:'center'
    },
    button:{
      marginBottom : 10,
      borderRadius: 15,
      width :'50%',
      color='#2c6e49'
    }

})

export default mapscreen;