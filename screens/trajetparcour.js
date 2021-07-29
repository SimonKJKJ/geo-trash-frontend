import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';

const trajetparcour = () => {
const [currentLatitude, setCurrentLatitude] = useState(0);
const [currentLongitude, setCurrentLongitude] = useState(0);
const [missions, setMissions] = useState("");
///////////////////////////////////////VARIABLES PARCOURS 1//////////////////////////////////////
const coordDepart= {lat : 49.295048,long:5.375826};
const coodArrival={lat:43.294295,long:5.374474};
const coordTrip=[{lat : 49.295088,long:5.375998},
    {lat : 49.294888,long:5.376154},
    {lat : 43.294482,long:5.376331},
    {lat : 43.294336,long:5.376412},
    {lat : 43.294142,long:5.376482},
    {lat : 43.293971,long:5.376548},
    {lat : 43.293778,long:5.376623},
    {lat : 43.293682,long:5.376695},
    {lat : 43.293754,long:5.377060},
    {lat : 43.293792,long:5.377226},
    {lat : 43.293896,long:5.377223},
    {lat : 43.294042,long:5.377160},
    {lat : 43.294211,long:5.377048},
    {lat : 43.294526,long:5.376966},
    {lat:43.294689,long:5.376613},
    {lat:43.294630,long:5.376387},
    {lat:43.294570,long:5.376155},
    {lat:43.294493,long:5.375859},
    {lat:43.294426,long:5.375576},
    {lat:43.294326,long:5.375206},
    {lat:43.294228,long:5.374823},
    {lat:43.294325,long:5.374498}
];
const coordDefi=[{lat : 49.294627,long:5.376270},
    {lat : 43.293720,long:5.376880},
    {lat : 43.294303,long:5.376880},
    {lat : 43.294742,long:5.376853}
];
const DefiName =["Paradis ou enfer?","Un trésor était là","Attention au virage", "Trouvons de l'eau"]

var markerTrajRoute = coordTrip.map((route, i) => {
    return <Marker key={i} pinColor="green" coordinate={{ latitude: route.lat, longitude: route.long }}
    />
});

var markerTrajDefis = coordDefi.map((defi, i) => {
    return <Marker key={i} pinColor="blue" coordinate={{ latitude: defi.lat, longitude: defi.long }}
    />
});
/////////////////////////////////////////////////////////////////////////////////////////////////

const toggleInfo =() => {
    setVisibleInfo(!visible)
    }

const toggleOverlay = () => {
    setVisible(!visible);
    };
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

return (
    <View style={{flex:1,flexDirection:'column', backgroundColor:'white', opacity: 1}}>
        <MapView
            style={{ flex: 1, display: 'flex', alignItems:'flex-end', justifyContent:'flex-end'}}
            initialRegion={{
            latitude: 43.293936,
            longitude: 5.375907,
            latitudeDelta: 0.0092,
            longitudeDelta: 0.0092,
        }}>
            <Marker key={"currentPos"}
                        pinColor="red"
                        title="Je suis ici"
                        description="Ma position"
                        coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
                        onPress={toggleOverlay}
            />
             <Marker pinColor="red"
                    title="Départ"
                    coordinate={{latitude : 49.295048,longitude :5.375826}}
            />
            <Marker
                    onPress={()=>handleoverlayclick()}
                    pinColor="green"
                    coordinate={{ latitude: 44.012735, longitude: 4.876297 }}
            >
                 <Overlay isVisible={olmission} onBackdropPress={toggleMission}>
                    <Text>{missions}</Text>
                </Overlay>

            </Marker>

            {markerTrajRoute}
            {markerTrajDefis}

        </MapView>
    
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