import React, {useState, useEffect} from 'react';
import {StyleSheet,Text, View, Image,ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import {Input,Button,} from 'react-native-elements';
import { RotationGestureHandler } from 'react-native-gesture-handler';
import { connect } from 'react-redux';


const login = (props) => {
    const [emailin, setEmailIn] = useState('');
    const [passwordin, setPasswordIn] = useState('');
    const [userexist, setUserExist] = useState(false);
    const [errorsignin, setErrorSignin] = useState([])

    let handleSignin = async () => {
        const user = await fetch('http://192.168.244.167:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `email=${emailin}&password=${passwordin}`
        })
        const userin = await user.json()
        console.log("user in ////",userin)
        console.log("userexist",userexist)

        if(userin.result === false){
            setErrorSignin(userin.error)
            return (props.navigation.navigate('login')) 
        } else {
            props.sendfirstname(userin) 
            console.log("userinfn///",props.sendfirstname)
            setUserExist(true);
            return (props.navigation.navigate('BottomNavigator', {screen: 'home'}));
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
                    <Button  containerStyle={{width: "80%", marginTop:10, marginBottom: 100}} buttonStyle={styles.button}  onPress={() => handleSignin() } title='Connexion'/>  
                    <Text>Vous n'avez pas de compte,  <Text style={styles.text}onPress={() =>props.navigation.navigate('signup')}>Créer un compte</Text></Text>
                </View>
            </ScrollView>
       </SafeAreaView> 
    );     
};

const styles = StyleSheet.create({
    text:{
        color:'#2c6e49',
        fontWeight: 'bold',
    },
    button:{
        borderRadius: 15,
        backgroundColor:'#2c6e49',
    },
    image:{
        width: '100%',
        resizeMode: 'contain',
        marginBottom: -65,
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
function mapDispatchToProps(dispatch) {
    return {
        sendfirstname: function(firstname) {
            dispatch({type:'sendfirstname', name : firstname})
        }
    }
}
export default connect(
    null,
    mapDispatchToProps
) (login);