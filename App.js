import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Adminlogin from './Adminlogin';
import Studentlogin from './Studentlogin';
import StudentRegistration from './StudentRegistration';
import CourseRegistration from './CourseResgistration';
import Home from './Home';
import Search from './Search';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AdminLogin">
        <Stack.Screen name="Adminlogin" component={Adminlogin} />
        <Stack.Screen name="Studentlogin" component={Studentlogin} />
        <Stack.Screen name="StudentRegistration" component={StudentRegistration} />
        <Stack.Screen name="CourseRegistration" component={CourseRegistration}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
