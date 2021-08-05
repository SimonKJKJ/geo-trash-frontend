import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import CountDown from 'react-native-countdown-component';


const trajetparcour2 = (props) => {
    
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [missions, setMissions] = useState("");
    const [olmission, setOlmission] = useState(false);

    ///////////////////////////////////////VARIABLES PARCOURS 2//////////////////////////////////////
    const routeName ="LES FONDS MARINS";
    const timeRoute ="2h15";
    const distanceRoute="2,7km";
    const coordDefi=[{lat : 43.259862,long:5.379932},
        {lat : 43.257520,long:5.381623},
        {lat : 43.254822,long:5.376053},
        {lat : 43.255215,long:5.374991},
        {lat : 43.256316,long:5.375298}
    ];
    const DefiName =["La fontaine","Le chateau","L'esplanade", "Le sable chaud","Les pieds dans l'eau"]
  

    console.log("olmission state", olmission)
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
///////////////////////////////////////////////////////////generateur missions aléatoires sur marker mission/////////////////////////////////////////////////////////////////
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
console.log("olmission state2/", olmission)
var markerTrajDefis = coordDefi.map((defi, i) => {
  return (
  <Marker key={i} 
      pinColor="blue" 
      image={require('../assets/mission150.png')}
      coordinate={{ latitude: defi.lat, longitude: defi.long }}
      onPress={()=>handleoverlayclick()}
    >
    <Overlay isVisible={olmission} onBackdropPress={toggleMission}>
      <Text>{missions}</Text>
      <CountDown
        until={60*10}
        onFinish={() => alert('temps écoulé ! bravo !')}
        onPress={() => alert('a toi de jouer !')}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'Minutes', s: 'Secondes'}}
        size={20}
      />
    </Overlay>
  </Marker>
  )
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
return (
    <View style={{flex:1,flexDirection:'column', backgroundColor:'white', opacity: 1}}>
            <MapView
              style={{ flex: 1, display: 'flex', alignItems:'flex-end', justifyContent:'flex-end'}}
              initialRegion={{
                latitude: 43.257430,
                longitude: 5.378762,
                latitudeDelta: 0.0072,
                longitudeDelta: 0.0072,
              }}> 
            <Polyline
            coordinates={[
              {latitude : 43.261114,longitude :5.379134},
              {latitude : 43.260690,longitude :5.379391},
              {latitude : 43.260325,longitude :5.379635},
              {latitude : 43.259419,longitude :5.380203},
              {latitude : 43.258847,longitude :5.380582},
              {latitude : 43.258404,longitude :5.380866},
              {latitude : 43.257950,longitude :5.381164},
              {latitude : 43.257078,longitude :5.381443},
              {latitude : 43.256285,longitude :5.381698},
              {latitude : 43.255690,longitude :5.381585},
              {latitude : 43.255081,longitude :5.381016},
              {latitude : 43.254839,longitude :5.380437},
              {latitude : 43.254587,longitude :5.379781},
              {latitude : 43.254478,longitude :5.379241},
              {latitude : 43.254538,longitude :5.377938},
              {latitude : 43.254611,longitude :5.376609},
              {latitude : 43.254810,longitude :5.375273},
              {latitude : 43.255524,longitude :5.375173},
              {latitude : 43.256582,longitude :5.375763},
              {latitude : 43.257096,longitude :5.375779},
            ]}
            strokeColor="#0000ff"
		        strokeWidth={5}
            lineDashPattern={[1]}
          /> 
              <Marker key={"currentPos"}
                pinColor="red"
                title="Je suis ici"
                description="Ma position"
                coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
              />
              {markerTrajDefis}

              <Marker 
                pinColor="#FF0"
                title="start"
                image={require('../assets/start150.png')}
                description="Ma position"
                coordinate={{ latitude: 43.261322, longitude: 5.378314 }}
              />
              <Marker 
                pinColor="#ff00ff"
                title="Arrival"
                image={require('../assets/flag150.png')}
                description="Ma position"
                image={require('../assets/arrival.png')}
                coordinate={{ latitude: 43.257704, longitude: 5.376038 }}
              />
            </MapView>
            <Button title="back" onPress={()=>props.navigation.navigate('BottomNavigator', {screen: 'home'})}/>
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

export default trajetparcour2;