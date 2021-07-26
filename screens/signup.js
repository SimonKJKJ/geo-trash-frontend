import React, {useState, useEffect} from 'react';
import { StyleSheet,Text, View, Button} from 'react-native';
import {Input} from 'react-native-elements';

function signup(props) {
    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');
    const[userexistup, setUserExistup] = useState(false);
    const[errorsignup, setErrorSignup] = useState([]);

let handleSignup = async () => {
    const userup = await fetch('http://192.168.1.95:3000/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `firstname=${firstname}&lastname=${lastname}&email=${email}&password=${password}`
    })
    const userok = await userup.json()
    console.log("userexistUP/////",userexistup)
    if(userok.result === false) {
        console.log("userOK/////",userok.result)
        setErrorSignup(userok.error)
    } else {
        setUserExistup(true)
        return(props.navigation.navigate('BottomNavigator', {screen: 'home'}))
    }  
    
}
    if (userexistup) {
        console.log("USEREX////",userexistup, 'enregistrement bdd réussi')
    } 

    let errorsup = errorsignup.map((error, i) => {
        return <Text key={i}>{error}</Text>
    })
    console.log("erroorsup//",errorsup)
    return (
       <View style={styles.container}>
           <Text style={styles.text}>Pour t'inscrire, on a besoin de quelques informations :</Text>
            <Input containerStyle={styles.input} onChangeText={(value) => setFirstname(value)} type="text" name='firstnameup' placeholder="Prenom"/>
            <Input containerStyle={styles.input} onChangeText={(value) => setLastname(value)}type="text" name='emailup' placeholder="Nom"/>
            <Input containerStyle={styles.input} onChangeText={(value) => setPassword(value)}type="text" name='passwordup' placeholder="Password" secureTextEntry={true}/>
            <Input containerStyle={styles.input} onChangeText={(value) => setEmail(value)}type="text" name='confirmPasswordup' placeholder="email"/>
            {errorsup}
           <Button onPress={()=> handleSignup()} color='#2c6e49' title="inscription"/>
       </View>
    );
};

const styles = StyleSheet.create({
    button:{
        marginTop: 15,
    },
    image:{
        width: '100%',
        resizeMode: 'contain',
    },
    text:{
        fontSize: 25,
        textAlign:'center',
        marginBottom: 50,
        
    },
    input:{
        backgroundColor:'rgba(44, 110, 73, 0.4)',
        margin: 15,
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

export default signup;