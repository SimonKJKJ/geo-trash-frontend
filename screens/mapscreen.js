import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image,TouchableHighlight, TouchableOpacity } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons'; 
const mapscreen = (props) => {
/////////////////////////////////////////////////////////////////////pin couleur + au clic///////////////////////////////////////////////////////  
  const [pinYellow, setPinYellow] = useState(0);
  const [pinBlack, setPinBlack] = useState(0);
  const [pinGreen, setPinGreen] = useState(0);
///////////////////////////////////////////////////////////////////coordonnées users////////////////////////////////////////////////////////////  
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
///////////////////////////////////////////////////////////////////////////overlays states///////////////////////////////////////////////////////////
  const [visible, setVisible] = useState(false);
  const [overfilter, setOverfilter] = useState(false);
//////////////////////////////////////////////////////////////////////////ajout poubelle au clic//////////////////////////////////////////////////
  const [addtrash, setAddTrash] = useState(false);
  const [loctrash, setLocTrash] = useState('');
  const [trashlist, setTrashList] = useState([])
  const [pincolor, setPinColor] = useState('')
  const [visibleInfo,setVisibleInfo] = useState(false);

function deg2rad(deg) {  //fonction permettant de passer de degré en radian
  return deg * (Math.PI/180)
}

function getDistance(lat1, lon1, lat2, lon2) { // Formule de Haversine pour le calcul de la distance entre 2 points
  var R = 6371;
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));  //Math.atan2 prend les coordonnées en abscisse et en ordonnée du point
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
  return <Marker key={i} pinColor= {pincolor} coordinate={{latitude: trash.latitude, longitude: trash.longitude}}/>
})

let handleaddtrash = async () => {
  const trashin = await fetch('http://192.168.1.27:3000/addtrash', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `latitude=${loctrash.latitude}&longitude=${loctrash.longitude}&color=${pincolor}`
})
  const trash = await trashin.json();
  console.log("trashjson////", trash)
}
////////////////////////////////////////////////////////commandes overlays////////////////////////////////////////////////////////////////////////////    
    const toggleOverlay = () => {
        setVisible(!visible);
      };

    const changestateover =()=> {
      setOverfilter(!overfilter)
    }
    const toggleInfo =() => {
      setVisibleInfo(!visible)
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        {/* <Button title='test' onPress={()=>trashmap()}/> */}
    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      <FontAwesome name="plus-square" size={30} color="#2c6e49" onPress={toggleOverlay} />
      <FontAwesome name="filter" size={30} color="#2c6e49" onPress={changestateover}/>
    </View>  
{/* /////////////////////////////////////////////////////////////////////////////////////filtres///////////////////////////////////////////////////////////////////////        */}
  <Overlay overlayStyle={styles.overlay} isVisible={overfilter} onBackdropPress={changestateover}>
    <Text style={{fontSize: 24}}>Que cherches tu ?</Text>
    <TouchableOpacity onPress={()=>console.log("click detect jaune")}>
      <Image source={require('./pin-jaune.png')}/>
    </TouchableOpacity>
      <Text style={styles.textover}>papier, pastique, carton</Text>
    <TouchableOpacity onPress={()=>console.log("click detect noir")}>
      <Image source={require('./pin-noir.png')}/>
    </TouchableOpacity>
    <Text style={styles.textover}>tout venant</Text>
    <TouchableOpacity onPress={()=>console.log("click detect vert")}>
      <Image source={require('./pin-vert.png')}/>
    </TouchableOpacity>
    <Text style={styles.textover}>verre</Text>
    <Button  buttonStyle={styles.btnover} title='choisir'/>
  </Overlay>
  {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
  <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <Text style={styles.text}>Veux tu ajouter un nouveau bac ?</Text>
    <View style={styles.bloc}>
        <TouchableHighlight onPress={() => trashmap('#ff0')}> 
          <Image source={require('./pin-jaune.png')}/>
        </TouchableHighlight>
        <Text>Papier, plastique, carton</Text>
    </View>
    <View style={styles.bloc}>
        <TouchableHighlight onPress={() => trashmap('#d68c45')}>
          <Image source={require('./pin-noir.png')}/>
        </TouchableHighlight>
        <Text>Tout venant</Text>
    </View>
    <View style={styles.bloc}>
        <TouchableHighlight onPress={() => trashmap('#00ff00')}>
          <Image source={require('./pin-vert.png')}/>
        </TouchableHighlight>
        <Text>Verre</Text>
    </View> 
    <Button title="Valider"/>
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