// ============================================
// App.tsx — Login Navigation App (With Bottom Tabs)
// ============================================

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// ============ SCREENS IMPORT ============
import Splash1Screen from './src/screens/Splash1Screen';
import Splash2Screen from './src/screens/Splash2Screen';
import Splash3Screen from './src/screens/Splash3Screen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import OTPScreen from './src/screens/OTPScreen';

import HomeScreen from './src/screens/HomeScreen';
import GuideScreen from './src/screens/GuideScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Icon bananay ke liye function
const TabIcon = ({ source, focused, label }) => {
  return (
    <View style={styles.tabItem}>
      <Image 
        source={source} 
        style={[styles.icon, { tintColor: focused ? '#2E7D32' : '#999' }]} 
      />
      <Text style={[styles.label, { color: focused ? '#2E7D32' : '#999', fontWeight: focused ? '600' : 'normal' }]}>
        {label}
      </Text>
    </View>
  );
};

// ============ BOTTOM TABS NAVIGATOR ============
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hum custom label use kar rahe hain
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('./assets/home.png')} focused={focused} label="Home" />
          )
        }}
      />
      <Tab.Screen 
        name="GuideTab" 
        component={GuideScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('./assets/guide.png')} focused={focused} label="Guide" />
          )
        }}
      />
      <Tab.Screen 
        name="SearchTab" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('./assets/searchs.png')} focused={focused} label="Search" />
          )
        }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('./assets/settings.png')} focused={focused} label="Settings" />
          )
        }}
      />
    </Tab.Navigator>
  );
}

// ============ MAIN STACK ============
function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash1"
          screenOptions={{
            headerShown: false,
          }}>
          {/* ---- ONBOARDING Screens ---- */}
          <Stack.Screen name="Splash1" component={Splash1Screen} />
          <Stack.Screen name="Splash2" component={Splash2Screen} />
          <Stack.Screen name="Splash3" component={Splash3Screen} />

          {/* ---- AUTH Screens ---- */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />

          {/* ---- MAIN App (TABS) ---- */}
          <Stack.Screen name="Home" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 5,
    paddingTop: 10,
    marginBottom: 40,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
  },
});

export default App;
