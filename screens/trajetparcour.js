import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import CountDown from 'react-native-countdown-component';




const trajetparcour = (props) => {
const [currentLatitude, setCurrentLatitude] = useState(0);
const [currentLongitude, setCurrentLongitude] = useState(0);
const [missions, setMissions] = useState("");
const [olmission, setOlmission] = useState(false);

///////////////////////////////////////VARIABLES PARCOURS 1//////////////////////////////////////
const coordDepart= {lat : 49.295048,long:5.375826};
const coodArrival={lat:43.294295,long:5.374474};

const coordDefi=[{lat : 43.294627,long:5.376270},
    {lat : 43.293720,long:5.376880},
    {lat : 43.294303,long:5.376880},
    {lat : 43.294742,long:5.376853}
];
const DefiName =["Paradis ou enfer?","Un trésor était là","Attention au virage", "Trouvons de l'eau"]




/////////////////////////////////////////////////////////////////////////////////////////////////


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
    }}
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

var markerTrajDefis = coordDefi.map((defi, i) => {
  return (
    <Marker key={i} 
    pinColor="blue" 
    image={require('./mission150.png')}
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

return (
    <View style={{flex:1,flexDirection:'column', backgroundColor:'white', opacity: 1}}>
     
        <MapView
            style={{ flex: 1, display: 'flex', alignItems:'flex-end', justifyContent:'flex-end'}}
            initialRegion={{
            latitude: 43.294493,
            longitude: 5.375859,
            latitudeDelta: 0.0032,
            longitudeDelta: 0.0032,
        }}>
          <Polyline
            coordinates={[
              {latitude : 43.295088,longitude:5.375998},
              {latitude : 43.294888,longitude:5.376154},
              {latitude : 43.294482,longitude:5.376331},
              {latitude : 43.294336,longitude:5.376412},
              {latitude : 43.294142,longitude:5.376482},
              {latitude : 43.293971,longitude:5.376548},
              {latitude : 43.293778,longitude:5.376623},
              {latitude : 43.293682,longitude:5.376695},
              {latitude : 43.293754,longitude:5.377060},
              {latitude : 43.293792,longitude:5.377226},
              {latitude : 43.293896,longitude:5.377223},
              {latitude : 43.294042,longitude:5.377160},
              {latitude : 43.294211,longitude:5.377048},
              {latitude : 43.294526,longitude:5.376966},
              {latitude:43.294689,longitude:5.376613},
              {latitude:43.294630,longitude:5.376387},
              {latitude:43.294570,longitude:5.376155},
              {latitude:43.294493,longitude:5.375859},
              {latitude:43.294426,longitude:5.375576},
              {latitude:43.294326,longitude:5.375206},
              {latitude:43.294228,longitude:5.374823},
              {latitude:43.294325,longitude:5.374498}
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
                image={require('./start150.png')}
                description="Ma position"
                image={require('./pngegg(3).png')}
                coordinate={{ latitude: 43.295048, longitude: 5.375826 }}
            />
            <Marker 
                pinColor="#FF00ff"
                title="Arrival"
                image={require('./flag150.png')}
                description="Ma position"
                image={require('./arrival.png')}
                coordinate={{ latitude: 43.294295, longitude: 5.374474 }}
            />
        </MapView>
        <Button title="back" onPress={()=>props.navigation.navigate('BottomNavigator', {screen: 'home'})}/>
    </View>
    )
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

});

export default trajetparcour;