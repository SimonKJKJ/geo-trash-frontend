import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import {Card, Button} from 'react-native-elements';

const parcourchoix = (props) => {
    return (
        <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide}>
          <Text style={styles.bigtitle}>Parcours Débutant</Text>
          <Card containerStyle={{height:"60%",justifyContent: 'center', padding: 30,margin:10,borderRadius:15,shadowColor:"#000",shadowOpacity:0.8,shadowRadius:10, shadowOffset :{width:1,height:1}}}>
              <Card.Title style={styles.title}>ATTAQUE AU CENTRE VILLE</Card.Title>
              <Card.Image source={require('../assets/parcours-marseille.png')}></Card.Image>
              <Text style={styles.text}>Temps du parcours : 1h30</Text>
              <Text style={styles.text}>Distance à parcourir : 1,5km</Text>
              <Button  
              containerStyle={{width: "100%", marginTop:10, marginBottom: 100}} 
              buttonStyle={styles.button} 
              onPress={() =>props.navigation.navigate('trajet')}
              title='Démarrer'
              /> 
          </Card>
        </View>
        <View style={styles.slide}>
          <Text style={styles.bigtitle}>Parcours Intermédiaire</Text>
          <Card containerStyle={{height:"60%",justifyContent: 'center',padding: 30,margin:10,borderRadius:15,shadowColor:"#000",shadowOpacity:0.8,shadowRadius:10, shadowOffset :{width:1,height:1}}} >
              <Card.Title style={styles.title}>LES FONDS MARINS</Card.Title>
              <Card.Image source={require('../assets/parcours-marseille.png')}></Card.Image>
              <Text style={styles.text}>Temps du parcours : 2h15</Text>
              <Text style={styles.text}>Distance à parcourir : 2,7km</Text>
              <Button  
              containerStyle={{width: "100%", marginTop:10, marginBottom: 100}} 
              buttonStyle={styles.button} 
              onPress={() =>props.navigation.navigate('trajet2')}
              title='Démarrer'
              /> 
          </Card>
        </View>
        <View style={styles.slide}>
          <Text style={styles.bigtitle}>Parcours Avancé</Text>
          <Card containerStyle={{height:"60%",justifyContent: 'center',padding: 30,margin:10,borderRadius:15,shadowColor:"#000",shadowOpacity:0.8,shadowRadius:10, shadowOffset :{width:1,height:1}}}>
              <Card.Title style={styles.title}>LA FORET ENCHANTEE</Card.Title>
              <Card.Image source={require('../assets/parcours-marseille.png')}></Card.Image>
              <Text style={styles.text}>Temps du parcours : 3h30</Text>
              <Text style={styles.text}>Distance à parcourir : 3,1km</Text>
              <Button  
              containerStyle={{width: "100%", marginTop:10, marginBottom: 100}} 
              buttonStyle={styles.button} 
              onPress={() =>props.navigation.navigate('trajet3')}
              title='Démarrer'
              /> 
          </Card>
        </View>
      </Swiper>
    );
};
const styles = StyleSheet.create({
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c6e49'
    },
    
    bigtitle: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    button:{
        marginTop:15,
        marginBottom:5,
        borderRadius: 15,
        backgroundColor:'#2c6e49',
        width:"100%"
    },
    title:{
        marginTop:80
    },
    text:{
        marginTop:10
    }
  })

export default parcourchoix;