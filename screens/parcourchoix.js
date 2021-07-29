import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import {Card, Button} from 'react-native-elements';

const parcourchoix = (props) => {
    return (
        <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide}>
          <Text style={styles.text}>Parcours Niveau 1</Text>
          <Card containerStyle={{padding: 30,margin:10,marginBottom:10}} >
              <Card.Title>ATTAQUE AU CENTRE VILLE</Card.Title>
              <Card.Image source={require('./parcours-marseille.png')}></Card.Image>
              <Text>Temps du parcours : 1h30</Text>
              <Text>Distance à parcourir : 1,5km</Text>
              <Button  
              containerStyle={{width: "80%", marginTop:10, marginBottom: 100}} 
              buttonStyle={styles.button} 
              onPress={() =>props.navigation.navigate('trajet')}
              title='Démarrer'
              /> 
          </Card>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Parcours Niveau 2</Text>
          <Card containerStyle={{padding: 30,margin:10,marginBottom:10}} >
              <Card.Title>LES FONDS MARINS</Card.Title>
              <Card.Image source={require('./parcours-marseille.png')}></Card.Image>
              <Text>Temps du parcours : 2h15</Text>
              <Text>Distance à parcourir : 2,7km</Text>
              <Button  
              containerStyle={{width: "80%", marginTop:10, marginBottom: 100}} 
              buttonStyle={styles.button} 
              onPress={() =>props.navigation.navigate('trajet')}
              title='Démarrer'
              /> 
          </Card>
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Parcours Niveau 3</Text>
          <Card containerStyle={{padding: 30,margin:10,marginBottom:10}} >
              <Card.Title>LA FORET ENCHANTEE</Card.Title>
              <Card.Image source={require('./parcours-marseille.png')}></Card.Image>
              <Text>Temps du parcours : 3h30</Text>
              <Text>Distance à parcourir : 3,1km</Text>
              <Button  
              containerStyle={{width: "80%", marginTop:10, marginBottom: 100}} 
              buttonStyle={styles.button} 
              onPress={() =>props.navigation.navigate('trajet')}
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
    
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    button:{
        borderRadius: 15,
        backgroundColor:'#2c6e49',
        width:"100%"
    }
  })

export default parcourchoix;