import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import login from './screens/login';
import parcourchoix from './screens/parcourchoix';
import trajetparcour from './screens/trajetparcour';
import mapscreen from './screens/mapscreen';
import homescreen from './screens/homescreen';
import signup from './screens/signup'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomNavigator = () => {
  return(
    <Tab.Navigator>
     <Tab.Screen name="Home" component={homescreen}/>
     <Tab.Screen name="map" component={mapscreen}/>
     <Tab.Screen name="parcours" component={parcourchoix}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="signup" component={signup} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
