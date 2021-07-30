import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay} from 'react-native-elements';
import MapView, { Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import CountDown from 'react-native-countdown-component';



const trajetparcour3 = () => {
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [missions, setMissions] = useState("");
    const [olmission, setOlmission] = useState(false);

    const routeName ="LA FORET ENCHANTEE";
    const timeRoute ="3h";
    const distanceRoute="3,1km";
    const coordDepart= {lat : 43.305112,long:5.394679};
    const coodArrival={lat:43.305195,long:5.397192};
    const coordTrip=[{lat : 43.305027,long:5.394801},
        {lat : 43.304953,long:5.394976},
        {lat : 43.304900,long:5.395190},
        {lat : 43.305151,long:5.395437},
        {lat : 43.305151,long:5.395608},
        {lat : 43.305069,long:5.395782},
        {lat : 43.304959,long:5.395982},
        {lat : 43.305075,long:5.396107},
        {lat : 43.305181,long:5.396244},
        {lat : 43.305047,long:5.396249},
        {lat : 43.304909,long:5.396288},
        {lat : 43.304775,long:5.396340},
        {lat : 43.304714,long:5.396366},
        {lat : 43.304822,long:5.396422},
        {lat:43.304924,long:5.396494},
        {lat:43.305154,long:5.396471},
        {lat:43.305254,long:5.396464},
        {lat:43.305346,long:5.396471},
        {lat:43.305436,long:5.396517},
        {lat:43.305534,long:5.396557},
        {lat:43.305582,long:5.396690},
        {lat:43.305611,long:5.396805},
        {lat:43.305629,long:5.396973},
        {lat:43.305555,long:5.397029},
        {lat:43.305495,long:5.397150},
        {lat:43.305383,long:5.397199},
        {lat:43.305283,long:5.397183}
    ];
    const coordDefi=[{lat : 43.305020,long:5.395374},
        {lat : 43.305147,long:5.396295},
        {lat : 43.305024,long:5.396541},
        {lat : 43.305466,long:5.397232}
    ];
    const DefiName =["Recherche","L'eau du lac","L'archéologue", "Un tour au Zoo"]

    var markerTrajRoute = coordTrip.map((route, i) => {
      return <Marker key={i} pinColor="green" image={require('./point100.png')} coordinate={{ latitude: route.lat, longitude: route.long }}
      />
    });
  


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
                    latitude: 43.304971,
                    longitude: 5.395998,
                    latitudeDelta: 0.0032,
                    longitudeDelta: 0.0032,
                  }}>  
                  <Marker key={"currentPos"}
                    pinColor="red"
                    title="Je suis ici"
                    description="Ma position"
                    coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
                  />

                  {markerTrajRoute}
                  {markerTrajDefis}

                  <Marker 
                    pinColor="#FF0"
                    title="start"
                    description="Ma position"
                    image={require('./start150.png')}
                    coordinate={{ latitude: coordDepart.lat, longitude: coordDepart.long }}
                  />
                  {console.log("coordinate start", coordDepart.lat)}
                  <Marker 
                    pinColor="#FF00ff"
                    title="Arrival"
                    description="Ma position"
                    image={require('./flag150.png')}
                    coordinate={{ latitude: coodArrival.lat, longitude: coodArrival.long }}
                  />
                </MapView>
        </View>
        );

};
const styles = StyleSheet.create({
    marker:{
        width: 50,
        height: 50,
    },
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