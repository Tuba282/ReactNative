import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from './src/screens/auth/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import EmailVerificationScreen from './src/screens/auth/EmailVerificationScreen';
import AddProfilePictureScreen from './src/screens/auth/AddProfilePictureScreen';
import EditProfilePictureScreen from './src/screens/auth/EditProfilePictureScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false, // We built custom back buttons in the screens
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerificationScreen}
          />
          <Stack.Screen
            name="AddProfilePicture"
            component={AddProfilePictureScreen}
          />
          <Stack.Screen
            name="EditProfilePicture"
            component={EditProfilePictureScreen}
          />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
