import React, {useState, useEffect} from 'react';
import {StyleSheet,Text, View, Button,Image,ScrollView, SafeAreaView } from 'react-native';
import {Input} from 'react-native-elements';


const login = (props) => {
    const [emailin, setEmailIn] = useState('');
    const [passwordin, setPasswordIn] = useState('');
    const [userexist, setUserExist] = useState(false);
    const [errorsignin, setErrorSignin] = useState([])

    let handleSignin = async () => {
        const user = await fetch('http://192.168.1.95:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `email=${emailin}&password=${passwordin}`
        })
        const userin = await user.json()
        console.log("user in ////",userin.result)
        console.log("userexist",userexist)

        if(userin.result === false){
            setErrorSignin(userin.error)
            return (props.navigation.navigate('login'))  
        } else {
            setUserExist(true);
            return (props.navigation.navigate('BottomNavigator', {screen: 'home'}))   
        }   
    }   
    let errorsin = errorsignin.map((error, i) => {
         return <Text key={i}>{error}</Text>
    })
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('./Geotrash.png')}/>
                    <Input onChangeText={(value) => setEmailIn(value)} containerStyle={styles.input} type="text" name='email' placeholder="Email"/>
                    <Input onChangeText={(value) => setPasswordIn(value)} containerStyle={styles.input} type="text" name='password' placeholder="Password" secureTextEntry={true}/>
                    {errorsin}
                    <Button title="connexion"color='rgba(44, 110, 73, 100)'onPress={() => handleSignin() }/>   
                    <Text>Vous n'avez pas de compte,  <Text style={{color:'#2c6e49'}}onPress={() =>props.navigation.navigate('signup')}>Créer un compte</Text></Text>
                </View>
            </ScrollView>
       </SafeAreaView> 
    );     
};

const styles = StyleSheet.create({
    image:{
        width: '100%',
        resizeMode: 'contain',
    },
    text:{
        marginTop: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    input:{
        backgroundColor:'rgba(44, 110, 73, 0.4)',
        margin: 10,
        width:'80%',
        borderRadius: 15,
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffF'
    }


})

export default login;