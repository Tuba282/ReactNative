import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* <Stack.Navigator screenOptions={{ headerShown: true,headerTitle: 'Bushra Jan' }}> */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={DrawerNavigation} />
    </Stack.Navigator>
  );
}
