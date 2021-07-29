import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay} from 'react-native-elements';
import MapView, { Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const trajetparcour3 = () => {
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [missions, setMissions] = useState("");
    const [olmission, setOlmission] = useState(false);

    const toggleMission = () => {
        setOlmission(!olmission);
      };   
    
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

    let mission = ["cours le plus vite possible vers les bac de tri les plus proche ! p.s: fais attention aux voitures",
                    "ramasse le plus vite possible 10 déchets autour de toi ! depeche toi le chrono va démarrer !",
                    "demande à tes parents de t'aider à organiser une sortie avec tes amis pour ramasser des déchets dans la nature !"];
    let newmission = [...mission];
    function missionAleatoire() {
        let random = Math.floor(Math.random()*newmission.length);
        setMissions(newmission[random])
    console.log("nm", newmission.length)
    console.log("nmrandom", newmission[random])
    }
    let handleoverlayclick = () => {
        missionAleatoire();
        toggleMission()
    }
    console.log("etat olmissions", olmission)
    return (
        <View style={{flex:1,flexDirection:'column', backgroundColor:'white', opacity: 1}}>
                <MapView
                  style={{ flex: 1, display: 'flex', alignItems:'flex-end', justifyContent:'flex-end'}}
                  initialRegion={{
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: 0.0092,
                    longitudeDelta: 0.0092,
                  }}>  
                  <Marker key={"currentPos"}
                    pinColor="red"
                    title="Je suis ici"
                    description="Ma position"
                    coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
                  />
              
                  <Marker
                    onPress={()=>handleoverlayclick()}
                    pinColor="green"
                    coordinate={{ latitude: 44.012735, longitude: 4.876297 }}
                  >
                    <Overlay isVisible={olmission} onBackdropPress={toggleMission} style={{backgroundColor: "red", padding: 10}}>
                      <Text>{missions}</Text>
                    </Overlay>
                  </Marker>
                </MapView>
        </View>
        );

};
const styles = StyleSheet.create({
    btnover:{
      backgroundColor: '#2c6e49',
      borderRadius: 15,
      marginTop: 15
    },
    overlay:{
      flexDirection:'column',
      alignItems:'center',
      backgroundColor: '#fff'
    },
    textover:{
      textAlign: 'center'
    },

    btn:{
      flex:1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'transparent'
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
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
      width:'50%',
      color:'#2c6e49'
    }

})

export default trajetparcour3;