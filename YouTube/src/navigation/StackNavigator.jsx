import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const SearchScreen = () => <PlaceholderScreen name="Search" />;
const SplashContent = () => <PlaceholderScreen name="Splash" />;

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
