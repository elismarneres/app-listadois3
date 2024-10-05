import { StatusBar } from 'expo-status-bar';
import { useEffect} from 'react';
//import {Feather} from '@expo/vector-icons'
import { View } from 'react-native';
import * as react from 'react';

//import { Task } from './src/components/Task';
//import { CardNumber } from './src/components/CardNumber';
//import { InputAddTask } from './src/components/ImputAddTask';
//import { useState } from 'react';
//import { InputButton } from './src/components/ImputAddTask/styles';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
//import Home from './src/screens/Home';
//import Details from './src/screens/Details';
//import TaskProvider from './src/context/TaskContext';


export default function App() {

  const Stack = createNativeStackNavigator();

  return(
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName= 'Home' screenOptions={{headerShown: false}}>
            <Stack.Screen name= "Home" component={Home}/>
            <Stack.Screen name="Details" component={Details} />
       <Stack.Navigator/>
       </NavigationContainer>
     </TaskProvider>
  );
  }
  
  


   

   
  









