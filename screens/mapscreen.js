import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native';
import { Overlay, Button} from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons'; 
const mapscreen = (props) => {
////////////////////////////////////////////////////////////////////////////////pin couleur + au clic///////////////////////////////////////////////////  
  const [pinYellow, setPinYellow] = useState(0);
  const [pinBlack, setPinBlack] = useState(0);
  const [pinGreen, setPinGreen] = useState(0);
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
  const [image, setImage] = useState ("");
  const [image2, setImage2] = useState ("");
  const [image3, setImage3] = useState ("");
  const [visibleInfo,setVisibleInfo] = useState(false);
///////////////////////////////////////////////////////////////////////initialisation marqueur lancement appli /////////////////////////////////////////
  const [latitudeClic,setLatitudeClic] = useState(0);
  const [longitudeClic,setLongitudeClic] = useState(0);
  const [distance, setDistance] = useState(0);
  const [colorPinOverlayDistance,setColorPinOverlayDistance] = useState("#ff0");
  const [coordOverlayDistance,setCoordOverlayDistance] = useState({});
////////////////////////////////////////////////////////////////////////////initialisation marqueur lancement appli ////////////////////////////////////
  const [markers, setMarkers] = useState([]);
  

  useEffect(()=> {
    async function marker() {
      const mark = await fetch('https://mysterious-plateau-19771.herokuapp.com/calltrash')
      const markjson = await mark.json();
      console.log("markers", markjson)
      setMarkers(markjson.recuptrash)
    } 
    marker();
  }, [])
////////////////////////////////////////////////////////////////////////calcul distance///////////////////////////////////////////////////////////////
function deg2rad(deg) { 
  return deg * (Math.PI/180)
}
//////////////////// Formule de Haversine pour le calcul de la distance entre 2 points///////////////////////////////////////////////////////////////
function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
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
////////////////////////////////////////////////////////////////////////////function add trash click////////////////////////////////////////////////////////////////////
let trash = (onPress) => {
  setAddTrash(true);
  setLocTrash({latitude : onPress.nativeEvent.coordinate.latitude, longitude: onPress.nativeEvent.coordinate.longitude})
  console.log("trashlatitude////", onPress.nativeEvent.coordinate.latitude)
  console.log("trashlongitude////", onPress.nativeEvent.coordinate.longitude)
}
if(addtrash) {
  console.log("ajout poubelle possible")
}
console.log(addtrash)

let trashmap = (colorMarker, imagemark) => {
  setTrashList([...trashlist, {longitude: loctrash.longitude, latitude: loctrash.latitude}])
  setPinColor(colorMarker)
  setImage(imagemark)
  console.log("COLORMARKER////", pincolor)
  // if(colorMarker === "#ff0"){
  //   setPinYellow(pinYellow+1)
  // } else if (colorMarker === "#d68c45"){
  //   setPinBlack(pinBlack+1)
  // } else { setPinGreen(pinGreen+1) }
  /////////////////////////////////////////////////////////image ajout poubelles//////////////////////////////
  // if(colorMarker === "#ff0"){
  //   setImage(require('./papiers.png'))
  // } else if (colorMarker === "#d68c45"){
  //   setImage(require('./poubelle.png'))
  // } else { setImage(require('./verre.png'))}
  handleaddtrash();
  setVisible(!visible);
}
let trashmark = trashlist.map((trash, i) => {
  return <Marker key={i}  pinColor= {pincolor} coordinate={{latitude: trash.latitude, longitude: trash.longitude}}/>
})
///////////////////////////////////////////////////////////////////////////////////////////////requête controlleur/////////////////////////////////////////////////////////
let handleaddtrash = async () => {
  const trashin = await fetch('https://mysterious-plateau-19771.herokuapp.com/addtrash', {
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
//       const xx = [... copie, mark.color]
//       console.log("mark////", xx)
//     }
//   })
//   setMarkers(copie)
//   console.log("marker///", markers)
// }
////////////////////////////////////////////////////////////////////////////////////.map pour marqueurs lancement application///////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////INTEGRATION MAP//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////Fonction pour OVERLAY DISTANCE trash////////////////////////////////////////////////////////////
    let handleClicTrash = (markerLat, markerLong, colorpin) =>{
      setVisibleInfo(!visible)
      setLatitudeClic(markerLat)
      setLongitudeClic(markerLong)
      setColorPinOverlayDistance(colorpin)
      setCoordOverlayDistance({latitude: latitudeClic, longitude: longitudeClic})
      setDistance(getDistance(currentLatitude, currentLongitude,latitudeClic,longitudeClic))
    }
//////////////////////////////////////////////////////////////////////////////////////////.Map ajout poubelles///////////////////////////////////////////////
    let trashstart = markers.map((mark,i) => {   
    return <Marker key={i} pinColor= {mark.color} onPress={()=>handleClicTrash(mark.latitude,mark.longitude,mark.color)} coordinate={{latitude: mark.latitude, longitude: mark.longitude}}/>   
    })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
{/* ///////////////////////////////////////////////////////Marqueur test ////////////////////////////////////////////////////////////////////////////// */}
      <Marker pinColor="green"
        coordinate={{latitude: 43.29, longitude: 5.37}}
        onPress={toggleInfo}
        />
{/* ///////////////////////////////////////////////////////Fin Marqueur test/////////////////////////////////////////////////////////////////////////// */}
  </MapView>
    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      <FontAwesome name="plus-square" size={30} color="#2c6e49" onPress={toggleOverlay} />
      <FontAwesome name="filter" size={30} color="#2c6e49" onPress={changestateover}/>
    </View>  
{/* /////////////////////////////////////////////////////////////////OVERLAY FILTRES////////////////////////////////////////////////////////////////////*/}
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
{/* ////////////////////////////////////////////////////////////OVERLAY AJOUT POUBELLES///////////////////////////////////////////////////////////////// */}
  <Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={toggleOverlay}>
        <Text style={styles.text}>Tu as trouver un nouveau bac ?</Text>
    
        <TouchableOpacity onPress={() => trashmap('#ff0', require('./papiers.png'))}> 
          <Image source={require('./pin-jaune.png')}/>
        </TouchableOpacity>

        <Text>Papier, plastique, carton</Text>
        <TouchableOpacity onPress={() => trashmap('#d68c45', require('./poubelle.png'))}>
          <Image source={require('./pin-noir.png')}/>
        </TouchableOpacity>

        <Text style={styles.textover}>Tout venant</Text>
        <TouchableOpacity onPress={() => trashmap('#00ff00', require('./verre.png'))}>
          <Image source={require('./pin-vert.png')}/>
        </TouchableOpacity>

        <Text>Verre</Text>

        <Button buttonStyle={styles.btnover} title="Valider"/>
  </Overlay>
  <Overlay overlayStyle={styles.overl} isVisible={visibleInfo} onBackdropPress={toggleInfo}>
            <Text style={styles.text}>
              Courage ! {"\n"} Tu es à {distance} mètres {"\n"} à vol d'oiseau !
            </Text>
            <MapView
              style={styles.map}
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
              <Marker pinColor={colorPinOverlayDistance}
              coordinate={coordOverlayDistance}
              onPress={toggleInfo}
              />
        </MapView>

        <Button containerStyle={{width: "80%", marginTop:20, marginBottom: 10}} 
          buttonStyle={styles.button}
          onPress={() => setVisibleInfo(false)}
          title="Retour"
        />
        </Overlay>
</View>
)};

const styles = StyleSheet.create({
    map:{
      flex:1,
      borderRadius: 15,
      width: 300,
      maxHeight: 300,
      margin:10,
      alignItems:'center',
    },

    btnover:{
      backgroundColor: '#2c6e49',
      borderRadius: 15,
      margin: 15,
      width:"80%"
    },
    overlay:{
      flexDirection:'column',
      alignItems:'center',
      backgroundColor: '#fff',
      borderRadius:15
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
      margin:10,
      marginBottom:20,
      fontFamily: 'Poppins',
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
      borderRadius: 200,
      flex :1,
      width : 350,
      maxHeight: 500,
      margin:10,
      alignItems:'center',
    },
    button:{
      borderRadius: 15,
      backgroundColor:'#2c6e49',
  }
})

export default mapscreen;