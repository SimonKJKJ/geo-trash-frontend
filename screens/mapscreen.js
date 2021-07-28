import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons'; 
const mapscreen = (props) => {
/////////////////////////////////////////////////////////////////////////////////27 juillet 2021 20h52///////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////pin couleur + au clic///////////////////////////////////////////////////  
  const [pinYellow, setPinYellow] = useState('');
  const [pinBlack, setPinBlack] = useState('');
  const [pinGreen, setPinGreen] = useState('');
//////////////////////////////////////////////////////////////////////////////////coordonnées users/////////////////////////////////////////////////////  
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
/////////////////////////////////////////////////////////////////////////////////overlays states////////////////////////////////////////////////////////
  const [visible, setVisible] = useState(false);
  const [overfilter, setOverfilter] = useState(false);
/////////////////////////////////////////////////////////////////////////////ajout poubelle au clic/////////////////////////////////////////////////////
  const [addtrash, setAddTrash] = useState(false);
  const [loctrash, setLocTrash] = useState('');
  const [trashlist, setTrashList] = useState([])
  const [pincolor, setPinColor] = useState('')
  const [visibleInfo,setVisibleInfo] = useState(false);
///////////////////////////////////////////////////////////////////////initialisation marqueur lancement appli /////////////////////////////////////////
  const [markers, setMarkers] = useState([]);

  useEffect(()=> {
    async function marker() {
      const mark = await fetch('http://192.168.1.95:3000/calltrash')
      const markjson = await mark.json();
      setMarkers(markjson.recuptrash)
    } 
    marker();
  }, [])
////////////////////////////////////////////////////////////////////////calcul distance////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////function add trash click////////////////////////////////////////////////////////////////////
let trash = (onPress) => {
  setAddTrash(true);
  setLocTrash({latitude : onPress.nativeEvent.coordinate.latitude, longitude: onPress.nativeEvent.coordinate.longitude})
  console.log("trashlatitude////", onPress.nativeEvent.coordinate.latitude)
  console.log("trashlongitude////", onPress.nativeEvent.coordinate.longitude)
}
let trashmap = (colorMarker) => {
  setTrashList([...trashlist, {longitude: loctrash.longitude, latitude: loctrash.latitude}])
  setPinColor(colorMarker)
  console.log("COLORMARKER////", pincolor)
  handleaddtrash();
  setVisible(!visible);
}
let trashmark = trashlist.map((trash, i) => {
  return <Marker key={i}  pinColor= {pincolor} coordinate={{latitude: trash.latitude, longitude: trash.longitude}}/>
})
///////////////////////////////////////////////////////////////////////////////////////////////requête controlleur/////////////////////////////////////////////////////////
let handleaddtrash = async () => {
  const trashin = await fetch('http://192.168.1.95:3000/addtrash', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `latitude=${loctrash.latitude}&longitude=${loctrash.longitude}&color=${pincolor}`
})
  const trash = await trashin.json();
  console.log("trashjson////", trash)
}
////////////////////////////////////////////////////////////////////////////commandes overlays////////////////////////////////////////////////////////////////////////////    
    const toggleOverlay = () => {
        setVisible(!visible);
      };
    const changestateover =()=> {
      setOverfilter(!overfilter)
    }
    const toggleInfo =() => {
      setVisibleInfo(!visible)
    }
/////////////////////////////////////////////////////////////////////////////////////commande filtres/////////////////////////////////////////////////////////////////////
////////////////// 1- boucle sur tableau markers ////////////////////////////////////
////////////////// 2- acceder a la propriété color //////////////////////////////////
////////////////// 3- filtre par couleur ////////////////////////////////////////////
////////////////// 4- push color copie //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////A REVOIR/////////////////////////////////////////////
// const getMarkerFromColor = (colormark) => {
//   console.log("colormark", colormark)
//   console.log("markers//", markers)
//   let copie = [];
//   markers.map((mark, i)=> {
//     if(mark.color === colormark) {
//       console.log("ca merde !")
//       const xx = [... copie, mark.color]
//       console.log("mark////", xx)
//     }
//   })
//   setMarkers(copie)
// }
// let copie = [...markers]
//  console.log("copiei color/", copie)
// for(let i=0; i<markers.length; i++){
//   copie.push(markers[i].color)
//   console.log("colormarkcopie", copie[i].color)
//  }
// if(copie[i].color =="#ff0") {
//    console.log("jaune")
//    return <Marker key={i} onPress={toggleInfo} pinColor= "#ff0" coordinate={{latitude: mark.latitude, longitude: mark.longitude}}/>
//  } else if (copie[i].color == "#d68c45") {
//   return <Marker key={i} onPress={toggleInfo} pinColor= "#d68c45" coordinate={{latitude: mark.latitude, longitude: mark.longitude}}/>
//  } else if (copie[i].color == "#00ff00"){
//   return <Marker key={i} onPress={toggleInfo} pinColor= "#00ff00" coordinate={{latitude: mark.latitude, longitude: mark.longitude}}/>
//  } else {
//   return <Marker key={i} onPress={toggleInfo} pinColor= {mark.color} coordinate={{latitude: mark.latitude, longitude: mark.longitude}}/>
//  }
////////////////////////////////////////////////////////////////////////////////////.map pour marqueurs lancement application///////////////////////////////////////////// 
let trashstart = markers.map((mark,i) => {   
  console.log("mark////", mark)
return <Marker key={i} onPress={toggleInfo} pinColor= {mark.color} coordinate={{latitude: mark.latitude, longitude: mark.longitude}}/>
})
/////////////////////////////////////////////////////////////////////////INTEGRATION MAP//////////////////////////////////////////////////////////////////////////////////
    return (
<View style={{flex:1,flexDirection:'column', backgroundColor:'white', opacity: 1}}>
  <MapView style={{ flex: 1, display: 'flex', alignItems:'flex-end', justifyContent:'flex-end'}}
    onPress = {(onPress) => {trash(onPress)}} 
    initialRegion={{
      latitude: 43.3,
      longitude: 5.4,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>  
    {trashmark}
    {trashstart}
    <Marker key={"currentPos"}
      pinColor="red"
      title="Je suis ici"
      description="Ma position"
      coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}/>
      <Marker pinColor="green"
              coordinate={{latitude: 43.29, longitude: 5.37}}
              onPress={toggleInfo}
              />
  </MapView>
    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      <FontAwesome name="plus-square" size={30} color="#2c6e49" onPress={toggleOverlay} />
      <FontAwesome name="filter" size={30} color="#2c6e49" onPress={changestateover}/>
    </View>  
{/* /////////////////////////////////////////////////////////////////OVERLAY FILTRES////////////////////////////////////////////////////////////////////////////////////*/}
  <Overlay overlayStyle={styles.overlay} isVisible={overfilter} onBackdropPress={changestateover}>
    <Text style={{fontSize: 24}}>Que cherches tu ?</Text>
    <TouchableOpacity onPress={()=>getMarkerFromColor("#ff0")}>
      <Image source={require('./pin-jaune.png')}/>
    </TouchableOpacity>
      <Text style={styles.textover}>papier, pastique, carton</Text>
    <TouchableOpacity onPress={()=>getMarkerFromColor('#d68c45')}>
      <Image source={require('./pin-noir.png')}/>
    </TouchableOpacity>
    <Text style={styles.textover}>tout venant</Text>
    <TouchableOpacity onPress={()=>getMarkerFromColor('#00ff00')}>
      <Image source={require('./pin-vert.png')}/>
    </TouchableOpacity>
    <Text style={styles.textover}>verre</Text>
    <Button  buttonStyle={styles.btnover} title='choisir'/>
  </Overlay>
{/* ////////////////////////////////////////////////////////////OVERLAY AJOUT POUBELLES///////////////////////////////////////////////////////////////////////////////// */}
  <Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={toggleOverlay}>
      <Text style={styles.text}>Veux tu ajouter un nouveau bac ?</Text>
    
        <TouchableOpacity onPress={() => trashmap('#ff0')}> 
          <Image source={require('./pin-jaune.png')}/>
        </TouchableOpacity>
        <Text>Papier, plastique, carton</Text>
        <TouchableOpacity onPress={() => trashmap('#d68c45')}>
          <Image source={require('./pin-noir.png')}/>
        </TouchableOpacity>
        <Text style={styles.textover}>Tout venant</Text>
        <TouchableOpacity onPress={() => trashmap('#00ff00')}>
          <Image source={require('./pin-vert.png')}/>
        </TouchableOpacity>
        <Text>Verre</Text>
    
    <Button buttonStyle={styles.btnover} title="Valider"/>
  </Overlay>
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
              }}>  
              <Marker key={"currentPos"}
                pinColor="red"
                title="Je suis ici"
                description="Ma position"
                coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
                onPress={toggleOverlay}
              />
            </MapView>
            <Button style={styles.button} onPress={() => setVisibleInfo(false)} title="Retour"/>
        </Overlay>
</View>
)};

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
      width:'50%',
      color:'#2c6e49'
    }

})

export default mapscreen;