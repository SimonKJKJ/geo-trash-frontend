import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import {Input,Button,} from 'react-native-elements';
import {connect} from'react-redux';
import Emoji from 'react-native-emoji';

const homescreen = (props) => {
    const [firstname, setFirstname] = useState('')
useEffect(()=> {
    setFirstname(props.name)
    console.log("FIRSTN///", firstname)
}, [])    
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.text}>HELLO {firstname.toUpperCase()} !<Emoji name="handshake" style={{fontSize: 45}}/></Text>
                    <Text style={styles.titles}>Quoi de prévu aujourd'hui ?</Text>
                    <Text style={styles.para}>Que dirais tu de tester tes connaissances sur l'environnement ? </Text>
                    <View style={styles.container2} >
                    <Emoji onPress={()=> console.log("click detecté")} name="earth_americas" style={{fontSize: 45,marginBottom: 25}}/>
                    <Button   buttonStyle={styles.button} containerStyle={{width: "80%", marginTop:10, marginBottom: 100}} title="Quizz" onPress={()=> console.log("click ok")}/>
                    </View>
                    <Text style={styles.titles2}>On te parle un peu de nous ?</Text>
                    <Text style={styles.numbers}>13 dauphins</Text><Text style={styles.para}>ont été sauvé grâce à la communauté</Text>
                    <Text style={styles.numbers}>150 poubelles</Text><Text style={styles.para}> ont été ajoutées le mois dernier</Text>
                    <Text style={styles.numbers}>302 parcours</Text><Text style={styles.para}> ludiques ont été parcouru par les parents et leurs enfants !</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

};
const styles = StyleSheet.create({
    titles2:{
        fontSize: 26, 
        marginTop: -65
    },
    numbers:{
        fontSize: 16, 
        marginTop: 30,
        fontWeight:"bold"
    },
    para:{
        fontSize: 16, 
        
    },
    titles:{
        fontSize: 26, 
        marginTop: 25
    },
    button:{
        backgroundColor: '#2c6e49',
        borderRadius: 15,
    },
    container2:{
        width: '100%',
        marginTop: 30,
        flexDirection: 'column',
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize: 35
    },
    container:{
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: '#fff'
    }
})

function mapStateToProps(state) {
    return {name: state.name}
}

export default connect(
    mapStateToProps,
    null
)(homescreen);