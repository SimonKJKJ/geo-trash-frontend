import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import CountDown from 'react-native-countdown-component';



const trajetparcour3 = (props) => {
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [missions, setMissions] = useState("");
    const [olmission, setOlmission] = useState(false);

    const routeName ="LA FORET ENCHANTEE";
    const timeRoute ="3h";
    const distanceRoute="3,1km";
    const coordDepart= {lat : 43.305112,long:5.394679};
    const coodArrival={lat:43.305195,long:5.397192};
    const coordDefi=[{lat : 43.305020,long:5.395374},
        {lat : 43.305147,long:5.396295},
        {lat : 43.305024,long:5.396541},
        {lat : 43.305466,long:5.397232}
    ];
    const DefiName =["Recherche","L'eau du lac","L'archéologue", "Un tour au Zoo"]

  


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
        toggleMission();
        
    }
    console.log("etat olmissions", olmission)


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
                            <Polyline
            coordinates={[
                {latitude : 43.305112,longitude :5.394679},
                {latitude : 43.305027,longitude :5.394801},
                {latitude : 43.304953,longitude :5.394976},
                {latitude : 43.304900,longitude :5.395190},
                {latitude : 43.305151,longitude :5.395437},
                {latitude : 43.305151,longitude :5.395608},
                {latitude : 43.305069,longitude :5.395782},
                {latitude : 43.304959,longitude :5.395982},
                {latitude : 43.305075,longitude :5.396107},
                {latitude : 43.305181,longitude :5.396244},
                {latitude : 43.305047,longitude :5.396249},
                {latitude : 43.304909,longitude :5.396288},
                {latitude : 43.304775,longitude :5.396340},
                {latitude : 43.304714,longitude :5.396366},
                {latitude : 43.304822,longitude :5.396422},
                {latitude :43.304924,longitude :5.396494},
                {latitude :43.305154,longitude :5.396471},
                {latitude :43.305254,longitude :5.396464},
                {latitude :43.305346,longitude :5.396471},
                {latitude :43.305436,longitude :5.396517},
                {latitude :43.305534,longitude :5.396557},
                {latitude :43.305582,longitude :5.396690},
                {latitude :43.305611,longitude :5.396805},
                {latitude :43.305629,longitude :5.396973},
                {latitude :43.305555,longitude :5.397029},
                {latitude :43.305495,longitude :5.397150},
                {latitude :43.305383,longitude :5.397199},
                {latitude :43.305283,longitude :5.397183}
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
                    description="Ma position"
                    image={require('../assets/start150.png')}
                    coordinate={{ latitude: coordDepart.lat, longitude: coordDepart.long }}
                />
                  {console.log("coordinate start", coordDepart.lat)}
                <Marker 
                    pinColor="#FF00ff"
                    title="Arrival"
                    description="Ma position"
                    image={require('../assets/flag150.png')}
                    coordinate={{ latitude: coodArrival.lat, longitude: coodArrival.long }}
                />
                </MapView>
                <Button title="back" onPress={()=>props.navigation.navigate('BottomNavigator', {screen: 'home'})}/>

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