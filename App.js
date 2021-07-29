import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import login from './screens/login';
import parcourchoix from './screens/parcourchoix';
import trajetparcour from './screens/trajetparcour';
import trajetparcour2 from './screens/trajetparcour2';
import trajetparcour3 from './screens/trajetparcour3';
import mapscreen from './screens/mapscreen';
import homescreen from './screens/homescreen';
import signup from './screens/signup';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import name from './screens/reducers/user';
import { FontAwesome } from '@expo/vector-icons'; 


const store = createStore(combineReducers({name}));

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomNavigator = () => {
  return(
    
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'map') {
            iconName = 'map-marker';
          } else if(route.name==='parcours') {
            iconName = 'flag-checkered'
          }
          return <FontAwesome  name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#D68C45',
        inactiveTintColor: '#606060',
        activeBackgroundColor: '#2c6e49',
        inactiveBackgroundColor: '#fff',
      }}
      >
        <Tab.Screen name="Home" component={homescreen}/>
        <Tab.Screen name="map" component={mapscreen}/>
        <Tab.Screen name="parcours" component={parcourchoix}/>
      </Tab.Navigator>
    
  )
}

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="signup" component={signup} />
        <Stack.Screen name="trajet" component={trajetparcour} />
        <Stack.Screen name="trajet2" component={trajetparcour2} />
        <Stack.Screen name="trajet3" component={trajetparcour3} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      </Stack.Navigator>
  </NavigationContainer>
  </Provider>
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
